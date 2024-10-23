const express = require("express");
const {
  getActivities,
  getActivity,
  addActivity,
  updateActivity,
  deleteActivity
} = require("../controllers/activities");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(getActivities)
  .post(protect, addActivity);
router
  .route("/:id")
  .get(getActivity)
  .put(protect, authorize("admin"), updateActivity)
  .delete(protect, authorize("admin"), deleteActivity);

module.exports = router;