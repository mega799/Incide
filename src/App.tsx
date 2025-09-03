import React, { useState } from "react";

// 🟦️ Datos de ayuda corta para cada herramienta clave (puedes agregar/editar explicaciones)
const AYUDAS = {
  'Big Question': 'La Big Question es la gran pregunta que guía tu proyecto. Debe ser clara, interesante, y ayudarte a investigar o resolver algo importante.',
  'Charter': 'El Project Charter es un documento donde el equipo acuerda qué va a hacer, para qué, cómo, y quién hace qué. ¡Es como el acta de nacimiento del proyecto!',
  'Interdependencia Positiva': 'Trabajar en equipo no es solo dividir tareas, sino organizarse para que todos nos ayudemos y el éxito de uno beneficie a todos.',
  'Alcance': 'Definir el alcance es decidir y dejar claro qué incluye y qué no incluye el proyecto, así todos saben cuáles son los límites.',
  'WBS y RACI': "La WBS es una lista organizada de tareas (como un árbol), y la matriz RACI ayuda a saber quién es responsable de cada tarea. Así el trabajo es claro y justo.",
  'Cronograma y Gantt': 'El cronograma es una lista de fechas y tiempos para las tareas. El Diagrama de Gantt es una gráfica donde se ve cuándo empieza y termina cada tarea. ¡Te ayuda a no olvidar nada!',
  'Planes de Soporte': 'Son planes para asegurar la calidad, la forma de comunicación, los riesgos y los recursos del proyecto. ¡Ayudan a que el proyecto salga bien!',
  'Bitácora': 'Una bitácora es un cuaderno o archivo donde anotas lo que sucede y los avances del proyecto, para no olvidar ningún detalle.',
  // ...agrega más si lo deseas para cada criterio
};


// 🏗️ RÚBRICA EXTENDIDA: INICIO y PLANEACIÓN (puedes anidar EJECUCIÓN, MONITOREO, CIERRE después)
const RUBRICA = [
  {
    fase: "INICIO",
    color: "#fef08a",
    objetivo: "Alinear expectativas, autorizar el proyecto y definir el propósito educativo.",
    criterios: [
      {
        id: "1.1",
        nombre: "Claridad del Propósito y Big Question",
        ayuda: AYUDAS['Big Question'],
        descripcion: "¿Qué tan clara, retadora y conectada con el contexto es la pregunta guía del proyecto?",
        niveles: [
          { etiqueta: "Inicial", queHacer: "Intentar definir el problema pero sin claridad.", indicador: "La pregunta es cerrada, confusa o desconectada del contexto real.", evidencia: "Borrador de pregunta." },
          { etiqueta: "Básico", queHacer: "Identificar un problema general relacionado con el contexto.", indicador: "Pregunta general sin conexión clara con aprendizajes específicos.", evidencia: "Pregunta escrita con justificación básica." },
          { etiqueta: "Avanzado", queHacer: "Formular pregunta abierta, retadora y bien contextualizada.", indicador: "Pregunta clara, vinculada a aprendizajes y al contexto.", evidencia: "Pregunta + contexto + conexión curricular." },
          { etiqueta: "Experto", queHacer: "Crear pregunta innovadora que conecte múltiples áreas del conocimiento.", indicador: "Pregunta sólida, auténtica, conectada a aprendizajes clave y contexto real.", evidencia: "Pregunta + análisis de relevancia + impacto proyectado." }
        ],
        sel: ["INNER: Conexión personal con la pregunta", "OUTER: Relevancia social/ambiental"],
        checklist: [
          "¿Es una pregunta abierta?",
          "¿Genera curiosidad genuina?",
          "¿Conecta con problemas reales?",
          "¿Permite investigación?",
          "¿Es apropiada para el nivel?"
        ]
      },
      {
        id: "1.2",
        nombre: "Project Charter Escolar",
        ayuda: AYUDAS['Charter'],
        descripcion: "¿Tienen un acuerdo claro de lo que harán y cómo? ¿Repartieron tareas y funciones entre todos?",
        niveles: [
          { etiqueta: "Inicial", queHacer: "Llenar plantilla básica sin profundizar.", indicador: "Charter incompleto o con información vaga.", evidencia: "Plantilla parcialmente llena." },
          { etiqueta: "Básico", queHacer: "Completar charter con información general.", indicador: "Charter con elementos básicos pero sin integración.", evidencia: "Charter básico completo." },
          { etiqueta: "Avanzado", queHacer: "Desarrollar charter detallado con todos los componentes.", indicador: "Charter completo con objetivos, alcance, recursos y criterios claros.", evidencia: "Charter + presentación a stakeholders." },
          { etiqueta: "Experto", queHacer: "Crear charter integral con análisis de stakeholders.", indicador: "Charter exhaustivo con análisis de riesgos, beneficios y plan de comunicación.", evidencia: "Charter + validación formal + acuerdos documentados." }
        ],
        sel: [],
        checklist: []
      },
      {
        id: "1.3",
        nombre: "Interdependencia Positiva (Johnson & Johnson)",
        ayuda: AYUDAS['Interdependencia Positiva'],
        descripcion: "¿Cómo trabajan en equipo y se ayudan mutuamente?",
        niveles: [
          { etiqueta: "Inicial", queHacer: "Dividir trabajo sin coordinación.", indicador: "Roles indefinidos, trabajo individual desconectado.", evidencia: "Lista de tareas individuales." },
          { etiqueta: "Básico", queHacer: "Establecer metas grupales básicas.", indicador: "Metas sin evidencias de colaboración.", evidencia: "Acuerdos básicos de equipo." },
          { etiqueta: "Avanzado", queHacer: "Crear metas comunes con tareas complementarias.", indicador: "Metas claras con tareas complementarias.", evidencia: "Contrato de equipo + matriz de interdependencias." },
          { etiqueta: "Experto", queHacer: "Desarrollar sistema integral de apoyo mutuo.", indicador: "Metas, tareas complementarias y criterios explícitos de ayuda mutua.", evidencia: "Sistema completo de roles rotativos + métricas de colaboración." }
        ],
        sel: [],
        checklist: []
      }
    ]
  },
  {
    fase: "PLANEACIÓN",
    color: "#bbf7d0",
    objetivo: "Planificamos a detalle: qué, cómo, cuándo, quién, con qué y bajo qué estándares.",
    criterios: [
      {
        id: "2.1",
        nombre: "Declaración del Alcance y Criterios de Aceptación",
        ayuda: AYUDAS['Alcance'],
        descripcion: "Definir el alcance claro y medible del proyecto, con límites y criterios explícitos.",
        niveles: [
          { etiqueta: "Inicial", queHacer: "Listar ideas generales.", indicador: "Definición vaga con omisiones importantes.", evidencia: "Lista de ideas." },
          { etiqueta: "Básico", queHacer: "Definir qué incluye y qué no.", indicador: "Alcance parcial sin distinguir incluye/no incluye claramente.", evidencia: "Documento de alcance básico." },
          { etiqueta: "Avanzado", queHacer: "Alcance claro con criterios medibles.", indicador: "Alcance claro, medible, y límites bien definidos.", evidencia: "Alcance + criterios de aceptación." },
          { etiqueta: "Experto", queHacer: "Alcance exhaustivo alineado a la Big Question.", indicador: "Alcance exhaustivo, verificable y perfectamente alineado.", evidencia: "Alcance validado + matriz de trazabilidad." }
        ],
        sel: ["INNER: Claridad de propósito personal", "OTHER: Alineación de equipo", "OUTER: Impacto social anticipado"],
        checklist: [
          "¿Diferenciamos qué incluye y qué no?", "¿Están claros los límites?", "¿Hay criterios de aceptación medibles?"
        ]
      },
      {
        id: "2.2",
        nombre: "WBS (Estructura de Desglose del Trabajo) + Matriz RACI",
        ayuda: AYUDAS['WBS y RACI'],
        descripcion: "Organizar las tareas y roles de forma jerárquica y clara.",
        niveles: [
          { etiqueta: "Inicial", queHacer: "Hacer lista simple de tareas.", indicador: "Tareas sueltas sin organización clara.", evidencia: "Lista de tareas." },
          { etiqueta: "Básico", queHacer: "Organizar tareas por categorías con roles básicos.", indicador: "WBS parcial con roles ambiguos.", evidencia: "WBS básica + asignación de roles." },
          { etiqueta: "Avanzado", queHacer: "Crear WBS jerárquica completa con RACI detallado.", indicador: "WBS completa con roles claramente definidos.", evidencia: "WBS numerada + matriz RACI completa." },
          { etiqueta: "Experto", queHacer: "Desarrollar WBS con dependencias y balance de carga.", indicador: "WBS con dependencias claras, RACI por tarea y balance equitativo.", evidencia: "WBS + RACI + análisis de dependencias + plan de nivelación." }
        ],
        sel: [
          "INNER: Autoconocimiento de fortalezas",
          "OTHER: Reconocimiento de capacidades ajenas",
          "OUTER: Visión sistémica del proyecto"
        ],
        checklist: [
          "¿Tenemos todas las tareas?",
          "¿Definimos responsabilidades?",
          "¿Estamos balanceados en el trabajo?"
        ]
      },
      {
        id: "2.3",
        nombre: "Cronograma y Diagrama de Gantt",
        ayuda: AYUDAS['Cronograma y Gantt'],
        descripcion: "Planificamos las fechas de cada tarea con ayuda de un Cronograma y un Diagrama de Gantt.",
        niveles: [
          { etiqueta: "Inicial", queHacer: "Poner fechas aproximadas.", indicador: "Fechas irreales o ausentes.", evidencia: "Calendario simple." },
          { etiqueta: "Básico", queHacer: "Cronograma básico sin dependencias.", indicador: "Cronograma sin considerar dependencias.", evidencia: "Cronograma básico." },
          { etiqueta: "Avanzado", queHacer: "Gantt con hitos y dependencias claras.", indicador: "Hitos claros con dependencias bien identificadas.", evidencia: "Gantt con dependencias." },
          { etiqueta: "Experto", queHacer: "Gantt con ruta crítica y buffers de tiempo.", indicador: "Ruta crítica definida, buffers calculados, revisiones periódicas.", evidencia: "Gantt optimizado + análisis de ruta crítica." }
        ],
        sel: [],
        checklist: [
          "¿Tienen las tareas su fecha?",
          "¿Consideramos los hitos/etapas importantes?",
          "¿Se identifican las dependencias?"
        ]
      },
      {
        id: "2.4",
        nombre: "Planes de Soporte (Calidad, Comunicación, Riesgos, Recursos)",
        ayuda: AYUDAS['Planes de Soporte'],
        descripcion: "¿Hay planes claros para calidad, comunicación, riesgos y recursos?",
        niveles: [
          { etiqueta: "Inicial", queHacer: "Mencionar aspectos básicos sin detalle.", indicador: "Planes no definidos o muy generales.", evidencia: "Notas generales." },
          { etiqueta: "Básico", queHacer: "Crear planes básicos para cada área.", indicador: "Planes definidos pero poco operativos.", evidencia: "Documentos básicos de cada plan." },
          { etiqueta: "Avanzado", queHacer: "Desarrollar planes funcionales y operativos.", indicador: "Planes funcionales que se usan activamente.", evidencia: "Planes detallados + checklists operativos." },
          { etiqueta: "Experto", queHacer: "Integrar planes con indicadores y acciones preventivas.", indicador: "Planes integrados con métricas, indicadores y protocolos.", evidencia: "Sistema integrado de gestión + tablero de indicadores." },
        ],
        sel: [],
        checklist: [
          "¿Hay un plan de calidad?",
          "¿Tienen forma de comunicación clara?",
          "¿Planeamos riesgos y recursos?"
        ]
      }
    ]
  },
  // Agrega después de la fase de "PLANEACIÓN"...

{
  fase: "EJECUCIÓN",
  color: "#fbe7c6",
  objetivo: "Poner en marcha el plan, trabajar colaborativamente y documentar todo el proceso.",
  criterios: [
    {
      id: "3.1",
      nombre: "Cumplimiento de Entregables",
      ayuda: "Cada entregable es una meta: cumple con lo que se pidió, en tiempo y con calidad.",
      descripcion: "¿El equipo entrega lo que se planeó, en tiempo y con calidad adecuada?",
      niveles: [
        { etiqueta: "Inicial", queHacer: "Trabajar en las tareas sin seguir el cronograma.", indicador: "Retrasos constantes y calidad baja.", evidencia: "Productos incompletos." },
        { etiqueta: "Básico", queHacer: "Entregar productos básicos pero con calidad irregular.", indicador: "Entrega parcial con calidad irregular.", evidencia: "Entregables básicos." },
        { etiqueta: "Avanzado", queHacer: "Cumplir el cronograma y estándares de calidad.", indicador: "Entrega puntual cumpliendo estándares.", evidencia: "Productos que cumplen criterios + registro de calidad." },
        { etiqueta: "Experto", queHacer: "Superar los estándares con mejoras proactivas.", indicador: "Supera estándares, mejoras proactivas con evidencia clara.", evidencia: "Productos de excelencia + documentación de mejoras." }
      ],
      sel: [],
      checklist: [
        "¿Cumplimos plazos de entrega?", "¿Se respetaron los criterios de calidad?", "¿Se mejoró algún entregable en el camino?"
      ]
    },
    {
      id: "3.2",
      nombre: "Documentación del Proceso y Bitácora Colaborativa",
      ayuda: "Bitácora = diario del proyecto. Escribe todo avance, dificultad o idea importante.",
      descripcion: "¿Cómo llevan registro de las actividades y aprendizajes del proyecto?",
      niveles: [
        { etiqueta: "Inicial", queHacer: "Trabajar sin registrar avances.", indicador: "Evidencias mínimas o inexistentes.", evidencia: "Notas dispersas." },
        { etiqueta: "Básico", queHacer: "Anotar algunos avances de forma irregular.", indicador: "Evidencias parciales sin organización.", evidencia: "Registros básicos." },
        { etiqueta: "Avanzado", queHacer: "Mantener bitácora ordenada con registros regulares.", indicador: "Bitácora ordenada con registro sistemático.", evidencia: "Bitácora estructurada + actas de reunión." },
        { etiqueta: "Experto", queHacer: "Crear sistema completo de trazabilidad y reflexión continua.", indicador: "Trazabilidad completa con análisis reflexivo continuo.", evidencia: "Sistema digital completo + análisis de tendencias." }
      ],
      sel: [],
      checklist: [
        "¿Anotamos avances regularmente?", "¿Guardamos reuniones/evidencias?", "¿Hacemos reflexiones periódicas?"
      ]
    },
    {
      id: "3.3",
      nombre: "Colaboración Efectiva (Interacción Promotora)",
      ayuda: "Un equipo efectivo se apoya y todos aportan. ¡Hazle fácil el trabajo a los demás!",
      descripcion: "¿El equipo coopera, se comunica y se apoya en las tareas del proyecto?",
      niveles: [
        { etiqueta: "Inicial", queHacer: "Trabajar individualmente con poca coordinación.", indicador: "Roles confusos, poca comunicación.", evidencia: "Trabajo individual." },
        { etiqueta: "Básico", queHacer: "Coordinar tareas básicas entre miembros.", indicador: "Coordinación básica sin mucho apoyo mutuo.", evidencia: "Reportes de coordinación." },
        { etiqueta: "Avanzado", queHacer: "Colaborar activamente con apoyo mutuo constante.", indicador: "Coordinación efectiva con ayuda evidente.", evidencia: "Registros de ayuda mutua + coevaluaciones." },
        { etiqueta: "Experto", queHacer: "Crear sinergia alta con tutoría entre pares.", indicador: "Sinergia alta, miembros se enseñan entre sí.", evidencia: "Portafolio de colaboración + testimonios cruzados." }
      ],
      sel: ["OTHER: Todas las competencias relacionales", "INNER: Autorregulación grupal"],
      checklist: [
        "¿Apoyamos a quien lo necesitaba?", "¿Resolvimos conflictos en equipo?", "¿Aprendimos de otros miembros?"
      ]
    }
  ]
},
{
  fase: "MONITOREO Y CONTROL",
  color: "#dbeafe",
  objetivo: "Comparar plan vs. realidad, ajustar y asegurar calidad. ¡Detecta y corrige desviaciones a tiempo!",
  criterios: [
    {
      id: "4.1",
      nombre: "Seguimiento del Plan y Gestión de Cambios",
      ayuda: "El seguimiento es revisar regularmente el avance: ¿vamos como lo planeado? Si no, ¿qué hacemos?",
      descripcion: "¿El equipo monitorea su avance y hace ajustes cuando es necesario?",
      niveles: [
        { etiqueta: "Inicial", queHacer: "Trabajar sin revisar el plan original.", indicador: "Sin seguimiento ni ajustes.", evidencia: "Trabajo sin control." },
        { etiqueta: "Básico", queHacer: "Revisar ocasionalmente el avance.", indicador: "Actualizaciones esporádicas sin criterios claros.", evidencia: "Algunas actualizaciones del Gantt." },
        { etiqueta: "Avanzado", queHacer: "Hacer seguimiento regular y documentar ajustes.", indicador: "Seguimiento regular con ajustes justificados.", evidencia: "Gantt actualizado + registro de cambios." },
        { etiqueta: "Experto", queHacer: "Seguimiento sistemático con análisis predictivo.", indicador: "Seguimiento sistemático, análisis de tendencias y predicción de problemas.", evidencia: "Dashboard de seguimiento + análisis de variaciones." }
      ],
      sel: [],
      checklist: [
        "¿Revisamos el cronograma/Gantt cada semana?", "¿Ajustamos tareas cuando hubo desvíos?", "¿Registramos los cambios y decisiones?"
      ]
    },
    {
      id: "4.2",
      nombre: "Aseguramiento de Calidad y Control",
      ayuda: "La calidad se asegura verificando y corrigiendo productos y procesos. Usa checklist y mejora continua.",
      descripcion: "¿El equipo revisa y mejora activamente la calidad de sus entregas?",
      niveles: [
        { etiqueta: "Inicial", queHacer: "Trabajar sin verificar calidad.", indicador: "Sin pruebas ni verificación de calidad.", evidencia: "Productos sin revisar." },
        { etiqueta: "Básico", queHacer: "Revisar productos de forma básica.", indicador: "Pruebas básicas ocasionales.", evidencia: "Algunas verificaciones." },
        { etiqueta: "Avanzado", queHacer: "Aplicar checklists y corregir defectos.", indicador: "Checklists aplicados con correcciones documentadas.", evidencia: "Checklists completados + correcciones." },
        { etiqueta: "Experto", queHacer: "Mejora continua con métricas e inspecciones.", indicador: "Sistema de mejora continua, métricas e inspecciones periódicas.", evidencia: "Sistema de calidad + métricas + plan de mejora continua." }
      ],
      sel: ["INNER: Autoexigencia", "OTHER: Retroalimentación constructiva", "OUTER: Orientación a la excelencia"],
      checklist: [
        "¿Checamos calidad antes de entregar?", "¿Recibimos y dimos retroalimentación?", "¿Mejoramos algo frente a entregas anteriores?"
      ]
    }
  ]
},
{
  fase: "CIERRE",
  color: "#fecaca",
  objetivo: "Entregar, socializar, evaluar el desempeño integral y registrar aprendizajes del proceso.",
  criterios: [
    {
      id: "5.1",
      nombre: "Presentación Pública y Difusión",
      ayuda: "La presentación final debe ser clara, organizada, convincente y mostrar todo lo logrado.",
      descripcion: "¿El proyecto se presentó completa y profesionalmente, mostrando el proceso y resultados?",
      niveles: [
        { etiqueta: "Inicial", queHacer: "Mostrar resultados de forma básica.", indicador: "Presentación incompleta o confusa.", evidencia: "Presentación básica." },
        { etiqueta: "Básico", queHacer: "Presentar el proyecto con estructura simple.", indicador: "Presentación clara, pero simple, sin profundidad.", evidencia: "Slides + producto final." },
        { etiqueta: "Avanzado", queHacer: "Realizar presentación clara y convincente.", indicador: "Presentación clara, convincente y bien estructurada.", evidencia: "Presentación + demo + evidencias del proceso." },
        { etiqueta: "Experto", queHacer: "Crear experiencia profesional con interacción y evidencias sólidas.", indicador: "Presentación profesional, interacción efectiva, evidencias sólidas y alto impacto.", evidencia: "Experiencia completa + testimonios + plan de continuidad." }
      ],
      sel: [],
      checklist: [
        "¿Fue clara y ordenada?", "¿Mostramos el proceso y los resultados?", "¿Respondimos preguntas?"
      ]
    },
    {
      id: "5.2",
      nombre: "Reflexión Crítica (Inner/Other/Outer)",
      ayuda: "Reflexionar es pensar: ¿qué hicimos bien y mal?, ¿qué aprendimos? ¿Cómo podemos hacerlo mejor?",
      descripcion: "¿El equipo analiza aciertos, errores y el aprendizaje logrado?",
      niveles: [
        { etiqueta: "Inicial", queHacer: "Comentar superficialmente lo realizado.", indicador: "Reflexión superficial sin análisis profundo.", evidencia: "Comentarios generales." },
        { etiqueta: "Básico", queHacer: "Listar aciertos y errores básicos.", indicador: "Lista de aciertos/errores sin análisis de causas.", evidencia: "Lecciones aprendidas." },
        { etiqueta: "Avanzado", queHacer: "Analizar causas y proponer mejoras específicas.", indicador: "Análisis de causas con propuestas de mejora.", evidencia: "Análisis reflexivo + plan de mejoras." },
        { etiqueta: "Experto", queHacer: "Generar propuestas transferibles con análisis de impacto social.", indicador: "Propuestas transferibles a otros contextos con análisis claro del impacto social.", evidencia: "Informe de impacto + propuestas para escalamiento." }
      ],
      sel: [
        "INNER: Autorregulación y autoconciencia",
        "OTHER: Empatía y relaciones",
        "OUTER: Visión sistémica/impacto"
      ],
      checklist: [
        "¿Identificamos aciertos y errores?", "¿Analizamos causas?", "¿Generamos propuestas para futuros proyectos?"
      ]
    },
    {
      id: "5.3",
      nombre: "Cumplimiento de Criterios de Aceptación",
      ayuda: "¡No basta con terminar! Verifica si el producto cumple TODO lo planeado y añade valor.",
      descripcion: "¿El producto final cumple y supera los criterios establecidos al inicio?",
      niveles: [
        { etiqueta: "Inicial", queHacer: "Entregar producto sin verificar criterios.", indicador: "Criterios sin cumplir/verificar.", evidencia: "Producto sin verificar." },
        { etiqueta: "Básico", queHacer: "Revisar cumplimiento básico de criterios principales.", indicador: "Mayoría de criterios cumplidos con revisión básica.", evidencia: "Checklist parcial." },
        { etiqueta: "Avanzado", queHacer: "Verificar cumplimiento completo de todos los criterios.", indicador: "Todos los criterios cumplidos con verificación documentada.", evidencia: "Checklist completo + validación." },
        { etiqueta: "Experto", queHacer: "Cumplir criterios agregando valor e innovación.", indicador: "Criterios cumplidos + valor agregado demostrado.", evidencia: "Acta de aceptación + reconocimiento de valor agregado." }
      ],
      sel: ["OUTER: Visión de impacto", "INNER: Orgullo por el logro"],
      checklist: [
        "¿Se validaron todos los criterios de éxito?", "¿Se agregó innovación o valor extra?", "¿El producto/servicio es útil para otros?"
      ]
    }
  ]
}

];
const NIVEL_EMOJIS = ["🥚", "🐥", "🦅", "🏆"];

// -- Guardado persistente por equipo --
function usePersistedState(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const s = window.localStorage.getItem(key);
      return s ? JSON.parse(s) : initial;
    } catch { return initial; }
  });
  const setter = value => {
    setState(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };
  return [state, setter];
}

export default function App() {
  const [inputNombre, setInputNombre] = useState("");
  const [equipo, setEquipo] = usePersistedState("equipo_nombre", "");
  const [faseIdx, setFaseIdx] = usePersistedState("equipo_fase", 0);
  const [resultados, setResultados] = usePersistedState("equipo_resultados", {});
  const [modo, setModo] = usePersistedState("modo", "equipo"); // "docente" | "equipo"
  const allEquipos = getAllResults();

  

// ¿Calcula avance para el semáforo docente automáticamente!
function getRiesgoEquipo(datos, rubrica) {
  if (!datos) return "rojo";
  const fases = rubrica.length;
  let sumaProgreso = 0;
  for (let i=0; i<fases; ++i) {
    const crit = rubrica[i].criterios.length;
    const av = datos[i]? Object.values(datos[i]).filter(x=>x.nivel!==null).length/crit : 0;
    sumaProgreso += av;
  }
  const prom = sumaProgreso/fases;
  if (prom>0.85) return "verde";
  if (prom>0.5) return "amarillo";
  return "rojo";
}


  const fase = RUBRICA[faseIdx];

  const avanzar = () => setFaseIdx(idx => Math.min(idx+1, RUBRICA.length-1));
  const retroceder = () => setFaseIdx(idx => Math.max(idx-1, 0));

  function setRespuesta(criterioIdx, campo, valor) {
    setResultados(rs => {
      const n = { ...rs };
      if (!n[faseIdx]) n[faseIdx] = {};
      if (!n[faseIdx][criterioIdx]) n[faseIdx][criterioIdx] = { nivel: null, reflexion: "", checklist: [] };
      n[faseIdx][criterioIdx][campo] = valor;
      return n;
    });
    if (equipo) storeResults(equipo, faseIdx, resultados);
  }

  // ---- Guardado multiusuario (modo docente) ----
  function storeResults(nombre, fidx, results) {
    const all = getAllResults();
    all[nombre] = { ...results, [fidx]: results[fidx] };
    window.localStorage.setItem("equipos_rubrica", JSON.stringify(all));
  }
  function getAllResults() {
    try { return JSON.parse(window.localStorage.getItem("equipos_rubrica")) || {}; }
    catch { return {}; }
  }
  function borrarEquipo(nombre) {
    const all = getAllResults();
    delete all[nombre];
    window.localStorage.setItem("equipos_rubrica", JSON.stringify(all));
  }

  // --- Exportar PDF
  const imprimir = () => window.print();

  // ---- INTERFAZ ----
  return (
    <div style={{fontFamily:"system-ui,sans-serif",background:"#f3f4f6",minHeight:"100vh",paddingBottom:48}}>
      <div style={{
        background:"#2563eb",color:"#fff",padding:30,borderRadius:"0 0 36px 36px",marginBottom:28,
        display:"flex",justifyContent:"space-between",alignItems:"center"
      }}>
        <div>
          <h1 style={{margin:0,fontWeight:900,letterSpacing:"-2px"}}>Rúbrica Digital INCIDE</h1>
          <span style={{fontWeight:500,opacity:.96}}>PMBOK + SEL</span>
        </div>
        <div>
          <button onClick={()=>setModo("equipo")} style={{
            background: modo==="equipo"? "#fde047":"#fff",color:"#111",border:"none",padding:"7px 20px",borderRadius:8,marginRight:7,cursor:"pointer"
          }}>👦 Equipo</button>
          <button onClick={()=>setModo("docente")} style={{
            background: modo==="docente"? "#bbf7d0":"#fff",color:"#111",border:"none",padding:"7px 20px",borderRadius:8,cursor:"pointer"
          }}>👩‍🏫 Docente</button>
        </div>
      </div>
      {/* ------ MODO DOCENTE ------ */}
      {modo === "docente" &&
  <div style={{maxWidth:740,margin:"34px auto 0 auto",background:"#fff",padding:30,borderRadius:24,boxShadow:"0 2px 14px #bae6fd"}}>
    <h2 style={{marginTop:3,marginBottom:12}}>Resultados de equipos <span style={{fontSize:15,fontWeight:400}}>(semáforo: <span style={{color:"#16a34a"}}>🟢</span> <span style={{color:"#eab308"}}>🟡</span> <span style={{color:"#dc2626"}}>🔴</span>)</span></h2>
    <div style={{fontSize:15,padding:"6px 13px",background:"#f3f4f6",borderRadius:8,maxWidth:555,marginBottom:15}}>
      <b>🟢 Verde</b>: buen avance<br/>
      <b>🟡 Amarillo</b>: intermedio, requiere guía<br/>
      <b>🔴 Rojo</b>: equipo en riesgo (poco llenado)
    </div>
    {Object.entries(allEquipos).length===0 && <div style={{color:"#888",marginTop:19}}>Ningún equipo ha llenado la rúbrica aún.</div>}
    <table style={{width:"100%",borderSpacing:0,fontSize:15,marginBottom:20,background:"#fafafa",borderRadius:8,overflow:"hidden"}}>
      <thead>
        <tr><th style={{textAlign:"left",background:"#f5f3ff"}}>Equipo</th>
          <th>Riesgo</th>
          {RUBRICA.map(f=><th key={f.fase}>{f.fase}</th>)}
          <th></th>
        </tr>
      </thead>
      <tbody>
      {Object.entries(allEquipos).map(([nom, datos]) => {
        const riesgo = getRiesgoEquipo(datos,RUBRICA);
        return (
          <tr key={nom}
            style={{
              background: riesgo==="rojo"? "#fee2e2"
                :riesgo==="amarillo"? "#fef9c3"
                :"#dcfce7"
            }}>
            <td>{nom}</td>
            <td style={{fontWeight:700,fontSize:18}}>
              {riesgo==="verde"? "🟢":" "}{riesgo==="amarillo"? "🟡":" "}{riesgo==="rojo"? "🔴":" "}
            </td>
            {RUBRICA.map((f,fidx)=>
              <td key={f.fase}>
                {datos?.[fidx]? Object.values(datos[fidx]||{}).filter(c=>c.nivel!==null).length : 0}
                /{f.criterios.length}
              </td>)}
            <td>
              <button onClick={()=>{
                setEquipo(nom);setModo("equipo");setFaseIdx(0);setResultados(allEquipos[nom]);
              }} style={{background:"#bae6fd",border:"none",borderRadius:7,padding:"4px 12px",cursor:"pointer"}}>Ver</button>
              <button onClick={()=>{
                if(window.confirm("¿Borrar equipo y todas sus respuestas?")) { borrarEquipo(nom); window.location.reload(); }
              }} style={{background:"#fee2e2",border:"none",borderRadius:7,padding:"4px 8px",color:"#ef4444",cursor:"pointer",marginLeft:6}}>🗑️</button>
            </td>
          </tr>
        );
      })}
      </tbody>
    </table>
    <div style={{marginTop:20,padding:"7px 0",color:"#444",background:"#f3f4f6",borderRadius:7,maxWidth:510,fontSize:15}}>
      <b>¿Cómo actuar?</b>
      <ul>
        <li><b>Rojo:</b> Revisar: faltan criterios, equipo podría estar desmotivado/desorientado.</li>
        <li><b>Amarillo:</b> Va parcial, sugiere acompañamiento y preguntas de guía.</li>
        <li><b>Verde:</b> Equipo va muy bien, puede avanzar autónomo.</li>
      </ul>
      <b>Tip:</b> En el panel puedes entrar como cualquier equipo para ver/responder o dar retroalimentación.
    </div>
  </div>
}


      {/* ---- MODO EQUIPO ---- */}
      {modo === "equipo" && !equipo && (
        <div style={{background:"#fff",margin:"40px auto",padding:32,borderRadius:15,maxWidth:335,boxShadow:"0 2px 16px #bae6fd"}}>
          <h2>Nombre de tu equipo</h2>
          <input
            style={{padding:12,fontSize:18,border:"1.5px solid #60a5fa",borderRadius:9,width:"98%",marginBottom:10}}
            value={inputNombre}
            onChange={e => setInputNombre(e.target.value)}
            placeholder="Ej. Súper Creativos"
            maxLength={30}
          />
          <button
            style={{background:"#60a5fa",color:"#fff",border:"none",borderRadius:9,padding:"13px 40px",fontWeight:700,fontSize:19,marginTop:18}}
            disabled={inputNombre.trim().length<2}
            onClick={()=>setEquipo(inputNombre.trim())}
          >¡Comenzar!</button>
        </div>
      )}
      {modo === "equipo" && equipo && (
        <div style={{maxWidth:770,margin:"32px auto",background:"#fff",borderRadius:22,boxShadow:"0 2px 12px #dbeafe",padding:26}}>
          <div style={{
            marginBottom:18,display:'flex',gap:12,alignItems:"center",justifyContent:"space-between"
          }}>
            <div>
              <span style={{fontSize:22,fontWeight:700,letterSpacing:"-1.3px"}}>👩‍👩‍👧‍👦 Equipo:</span> <b style={{fontSize:20}}>{equipo}</b>
            </div>
            <button onClick={()=>{setEquipo("");setInputNombre("");setResultados({});setFaseIdx(0);setModo("equipo");}}
              style={{background:"#fee2e2",color:"#b91c1c",border:"none",borderRadius:8,padding:"6px 16px", cursor:"pointer"}}
            >Salir y borrar</button>
          </div>
          <div style={{
            background:fase.color,padding:"16px 20px",borderRadius:12,marginBottom:20,fontWeight:600
          }}>
            <b>Objetivo:</b> {fase.objetivo}
          </div>
          {/* CRITERIOS DE LA FASE */}
          {fase.criterios.map((c,ci) =>
            <div key={c.id} style={{
              background:"#f1f5f9",borderRadius:12,padding:"16px 20px",marginBottom:18
            }}>
              <div style={{fontWeight:900,fontSize:18}}>{c.nombre}</div>
              <div style={{fontSize:15,color:"#066",margin:"3px 0 10px 0"}}>{c.ayuda}</div>
              <div style={{color:"#555",marginBottom:8}}>{c.descripcion}</div>
              {/* Tabla NIVELES */}
              <div style={{marginBottom:7,display:"flex",flexWrap:"wrap",gap:"12px 12px"}}>
                {c.niveles.map((nvl,ri)=>
                  <div key={ri} style={{
                    border:"2px solid #bae6fd",borderRadius:10,background:"#fff",padding:"7px 10px",minWidth:150,maxWidth:192,flex:"1 0 170px"
                  }}>
                    <div style={{fontWeight:800,marginBottom:3}}>{NIVEL_EMOJIS[ri]} {nvl.etiqueta}</div>
                    <div><b>¿Qué hacer?</b> {nvl.queHacer}</div>
                    <div style={{fontSize:14,color:"#666"}}><b>Ejemplo:</b> {nvl.indicador}</div>
                    <div style={{fontSize:13,color:"#888",marginTop:3}}><b>Evidencia:</b> {nvl.evidencia}</div>
                  </div>
                )}
              </div>
              {/* Checklist */}
              {c.checklist && c.checklist.length > 0 && (
                <div style={{margin:"7px 0 13px 0",padding:"10px 0"}}>
                  <b>Auto-checa:</b>
                  {c.checklist.map((ck,idx)=>
                    <label style={{display:"block",marginLeft:11,fontSize:15}} key={idx}>
                      <input
                        type="checkbox"
                        checked={resultados?.[faseIdx]?.[ci]?.checklist?.[idx]||false}
                        onChange={()=>{
                          const arr = [...(resultados?.[faseIdx]?.[ci]?.checklist||Array(c.checklist.length).fill(false))]
                          arr[idx] = !arr[idx];
                          setRespuesta(ci,"checklist",arr);
                        }}
                        style={{marginRight:7}}
                      /> {ck}
                    </label>
                  )}
                </div>
              )}
              {/* Dimensiones SEL */}
              {c.sel && c.sel.length > 0 && (
                <div style={{fontSize:14,color:"#7c3aed",margin:"6px 0 6px 11px"}}>
                  <b>SEL:</b> {c.sel.join(" | ")}
                </div>
              )}
              {/* Nivel */}
              <div style={{margin:"10px 0"}}>
                <b>¿En qué nivel están?</b>
                <div>
                  {c.niveles.map((nvl,ri)=>
                    <label key={ri} style={{marginRight:9,fontWeight:700,fontSize:18,cursor:"pointer"}}>
                      <input type="radio"
                        name={`nivel_${faseIdx}_${ci}`} checked={resultados?.[faseIdx]?.[ci]?.nivel===ri}
                        onChange={()=>setRespuesta(ci,"nivel",ri)}
                        style={{marginRight:5}}
                      />{NIVEL_EMOJIS[ri]}
                    </label>
                  )}
                </div>
              </div>
              {/* Reflexión */}
              <div style={{marginTop:3}}>
                <b>Reflexión/evidencia:</b>
                <textarea
                  style={{width:"98%",minHeight:36,borderRadius:9,border:"1.2px solid #cbf3f0",marginTop:3,padding:6,fontSize:15}}
                  value={resultados?.[faseIdx]?.[ci]?.reflexion||""}
                  onChange={e=>setRespuesta(ci,"reflexion",e.target.value)}
                  maxLength={180}
                />
              </div>
            </div>
          )}
          {/* Avance y navegación */}
          <div style={{marginTop:28,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              {faseIdx>0 && <button
                style={{marginRight:9,background:"#f1f5f9",fontWeight:800,borderRadius:8,padding:"11px 22px",cursor:"pointer",border:"none",fontSize:17}}
                onClick={retroceder}
              >← Anterior</button>}
              {faseIdx<RUBRICA.length-1 && <button
                style={{background:"#60a5fa",color:"#fff",fontWeight:800,borderRadius:8,padding:"12px 29px",cursor:"pointer",border:"none",fontSize:18}}
                onClick={avanzar}
              >Siguiente →</button>}
            </div>
            <button
              onClick={imprimir}
              style={{background:"#facc15",color:"#111",fontWeight:800,border:"none",borderRadius:8,
                padding:"13px 32px",fontSize:18,cursor:"pointer"}}
            >Exportar PDF</button>
          </div>
        </div>
      )}
      <style>{`@media print { button,nav,header,div[style*='boxShadow'] { display: none !important; } body { background:#fff !important; }}`}</style>
    </div>
  );
}
