==================================================
PROYECTO: Sitio Web Institucional - Instituto Tecnológico Superior
==================================================

INTEGRANTES DEL GRUPO:
- Gabriel Cantero.
- Enrique Suica.
- Sofía Benitez. 

CÓMO ABRIR EL PROYECTO:
- Descargar la carpeta completa y abrir index.html en un navegador (Chrome, Edge o Firefox).
- No requiere instalación de programas adicionales.

El árbol de la web:
proyecto/
├── index.html
│   └── Tabla 1: Logros institucionales
├── nosotros.html
│   ├── Tabla 2: Historia en hitos
│   └── Tabla 3: Valores institucionales
├── servicios.html
│   ├── Tabla 4: Carreras y duración
│   ├── Tabla 5: Horarios de clases ........ Operaciones 2 y 3
├── contacto.html
│   └── Formulario 1: Consulta general
├── inscripcion.html
│   └── Formulario 2 y 3: Inscripción en 3 pasos (primer formulario de datos, segundo formulario es asignaturas y revisión) 
├── css/
│   └── estiloss.css ........................ Hoja externa, vinculada en todas las páginas
└── js/
    ├── script.js ........................... Usado por servicios.html
    └── script_inscripcion.js ............... Usado por inscripcion.html


PÁGINAS INCORPORADAS EN EL SITIO:
1. index.html: Página principal con bienvenida, novedades, enlaces y estructura general.
2. nosotros.html: Información institucional, historia y valores.
3. servicios.html: Oferta académica, recursos externos e incorporación de la tabla HTML5 de horarios y asignaturas.
4. contacto.html: Datos de ubicación, teléfonos y correos institucionales, aparte de un formulario.
5. inscripcion.html: Página que contiene el formulario completo de inscripción de futuros alumnos.

CÓMO PROBAR CADA OPERACIÓN (todas en servicios.html):
1. Agregar un registro: en "inscripcion", completar el formulario con datos
válidos y enviar. Es un flujo que muestra 3 pasos, primero un formulario de datos, luego un formulario de materias y finalmente muestra lo ingresado en una tabla.
2. Buscar o filtrar: en "Horarios de Clases", elegir carrera o turno, o escribir una asignatura. "Limpiar filtros" recupera la vista completa.
3. Ordenar: en "Horarios de Clases", pulsar "Ordenar A-Z".
4. Actualizar un registro: en "inscripcion" se puede modificar las materias seleccionadas y los turnos, además de volver a los pasos anteriores, editar o cancelar el proceso.
5. Calcular un resumen: Abajo de la tabla de "Servicios" aparece un resumen de la cantidad de materias que se muestran, y si buscas una materia o filtras cambia la cantidad.

DESCRIPCIÓN DE LA TABLA:
- Por ejemplo la que se ubica en la sección de servicios (servicios.html). Utiliza la estructura semántica de HTML5 (<table>, <caption>, <thead>, <tbody>, <tfoot>, <tr>, <th>, <td>) e incluye atributos de accesibilidad como scope="col" y colspan para detallar 5 registros de asignaturas, carreras, turnos y estados académicos. Esta tabla detalla las nuevas asignaturas y turnos recientemente agregados a la malla. 

DESCRIPCIÓN DEL FORMULARIO:
- La que se ubica en la página inscripcion.html. Cuenta con un propósito claro de registro/inscripción, estructurado con la etiqueta <form> (action="#" y method="POST"). Contiene 6 campos obligatorios utilizando 4 tipos distintos de input, además que luego solicita seleccionar las materias, (text, email, tel, date), además de un selector <select> y un área de texto <textarea>. Todos los campos están enlazados correctamente mediante etiquetas <label> (usando los atributos for e id), validaciones HTML5 (required, minlength, max) y botones funcionales de envío (submit) y restablecimiento (reset). Es un formulario para que las personas interesadas puedan enviar sus datos de inscripción. 
==================================================