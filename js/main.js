function encriptarTexto(){
    const texto = document.getElementById('texto').value;       

    if (!filtrarTexto(texto)) {
        return; 
    }
    
    const letras = {
        'a': 'ai',
        'e': 'enter',
        'i': 'imes',
        'o': 'ober',
        'u': 'ufat'
    }

    let textoEncriptado = texto.split('').map(function(char){
        return letras[char] || char;
    }).join('');
    
    modificarElemento('.aside', `<div class="aside-div2">
        <p class="texto-encriptado">${textoEncriptado}</p>
        <a onclick="copiar()" class="boton-copiar" href="">Copiar</a>
        </aside>`);
}

function desencriptarTexto(){
    const texto = document.getElementById('texto').value;  
    
    if (!filtrarTexto(texto)) {
        return; 
    }
    
     const textoDesencriptado = texto.replace(/ai/g, 'a').replace(/enter/g, 'e')
     .replace(/imes/g, 'i').replace(/ober/g, 'o').replace(/ufat/g, 'u'); 

    modificarElemento('.aside', `<div class="aside-div2">
        <p class="texto-encriptado">${textoDesencriptado}</p>
        <a onclick="copiar()" class="boton-copiar" href="">Copiar</a>
        </aside>`);
}

function modificarElemento(elemento, texto) {
    let elemtoHTML = document.querySelector(elemento);
    elemtoHTML.innerHTML = texto;
}

function quitarObjeto() {
    const minWidth = 951;
    const windowWidth = window.innerWidth;

    const imagen = document.getElementById('cuadro-imagen');

    if (windowWidth < minWidth && imagen) {
        imagen.remove();
    } else if (windowWidth >= minWidth && !imagen) {
        const asideDiv = document.querySelector('.aside-div');
        const recuperarImagen = document.createElement('img');
        recuperarImagen.src = 'assets/img/Muñeco.png';
        recuperarImagen.id = 'cuadro-imagen';
        recuperarImagen.alt = 'dibujo de una persona con una lupa';
        recuperarImagen.className = 'imagen';
        asideDiv.insertBefore(recuperarImagen, asideDiv.firstChild);
    }
}

window.addEventListener('resize', quitarObjeto);
window.addEventListener('load', quitarObjeto);


function copiar() {
    const texto = document.querySelector('.texto-encriptado').innerText;
    navigator.clipboard.writeText(texto)
    .then(() => {
        alert("Texto copiado al portapapeles");
    });
}

function filtrarTexto(texto) {
    if (texto === "") {
        modificarElemento('.aside', `<div class="aside-div">
            <p class="aside-mensaje">Escribe un texto que no contenga mayúsculas, tildes o caracteres especiales.</p>
        </div>`);
        return; 
    }

    if (/[A-Z]/.test(texto)) {
        alert("El texto no debe contener letras mayúsculas.");
        return;
    }

    if (/[^a-z\s]/.test(texto)) {
        alert("El texto no debe contener tildes ni caracteres especiales.");
        return;
    }

    return true; 
}


