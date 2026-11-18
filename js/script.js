document.addEventListener("DOMContentLoaded", () => {

    // ====================================================================================
    // Referencias a la tabla de horarios presentada en los servicios
    // ====================================================================================
    const tbody = document.querySelector("#tabla-inscripciones tbody");
    const selectCarrera = document.getElementById("filtro-carrera");
    const selectTurno = document.getElementById("filtro-turno");
    const inputTexto = document.getElementById("filtro-texto");
    const spanTotal = document.getElementById("total-registros");
    const spanGeneral = document.getElementById("total-general");
    const msgSinResultados = document.getElementById("sin-resultados");

    // ==========================================
    // FLUJO 1: Agregar un registro a la tabla (formulario de inscripcion.html)
    // ==========================================
    const formInscripcion = document.getElementById("form-inscripcion");
    if (formInscripcion) {
        formInscripcion.addEventListener("submit", function (e) {
            e.preventDefault();

            const nombre = document.getElementById("nombre").value;
            const carrera = document.getElementById("carrera").value;
            const telefono = document.getElementById("telefono").value;

            if (nombre.trim() === "" || telefono.length < 13) {
                alert("Error de validación: Verifique que el nombre esté completo y el teléfono tenga el formato correcto.");
                return;
            }

            if (tbody) {
                const nuevaFila = document.createElement("tr");
                nuevaFila.setAttribute("data-carrera", carrera);
                nuevaFila.setAttribute("data-turno", "Mañana");
                nuevaFila.innerHTML = `
                    <th scope="row">${nombre} (Inscrito)</th>
                    <td>${carrera}</td>
                    <td>Mañana</td>
                    <td>08:00 - 12:00 hs</td>
                `;
                tbody.appendChild(nuevaFila);
                aplicarFiltros();
            }

            alert("¡Inscripción registrada exitosamente!");
            formInscripcion.reset();
        });
    }

    // Si no estamos en la página con la tabla, no hay nada más que configurar
    if (!tbody) return;

    // ==========================================
    // FLUJO 2 + 5: Filtrar por carrera, turno y nombre, y recalcular el contador
    // Los tres filtros se combinan entre sí. (esto es para servicios)
    // ==========================================
    function aplicarFiltros() {
        const carrera = selectCarrera ? selectCarrera.value : "todos";
        const turno = selectTurno ? selectTurno.value : "todos";
        const texto = inputTexto ? inputTexto.value.trim().toLowerCase() : "";

        const filas = tbody.querySelectorAll("tr");
        let visibles = 0;

        filas.forEach(fila => {
            const coincideCarrera = carrera === "todos" || fila.dataset.carrera === carrera;
            const coincideTurno = turno === "todos" || fila.dataset.turno === turno;
            const nombre = fila.cells[0].textContent.toLowerCase();
            const coincideTexto = texto === "" || nombre.includes(texto);

            const mostrar = coincideCarrera && coincideTurno && coincideTexto;
            fila.hidden = !mostrar;
            if (mostrar) visibles++;
        });

        if (spanTotal) spanTotal.textContent = visibles;
        if (spanGeneral) spanGeneral.textContent = filas.length;
        if (msgSinResultados) msgSinResultados.hidden = visibles !== 0;
    }

    [selectCarrera, selectTurno].forEach(el => {
        if (el) el.addEventListener("change", aplicarFiltros);
    });
    if (inputTexto) inputTexto.addEventListener("input", aplicarFiltros);

    // ==========================================
    // FLUJO 3: Ordenar alfabéticamente (A-Z / Z-A) (para servicios)
    // ==========================================
    const btnOrdenar = document.getElementById("btn-ordenar");
    let ascendente = true;

    if (btnOrdenar) {
        btnOrdenar.addEventListener("click", function () {
            const filas = Array.from(tbody.querySelectorAll("tr"));

            filas.sort((a, b) => {
                const resultado = a.cells[0].textContent.trim()
                    .localeCompare(b.cells[0].textContent.trim(), "es");
                return ascendente ? resultado : -resultado;
            });

            filas.forEach(fila => tbody.appendChild(fila));

            ascendente = !ascendente;
            btnOrdenar.textContent = ascendente ? "Ordenar A-Z" : "Ordenar Z-A";
        });
    }

    // ==========================================
    // FLUJO 4: Limpiar filtros (vuelve a mostrar todos los registros, para servicios)
    // ==========================================
    const btnLimpiar = document.getElementById("btn-limpiar");
    if (btnLimpiar) {
        btnLimpiar.addEventListener("click", function () {
            if (selectCarrera) selectCarrera.value = "todos";
            if (selectTurno) selectTurno.value = "todos";
            if (inputTexto) inputTexto.value = "";
            aplicarFiltros();
        });
    }

    // Cálculo inicial del contador
    aplicarFiltros();
});
