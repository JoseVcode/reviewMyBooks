const archivoID = '1GsoDIZa2hA34q_3wpaoBhln3UKTPuSti';
const archivoURL = `https://drive.google.com/uc?export=download&id=${archivoID}`; // Enlace de descarga directa

const proxyURL = 'https://api.allorigins.win/get?url='; // Si no uso esto, drive me bloquea el acceso con fetch
const fullURL = proxyURL + encodeURIComponent(archivoURL);

function init() {
    loadBooks();
}

function loadBooks() {
    fetch(fullURL)
    .then(response => response.json())  // Parseamos la respuesta como JSON
    .then(data => {
        const base64Content = data.contents.replace(/^data:application\/octet-stream;base64,/, ''); // Eliminar el prefijo 'data:application/octet-stream;base64,' si existe
        const decodedBinary = atob(base64Content); // Decodificamos el contenido base64 a una cadena binaria
        const decodedContent = new TextDecoder('utf-8').decode(new Uint8Array([...decodedBinary].map(char => char.charCodeAt(0)))); // Convertimos la cadena binaria a un texto utilizando TextDecoder
  
        showBooks(JSON.parse(decodedContent));
    })
    .catch(error => {
        showBooks([{ "titulo": "Error", "reseña": "No se pudo cargar el archivo." }]);
    });
}

function showBooks(books) {
    const booksDiv = document.getElementById('showBooks');
    booksDiv.innerHTML = '';
  
    books.forEach((book, index) => {
      const div = document.createElement('div');
      div.innerHTML = `
        <h3>Reseña del libro #${index + 1}</h3>
        <p><strong>Título:</strong> ${book.titulo}</p>
        <p><strong>Reseña:</strong> ${book.reseña}</p>
        <hr>
      `;
      booksDiv.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', init);
