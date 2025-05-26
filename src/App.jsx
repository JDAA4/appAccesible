import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Sun, Moon, ImageOff, MousePointer2 } from "lucide-react";
import "./index.css";

const App = () => {
  const [fontSize, setFontSize] = useState(1);
  const [fontFamily, setFontFamily] = useState("sans-serif");
  const [darkMode, setDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [hideImages, setHideImages] = useState(false);
  const [removeLinks, setRemoveLinks] = useState(false);
  const [cursor, setCursor] = useState("default");

  useEffect(() => {
    document.documentElement.style.setProperty("--tw-text-opacity", highContrast ? "1" : "");
    document.documentElement.style.setProperty("--font-size-scale", fontSize);
    document.body.style.fontFamily = fontFamily;
    document.body.style.cursor = cursor;
    
    // Add effect for links based on removeLinks state
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      if (removeLinks) {
        link.classList.add('enhanced-link');
      } else {
        link.classList.remove('enhanced-link');
      }
    });
  }, [fontSize, fontFamily, cursor, highContrast, removeLinks]);

  

  return (
    <div className={`${darkMode ? "dark" : ""} ${highContrast ? "contrast" : ""}`}>
      <Router>
        <nav className="p-4 bg-blue-500 dark:bg-gray-800 text-white flex justify-between">
          <div className="space-x-4">
            <Link to="/">Inicio</Link>
            <Link to="/tema">Tema</Link>
            <Link to="/cv">CV</Link>
            <Link to="/contacto">Contacto</Link>
            <Link to="/accesibilidad">Accesibilidad</Link>
          </div>
        </nav>
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/tema" element={<Tema hideImages={hideImages} />} />
            <Route path="/cv" element={<CV />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route
              path="/accesibilidad"
              element={
                <Accesibilidad
                  setFontSize={setFontSize}
                  setFontFamily={setFontFamily}
                  setDarkMode={setDarkMode}
                  setHighContrast={setHighContrast}
                  setCursor={setCursor}
                  setHideImages={setHideImages}
                  setRemoveLinks={setRemoveLinks}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

const Inicio = () => <h1 className="text-xl">Bienvenido a nuestro sitio sobre eficiencia energética en edificios</h1>;

const Tema = ({ hideImages }) => (
  <div>
    <h2 className="text-lg font-bold">Eficiencia Energética en Edificios</h2>
    {!hideImages && <img src="/img/edificio.jpg" alt="Edificio eficiente" className="my-4" />}
    <p>
      La eficiencia energética es clave para el desarrollo sostenible. Al optimizar el consumo de energía en
      edificios, se reduce el impacto ambiental y se mejora la economía.
    </p>
  </div>
);

const CV = () => (
  <div>
    <h2 className="text-lg font-bold">Currículum</h2>
    <ul className="list-disc pl-5">
      <li>Estudiante de Ingeniería en Software</li>
      <li>Especialización en desarrollo web y móvil</li>
      <li>Proyectos con tecnologías IoT y visualización de datos</li>
    </ul>
  </div>
);

const Contacto = () => (
  <form
    action="https://formspree.io/f/your-form-id"
    method="POST"
    className="flex flex-col gap-4 max-w-md"
  >
    <label>
      Nombre:
      <input name="nombre" className="border p-2" required />
    </label>
    <label>
      Correo:
      <input type="email" name="correo" className="border p-2" required />
    </label>
    <label>
      Mensaje:
      <textarea name="mensaje" className="border p-2" required />
    </label>
    <button type="submit" className="bg-blue-500 text-white p-2 rounded">
      Enviar
    </button>
  </form>
);

const Accesibilidad = ({
  setFontSize,
  setFontFamily,
  setDarkMode,
  setHighContrast,
  setCursor,
  setHideImages,
  setRemoveLinks
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Opciones de Accesibilidad</h2>
      <div className="space-x-2">
        <button onClick={() => setFontSize(1)}>Normal</button>
        <button onClick={() => setFontSize(1.5)}>A+</button>
        <button onClick={() => setFontSize(2)}>A++</button>
        <button onClick={() => setFontSize(3)}>A+++</button>
      </div>
      <select onChange={(e) => setFontFamily(e.target.value)} className="border p-1">
        <option value="sans-serif">Sans-serif</option>
        <option value="serif">Serif</option>
        <option value="monospace">Monospace</option>
        <option value="'OpenDyslexic', sans-serif">OpenDyslexic</option>
      </select>
      <div>
        <button onClick={() => setDarkMode((d) => !d)} className="mr-2">
          <Moon className="inline" />/ <Sun className="inline" /> Modo Oscuro
        </button>
        <button onClick={() => setHighContrast((c) => !c)}>Alto Contraste</button>
      </div>
      <div>
        <button onClick={() => setCursor("default")} className="mr-2">
          Cursor Normal
        </button>
        <button onClick={() => setCursor("pointer")}>Cursor Grande</button>
      </div>
      <div>
        <button onClick={() => setHideImages((v) => !v)}>
          <ImageOff className="inline" /> Mostrar/Quitar imágenes
        </button>
      </div>
      <div>
        <button onClick={() => setRemoveLinks((v) => !v)}>
          <MousePointer2 className="inline" /> Quitar/Sobresaltar Links
        </button>
      </div>
    </div>
  );
};

export default App;
