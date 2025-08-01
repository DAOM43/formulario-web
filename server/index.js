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

  if (fs.existsSync(excelPath)) {
    await workbook.xlsx.readFile(excelPath);
    worksheet = workbook.getWorksheet(hojaNombre) || workbook.addWorksheet(hojaNombre);
  } else {
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

  worksheet.addRow([
    data.firstName,
    data.lastName,
    data.favoriteSport,
    data.gender,
    data.state,
    data.is21OrOlder ? "Sí" : "No",
    data.carModels.join(", ")
  ]);

  await workbook.xlsx.writeFile(excelPath);
}

app.post("/api/guardar", async (req, res) => {
  console.log("📥 Recibido en backend:", req.body);
  try {
    await guardarRegistro(req.body);
    console.log("✅ Registro guardado correctamente");
    res.json({ message: "Datos guardados correctamente." });
  } catch (err) {
    console.error("❌ Error al guardar:", err);

    if (err.code === "EBUSY") {
      return res.status(423).json({
        error: "El archivo está en uso. Cierra Excel y vuelve a intentar.",
      });
    }

    res.status(500).json({ error: "Error al guardar el registro." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});