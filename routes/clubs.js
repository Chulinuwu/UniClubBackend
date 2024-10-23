const express = require("express");
const {
  getClubs,
  getClub,
  createClub,
  updateClub,
  deleteClub
} = require("../controllers/clubs");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(getClubs)
  .post(protect, createClub);
router
  .route("/:id")
  .get(getClub)
  .put(protect, authorize("admin"), updateClub)
  .delete(protect, authorize("admin"), deleteClub);

module.exports = router;