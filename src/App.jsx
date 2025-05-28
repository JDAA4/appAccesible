import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import { Sun, Moon, ImageOff, MousePointer2 } from "lucide-react";
import emailjs from '@emailjs/browser';
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
  const [highlightLinks, setHighlightLinks] = useState(false);

  // Función para aplicar estilos a los enlaces
  const applyLinkStyles = () => {
    setTimeout(() => {
      const links = document.querySelectorAll('a');
      links.forEach(link => {
        if (highlightLinks) {
          link.classList.add('enhanced-link');
        } else {
          link.classList.remove('enhanced-link');
        }
      });
    }, 100); // Pequeño delay para asegurar que el DOM se ha actualizado
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    if (highContrast) {
      document.body.classList.add('contrast');
    } else {
      document.body.classList.remove('contrast');
    }
    
    document.documentElement.style.setProperty("--font-size-scale", fontSize);
    document.body.style.fontFamily = fontFamily;

    applyLinkStyles();
  }, [fontSize, fontFamily, highContrast, highlightLinks, darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Router>
        <AppContent 
          highlightLinks={highlightLinks}
          darkMode={darkMode}
          highContrast={highContrast}
          hideImages={hideImages}
          setFontSize={setFontSize}
          setFontFamily={setFontFamily}
          setDarkMode={setDarkMode}
          setHighContrast={setHighContrast}
          setHideImages={setHideImages}
          setHighlightLinks={setHighlightLinks}
          fontSize={fontSize}
          fontFamily={fontFamily}
          applyLinkStyles={applyLinkStyles}
        />
      </Router>
    </div>
  );
};

// Componente separado para manejar el useLocation
const AppContent = ({ 
  highlightLinks, 
  darkMode, 
  highContrast, 
  hideImages, 
  setFontSize, 
  setFontFamily, 
  setDarkMode, 
  setHighContrast, 
  setHideImages, 
  setHighlightLinks, 
  fontSize, 
  fontFamily,
  applyLinkStyles 
}) => {
  const location = useLocation();

  // Aplicar estilos cuando cambie la ruta
  useEffect(() => {
    applyLinkStyles();
  }, [location.pathname, highlightLinks]);

  return (
    <>
      <Header
        highlightLinks={highlightLinks}
        darkMode={darkMode}
        highContrast={highContrast}
      />
      <main
        className="p-4 max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-6 focus:outline-none"
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
                setHideImages={setHideImages}
                setHighlightLinks={setHighlightLinks}
                darkMode={darkMode}
                highContrast={highContrast}
                fontSize={fontSize}
                fontFamily={fontFamily}
                hideImages={hideImages}
                highlightLinks={highlightLinks}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

function Header({ highlightLinks, darkMode, highContrast }) {
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
        {navLinks.map(({ to, label }) => (
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
        ))}
      </nav>
    </header>
  );
};

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
          className="my-4 w-120 h-100 object-cover rounded shadow-lg"
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
      <li><a href="https://github.com/JDAA4">Mi Github</a></li>
    </ul>
  </section>
);

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    mensaje: '',
    honeypot: '', // Campo oculto para detectar bots
    captcha: '' // Campo para captcha simple
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  
  // Estados para protecciones adicionales
  const [startTime, setStartTime] = useState(null);
  const [submitAttempts, setSubmitAttempts] = useState(0);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [captchaQuestion, setCaptchaQuestion] = useState({ 
    question: '¿Cuánto es 2 + 2?', 
    answer: 4 
  });
  const [interactions, setInteractions] = useState({
    keystrokes: 0,
    mouseMoves: 0,
    fieldFocuses: 0,
    timeOnFields: {}
  });

  const generateCaptcha = () => {
    const operations = [
      { q: '¿Cuántos días tiene una semana?', a: 7 },
      { q: '¿Cuántos meses tiene un año?', a: 12 },
      { q: '¿Cuántas horas tiene un día?', a: 24 },
      { q: '¿Cuántos minutos tiene una hora?', a: 60 },
      { q: '¿Cuánto es 2 + 2?', a: 4 },
      { q: '¿Cuánto es 5 + 3?', a: 8 },
      { q: '¿Cuánto es 10 - 3?', a: 7 },
      { q: '¿Cuántos ojos tiene una persona?', a: 2 },
      { q: '¿Cuántas patas tiene un gato?', a: 4 },
      { q: '¿Cuántas letras tiene la palabra "casa"?', a: 4 },
      { q: '¿Cuánto es 3 + 5?', a: 8 },
      { q: '¿Cuánto es 9 - 4?', a: 5 },
      { q: '¿Cuántas ruedas tiene un coche?', a: 4 },
      { q: '¿Cuántos dedos tiene una mano?', a: 5 }
    ];
    
    const randomQuestion = operations[Math.floor(Math.random() * operations.length)];
    setCaptchaQuestion(randomQuestion);
    
    // Limpiar la respuesta anterior cuando se genera nueva pregunta
    setFormData(prev => ({ ...prev, captcha: '' }));
    
    // Limpiar error de captcha si existe
    if (errors.captcha) {
      setErrors(prev => ({ ...prev, captcha: null }));
    }
  };

  // Inicializar EmailJS
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  // Inicializar protecciones al cargar el componente
  useEffect(() => {
    setStartTime(Date.now());
    generateCaptcha();
    
    // Recuperar intentos previos del localStorage
    const savedAttempts = localStorage.getItem('contactFormAttempts');
    const savedLastSubmit = localStorage.getItem('lastSubmitTime');
    
    if (savedAttempts) {
      const attempts = parseInt(savedAttempts);
      if (!isNaN(attempts)) {
        setSubmitAttempts(attempts);
      }
    }
    if (savedLastSubmit) {
      const lastSubmit = parseInt(savedLastSubmit);
      if (!isNaN(lastSubmit)) {
        setLastSubmitTime(lastSubmit);
      }
    }

    // Detectores de comportamiento
    const handleKeyDown = () => {
      setInteractions(prev => ({ ...prev, keystrokes: prev.keystrokes + 1 }));
    };

    const handleMouseMove = () => {
      setInteractions(prev => ({ ...prev, mouseMoves: prev.mouseMoves + 1 }));
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  // Validaciones existentes...
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9]([a-zA-Z0-9._-])*[a-zA-Z0-9]@[a-zA-Z0-9]([a-zA-Z0-9.-])*\.[a-zA-Z]{2,}$/;
    
    if (!email) {
      return 'El correo electrónico es obligatorio';
    }
    
    if (email.length > 100) {
      return 'El correo electrónico es demasiado largo';
    }
    
    if (!emailRegex.test(email)) {
      return 'Por favor, ingresa un correo electrónico válido (ejemplo: usuario@dominio.com)';
    }
    
    const dangerousChars = /<|>|javascript:|data:|vbscript:|on\w+=/i;
    if (dangerousChars.test(email)) {
      return 'El correo electrónico contiene caracteres no permitidos';
    }
    
    return null;
  };

  const validateName = (name) => {
    if (!name) {
      return 'El nombre es obligatorio';
    }
    
    if (name.length < 2) {
      return 'El nombre debe tener al menos 2 caracteres';
    }
    
    if (name.length > 100) {
      return 'El nombre es demasiado largo';
    }
    
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/;
    if (!nameRegex.test(name)) {
      return 'El nombre solo puede contener letras, espacios, acentos y guiones';
    }
    
    const dangerousChars = /<|>|javascript:|data:|vbscript:|on\w+=/i;
    if (dangerousChars.test(name)) {
      return 'El nombre contiene caracteres no permitidos';
    }
    
    return null;
  };

  const validateMessage = (message) => {
    if (!message) {
      return 'El mensaje es obligatorio';
    }
    
    if (message.length < 10) {
      return 'El mensaje debe tener al menos 10 caracteres';
    }
    
    if (message.length > 1000) {
      return 'El mensaje es demasiado largo (máximo 1000 caracteres)';
    }
    
    const maliciousPatterns = [
      /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
      /<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi,
      /javascript:/gi,
      /data:text\/html/gi,
      /vbscript:/gi,
      /on\w+\s*=/gi,
      /<embed[\s\S]*?>/gi,
      /<object[\s\S]*?>/gi,
      /<form[\s\S]*?>/gi,
      /<input[\s\S]*?>/gi,
      /document\.(write|cookie|location)/gi,
      /window\.(open|location)/gi,
      /eval\s*\(/gi,
      /alert\s*\(/gi,
      /confirm\s*\(/gi,
      /prompt\s*\(/gi,
    ];
    
    for (const pattern of maliciousPatterns) {
      if (pattern.test(message)) {
        return 'El mensaje contiene contenido no permitido. Por favor, utiliza solo texto normal.';
      }
    }
    
    const urlPattern = /(https?:\/\/|www\.|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/g;
    const urls = message.match(urlPattern);
    if (urls && urls.length > 3) {
      return 'El mensaje contiene demasiados enlaces. Máximo 3 enlaces permitidos.';
    }
    
    const words = message.toLowerCase().split(/\s+/);
    const wordCount = {};
    for (const word of words) {
      if (word.length > 2) {
        wordCount[word] = (wordCount[word] || 0) + 1;
        if (wordCount[word] > 10) {
          return 'El mensaje parece contener spam. Por favor, evita repetir excesivamente las mismas palabras.';
        }
      }
    }
    
    return null;
  };

  // Nuevas validaciones de seguridad
  const validateCaptcha = () => {
    const userAnswer = parseInt(formData.captcha);
    
    if (!formData.captcha || formData.captcha.trim() === '') {
      return 'La verificación es obligatoria';
    }
    
    if (isNaN(userAnswer)) {
      return 'Por favor, ingresa un número válido';
    }
    
    if (userAnswer !== captchaQuestion.answer) {
      return 'Respuesta incorrecta. Por favor, verifica tu respuesta.';
    }
    
    return null;
  };

  const validateHoneypot = () => {
    if (formData.honeypot !== '') {
      return 'Detección de bot. Formulario bloqueado.';
    }
    return null;
  };

  const validateTiming = () => {
    const currentTime = Date.now();
    const timeSpent = currentTime - startTime;
    
    // Muy rápido (menos de 5 segundos) = posible bot
    if (timeSpent < 5000) {
      return 'Formulario enviado demasiado rápido. Por favor, tómate tu tiempo.';
    }
    
    // Demasiado lento (más de 30 minutos) = posible sesión expirada
    if (timeSpent > 1800000) {
      return 'Sesión expirada. Por favor, recarga la página e intenta de nuevo.';
    }
    
    return null;
  };

  const validateRateLimit = () => {
    const currentTime = Date.now();
    const timeSinceLastSubmit = currentTime - lastSubmitTime;
    
    // No permitir más de 3 intentos en 10 minutos
    if (submitAttempts >= 3 && timeSinceLastSubmit < 600000) {
      return 'Demasiados intentos. Por favor, espera 10 minutos antes de intentar de nuevo.';
    }
    
    // No permitir envíos muy frecuentes (menos de 30 segundos)
    if (timeSinceLastSubmit < 30000 && lastSubmitTime > 0) {
      return 'Por favor, espera al menos 30 segundos entre envíos.';
    }
    
    return null;
  };

  const validateBehavior = () => {
    // Verificar actividad humana mínima
    if (interactions.keystrokes < 10) {
      return 'Actividad sospechosa detectada. Por favor, interactúa normalmente con el formulario.';
    }
    
    if (interactions.mouseMoves < 5) {
      return 'Actividad sospechosa detectada. Por favor, usa el ratón normalmente.';
    }
    
    if (interactions.fieldFocuses < 3) {
      return 'Por favor, completa todos los campos del formulario.';
    }
    
    return null;
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validaciones existentes
    const nameError = validateName(formData.nombre.trim());
    if (nameError) newErrors.nombre = nameError;
    
    const emailError = validateEmail(formData.correo.trim());
    if (emailError) newErrors.correo = emailError;
    
    const messageError = validateMessage(formData.mensaje.trim());
    if (messageError) newErrors.mensaje = messageError;
    
    // Nuevas validaciones de seguridad
    const honeypotError = validateHoneypot();
    if (honeypotError) newErrors.security = honeypotError;
    
    const captchaError = validateCaptcha();
    if (captchaError) newErrors.captcha = captchaError;
    
    const timingError = validateTiming();
    if (timingError) newErrors.security = timingError;
    
    const rateLimitError = validateRateLimit();
    if (rateLimitError) newErrors.security = rateLimitError;
    
    const behaviorError = validateBehavior();
    if (behaviorError) newErrors.security = behaviorError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleFocus = (fieldName) => {
    setInteractions(prev => ({
      ...prev,
      fieldFocuses: prev.fieldFocuses + 1,
      timeOnFields: {
        ...prev.timeOnFields,
        [fieldName]: Date.now()
      }
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    
    // Registrar tiempo en el campo
    const timeOnField = Date.now() - (interactions.timeOnFields[name] || Date.now());
    if (timeOnField > 1000) { // Al menos 1 segundo en el campo
      setInteractions(prev => ({
        ...prev,
        timeOnFields: {
          ...prev.timeOnFields,
          [name]: timeOnField
        }
      }));
    }
    
    // Validar el campo cuando pierde el foco
    let error = null;
    switch (name) {
      case 'nombre':
        error = validateName(trimmedValue);
        break;
      case 'correo':
        error = validateEmail(trimmedValue);
        break;
      case 'mensaje':
        error = validateMessage(trimmedValue);
        break;
    }
    
    if (error) {
      setErrors({
        ...errors,
        [name]: error
      });
    }
  };

  const sanitizeInput = (input) => {
    return input
      .replace(/<[^>]*>/g, '')
      .replace(/javascript:/gi, '')
      .replace(/data:/gi, '')
      .replace(/vbscript:/gi, '')
      .trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Por favor, corrige los errores en el formulario antes de enviarlo.' 
      });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Sanitizar datos antes del envío
      const sanitizedData = {
        nombre: sanitizeInput(formData.nombre),
        correo: sanitizeInput(formData.correo),
        mensaje: sanitizeInput(formData.mensaje)
      };

      const templateParams = {
        to_name: 'José Aguilar',
        from_name: sanitizedData.nombre,
        from_email: sanitizedData.correo,
        message: sanitizedData.mensaje,
        reply_to: sanitizedData.correo,
        timestamp: new Date().toLocaleString('es-MX'),
        security_info: `Tiempo en formulario: ${Math.round((Date.now() - startTime) / 1000)}s, Interacciones: ${interactions.keystrokes} teclas, ${interactions.mouseMoves} movimientos de ratón`
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      // Actualizar estadísticas de envío
      const currentTime = Date.now();
      const newAttempts = submitAttempts + 1;
      
      setSubmitAttempts(newAttempts);
      setLastSubmitTime(currentTime);
      
      localStorage.setItem('contactFormAttempts', newAttempts.toString());
      localStorage.setItem('lastSubmitTime', currentTime.toString());

      setSubmitStatus({ 
        type: 'success', 
        message: '¡Mensaje enviado correctamente! Te responderemos pronto.' 
      });
      
      // Resetear formulario y generar nuevo captcha
      setFormData({ nombre: '', correo: '', mensaje: '', honeypot: '', captcha: '' });
      setErrors({});
      generateCaptcha();
      setStartTime(Date.now());
      setInteractions({ keystrokes: 0, mouseMoves: 0, fieldFocuses: 0, timeOnFields: {} });
      
    } catch (error) {
      console.error('Error al enviar el email:', error);
      
      // Incrementar intentos fallidos
      const newAttempts = submitAttempts + 1;
      setSubmitAttempts(newAttempts);
      localStorage.setItem('contactFormAttempts', newAttempts.toString());
      
      setSubmitStatus({ 
        type: 'error', 
        message: 'Error al enviar el mensaje. Por favor, intenta de nuevo más tarde.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return formData.nombre.trim() && 
           formData.correo.trim() && 
           formData.mensaje.trim() && 
           formData.captcha.trim() &&
           Object.keys(errors).every(key => !errors[key]);
  };

  return (
    <section aria-labelledby="contacto">
      <h2 id="contacto" className="text-2xl font-bold mb-4 text-blue-700 dark:text-yellow-200">
        Contacto
      </h2>
      
      <div className="mb-6 p-4 bg-blue-50 dark:bg-gray-800 rounded-lg border-l-4 border-blue-400 dark:border-yellow-400">
        <p className="text-base">
          ¿Tienes preguntas sobre eficiencia energética en edificios? ¡Contáctanos! Te responderemos lo antes posible.
        </p>
      </div>
      
      {/* Mostrar advertencias de rate limiting */}
      {submitAttempts >= 2 && (
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg text-yellow-800 text-sm">
          <strong>Advertencia:</strong> Has realizado {submitAttempts} intentos de envío. 
          {submitAttempts >= 3 && ' Límite alcanzado. Espera 10 minutos antes del próximo intento.'}
        </div>
      )}
      
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md mx-auto bg-blue-50 dark:bg-gray-800 p-6 rounded-lg shadow"
        aria-label="Formulario de contacto"
        noValidate
      >
        {/* Campo Honeypot (oculto) */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          style={{ display: 'none' }}
          tabIndex="-1"
          autoComplete="off"
        />
        
        {/* Campo Nombre */}
        <div className="flex flex-col">
          <label htmlFor="nombre" className="text-base font-semibold mb-1">
            Nombre: <span className="text-red-600">*</span>
          </label>
          <input 
            id="nombre"
            name="nombre" 
            type="text"
            value={formData.nombre}
            onChange={handleChange}
            onFocus={() => handleFocus('nombre')}
            onBlur={handleBlur}
            className={`border p-2 rounded focus:outline-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors.nombre ? 'border-red-500 focus:outline-red-400' : ''
            }`}
            required 
            aria-required="true"
            aria-describedby={errors.nombre ? "nombre-error" : undefined}
            disabled={isSubmitting}
            maxLength="100"
            placeholder="Tu nombre"
            autoComplete="name"
          />
          {errors.nombre && (
            <span id="nombre-error" className="text-red-600 text-sm mt-1" role="alert">
              {errors.nombre}
            </span>
          )}
        </div>
        
        {/* Campo Email */}
        <div className="flex flex-col">
          <label htmlFor="correo" className="text-base font-semibold mb-1">
            Correo electrónico: <span className="text-red-600">*</span>
          </label>
          <input 
            id="correo"
            type="email" 
            name="correo" 
            value={formData.correo}
            onChange={handleChange}
            onFocus={() => handleFocus('correo')}
            onBlur={handleBlur}
            className={`border p-2 rounded focus:outline-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors.correo ? 'border-red-500 focus:outline-red-400' : ''
            }`}
            required 
            aria-required="true"
            aria-describedby={errors.correo ? "correo-error" : undefined}
            disabled={isSubmitting}
            maxLength="100"
            placeholder="usuario@ejemplo.com"
            autoComplete="email"
          />
          {errors.correo && (
            <span id="correo-error" className="text-red-600 text-sm mt-1" role="alert">
              {errors.correo}
            </span>
          )}
        </div>
        
        {/* Campo Mensaje */}
        <div className="flex flex-col">
          <label htmlFor="mensaje" className="text-base font-semibold mb-1">
            Mensaje: <span className="text-red-600">*</span>
          </label>
          <textarea 
            id="mensaje"
            name="mensaje" 
            value={formData.mensaje}
            onChange={handleChange}
            onFocus={() => handleFocus('mensaje')}
            onBlur={handleBlur}
            className={`border p-2 rounded focus:outline-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors.mensaje ? 'border-red-500 focus:outline-red-400' : ''
            }`}
            rows="5"
            required 
            aria-required="true"
            aria-describedby={errors.mensaje ? "mensaje-error" : "mensaje-help"}
            disabled={isSubmitting}
            maxLength="1000"
            placeholder="Escribe tu mensaje sobre eficiencia energética, consultas técnicas, colaboraciones, etc."
          />
          <div className="flex justify-between items-center mt-1">
            <span 
              id="mensaje-help" 
              className={`text-xs ${
                formData.mensaje.length > 900 ? 'text-yellow-600' : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {formData.mensaje.length}/1000 caracteres
            </span>
          </div>
          {errors.mensaje && (
            <span id="mensaje-error" className="text-red-600 text-sm mt-1" role="alert">
              {errors.mensaje}
            </span>
          )}
        </div>

        {/* Campo Captcha */}
        <div className="flex flex-col">
          <label htmlFor="captcha" className="text-base font-semibold mb-1">
            Verificación: <span className="text-red-600">*</span>
          </label>
          <div className="mb-2 p-3 bg-gray-100 dark:bg-gray-700 rounded border">
            <p className="text-sm font-medium">{captchaQuestion.question}</p>
          </div>
          <input 
            id="captcha"
            name="captcha" 
            type="number"
            value={formData.captcha}
            onChange={handleChange}
            onFocus={() => handleFocus('captcha')}
            className={`border p-2 rounded focus:outline-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors.captcha ? 'border-red-500 focus:outline-red-400' : ''
            }`}
            required 
            aria-required="true"
            aria-describedby={errors.captcha ? "captcha-error" : "captcha-help"}
            disabled={isSubmitting}
            placeholder="Escribe tu respuesta aquí"
          />
          <span id="captcha-help" className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Esta pregunta nos ayuda a verificar que eres una persona real
          </span>
          {errors.captcha && (
            <span id="captcha-error" className="text-red-600 text-sm mt-1" role="alert">
              {errors.captcha}
            </span>
          )}
          <button
            type="button"
            onClick={generateCaptcha}
            className="mt-2 text-xs text-blue-600 dark:text-yellow-400 hover:underline self-start"
            disabled={isSubmitting}
          >
            Generar nueva pregunta
          </button>
        </div>
        
        {/* Mostrar errores de seguridad */}
        {errors.security && (
          <div className="p-3 bg-red-100 border border-red-300 rounded-lg text-red-800 text-sm" role="alert">
            <strong>Error de seguridad:</strong> {errors.security}
          </div>
        )}
        
        {/* Botón de Envío */}
        <button
          type="submit"
          disabled={isSubmitting || !isFormValid() || submitAttempts >= 3}
          className={`font-bold p-3 rounded focus:outline-dashed focus:outline-2 focus:outline-yellow-400 transition-colors ${
            isSubmitting || !isFormValid() || submitAttempts >= 3
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-700 dark:bg-yellow-500 dark:hover:bg-yellow-600"
          } text-white dark:text-black`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Enviando...
            </span>
          ) : submitAttempts >= 3 ? (
            'Límite de intentos alcanzado'
          ) : (
            'Enviar mensaje'
          )}
        </button>
        
        {/* Status de Envío */}
        {submitStatus && (
          <div 
            className={`p-4 rounded-lg text-center font-semibold ${
              submitStatus.type === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-200 dark:bg-green-900 dark:text-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200 dark:bg-red-900 dark:text-red-200'
            }`}
            role="alert"
            aria-live="polite"
          >
            {submitStatus.message}
          </div>
        )}
        
        {/* Información de debug en desarrollo */}
        {import.meta.env.MODE === 'development' && (
          <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-xs">
            <strong>Debug info:</strong>
            <br />• Tiempo en formulario: {Math.round((Date.now() - (startTime || Date.now())) / 1000)}s
            <br />• Teclas presionadas: {interactions.keystrokes}
            <br />• Movimientos de ratón: {interactions.mouseMoves}
            <br />• Campos enfocados: {interactions.fieldFocuses}
            <br />• Intentos de envío: {submitAttempts}
          </div>
        )}
      </form>
      
      {/* Información de Contacto Directo */}
      <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>
          También puedes contactarme directamente en: 
          <a 
            href="mailto:jaguilar51@ucol.mx" 
            className="text-blue-600 dark:text-yellow-400 hover:underline ml-1"
          >
            jaguilar51@ucol.mx
          </a>
        </p>
      </div>
    </section>
  );
};

const Accesibilidad = ({
  setFontSize,
  setFontFamily,
  setDarkMode,
  setHighContrast,
  setHideImages,
  setHighlightLinks,
  darkMode,
  highContrast,
  fontSize,
  fontFamily,
  hideImages,
  highlightLinks,
}) => {
  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 0.2, 1.6)); 
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 0.1, 0.7)); 
  };

  const resetFontSize = () => {
    setFontSize(1);
  };

  const getFontLevel = () => {
    if (fontSize > 1) {
      // Para incrementos (0.2 cada nivel)
      return Math.round((fontSize - 1) / 0.2);
    } else {
      // Para decrementos (0.1 cada nivel)
      return Math.round((fontSize - 1) / 0.1);
    }
  };

  return (
    <section aria-labelledby="accesibilidad">
      <h2 id="accesibilidad" className="text-2xl font-bold mb-4 text-blue-700 dark:text-yellow-200">Opciones de Accesibilidad</h2>
      <div className="flex flex-wrap gap-4 mb-4">
        <div>
          <span className="block font-semibold mb-1">Tamaño de fuente:</span>
          <div className="flex gap-2">
            <button 
              onClick={decreaseFontSize} 
              className="btn-accesibilidad"
              disabled={fontSize <= 0.7}
              aria-label="Disminuir tamaño de fuente"
            >
              A-
            </button>
            <button 
              onClick={resetFontSize} 
              className={`btn-accesibilidad ${fontSize === 1 ? "ring-2 ring-blue-400" : ""}`}
              aria-label="Tamaño normal de fuente"
            >
              Normal
            </button>
            <button 
              onClick={increaseFontSize} 
              className="btn-accesibilidad"
              disabled={fontSize >= 1.6}
              aria-label="Aumentar tamaño de fuente"
            >
              A+
            </button>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
            Nivel: {getFontLevel()}
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
          </select>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mb-4">
        <button
          onClick={() => setDarkMode((d) => !d)}
          className={`btn-accesibilidad flex items-center gap-1 ${darkMode ? "ring-2 ring-yellow-400" : ""}`}
          aria-pressed={darkMode}
        >
          <Moon className="inline" />/<Sun className="inline" /> 
        </button>
        <button
          onClick={() => setHighContrast((c) => !c)}
          className={`btn-accesibilidad ${highContrast ? "ring-2 ring-yellow-400" : ""}`}
          aria-pressed={highContrast}
        >
          Alto Contraste
        </button>
        <button
          onClick={() => setHideImages((v) => !v)}
          className={`btn-accesibilidad flex items-center gap-1 ${
            hideImages 
              ? "bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 ring-2 ring-red-400" 
              : ""
          }`}
          aria-pressed={hideImages}
        >
          <ImageOff className="inline" /> {hideImages ? "Mostrar imágenes" : "Quitar imágenes"}
        </button>
        <button
          onClick={() => setHighlightLinks((v) => !v)}
          className={`btn-accesibilidad flex items-center gap-1 ${
            highlightLinks 
              ? "bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 ring-2 ring-orange-400" 
              : ""
          }`}
          aria-pressed={highlightLinks}
        >
          <MousePointer2 className="inline" /> {highlightLinks ? "Quitar resaltado" : "Resaltar links"}
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