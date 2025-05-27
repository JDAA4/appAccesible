import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import { Sun, Moon, ImageOff, MousePointer2 } from "lucide-react";
import "./index.css";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/tema", label: "Tema" },
  { to: "/cv", label: "CV" },
  { to: "/contacto", label: "Contacto" },
  { to: "/accesibilidad", label: "Accesibilidad" },
];

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
    <div className={`${darkMode ? "dark" : ""} ${highContrast ? "contrast" : ""} min-h-screen`}>
      <Router>
        <Header
          removeLinks={removeLinks}
          darkMode={darkMode}
          highContrast={highContrast}
        />
        <main
          className="p-4 max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg mt-6 focus:outline-none"
          tabIndex={-1}
          aria-label="Contenido principal"
        >
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
                  darkMode={darkMode}
                  highContrast={highContrast}
                  fontSize={fontSize}
                  fontFamily={fontFamily}
                  cursor={cursor}
                  hideImages={hideImages}
                  removeLinks={removeLinks}
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

function Header({ removeLinks, darkMode, highContrast }) {
  const location = useLocation();
  return (
    <header
      className={`w-full shadow-md sticky top-0 z-50 transition-colors ${
        darkMode ? "bg-gray-800" : "bg-blue-600"
      } ${highContrast ? "contrast" : ""}`}
      role="banner"
    >
      <nav
        className="flex justify-center items-center gap-2 py-3"
        aria-label="Navegación principal"
      >
        {navLinks.map(({ to, label }) =>
          removeLinks ? (
            <span
              key={to}
              className="px-4 py-2 rounded text-lg font-semibold cursor-not-allowed opacity-60 bg-gray-300 dark:bg-gray-700"
              aria-disabled="true"
              tabIndex={-1}
            >
              {label}
            </span>
          ) : (
            <Link
              key={to}
              to={to}
              className={`px-4 py-2 rounded text-lg font-semibold focus:outline-dashed focus:outline-2 focus:outline-yellow-400 transition-colors ${
                location.pathname === to
                  ? "bg-yellow-300 text-black dark:bg-yellow-500"
                  : "hover:bg-blue-700 dark:hover:bg-gray-600"
              }`}
              tabIndex={0}
            >
              {label}
            </Link>
          )
        )}
      </nav>
    </header>
  );
}

const Inicio = () => (
  <section aria-labelledby="bienvenida">
    <h1 id="bienvenida" className="text-3xl font-bold mb-4 text-blue-800 dark:text-yellow-300">
      Bienvenido a nuestro sitio sobre eficiencia energética en edificios
    </h1>
    <p className="mb-4 text-lg">
      Este sitio está dedicado a promover la eficiencia energética en el sector de la construcción. Aquí encontrarás información, consejos y recursos para optimizar el consumo energético en edificios, contribuyendo así al cuidado del medio ambiente y al ahorro económico.
    </p>
    <ul className="list-disc pl-8 mb-4 text-base space-y-1">
      <li>¿Por qué es importante la eficiencia energética?</li>
      <li>Beneficios para el medio ambiente y la economía</li>
      <li>Tecnologías y estrategias para edificios sostenibles</li>
      <li>Normativas y certificaciones energéticas</li>
    </ul>
    <div className="mb-4 p-4 bg-blue-50 dark:bg-gray-800 rounded-lg border-l-4 border-blue-400 dark:border-yellow-400">
      <strong>¿Sabías que...?</strong> Mejorar la eficiencia energética puede reducir hasta un 40% el consumo de energía en edificios, ayudando a combatir el cambio climático y ahorrar dinero.
    </div>
    <p className="text-base">
      Explora las diferentes secciones del sitio para aprender más y descubrir cómo puedes hacer tu edificio más eficiente.
    </p>
  </section>
);

const Tema = ({ hideImages }) => (
  <section aria-labelledby="tema">
    <h2 id="tema" className="text-2xl font-bold mb-4 text-blue-700 dark:text-yellow-200">
      Eficiencia Energética en Edificios
    </h2>
    <div className="flex flex-col items-center mb-4">
      {hideImages ? (
        <img
          src="broken"
          alt="Edificio eficiente"
          className="my-4 w-64 h-40 object-cover border-2 border-dashed border-gray-400 bg-gray-100"
        />
      ) : (
        <img
          src="/minion.jpeg"
          alt="Edificio eficiente"
          className="my-4 w-64 h-40 object-cover rounded shadow-lg"
        />
      )}
      <span className="sr-only">Imagen de un edificio eficiente</span>
    </div>
    <p className="text-lg">
      La eficiencia energética es clave para el desarrollo sostenible. Al optimizar el consumo de energía en edificios, se reduce el impacto ambiental y se mejora la economía.
    </p>
  </section>
);

const CV = () => (
  <section aria-labelledby="cv">
    <h2 id="cv" className="text-2xl font-bold mb-4 text-blue-700 dark:text-yellow-200">Currículum</h2>
    <ul className="list-disc pl-8 text-base space-y-1">
      <li>Estudiante de Ingeniería en Software</li>
      <li>Especialización en desarrollo web y móvil</li>
      <li>Proyectos con tecnologías IoT y visualización de datos</li>
    </ul>
  </section>
);

const Contacto = () => (
  <section aria-labelledby="contacto">
    <h2 id="contacto" className="text-2xl font-bold mb-4 text-blue-700 dark:text-yellow-200">Contacto</h2>
    <form
      action="https://formspree.io/f/your-form-id"
      method="POST"
      className="flex flex-col gap-4 max-w-md mx-auto bg-blue-50 dark:bg-gray-800 p-6 rounded-lg shadow"
      aria-label="Formulario de contacto"
    >
      <label className="flex flex-col text-base font-semibold">
        Nombre:
        <input name="nombre" className="border p-2 rounded focus:outline-blue-400" required aria-required="true" />
      </label>
      <label className="flex flex-col text-base font-semibold">
        Correo:
        <input type="email" name="correo" className="border p-2 rounded focus:outline-blue-400" required aria-required="true" />
      </label>
      <label className="flex flex-col text-base font-semibold">
        Mensaje:
        <textarea name="mensaje" className="border p-2 rounded focus:outline-blue-400" required aria-required="true" />
      </label>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white dark:text-black font-bold p-2 rounded focus:outline-dashed focus:outline-2 focus:outline-yellow-400"
      >
        Enviar
      </button>
    </form>
  </section>
);

const Accesibilidad = ({
  setFontSize,
  setFontFamily,
  setDarkMode,
  setHighContrast,
  setCursor,
  setHideImages,
  setRemoveLinks,
  darkMode,
  highContrast,
  fontSize,
  fontFamily,
  cursor,
  hideImages,
  removeLinks,
}) => {
  return (
    <section aria-labelledby="accesibilidad">
      <h2 id="accesibilidad" className="text-2xl font-bold mb-4 text-blue-700 dark:text-yellow-200">Opciones de Accesibilidad</h2>
      <div className="flex flex-wrap gap-4 mb-4">
        <div>
          <span className="block font-semibold mb-1">Tamaño de fuente:</span>
          <div className="flex gap-2">
            <button onClick={() => setFontSize(1)} className={`btn-accesibilidad ${fontSize === 1 ? "ring-2 ring-blue-400" : ""}`}>Normal</button>
            <button onClick={() => setFontSize(1.5)} className={`btn-accesibilidad ${fontSize === 1.5 ? "ring-2 ring-blue-400" : ""}`}>A+</button>
            <button onClick={() => setFontSize(2)} className={`btn-accesibilidad ${fontSize === 2 ? "ring-2 ring-blue-400" : ""}`}>A++</button>
            <button onClick={() => setFontSize(3)} className={`btn-accesibilidad ${fontSize === 3 ? "ring-2 ring-blue-400" : ""}`}>A+++</button>
          </div>
        </div>
        <div>
          <span className="block font-semibold mb-1">Fuente:</span>
          <select
            onChange={(e) => setFontFamily(e.target.value)}
            className="border p-1 rounded focus:outline-blue-400"
            value={fontFamily}
            aria-label="Seleccionar fuente"
          >
            <option value="sans-serif">Sans-serif</option>
            <option value="serif">Serif</option>
            <option value="monospace">Monospace</option>
            <option value="'OpenDyslexic', sans-serif">OpenDyslexic</option>
          </select>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mb-4">
        <button
          onClick={() => setDarkMode((d) => !d)}
          className={`btn-accesibilidad flex items-center gap-1 ${darkMode ? "ring-2 ring-yellow-400" : ""}`}
          aria-pressed={darkMode}
        >
          <Moon className="inline" />/<Sun className="inline" /> Modo Oscuro
        </button>
        <button
          onClick={() => setHighContrast((c) => !c)}
          className={`btn-accesibilidad ${highContrast ? "ring-2 ring-yellow-400" : ""}`}
          aria-pressed={highContrast}
        >
          Alto Contraste
        </button>
        <button
          onClick={() => setCursor("default")}
          className={`btn-accesibilidad ${cursor === "default" ? "ring-2 ring-blue-400" : ""}`}
        >
          Cursor Normal
        </button>
        <button
          onClick={() => setCursor("pointer")}
          className={`btn-accesibilidad ${cursor === "pointer" ? "ring-2 ring-blue-400" : ""}`}
        >
          Cursor Grande
        </button>
        <button
          onClick={() => setHideImages((v) => !v)}
          className={`btn-accesibilidad flex items-center gap-1 ${hideImages ? "ring-2 ring-blue-400" : ""}`}
          aria-pressed={hideImages}
        >
          <ImageOff className="inline" /> Mostrar/Quitar imágenes
        </button>
        <button
          onClick={() => setRemoveLinks((v) => !v)}
          className={`btn-accesibilidad flex items-center gap-1 ${removeLinks ? "ring-2 ring-blue-400" : ""}`}
          aria-pressed={removeLinks}
        >
          <MousePointer2 className="inline" /> Quitar/Sobresaltar Links
        </button>
      </div>
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        <p>
          <strong>Consejo:</strong> Usa las opciones de accesibilidad para adaptar la experiencia a tus necesidades.
        </p>
      </div>
    </section>
  );
};

function Footer() {
  return (
    <footer className="w-full mt-8 py-4 text-center text-sm bg-blue-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-t-lg" role="contentinfo">
      <span>
        &copy; {new Date().getFullYear()} Eficiencia Energética en Edificios. Desarrollado para accesibilidad.
      </span>
    </footer>
  );
}

export default App;