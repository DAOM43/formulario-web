import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/FormStyles.css";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    deporte: "fútbol",
    genero: "",
    departamento: "Guatemala",
    mayorEdad: false,
    autos: {
      ford: false,
      chrysler: false,
      toyota: false,
      nissan: false,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked, id } = target;

    if (name === "autos") {
      setFormData((prev) => ({
        ...prev,
        autos: {
          ...prev.autos,
          [id]: checked,
        },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const autosSeleccionados = Object.entries(formData.autos)
        .filter(([_, v]) => v)
        .map(([k]) => k);

      const data = {
        nombre: formData.nombre,
        apellido: formData.apellido,
        deporte: formData.deporte,
        genero: formData.genero,
        departamento: formData.departamento,
        mayorEdad: formData.mayorEdad ? "Sí" : "No",
        autos: autosSeleccionados.join(", "),
      };

      await axios.post("https://formulario-excel-api.onrender.com/guardar", data);
      alert("✅ Datos guardados correctamente en Excel");
    } catch (error) {
      console.error(error);
      alert("❌ Error al guardar los datos");
    }
  };

  return (
    <div className="fullscreen-center">
    <div className="form-wrapper">
      <h3>Actualizar Información</h3>
      
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre:</label>
            <input type="text" className="form-control" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="apellido" className="form-label">Apellido:</label>
            <input type="text" className="form-control" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Deporte favorito:</label>
            <select className="form-select" name="deporte" value={formData.deporte} onChange={handleChange}>
              <option value="fútbol">Fútbol</option>
              <option value="béisbol">Béisbol</option>
              <option value="natación">Natación</option>
              <option value="baloncesto">Baloncesto</option>
              <option value="tenis">Tenis</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Género:</label><br />
            {["Masculino", "Femenino", "No estoy seguro"].map((gen) => (
              <div className="form-check form-check-inline" key={gen}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="genero"
                  id={gen}
                  value={gen}
                  checked={formData.genero === gen}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor={gen}>{gen}</label>
              </div>
            ))}
          </div>

          <div className="mb-3">
            <label className="form-label">Departamento:</label>
            <select className="form-select" name="departamento" value={formData.departamento} onChange={handleChange}>
              <option>Guatemala</option>
              <option>Santa Rosa</option>
              <option>Huehuetenango</option>
              <option>Chiquimula</option>
              <option>Petén</option>
            </select>
          </div>

          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" id="mayorEdad" name="mayorEdad" checked={formData.mayorEdad} onChange={handleChange} />
            <label className="form-check-label" htmlFor="mayorEdad">✓ 21 años o más</label>
          </div>

          <div className="mb-3">
            <label className="form-label">Modelos de autos:</label><br />
            {Object.keys(formData.autos).map((auto) => (
              <div className="form-check" key={auto}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={auto}
                  name="autos"
                  checked={formData.autos[auto as keyof typeof formData.autos]}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor={auto}>{auto.charAt(0).toUpperCase() + auto.slice(1)}</label>
              </div>
            ))}
          </div>

          <button type="submit" className="btn btn-green w-100">Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
};

export default Form;