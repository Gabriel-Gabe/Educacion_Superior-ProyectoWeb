document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================
                                CATALOGO 
       ========================================================== */
    const CATALOGO = {
        "Desarrollo de Software": [
            "Programación Web Avanzada",
            "Bases de Datos NoSQL y SQL",
            "Ingeniería de Software",
            "Algoritmos y Estructuras de Datos"
        ],
        "Seguridad Informática": [
            "Arquitectura de Redes",
            "Auditoría de Sistemas",
            "Criptografía Aplicada",
            "Hacking Ético"
        ],
        "Redes y Sistemas": [
            "Seguridad en Cloud Computing",
            "Administración de Servidores Linux",
            "Enrutamiento y Conmutación",
            "Virtualización"
        ]
    };

    const HORARIOS = {
        "Mañana": "07:30 - 11:30 hs",
        "Tarde": "13:30 - 17:30 hs",
        "Noche": "18:00 - 21:30 hs"
    };

    const CLASE_TURNO = {
        "Mañana": "turno-manana",
        "Tarde": "turno-tarde",
        "Noche": "turno-noche"
    };

    /* ==========================================================
       UTILIDADES
       ========================================================== */
    function mostrar(elemento, texto, esError) {
        elemento.textContent = texto;
        elemento.className = esError ? "mensaje error" : "mensaje ok";
        elemento.hidden = false;
    }

    function formatearFecha(iso) {
        const [anio, mes, dia] = iso.split("-");
        return `${dia}/${mes}/${anio}`;
    }

    function generarCodigo() {
        const numero = Math.floor(1000 + Math.random() * 9000);
        return `INS-${new Date().getFullYear()}-${numero}`;
    }

    /* ==========================================================
       ASISTENTE DE INSCRIPCIÓN EN PASOS
       Paso 1: datos  ->  Paso 2: asignaturas y turnos  ->  Paso 3: revisión  ->  Éxito
       ========================================================== */
    const form1 = document.getElementById("form-inscripcion");
    const form2 = document.getElementById("form-asignaturas");
    const selCarrera = document.getElementById("sel-carrera");
    const selCarreraPaso1 = document.getElementById("carrera");
    const tbodyAsig = document.querySelector("#tabla-asignaturas tbody");
    const contadorAsig = document.getElementById("contador-asig");
    const errorPaso2 = document.getElementById("error-paso-2");
    const mensajeWizard = document.getElementById("mensaje-inscripcion");

    // Paneles: 1, 2, 3 y la pantalla final (4)
    const paneles = [
        document.getElementById("paso-1"),
        document.getElementById("paso-2"),
        document.getElementById("paso-3"),
        document.getElementById("paso-exito")
    ];
    const indicadores = [1, 2, 3].map(n => document.getElementById(`indicador-paso-${n}`));

    let datos = null;              // datos escritos en el paso 1
    let inscripcion = null;        // datos + asignaturas, listos para confirmar
    const seleccion = new Map();   // nombre de asignatura -> turno elegido

    function irAPaso(n) {
        paneles.forEach((panel, i) => {
            panel.hidden = i + 1 !== n;
        });

        indicadores.forEach((indicador, i) => {
            const numero = i + 1;
            indicador.classList.toggle("activo", numero === n);
            indicador.classList.toggle("completado", numero < n);
            if (numero === n) {
                indicador.setAttribute("aria-current", "step");
            } else {
                indicador.removeAttribute("aria-current");
            }
        });

        paneles[n - 1].querySelector("h3").focus();
    }

    function actualizarContador() {
        contadorAsig.textContent = seleccion.size;
    }

    // Dibuja la lista de asignaturas de la carrera elegida, conservando lo ya seleccionado
    function renderAsignaturas() {
        tbodyAsig.textContent = "";
        const lista = CATALOGO[selCarrera.value] || [];

        lista.forEach((nombre, i) => {
            const tr = document.createElement("tr");

            const tdCheck = document.createElement("td");
            const check = document.createElement("input");
            check.type = "checkbox";
            check.id = `asig-${i}`;
            check.checked = seleccion.has(nombre);
            tdCheck.appendChild(check);

            const th = document.createElement("th");
            th.scope = "row";
            const etiqueta = document.createElement("label");
            etiqueta.htmlFor = check.id;
            etiqueta.textContent = nombre;
            th.appendChild(etiqueta);

            const tdTurno = document.createElement("td");
            const selectTurno = document.createElement("select");
            selectTurno.setAttribute("aria-label", `Turno para ${nombre}`);
            Object.keys(HORARIOS).forEach(turno => selectTurno.add(new Option(turno, turno)));
            selectTurno.value = seleccion.get(nombre) || "Mañana";
            selectTurno.disabled = !check.checked;
            tdTurno.appendChild(selectTurno);

            const tdHorario = document.createElement("td");
            const actualizarHorario = () => {
                tdHorario.textContent = check.checked ? HORARIOS[selectTurno.value] : "—";
            };
            actualizarHorario();

            check.addEventListener("change", () => {
                selectTurno.disabled = !check.checked;
                if (check.checked) {
                    seleccion.set(nombre, selectTurno.value);
                } else {
                    seleccion.delete(nombre);
                }
                actualizarHorario();
                actualizarContador();
                errorPaso2.hidden = true;
            });

            selectTurno.addEventListener("change", () => {
                seleccion.set(nombre, selectTurno.value);
                actualizarHorario();
            });

            tr.append(tdCheck, th, tdTurno, tdHorario);
            tbodyAsig.appendChild(tr);
        });

        actualizarContador();
    }

    // Cambiar la carrera en el paso 2 reinicia la selección y mantiene sincronizado el paso 1
    selCarrera.addEventListener("change", () => {
        seleccion.clear();
        selCarreraPaso1.value = selCarrera.value;
        errorPaso2.hidden = true;
        renderAsignaturas();
    });

    // PASO 1 -> PASO 2
    form1.addEventListener("submit", e => {
        e.preventDefault();
        const f = new FormData(form1);

        datos = {
            nombre: f.get("nombre").trim(),
            email: f.get("email").trim().toLowerCase(),
            telefono: f.get("telefono"),
            fecha: f.get("fecha_nac"),
            carrera: f.get("carrera"),
            comentarios: f.get("comentarios").trim()
        };

        if (selCarrera.value !== datos.carrera) {
            selCarrera.value = datos.carrera;
            seleccion.clear();
        }

        mensajeWizard.hidden = true;
        errorPaso2.hidden = true;
        renderAsignaturas();
        irAPaso(2);
    });

    // PASO 2 -> PASO 1
    document.getElementById("btn-atras").addEventListener("click", () => irAPaso(1));

    // PASO 2 -> PASO 3
    form2.addEventListener("submit", e => {
        e.preventDefault();

        if (seleccion.size === 0) {
            errorPaso2.textContent = "Selecciona al menos una asignatura para continuar.";
            errorPaso2.hidden = false;
            return;
        }

        const carrera = selCarrera.value;
        const asignaturas = CATALOGO[carrera]
            .filter(nombre => seleccion.has(nombre))
            .map(nombre => ({
                nombre,
                turno: seleccion.get(nombre),
                horario: HORARIOS[seleccion.get(nombre)]
            }));

        datos.carrera = carrera;
        inscripcion = { ...datos, asignaturas };
        renderRevision();
        irAPaso(3);
    });

    // Muestra los datos a enviar y la tabla de asignaturas elegidas
    function renderRevision() {
        document.getElementById("rev-inicial").textContent = inscripcion.nombre.charAt(0).toUpperCase();
        document.getElementById("rev-nombre").textContent = inscripcion.nombre;
        document.getElementById("rev-carrera").textContent = inscripcion.carrera;
        document.getElementById("rev-email").textContent = inscripcion.email;
        document.getElementById("rev-telefono").textContent = inscripcion.telefono;
        document.getElementById("rev-fecha").textContent = formatearFecha(inscripcion.fecha);
        document.getElementById("rev-comentarios").textContent = inscripcion.comentarios || "Sin comentarios";
        document.getElementById("rev-total").textContent = inscripcion.asignaturas.length;

        const cuerpo = document.querySelector("#tabla-resumen tbody");
        cuerpo.textContent = "";
        inscripcion.asignaturas.forEach(a => {
            const tr = document.createElement("tr");

            const th = document.createElement("th");
            th.scope = "row";
            th.textContent = a.nombre;
            tr.appendChild(th);

            const tdTurno = document.createElement("td");
            const etiquetaTurno = document.createElement("span");
            etiquetaTurno.className = "turno " + CLASE_TURNO[a.turno];
            etiquetaTurno.textContent = a.turno;
            tdTurno.appendChild(etiquetaTurno);
            tr.appendChild(tdTurno);

            const tdHorario = document.createElement("td");
            tdHorario.textContent = a.horario;
            tr.appendChild(tdHorario);

            cuerpo.appendChild(tr);
        });
    }

    // PASO 3: Editar (vuelve al paso 2 conservando lo elegido)
    document.getElementById("btn-editar-seleccion").addEventListener("click", () => {
        mensajeWizard.hidden = true;
        irAPaso(2);
    });

    // PASO 3: Cancelar (descarta todo)
    document.getElementById("btn-cancelar-inscripcion").addEventListener("click", () => {
        if (!confirm("¿Cancelar la inscripción? Se perderán los datos ingresados.")) return;
        reiniciarDatos();
        irAPaso(1);
        mostrar(mensajeWizard, "Inscripción cancelada. No se guardó ningún dato.", false);
    });

    // PASO 3: Confirmar (muestra la pantalla final)
    document.getElementById("btn-confirmar").addEventListener("click", () => {
        if (!inscripcion) return;

        const n = inscripcion.asignaturas.length;
        const cantidad = n === 1 ? "1 asignatura" : `${n} asignaturas`;

        document.getElementById("exito-texto").textContent =
            `Gracias, ${inscripcion.nombre}. Recibimos tu preinscripción a ${inscripcion.carrera} con ${cantidad}. ` +
            `Te contactaremos a ${inscripcion.email} para los siguientes pasos.`;
        document.getElementById("exito-codigo").textContent = generarCodigo();

        reiniciarDatos();
        mensajeWizard.hidden = true;
        irAPaso(4);
    });

    // Pantalla final: empezar de nuevo
    document.getElementById("btn-nueva").addEventListener("click", () => irAPaso(1));

    function reiniciarDatos() {
        form1.reset();
        seleccion.clear();
        tbodyAsig.textContent = "";
        datos = null;
        inscripcion = null;
    }
});
