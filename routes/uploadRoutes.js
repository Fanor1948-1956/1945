// routes/uploadRoutes.js

const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const multer = require('multer'); // Para manejar la subida de archivos

// Configuración de multer para el manejo de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Nombre único para el archivo
  },
});

const upload = multer({ storage });

// Ruta para subir archivos
router.post(
  '/upload-add/:ownerModel/:ownerId',
  upload.single('file'),
  uploadController.uploadFile
);

// Ruta para obtener uploads por ID de usuario
router.get('/:ownerModel/:ownerId', uploadController.getUploadsByModel);

module.exports = router;
