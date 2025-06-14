document.addEventListener('DOMContentLoaded', () => {
    const departamentoSelect = document.getElementById('departamento');
    const municipioSelect = document.getElementById('municipio');
    const cotizarBtn = document.getElementById('cotizar-btn');
    const coberturaBtn = document.getElementById('cobertura-btn');
    const coberturaDropdown = document.getElementById('cobertura-dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const serviceItems = document.querySelectorAll('.service-item');

    const datosColombia = {
        "Cundinamarca": ["Bogotá D.C.", "Zipaquirá", "Chía", "Cajicá", "Sopó", "Tabio", "Tenjo", "Facatativá", "Madrid", "Mosquera", "Funza", "Soacha", "Fusagasugá", "Girardot", "Villapinzón", "Simijaca"],
        "Antioquia": ["Medellín", "Envigado", "Itagüí", "Sabaneta", "La Estrella", "Rionegro", "Caldas", "Bello"],
        "Valle del Cauca": ["Cali", "Palmira", "Buga", "Cartago", "Jamundí", "Yumbo"],
        "Santander": ["Bucaramanga", "Floridablanca", "Girón", "Piedecuesta", "Barrancabermeja"],
        "Atlántico": ["Barranquilla", "Soledad", "Malambo", "Puerto Colombia"]
        // Agrega más departamentos y municipios según tu cobertura
    };

    function cargarDepartamentos() {
        departamentoSelect.innerHTML = '<option value="">Selecciona un departamento</option>';
        for (const depto in datosColombia) {
            const option = document.createElement('option');
            option.value = depto;
            option.textContent = depto;
            departamentoSelect.appendChild(option);
        }
        departamentoSelect.disabled = false;
    }

    departamentoSelect.addEventListener('change', () => {
        const selectedDepto = departamentoSelect.value;
        municipioSelect.innerHTML = '<option value="">Selecciona un municipio</option>';
        municipioSelect.disabled = true;
        cotizarBtn.disabled = true;

        if (selectedDepto) {
            const municipios = datosColombia;
            if (municipios && municipios.hasOwnProperty(selectedDepto)) {
                municipios[`${selectedDepto}`].forEach(municipio => {
                    const option = document.createElement('option');
                    option.value = municipio;
                    option.textContent = municipio;
                    municipioSelect.appendChild(option);
                });
                municipioSelect.disabled = false;
            }
        }
    });

    municipioSelect.addEventListener('change', () => {
        cotizarBtn.disabled = !(municipioSelect.value && departamentoSelect.value);
    });

    cotizarBtn.addEventListener('click', () => {
        const depto = departamentoSelect.value;
        const muni = municipioSelect.value;
        if (depto && muni) {
            alert(`Vas a cotizar una mudanza en: ${muni}, ${depto}. Redirigiendo a formulario...`);
            coberturaDropdown.style.display = 'none';
            dropdownMenu.classList.remove('active');
        } else {
            alert('Por favor, selecciona un departamento y un municipio.');
        }
    });

    coberturaBtn.addEventListener('click', (event) => {
        event.preventDefault();
        dropdownMenu.classList.toggle('active');
        coberturaDropdown.style.display = dropdownMenu.classList.contains('active') ? 'block' : 'none';
        const arrow = coberturaBtn.querySelector('.arrow-down');
        if (arrow) {
            arrow.style.transform = dropdownMenu.classList.contains('active') ? 'rotate(225deg)' : 'rotate(45deg)';
        }
    });

    document.addEventListener('click', (event) => {
        if (!dropdownMenu.contains(event.target) && event.target !== coberturaBtn) {
            dropdownMenu.classList.remove('active');
            coberturaDropdown.style.display = 'none';
            const arrow = coberturaBtn.querySelector('.arrow-down');
            if (arrow) arrow.style.transform = 'rotate(45deg)';
        }
    });

    // Función para verificar si un elemento está en la vista
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Función para añadir la clase de animación a los elementos de servicio
    function checkServices() {
        serviceItems.forEach(item => {
            if (isInViewport(item)) {
                item.classList.add('animated');
            }
        });
    }

    // Escuchar el evento de scroll para activar las animaciones de los servicios
    window.addEventListener('scroll', checkServices);
    window.addEventListener('resize', checkServices); // También verificar en caso de redimensionar la ventana

    cargarDepartamentos();
    checkServices(); // Verificar al cargar la página también
});
