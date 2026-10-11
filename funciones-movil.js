/* ---------- MENÚ HAMBURGUESA ---------- */
const botonMenu = document.getElementById('botonMenu');
const nav = document.querySelector('nav');

function alternarMenu(abrir) {
    nav.classList.toggle('abierto', abrir);
    document.body.classList.toggle('menu-abierto', abrir);
    botonMenu.textContent = abrir ? '✕' : '☰';
    botonMenu.setAttribute('aria-expanded', abrir);
}

botonMenu.addEventListener('click', () => {
    alternarMenu(!nav.classList.contains('abierto'));
});
/* ---------- FIN DE LA FUNCION BOTÓN ----------- */

// Al tocar un enlace del menú, se cierra
nav.querySelectorAll('a').forEach((enlace) => {
    enlace.addEventListener('click', () => alternarMenu(false));
});


/* ---------- APARICIÓN AL DESLIZAR LA PÁGINA ---------- */
const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !reducirMovimiento) {
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visible');
                observador.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });

    document
        .querySelectorAll('.carrusel-seccion, .productos > h2, .producto')
        .forEach((elemento) => {
            elemento.classList.add('reveal');
            observador.observe(elemento);
        });
}


/* ---------- TEXTO DEL CARRUSEL: SE DESVANECE AL DESLIZAR ---------- */
const carrusel = document.querySelector('.carrusel');
const tarjetas = document.querySelectorAll('.carrusel-item');
let actualizando = false;

function actualizarTextos() {
    actualizando = false;
    const caja = carrusel.getBoundingClientRect();
    const centro = caja.left + caja.width / 2;

    tarjetas.forEach((tarjeta) => {
        const r = tarjeta.getBoundingClientRect();
        // 0 = tarjeta centrada, 1 = a una tarjeta de distancia
        const distancia = Math.abs((r.left + r.width / 2) - centro) / r.width;
        const visibilidad = Math.max(0, 1 - distancia * 2);
        tarjeta.style.setProperty('--texto', visibilidad.toFixed(3));
    });
}

if (carrusel) {
    carrusel.addEventListener('scroll', () => {
        if (!actualizando) {
            actualizando = true;
            requestAnimationFrame(actualizarTextos);
        }
    }, { passive: true });

    window.addEventListener('resize', actualizarTextos);
    actualizarTextos();
}

/* ---------- DETALLE DEL PRODUCTO ("Ver más") ---------- */
const detalle = document.getElementById('detalle');
const detalleImagen = document.getElementById('detalleImagen');
const detalleTitulo = document.getElementById('detalleTitulo');
const detalleDescripcion = document.getElementById('detalleDescripcion');
const detalleVolver = document.getElementById('detalleVolver');

function abrirDetalle(tarjeta) {
    const titulo = tarjeta.querySelector('h2').textContent;

    detalleImagen.src = tarjeta.querySelector('img').src;
    detalleImagen.alt = titulo;
    detalleTitulo.textContent = titulo;
    detalleDescripcion.textContent = tarjeta.querySelector('p').textContent;

    detalle.scrollTop = 0;
    detalle.classList.add('abierto');
    detalle.setAttribute('aria-hidden', 'false');
    document.body.classList.add('detalle-abierto');

    history.pushState({ detalle: true }, '');
}

function cerrarDetalle() {
    detalle.classList.remove('abierto');
    detalle.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('detalle-abierto');
}

// Cada botón "Ver más" abre el detalle de SU tarjeta
document.querySelectorAll('.carrusel-item button').forEach((boton) => {
    boton.addEventListener('click', () => {
        abrirDetalle(boton.closest('.carrusel-item'));
    });
});

// La flechita y el botón "atrás" del teléfono cierran el detalle
detalleVolver.addEventListener('click', () => history.back());
window.addEventListener('popstate', cerrarDetalle);


