import express from "express";
import {
  createCertificate,
  deleteCertificate,
  getCertificateById,
  getCertificates,
  verifyCertificate,
  downloadCertificatePDF,
} from "../controllers/certificateController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/verify/:certificateId", verifyCertificate);
router.get("/:certificateId/download", downloadCertificatePDF);

router.post("/", protect, createCertificate);
router.get("/", protect, getCertificates);
router.delete("/:id", protect, deleteCertificate);
router.get("/:certificateId", getCertificateById);

export default router;
