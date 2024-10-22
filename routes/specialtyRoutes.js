

const express = require("express");
const router = express.Router();
const specialtyController = require("../controllers/specialityController");


router.post("/create-specialty", specialtyController.createSpecialty);
router.get("/api", specialtyController.getAllSpecialties);
router.get("/:id", specialtyController.getSpecialtyById);
router.put("/update-specialty/:id", specialtyController.updateSpecialty);
router.delete("/delete/:id", specialtyController.deleteSpecialty);

module.exports = router;
