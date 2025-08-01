const express = require("express");
const cors = require("cors");
const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const excelPath = path.join(__dirname, "excel", "registros.xlsx");

async function guardarRegistro(data) {
  const workbook = new ExcelJS.Workbook();
  const hojaNombre = "Formulario";
  let worksheet;

  // Si el archivo ya existe
  if (fs.existsSync(excelPath)) {
    await workbook.xlsx.readFile(excelPath);
    worksheet = workbook.getWorksheet(hojaNombre) || workbook.addWorksheet(hojaNombre);
  } else {
    // Si el archivo no existe, crea una hoja nueva con encabezados
    worksheet = workbook.addWorksheet(hojaNombre);
    worksheet.addRow([
      "Nombre",
      "Apellido",
      "Deporte favorito",
      "Género",
      "Departamento",
      "Mayor de 21",
      "Modelos de autos"
    ]);
  }

  // Agrega una nueva fila con los datos que llegan del frontend
  worksheet.addRow([
    data.nombre,
    data.apellido,
    data.deporte,
    data.genero,
    data.departamento,
    data.mayorEdad,
    data.autos
  ]);

  await workbook.xlsx.writeFile(excelPath);
}

app.post("/guardar", async (req, res) => {
  const datos = req.body;
  console.log("📥 Recibido en backend:", datos);

  try {
    await guardarRegistro(datos);
    res.status(200).send("Registro guardado correctamente");
  } catch (error) {
    console.error("❌ Error al guardar:", error);
    res.status(500).send("Error al guardar");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`);
});