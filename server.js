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
          'Apikey': process.env.Apikey || '8d0a1cc9-6016-42f4-b416-d42f4799789e'  // Reemplaza esto si no usas .env
        },
        responseType: 'arraybuffer'
      }
    );

    res.set('Content-Disposition', 'attachment; filename=converted.txt');
    res.set('Content-Type', 'text/plain');
    res.send(response.data);
  } catch (err) {
    console.error('Error en la conversión:', err.message);
    res.status(500).send('Error al convertir el PDF');
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
