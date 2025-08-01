import { useState } from "react";
import axios from "axios";

const deportes = ["fútbol", "baloncesto", "natación", "tenis", "béisbol"];
const departamentos = [
  "Guatemala", "Sacatepéquez", "Chimaltenango", "Escuintla", "Santa Rosa",
  "Jalapa", "Jutiapa", "Petén", "Izabal", "Zacapa", "Chiquimula", "El Progreso",
  "Baja Verapaz", "Alta Verapaz", "Quiché", "Huehuetenango", "Sololá", "Totonicapán",
  "Quetzaltenango", "San Marcos", "Suchitepéquez", "Retalhuleu"
];

const modelosAutos = ["Ford", "Chrysler", "Toyota", "Nissan"];

export default function Form() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    favoriteSport: deportes[0],
    gender: "",
    state: departamentos[0],
    is21OrOlder: false,
    carModels: [] as string[],
  });

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const target = e.target as HTMLInputElement; // <--- esta línea es clave
  const { name, value, type } = target;

  if (type === "checkbox" && name === "carModels") {
    const checked = target.checked;
    setFormData((prev) => {
      const carModels = checked
        ? [...prev.carModels, value]
        : prev.carModels.filter((model) => model !== value);
      return { ...prev, carModels };
    });
  } else if (type === "checkbox") {
    const checked = target.checked;
    setFormData({ ...formData, [name]: checked });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/guardar", formData);
      alert("✅ Datos guardados correctamente.");
    } catch (error) {
      console.error("Error al enviar datos:", error);
      alert("❌ Ocurrió un error al guardar los datos.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded">
      <h2 className="mb-3">Actualizar Información</h2>

      <input
        name="firstName"
        placeholder="First name"
        value={formData.firstName}
        onChange={handleChange}
        className="form-control mb-2"
        required
      />

      <input
        name="lastName"
        placeholder="Last name"
        value={formData.lastName}
        onChange={handleChange}
        className="form-control mb-2"
        required
      />

      <label>Favorite sport:</label>
      <select
        name="favoriteSport"
        value={formData.favoriteSport}
        onChange={handleChange}
        className="form-select mb-2"
      >
        {deportes.map((sport) => (
          <option key={sport}>{sport}</option>
        ))}
      </select>

      <div className="mb-2">
        <label>Gender:</label><br />
        <input type="radio" name="gender" value="male" onChange={handleChange} /> Male
        <input type="radio" name="gender" value="female" onChange={handleChange} className="ms-3" /> Female
        <input type="radio" name="gender" value="not sure" onChange={handleChange} className="ms-3" /> Not sure
      </div>

      <label>State resident:</label>
      <select
        name="state"
        value={formData.state}
        onChange={handleChange}
        className="form-select mb-2"
      >
        {departamentos.map((dep) => (
          <option key={dep}>{dep}</option>
        ))}
      </select>

      <div className="form-check mb-2">
        <input
          type="checkbox"
          className="form-check-input"
          name="is21OrOlder"
          checked={formData.is21OrOlder}
          onChange={handleChange}
        />
        <label className="form-check-label">21 or older</label>
      </div>

      <label>Car models owned:</label>
      <div className="mb-3">
        {modelosAutos.map((model) => (
          <label key={model} className="me-3">
            <input
              type="checkbox"
              name="carModels"
              value={model}
              onChange={handleChange}
              className="me-1"
            />
            {model}
          </label>
        ))}
      </div>

      <button type="submit" className="btn btn-primary">Save Changes</button>
    </form>
  );
}