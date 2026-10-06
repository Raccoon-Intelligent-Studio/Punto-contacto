const botonMenu = document.getElementById('botonMenu');
const nav = document.querySelector('nav');

botonMenu.addEventListener('click', () => {
    nav.classList.toggle('abierto');
});
