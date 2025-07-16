// script.js

const materias = document.querySelectorAll('.materia');
const estadoGuardado = JSON.parse(localStorage.getItem('materias-aprobadas')) || {};

const previas = {
  "Profundización": ["Cardio y Respiratorio"],
  "Biofísica": ["Fisica"],
  "Fisiopatología y Patología": [
    "Enfermería", "Metodología Científica", "Biología Celular y Tisular (BCyT)", "Anatomía", "Salud Pública", "Psicología",
    "Neurobiología", "Cardio y Respiratorio", "Digestivo, Renal y Endocrino", "Reproductor y Desarrollo", "Profundización", "Bioquímica"
  ],
  "Farmacología": [
    "Enfermería", "Metodología Científica", "Biología Celular y Tisular (BCyT)", "Anatomía", "Salud Pública", "Psicología",
    "Neurobiología", "Cardio y Respiratorio", "Digestivo, Renal y Endocrino", "Reproductor y Desarrollo", "Profundización", "Bioquímica"
  ],
  "Unidad temática 1": [
    "Biofísica", "Farmacología", "Fisiopatología y Patología"
  ],
  "Unidad temática 5": [
    "Biofísica", "Farmacología", "Fisiopatología y Patología"
  ],
  "Unidad temática 2": ["Unidad temática 1"],
  "Unidad temática 3": ["Unidad temática 1"],
  "Unidad temática 4": ["Unidad temática 1"],
  "Unidad temática 6": ["Unidad temática 5"],
  "Unidad temática 7": ["Unidad temática 5"],
  "Unidad temática 8": ["Unidad temática 5"],
  "Internado": [
    "Unidad temática 8",
    "Enfermería", "Metodología Científica", "Biología Celular y Tisular (BCyT)", "Anatomía", "Salud Pública", "Psicología",
    "Neurobiología", "Cardio y Respiratorio", "Digestivo, Renal y Endocrino", "Reproductor y Desarrollo",
    "Fisica", "Profundización", "Bioquímica",
    "Farmacología", "Fisiopatología y Patología",
    "Biofísica",
    "Unidad temática 1", "Unidad temática 2", "Unidad temática 3", "Unidad temática 4",
    "Unidad temática 5", "Unidad temática 6", "Unidad temática 7"
  ],
  "Monografía": [
    "Unidad temática 8",
    "Enfermería", "Metodología Científica", "Biología Celular y Tisular (BCyT)", "Anatomía", "Salud Pública", "Psicología",
    "Neurobiología", "Cardio y Respiratorio", "Digestivo, Renal y Endocrino", "Reproductor y Desarrollo",
    "Fisica", "Profundización", "Bioquímica",
    "Farmacología", "Fisiopatología y Patología",
    "Biofísica",
    "Unidad temática 1", "Unidad temática 2", "Unidad temática 3", "Unidad temática 4",
    "Unidad temática 5", "Unidad temática 6", "Unidad temática 7"
  ]
};

function actualizarEstado() {
  materias.forEach(materia => {
    const nombre = materia.dataset.nombre;
    const completas = Object.keys(estadoGuardado).filter(m => estadoGuardado[m]);
    const requisitos = previas[nombre] || [];
    const habilitada = requisitos.every(req => completas.includes(req));

    materia.classList.remove('locked');
    if (!habilitada && requisitos.length > 0) {
      materia.classList.add('locked');
    }
  });
}

materias.forEach(materia => {
  const nombre = materia.dataset.nombre;

  if (estadoGuardado[nombre]) {
    materia.classList.add('completed');
  }

  materia.addEventListener('click', e => {
    if (materia.classList.contains('locked')) return;

    materia.classList.toggle('completed');
    estadoGuardado[nombre] = materia.classList.contains('completed');
    localStorage.setItem('materias-aprobadas', JSON.stringify(estadoGuardado));
    actualizarEstado();
  });
});

function reiniciarProgreso() {
  localStorage.removeItem('materias-aprobadas');
  location.reload();
}

actualizarEstado();
