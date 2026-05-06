import Certificate from "../models/Certificate.js";
import generateCertificateId from "../utils/generateCertificateId.js";
import generateCertificatePDF from "../utils/generateCertificatePDF.js";

const createCertificate = async (req, res, next) => {
  try {
    const { name, role, event, duration, date } = req.body;

    if (!name || !role || !event || !date) {
      res.status(400);
      throw new Error("name, role, event, and date are required");
    }

    let certificateId = req.body.certificateId || generateCertificateId();

    // Ensure generated ID is unique
    while (await Certificate.findOne({ certificateId })) {
      certificateId = generateCertificateId();
    }

    const certificate = await Certificate.create({
      certificateId,
      name,
      role,
      event,
      duration: duration || "",
      date,
      qrValue: `${process.env.CLIENT_URL || "http://localhost:5173"}/verify/${certificateId}`,
      issuedBy: req.admin._id,
    });

    res.status(201).json({
      message: "Certificate created successfully",
      certificate,
    });
  } catch (error) {
    next(error);
  }
};

const getCertificates = async (req, res, next) => {
  try {
    const { search = "" } = req.query;

    const query = {
      issuedBy: req.admin._id,
      ...(search
        ? {
            $or: [
              { certificateId: { $regex: search, $options: "i" } },
              { name: { $regex: search, $options: "i" } },
              { event: { $regex: search, $options: "i" } },
            ],
          }
        : {}),
    };

    const certificates = await Certificate.find(query)
      .sort({ createdAt: -1 })
      .populate("issuedBy", "name email");

    res.status(200).json({
      total: certificates.length,
      certificates,
    });
  } catch (error) {
    next(error);
  }
};

const getCertificateById = async (req, res, next) => {
  try {
    const certificate = await Certificate.findOne({
      certificateId: req.params.certificateId,
    }).populate("issuedBy", "name email");

    if (!certificate) {
      res.status(404);
      throw new Error("Certificate not found");
    }

    res.status(200).json({ certificate });
  } catch (error) {
    next(error);
  }
};

const deleteCertificate = async (req, res, next) => {
  try {
    const certificate = await Certificate.findOne({
      _id: req.params.id,
      issuedBy: req.admin._id,
    });

    if (!certificate) {
      res.status(404);
      throw new Error("Certificate not found or access denied");
    }

    await certificate.deleteOne();

    res.status(200).json({
      message: "Certificate deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const verifyCertificate = async (req, res, next) => {
  try {
    const certificate = await Certificate.findOne({
      certificateId: req.params.certificateId,
    }).populate("issuedBy", "name email");

    if (!certificate) {
      return res.status(404).json({
        valid: false,
        message: "Certificate is invalid",
      });
    }

    return res.status(200).json({
      valid: true,
      message: "Certificate is valid",
      certificate,
    });
  } catch (error) {
    next(error);
  }
};

const downloadCertificatePDF = async (req, res, next) => {
  try {
    const certificate = await Certificate.findOne({
      certificateId: req.params.certificateId,
    }).populate("issuedBy", "name email");

    if (!certificate) {
      res.status(404);
      throw new Error("Certificate not found");
    }

    const pdfBuffer = await generateCertificatePDF(certificate);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="certificate-${certificate.name}.pdf"`
    );
    res.send(pdfBuffer);
  } catch (error) {
    next(error);
  }
};

export {
  createCertificate,
  getCertificates,
  getCertificateById,
  deleteCertificate,
  verifyCertificate,
  downloadCertificatePDF,
};
