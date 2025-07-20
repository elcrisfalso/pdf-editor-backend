const express = require('express');
const multer = require('multer');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend')));

// Configurar subida de archivos en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Ruta para convertir PDF a texto
app.post('/convert-pdf-to-word', upload.single('pdfFile'), async (req, res) => {
  const pdfBuffer = req.file.buffer;

  try {
    const response = await axios.post(
      'https://api.cloudmersive.com/convert/pdf/to/txt',
      pdfBuffer,
      {
        headers: {
          'Content-Type': 'application/pdf',
          'Apikey': process.env.Apikey || 'TU_API_
