import PDFDocument from "pdfkit";
import QRCode from "qrcode";

const generateCertificatePDF = async (certificate) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        layout: "landscape",
      });

      let buffers = [];

      doc.on("data", (buffer) => {
        buffers.push(buffer);
      });

      doc.on("end", () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });

      doc.on("error", reject);

      // Background color
      doc.rect(0, 0, doc.page.width, doc.page.height).fill("#000000");

      // Border
      doc
        .rect(30, 30, doc.page.width - 60, doc.page.height - 60)
        .stroke("#ffffff");

      // Title
      doc.fontSize(48).font("Helvetica-Bold").fillColor("#ffffff");
      doc.text("Certificate of Completion", 0, 80, {
        align: "center",
        width: doc.page.width,
      });

      // Recipient name
      doc.fontSize(36).text(certificate.name, 0, 160, {
        align: "center",
        width: doc.page.width,
      });

      // Text
      doc.fontSize(14).fillColor("#cccccc");
      doc.text("has successfully completed", 0, 220, {
        align: "center",
        width: doc.page.width,
      });

      // Role/Position
      doc.fontSize(18).fillColor("#ffffff").font("Helvetica-Bold");
      doc.text(certificate.role, 0, 250, {
        align: "center",
        width: doc.page.width,
      });

      // In
      doc.fontSize(14).fillColor("#cccccc").font("Helvetica");
      doc.text("in", 0, 290, {
        align: "center",
        width: doc.page.width,
      });

      // Event
      doc.fontSize(18).fillColor("#ffffff").font("Helvetica-Bold");
      doc.text(certificate.event, 0, 320, {
        align: "center",
        width: doc.page.width,
      });

      // Duration
      if (certificate.duration) {
        doc.fontSize(12).fillColor("#999999").font("Helvetica");
        doc.text(`Duration: ${certificate.duration}`, 0, 360, {
          align: "center",
          width: doc.page.width,
        });
      }

      // QR Code
      const qrCodeDataUrl = await QRCode.toDataURL(certificate.qrValue);
      const qrBuffer = Buffer.from(qrCodeDataUrl.split(",")[1], "base64");
      doc.image(qrBuffer, doc.page.width / 2 - 40, 400, {
        width: 80,
        height: 80,
      });

      // Certificate ID
      doc.fontSize(10).fillColor("#999999");
      doc.text(
        `Certificate ID: ${certificate.certificateId}`,
        0,
        500,
        {
          align: "center",
          width: doc.page.width,
        }
      );

      // Issued by info
      doc.fontSize(10).fillColor("#999999");
      const issueDate = new Date(certificate.date).toLocaleDateString();
      doc.text(
        `Issued by: ${certificate.issuedBy.name} | Date: ${issueDate}`,
        0,
        525,
        {
          align: "center",
          width: doc.page.width,
        }
      );

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

export default generateCertificatePDF;
