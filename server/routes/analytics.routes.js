const express = require("express");
const router = express.Router();

const analyticsController = require("../controllers/analytics.controller");
const { authUser, isAdmin } = require("../middlewares/auth.middleware");

// 🔐 ADMIN ONLY
router.get("/summary", authUser, isAdmin, analyticsController.getSummary);
router.get("/monthly", authUser, isAdmin, analyticsController.getMonthlyStats);
router.get("/status", authUser, isAdmin, analyticsController.getStatusStats);
router.get("/locations", authUser, isAdmin, analyticsController.getLocationStats);

module.exports = router;
