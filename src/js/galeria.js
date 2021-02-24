document.addEventListener('DOMContentLoaded', function() {
    crearGaleria();
});

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i<= 12; i++){
        const imagen = document.createElement('IMG');
        imagen.src = `build/img/thumb/${i}.webp`;
        imagen.dataset.imagenId = i;

        // añadir la funcion de mostrar imagen:
        imagen.onclick = mostrarImagen;

        const lista = document.createElement('li');
        lista.appendChild(imagen);

        galeria.appendChild(lista);
    }
}

function mostrarImagen(e){
    // convertir el id a numero:
    const id = parseInt( e.target.dataset.imagenId );

    // generar la imagen:
    const imagen = document.createElement('img');
    imagen.src = `build/img/grande/${id}.webp`;

    const overlay  = document.createElement('div');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    // cuando se da click, cerrar la imagen:
    overlay.onclick = function(){
        overlay.remove();
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
    }

    // boton para cerrar la imagen:
    const cerrarImagen = document.createElement('p');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');

    // cuando se presiona, se cierra la imagen:
    cerrarImagen.onclick = function(){
        overlay.remove();
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
    }

    overlay.appendChild(cerrarImagen);

    // mostrar en el HTML:
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}