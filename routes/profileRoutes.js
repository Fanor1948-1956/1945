
const express = require("express");
const router = express.Router();
const {
  viewProfile,
  updateProfile,
} = require("../controllers/profileController");
const { verifyToken } = require("../middleware/authMiddleware"); 


router.get("/profile", verifyToken, viewProfile);
router.post("/update", verifyToken, updateProfile);

module.exports = router;
