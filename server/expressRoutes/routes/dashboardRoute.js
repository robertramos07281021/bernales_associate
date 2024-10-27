import { Router } from "express";
import {
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  getAllAnnouncement,
  getAnnouncement,
  lastAnnouncement,
} from "../controllers/dashboardController.js";
const router = Router();

router.get("/", getAllAnnouncement);
router.get("/last", lastAnnouncement);
router.get("/:id", getAnnouncement);
router.post("/new-announcement", createAnnouncement);
router.put("/:id", updateAnnouncement);
router.delete("/:id", deleteAnnouncement);

export { router as dashboardRouter };
