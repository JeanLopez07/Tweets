const listaTweets = document.querySelector('#lista-tweets');
const formulario = document.querySelector('#formulario');
let tweets = [];

// Llama a la función para configurar los event listeners
eventListeners();

function eventListeners() {
    // Agrega un event listener para el formulario de agregar tweet
    formulario.addEventListener('submit', agregarTweet);
    // Agrega un event listener cuando se carga el DOM para cargar los tweets desde el almacenamiento local
    document.addEventListener('DOMContentLoaded', () => {
        // Obtiene los tweets almacenados en el localStorage o crea un array vacío si no hay ninguno
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        // Crea el HTML para mostrar los tweets
        crearHTML();
    });
}

function agregarTweet(evento) {
    // Evita el comportamiento por defecto del formulario
    evento.preventDefault();
    // Obtiene el valor del tweet del textarea
    const tweet = document.querySelector('#tweet').value.trim(); // Trim elimina los espacios en blanco al inicio y al final

    // Valida si el tweet está vacío
    if (tweet === '') {
        mostrarError('Por favor, ingrese un tweet.');
        return;
    }

    // Crea un objeto tweet con un ID único y el texto del tweet
    const tweetObj = {
        id: Date.now(),
        texto: tweet
    };

    // Agrega el nuevo tweet al array de tweets
    tweets.push(tweetObj);

    // Crea el HTML para mostrar los tweets actualizados
    crearHTML();

    // Limpia el formulario
    formulario.reset();
}

function mostrarError(error) {
    // Crea un elemento de párrafo para mostrar el error
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Inserta el mensaje de error en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Después de 3 segundos, elimina el mensaje de error
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

function crearHTML() {
    // Limpia el HTML de la lista de tweets
    limpiarHTML();

    // Verifica si hay tweets para mostrar
    if (tweets.length > 0) {
        // Recorre cada tweet y crea un elemento de lista para cada uno
        tweets.forEach(tweet => {
            // Crea un elemento de lista para el tweet
            const li = document.createElement('li');
            li.textContent = tweet.texto;
            li.dataset.tweetId = tweet.id;

            // Adjunta el elemento de lista a la lista de tweets
            listaTweets.appendChild(li);
        });
    }

    // Sincroniza los tweets con el almacenamiento local
    sincronizarStorage();
}

function abrirTweet(e) {
    // Obtiene el tweet que se hizo clic
    const tweet = e.target;

    // Muestra el ID del tweet en la consola
    console.log('Tweet abierto con ID:', tweet.dataset.tweetId);
}

function sincronizarStorage() {
    // Guarda los tweets en el localStorage como una cadena JSON
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function limpiarHTML() {
    // Limpia el contenido de la lista de tweets
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

