// ==================== CONTROL DE NAVEGACIÓN ENTRE SECCIONES ====================
const portada = document.getElementById('portada');
const marquesinaSec = document.getElementById('marquesinaSection');
const carruselSec = document.getElementById('carruselSection');
const blogSec = document.getElementById('blogSection');

// Botones desde portada
const btnMarquesina = document.getElementById('btnMarquesina');
const btnCarrusel = document.getElementById('BtnCarrusel');
const btnBlog = document.getElementById('btnBlog');

// Botones cerrar de cada sección
const cerrarMarquesina = document.querySelector('.cerrarMarquesina');
const cerrarCarrusel = document.querySelector('.cerrarCarrusel');
const cerrarBlog = document.querySelector('.cerrarBlog');

// Función para ocultar todas las secciones especiales y mostrar portada
function mostrarPortada() {
    portada.style.display = 'flex';      // portada es flex por defecto
    marquesinaSec.style.display = 'none';
    carruselSec.style.display = 'none';
    blogSec.style.display = 'none';
    // Reiniciar animación de marquesina (si es necesario)
    reiniciarMarquesinaSiVisible();
}

function mostrarSeccion(seccion) {
    portada.style.display = 'none';
    marquesinaSec.style.display = 'none';
    carruselSec.style.display = 'none';
    blogSec.style.display = 'none';
    seccion.style.display = 'block';
    if (seccion === marquesinaSec) {
        iniciarMarquesina();
    }
    if (seccion === carruselSec) {
        // Asegurar carrusel en slide correcto
        actualizarCarruselPorIndice();
    }
}

// Eventos de los botones de portada
btnMarquesina.addEventListener('click', () => mostrarSeccion(marquesinaSec));
btnCarrusel.addEventListener('click', () => mostrarSeccion(carruselSec));
btnBlog.addEventListener('click', () => mostrarSeccion(blogSec));

// Eventos cerrar
cerrarMarquesina.addEventListener('click', mostrarPortada);
cerrarCarrusel.addEventListener('click', mostrarPortada);
cerrarBlog.addEventListener('click', mostrarPortada);

// ==================== MARQUESINA TEXTO DINÁMICO ====================
const mensajesSubmarinos = [
    "🐙 El pulpo tiene tres corazones y sangre azul. ¡Asombroso! 🌊",
    "🐠 Los caballitos de mar son los únicos donde el macho da a luz. ✨",
    "🌊 El océano produce más del 50% del oxígeno del planeta. 🌍",
    "🐢 Las tortugas marinas pueden vivir más de 100 años. 💚",
    "🪸 Los arrecifes de coral son el hogar del 25% de especies marinas.",
    "🐬 Los delfines se llaman por un nombre único entre ellos. 🐬",
    "🦑 El calamar gigante tiene el ojo más grande del reino animal.",
    "🌟 La fosa de las Marianas es el punto más profundo de la Tierra.",
    "🧽 Las esponjas marinas existen desde hace 600 millones de años.",
    "🌊 Medusas pueden clonarse a sí mismas cuando envejecen."
];

function iniciarMarquesina() {
    const contenedorTexto = document.getElementById('marquesinaTexto');
    if (!contenedorTexto) return;
    // Crear contenido duplicado para efecto infinito (2 repeticiones)
    let textoCompleto = mensajesSubmarinos.map(msg => `  ✨ ${msg}  ✨  `).join('   ⚓   ');
    // duplicamos para que el desplazamiento sea continuo
    const dobleTexto = textoCompleto + '   🐚   ' + textoCompleto;
    contenedorTexto.innerHTML = dobleTexto;
    // asegurar animación running
    contenedorTexto.style.animation = 'desplazar 28s linear infinite';
}

function reiniciarMarquesinaSiVisible() {
    if (marquesinaSec.style.display === 'block') {
        iniciarMarquesina();
    }
}

// ==================== CARRUSEL DE FOTOS SUBMARINAS (IMÁGENES REALES) ====================
const imagenesSubmarinas = [
    "https://images.unsplash.com/photo-1570481662006-a3a1374699e8?w=900&auto=format",  // tortuga
    "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?w=900&auto=format",  // arrecife
    "https://images.unsplash.com/photo-1582721478779-0ae163c05a60?w=900&auto=format", // peces tropicales
    "https://images.unsplash.com/photo-1610288292079-7c3b6d1a8a3c?w=900&auto=format", // caballito
    "https://images.unsplash.com/photo-1551243261-2773c6f95fa4?w=900&auto=format",   // medusa
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=900&auto=format", // coral diverso
    "https://images.unsplash.com/photo-1590859808308-3d2d9c515b2e?w=900&auto=format"   // ballena
];

let currentIndex = 0;
let track = document.getElementById('carouselTrack');
let indicadoresDiv = document.getElementById('indicadores');

function crearCarrusel() {
    if (!track) return;
    track.innerHTML = '';
    imagenesSubmarinas.forEach((imgUrl, idx) => {
        const slide = document.createElement('div');
        slide.classList.add('carousel-slide');
        const img = document.createElement('img');
        img.src = imgUrl;
        img.alt = `Vida submarina ${idx+1}`;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        slide.appendChild(img);
        track.appendChild(slide);
    });
    actualizarIndicadores();
    actualizarPosicionCarrusel();
}

function actualizarIndicadores() {
    indicadoresDiv.innerHTML = '';
    for (let i = 0; i < imagenesSubmarinas.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === currentIndex) dot.classList.add('activo');
        dot.addEventListener('click', () => {
            currentIndex = i;
            actualizarPosicionCarrusel();
            actualizarIndicadores();
        });
        indicadoresDiv.appendChild(dot);
    }
}

function actualizarPosicionCarrusel() {
    if (!track) return;
    const anchoSlide = track.clientWidth / track.children.length; // pero mejor usar %: cada slide ocupa 100% del contenedor
    // El track tiene display flex y cada slide min-width 100%
    const desplazamiento = -currentIndex * 100;
    track.style.transform = `translateX(${desplazamiento}%)`;
}

function actualizarCarruselPorIndice() {
    actualizarPosicionCarrusel();
    actualizarIndicadores();
}

// Controles botones
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + imagenesSubmarinas.length) % imagenesSubmarinas.length;
        actualizarPosicionCarrusel();
        actualizarIndicadores();
    });
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % imagenesSubmarinas.length;
        actualizarPosicionCarrusel();
        actualizarIndicadores();
    });
}

// Ajustar al cambiar tamaño de ventana para que el carrusel no se deforme
window.addEventListener('resize', () => {
    if (carruselSec.style.display === 'block') {
        actualizarPosicionCarrusel();
    }
});

// Observador para cuando se muestre el carrusel, recalcular posición
const observerCarrusel = new MutationObserver((mutations) => {
    mutations.forEach((mut) => {
        if (mut.type === 'attributes' && mut.attributeName === 'style') {
            if (carruselSec.style.display === 'block') {
                actualizarPosicionCarrusel();
                actualizarIndicadores();
            }
        }
    });
});
observerCarrusel.observe(carruselSec, { attributes: true });

// ==================== INICIALIZAR TODO AL CARGAR ====================
document.addEventListener('DOMContentLoaded', () => {
    // Aseguramos portada visible
    mostrarPortada();
    // Crear slides del carrusel
    crearCarrusel();
    // Inicializar marquesina (aunque oculta, el contenido se genera para cuando se muestre)
    iniciarMarquesina();
    // Evento para detener animación cuando se oculta (opcional)
    // forzar scroll a portada si es necesario
    window.scrollTo(0, 0);
});