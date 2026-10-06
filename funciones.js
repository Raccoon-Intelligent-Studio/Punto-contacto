const video = document.getElementById('videoFondo');
const boton = document.getElementById('botonVideo');

video.addEventListener( 'ended', () => {
    boton.textContent = '▶';
});

boton.addEventListener('click', () => {
    if (video.paused || video.ended) {
        video.play();
        boton.textContent = '⏸';
    } else {
        video.pause();
        boton.textContent = '▶';
    }
});

const logo = document.querySelector('.logo');

logo.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.reload();
});
