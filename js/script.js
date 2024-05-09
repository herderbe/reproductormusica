let audio = document.getElementById('audio')
let imagen = document.getElementById('imagen')
let numCancion = document.querySelector('.nu')

let nomCancion =document.querySelector('.nombre-cancion')
let nomArtista = document.querySelector('.nombre-artista')
let duracionActual = document.getElementById('duracionActual')
let rango = document.getElementById('rango')

let anteriorCan = document.getElementById('prevent')
let siguienteCan = document.getElementById('next')
let duracion =document.getElementById('duracion')
let btnPlay = document.getElementById('play')
let btnPause = document.getElementById('pause')

let volumen = document.getElementById('vol')
let contadorVolumen = document.getElementById('numVolumen')

// creacino de la lista de canciones
let indexCancion = 0
let canciones = [
    {
        "nombre": "Darkside",
        "artista": "Alan Walker",
        "url":"musicas/Darkside.mp3",
        "img":"img/Darkside.jpg"
    }
    ,
    {
        "nombre": "Royalty",
        "artista": "Wiguez, Alltair",
        "url":"musicas/Royalty.mp3",
        "img":"img/Royalty.jpg"
    },
    {
        "nombre": "Give Up",
        "artista": "Shiah Maisel, Clarx",
        "url":"musicas/Give Up.mp3",
        "img":"img/Give Up.jpg"
    },
    {
        "nombre": "Faded",
        "artista": "Alan Walker",
        "url":"musicas/Faded.mp3",
        "img":"img/Faded.jpg"
    },
    {
        "nombre": "The Spectre",
        "artista": "Alan Walker",
        "url":"musicas/The Spectre.mp3",
        "img":"img/The Spectre.jpg"
    },
    {
        "nombre": "Arcade",
        "artista": "Duncan Laurence",
        "url":"musicas/Arcade.mp3",
        "img":"img/Arcade.jpg"
    }
]

// mostrar los elementos como imagen entre otros
function musica(canciones){
    numCancion.textContent = indexCancion + 1
    imagen.src = canciones.img
    nomCancion.textContent = canciones.nombre
    nomArtista.textContent = canciones.artista
    audio.src =`musicas/${canciones.nombre}.mp3`
    audio.addEventListener('loadedmetadata',()=>{
        tiempo(audio.duracion,duracion)
    })
}
musica(canciones[indexCancion])

// inicial en audio
function play(){
    btnPlay.classList.add('cambio')
    btnPause.classList.remove('cambio')
    audio.play()
}

// pausar el audio
function pause(){
    btnPlay.classList.remove('cambio')
    btnPause.classList.add('cambio')
    audio.pause()
}

// mostrar el tiempo total de audio
function tiempo(){
    let tiempoCancion = Math.round(audio.duration)
    let minutos = Math.floor(tiempoCancion/60).toString().padStart(2,'0')
    let segundos = (tiempoCancion % 60).toString().padStart(2,'0')
    duracion.textContent = `${minutos}:${segundos}`
}

// calcular el tiempo actual del audio y mostrar
function tiempoActual(audi,elemento){
    let tiempoCancion = Math.round(audi)
    let minutos = Math.floor(tiempoCancion/60).toString().padStart(2,'0')
    let segundos = (tiempoCancion % 60).toString().padStart(2,'0')
    elemento.textContent = `${minutos}:${segundos}`
}

// retroceder a la cancion anterior
function anterior(){
    if(indexCancion > 0){
        indexCancion -= 1
        musica(canciones[indexCancion])
        play()
    }else{
        indexCancion = canciones.length - 1;
        musica(canciones[indexCancion])
        play()
    }   
}
// avanzar a la siguenete cancion
function siguente(){
    if(indexCancion < canciones.length -1){
        indexCancion += 1
        musica(canciones[indexCancion])
        play()
    }else{
        indexCancion = 0
        musica(canciones[indexCancion])
        play()
    }   
}

// mostrar bara de progero de la concion
function progreso(){
    let actual = ((audio.currentTime/audio.duration)*100)
    rango.value = actual
}
setInterval(progreso,1000)

// adelantar o retroceder  la cancion 
rango.addEventListener('input', function(event) {
    const percentage = event.target.value;

    const duration = audio.duration;
    const nuevoTiempo = (percentage / 100) * duration;

    audio.currentTime = nuevoTiempo;
})
// subir o bajar volumen
volumen.addEventListener('input',()=>{
    const contVolume = document.querySelector('.volumen')
    const iconoVolumen = contVolume.querySelector('i')
    contadorVolumen.textContent = `${volumen.value}%`
    let vol = volumen.value/100
    audio.volume = vol
    if (volumen.value > 0) {
        iconoVolumen.classList.replace('bx-volume-mute','bx-volume')
    }else{
        iconoVolumen.classList.replace('bx-volume','bx-volume-mute')
    }
    if (volumen.value > 40) {
        iconoVolumen.classList.replace('bx-volume','bx-volume-low')
    }else{
        iconoVolumen.classList.replace('bx-volume-low','bx-volume')
    }
    if (volumen.value > 60) {
        iconoVolumen.classList.replace('bx-volume-low','bx-volume-full')
    }else{
        iconoVolumen.classList.replace('bx-volume-full','bx-volume-low')
    }
})
btnPlay.addEventListener('click', play)
btnPause.addEventListener('click',pause)
anteriorCan.addEventListener('click',anterior)
siguienteCan.addEventListener('click',siguente)
audio.addEventListener('ended',siguente)
audio.addEventListener('timeupdate',()=>{
    tiempoActual(audio.currentTime,duracionActual)
})