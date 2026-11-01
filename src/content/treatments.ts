import type { ImageKey } from "./images";

/** Tratamientos. Sin precios: cada tarjeta lleva a agendar una evaluación. */
export interface Treatment {
  id: string;
  name: string;
  summary: string;
  points: string[];
  image: ImageKey;
}

export const treatments: Treatment[] = [
  {
    id: "implantes",
    name: "Implantes dentales",
    summary: "Reemplazamos piezas perdidas con implantes de titanio y coronas que se ven y se sienten naturales.",
    points: ["Planificación digital 3D", "Carga inmediata cuando es posible", "Prótesis sobre implantes"],
    image: "ttoImplants",
  },
  {
    id: "rehabilitacion",
    name: "Rehabilitación oral",
    summary: "Devolvemos función y estética a bocas con desgaste, fracturas o piezas faltantes, con un plan integral.",
    points: ["Coronas y puentes de cerámica", "Incrustaciones", "Prótesis fijas y removibles"],
    image: "ttoPeriodontics",
  },
  {
    id: "estetica",
    name: "Estética dental",
    summary: "Diseño de sonrisa, carillas y blanqueamiento para resultados armónicos y nada artificiales.",
    points: ["Diseño digital de sonrisa", "Carillas de resina y cerámica", "Blanqueamiento supervisado"],
    image: "ttoAesthetics",
  },
  {
    id: "ortodoncia",
    name: "Ortodoncia",
    summary: "Alineamos tus dientes con brackets estéticos o alineadores transparentes, en adultos y adolescentes.",
    points: ["Alineadores transparentes", "Brackets cerámicos", "Controles programados"],
    image: "ttoOrthodontics",
  },
  {
    id: "endodoncia",
    name: "Endodoncia",
    summary: "Tratamos el nervio dental para salvar piezas comprometidas y aliviar el dolor con técnica rotatoria.",
    points: ["Diagnóstico radiográfico", "Anestesia cuidadosa", "Sesiones cortas"],
    image: "ttoEndodontics",
  },
  {
    id: "prevencion",
    name: "Prevención y limpieza",
    summary: "Controles, limpieza profesional y educación para mantener tu boca sana y evitar tratamientos mayores.",
    points: ["Destartraje y pulido", "Control anual", "Odontología para toda la familia"],
    image: "ttoPrevention",
  },
];
