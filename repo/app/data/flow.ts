import { Flow } from "../types/flow";

export const flow: Flow = {
  startId: "check-response",
  nodes: {
    "check-response": {
      id: "check-response",
      title: "Comprobar respuesta",
      body:
        "Habla fuerte, toca suavemente los hombros y busca cualquier señal de que entiende lo que dices. Si no hay reacción, actúa como si fuera una emergencia.",
      question: "¿La persona responde?",
      slideHint: "Usa las flechas o desliza para seguir el árbol de decisión.",
      options: [
        { label: "Sí, responde", nextId: "monitor", variant: "secondary" },
        { label: "No responde", nextId: "check-breathing", variant: "primary" },
      ],
    },
    "monitor": {
      id: "monitor",
      title: "Supervisar y pedir ayuda",
      body:
        "Mantén a la persona tranquila, vigila su respiración y estado. Si la respuesta es confusa, habla con ella y pide a alguien que llame al 911. Si hay riesgo de que empeore, pide un AED y permanece atento.",
      accordion: [
        {
          id: "monitor-steps",
          title: "Qué hacer mientras esperas",
          content:
            "Afloja ropa apretada, manténla abrigada, no le des comida ni bebida. Si se desmaya o deja de responder, vuelve al inicio del flujo.",
          autoAdvanceOnOpen: false,
        },
      ],
      question: "¿La persona sigue estable?",
      options: [
        { label: "Sí, continúa vigilando", nextId: "monitor", variant: "secondary" },
        { label: "Empeora o deja de responder", nextId: "check-breathing", variant: "primary" },
      ],
    },
    "check-breathing": {
      id: "check-breathing",
      title: "Abrir vía aérea y observar",
      body:
        "Inclina la cabeza suavemente hacia atrás y eleva el mentón. Acerca tu oído a la boca y nariz, mira el pecho y siente si entra y sale aire durante 10 segundos.",
      question: "¿Respira o hace boqueadas?",
      accordion: [
        {
          id: "airway-tips",
          title: "Consejos rápidos",
          content:
            "Quita objetos visibles en la boca solo si los puedes retirar fácilmente. Si sospechas trauma, mueve el cuello lo menos posible.",
        },
      ],
      options: [
        { label: "Respira o boquea", nextId: "suspect-obstruction", variant: "secondary" },
        { label: "No respira", nextId: "check-pulse", variant: "primary" },
      ],
    },
    "suspect-obstruction": {
      id: "suspect-obstruction",
      title: "¿Vía aérea libre?",
      body:
        "Si hay respiración irregular o ruidos extraños, sospecha obstrucción. Pide a alguien que llame al 911 y busque un AED mientras valoras qué hacer.",
      question: "¿Crees que la vía aérea está obstruida?",
      options: [
        { label: "Sí, parece obstruida", nextId: "dova-conscious", variant: "primary" },
        { label: "No, respira mejor", nextId: "recovery-position", variant: "secondary" },
      ],
      slideHint: "Si hay atragantamiento claro, actúa rápido.",
    },
    "dova-conscious": {
      id: "dova-conscious",
      title: "Manejo de obstrucción en consciente",
      body:
        "Anima a toser fuerte. Si no expulsa el objeto y sigue consciente, aplica compresiones abdominales (DOVA/Heimlich) hasta que respire mejor o pierda el conocimiento.",
      accordion: [
        {
          id: "dova-steps",
          title: "Recordatorio de la maniobra",
          content:
            "Párate detrás, rodea con tus brazos por encima del ombligo, cierra una mano en puño y sujétala con la otra. Comprime hacia adentro y arriba en golpes rápidos. Detente si expulsa el objeto o si se queda sin fuerzas.",
          autoAdvanceOnOpen: false,
        },
      ],
      question: "¿Cómo evoluciona?",
      options: [
        { label: "La maniobra funcionó, vuelve a respirar bien", nextId: "recovery-position", variant: "secondary" },
        { label: "Perdió el conocimiento", nextId: "start-compressions", variant: "primary" },
      ],
    },
    "check-pulse": {
      id: "check-pulse",
      title: "Buscar pulso",
      body:
        "Busca un pulso central (carótida o femoral) usando dos dedos, sin presionar demasiado. Tómate máximo 10 segundos para decidir.",
      question: "¿Notas pulso?",
      options: [
        { label: "Sí, hay pulso", nextId: "airway-breathing", variant: "secondary" },
        { label: "No detecto pulso", nextId: "start-compressions", variant: "primary" },
      ],
      slideHint: "Si dudas, actúa como si no hubiera pulso.",
    },
    "airway-breathing": {
      id: "airway-breathing",
      title: "Respiración débil con pulso",
      body:
        "Da ventilaciones de rescate si tienes barrera y entrenamiento. Vigila si el pecho sube y baja. Evita hiperventilar.",
      question: "¿Hay signos de obstrucción o la respiración empeora?",
      options: [
        { label: "Sí, parece obstrucción", nextId: "dova-conscious", variant: "primary" },
        { label: "No, respira mejor con apoyo", nextId: "recovery-position", variant: "secondary" },
      ],
    },
    "start-compressions": {
      id: "start-compressions",
      title: "Inicia RCP",
      body:
        "Coloca las manos en el centro del pecho y empieza compresiones fuertes y rítmicas. Sigue el metrónomo a 100 compresiones por minuto.",
      view: "rcp-timer",
      slideHint: "Deja el teléfono en altavoz y sigue el ritmo.",
    },
    "recovery-position": {
      id: "recovery-position",
      title: "Posición de recuperación",
      body:
        "Cuando hay pulso y respiración, coloca a la persona de lado, cabeza ligeramente extendida y boca hacia abajo para que drene.",
      view: "recovery",
      slideHint: "Mantén vigilancia constante y repite chequeos de pulso.",
    },
  },
};

export default flow;
