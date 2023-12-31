const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')

const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota') 

const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null
let enemigoId = null
let pokemones = []
let pokemonesEnemigos= []
let ataqueJugador = []
let ataqueEnemigo =[]
let opciondePokemones
let inputSquirtle 
let inputCubone 
let inputCharmander
let mascotaJugador
let mascotaJugadorObjeto
let ataquesPokemon
let ataquesPokemonEnemigo
let botonFuego 
let botonAgua 
let botonTierra 
let botones = []
let indexAtaqueJugador 
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/pokemap.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth -20
const anchoMaximoDelMapa = 350

if(anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa
}


alturaQueBuscamos = anchoDelMapa * 600 / 800
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Pokemon {
    constructor(nombre, foto, vida, fotoMapa, id = null ) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarPokemon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
          
          )    
    }
}

let Squirtle = new Pokemon('Squirtle','./assets/squirtle.png',5, './assets/squirtlemap.png')
let Bulbasaur = new Pokemon('Bulbasaur','./assets/bulbasaur.png',5, './assets/bulbasaurmap.png')
let Charmander = new Pokemon('Charmander','./assets/charmander.png',5, './assets/charmandermap.png')

const SQUIRTLE_ATAQUES = [
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra'},
]
Squirtle.ataques.push(...SQUIRTLE_ATAQUES)
   

const BULBASAUR_ATAQUES = [
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '🌱', id: 'boton-tierra'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-fuego'},
]

Bulbasaur.ataques.push(...BULBASAUR_ATAQUES)


const CHARMANDER_ATAQUES = [
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🌱', id: 'boton-tierra'},

]
Charmander.ataques.push(...CHARMANDER_ATAQUES)


pokemones.push(Squirtle,Bulbasaur,Charmander)
function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    pokemones.forEach((pokemon) => {
        opciondePokemones =` <input type="radio" name="mascota" id=${pokemon.nombre} />
        <label class="tarjeta-de-pokemon" for="${pokemon.nombre}">
            <p>${pokemon.nombre}</p>
            <img src=${pokemon.foto} alt="${pokemon.nombre}">
        </label>`
    contenedorTarjetas.innerHTML += opciondePokemones   
     inputSquirtle = document.getElementById('Squirtle')
     inputBulbasaur = document.getElementById('Bulbasaur')
     inputCharmander = document.getElementById('Charmander')
    

    })
  
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
   
    botonReiniciar.addEventListener('click', reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://192.168.100.15:8080/unirse")
    .then(function (res){
        if(res.ok){
            res.text()
                .then(function(respuesta){
                    console.log(respuesta)
                    jugadorId = respuesta
                })
        }
    })
}



function seleccionarMascotaJugador() {
    if (inputSquirtle.checked)  {
        spanMascotaJugador.innerHTML = inputSquirtle.id
        mascotaJugador = inputSquirtle.id
    } else if(inputBulbasaur.checked) {
        spanMascotaJugador.innerHTML = inputBulbasaur.id
        mascotaJugador = inputBulbasaur.id
    } else if(inputCharmander.checked) {
        spanMascotaJugador.innerHTML = inputCharmander.id
        mascotaJugador = inputCharmander.id
    } else {
        alert('Selecciona una Mascota')
        return
    }
    sectionSeleccionarMascota.style.display = 'none'
    seleccionarPokemon(mascotaJugador)
    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
    
    
}

function seleccionarPokemon(mascotaJugador){
    fetch(`http://192.168.100.15:8080/pokemon/${jugadorId}`, { method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({pokemon: mascotaJugador})
    })
}

function extraerAtaques(mascotaJugador){
    let ataques
    for (let i=0; i < pokemones.length; i++) {
        if (mascotaJugador === pokemones[i].nombre){
        ataques= pokemones[i].ataques

        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesPokemon = `
        <button id=${ataque.id} class="boton-de-ataque Bataque" >${ataque.nombre}</button>`
        contenedorAtaques.innerHTML += ataquesPokemon
    })
     botonFuego = document.getElementById('boton-fuego')
     botonAgua = document.getElementById('boton-agua')
     botonTierra = document.getElementById('boton-tierra')
     botones = document.querySelectorAll('.Bataque')



}

function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener('click', (e)=> {
            if(e.target.textContent === '🔥'){
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                 boton.disabled = true
            } else if (e.target.textContent === '💧'){
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else {
                    ataqueJugador.push('TIERRA')
                    console.log(ataqueJugador)
                    boton.style.background = '#112f58'
                    boton.disabled = true
            }
            if(ataqueJugador.length === 5) {
                enviarAtaques()
            }
           
        })
    })
}

function enviarAtaques() {
    fetch(`http://192.168.100.15:8080/pokemon/${jugadorId}/ataques`, {
        method: "post",
        headers: { 
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://192.168.100.15:8080/pokemon/${enemigoId}/ataques`)
        .then(function(res) {
            if(res.ok) {
                res.json()
                    .then(function ({ataques}) {
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques
                            combate()
                        } 
                    })     
                
            }
        })
    
}


function seleccionaMascotaEnemigo(enemigo) {
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesPokemonEnemigo = enemigo.ataques
    secuenciaAtaque()
}


function ataquealeatorioEnemigo() {
    console.log('ataque Enemigo',ataquesPokemonEnemigo)
    let ataqueAleatorio = aleatorio(0,ataquesPokemonEnemigo.length-1)

    if(ataqueAleatorio == 0 || ataqueAleatorio ==1){
        ataqueEnemigo.push('FUEGO')
    } else if(ataqueAleatorio == 3 || ataqueAleatorio ==4) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    iniciarPelea()

}

function iniciarPelea(){
    if(ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponente(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
} 

function combate() {
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) {
        indexAmbosOponente(index, index)
        crearMensaje("EMPATE") 
        } else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo[index] === 'TIERRA'){
            indexAmbosOponente(index, index) 
            crearMensaje("GANASTE") 
            victoriasJugador ++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if(ataqueJugador[index] === 'AGUA' && ataqueEnemigo[index] === 'FUEGO'){
            indexAmbosOponente(index, index) 
            crearMensaje("GANASTE") 
            victoriasJugador ++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if(ataqueJugador[index] === 'TIERRA' && ataqueEnemigo[index] === 'AGUA'){
            indexAmbosOponente(index, index) 
            crearMensaje("GANASTE") 
            victoriasJugador ++
        spanVidasJugador.innerHTML = victoriasJugador
        } else {
            indexAmbosOponente(index, index) 
            crearMensaje("PERDISTE") 
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }     
        
    }
 
    
       revisarVidas()
}

function revisarVidas() {
    if(victoriasJugador == victoriasEnemigo) {
        crearMensajeFinal("Esto fue un empate!!!")
    } else if(victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICITACIONES! Ganaste")
    } else {
        crearMensajeFinal('lo siento, perdiste :(')
    }
}

function crearMensaje(resultado) {
   
    
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo
    
   
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}
function crearMensajeFinal(resultadoFinal) {
    

    
    sectionMensajes.innerHTML = resultadoFinal

   

    
    sectionReiniciar.style.display = 'block'

}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min,max) {
    return Math.floor(Math.random() * (max-min +1) + min)
}

function pintarCanvas() {
     mascotaJugadorObjeto.x =  mascotaJugadorObjeto.x +  mascotaJugadorObjeto.velocidadX
     mascotaJugadorObjeto.y =  mascotaJugadorObjeto.y +  mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    
    mascotaJugadorObjeto.pintarPokemon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    pokemonesEnemigos.forEach(function(pokemon){
        pokemon.pintarPokemon()
        revisarColision(pokemon)
    })
    
    
      
}

function enviarPosicion(x, y){
    fetch(`http://192.168.100.15:8080/pokemon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function(res) {
        if(res.ok) {
            res.json()
                .then(function({enemigos}){
                    console.log(enemigos)
                    pokemonesEnemigos = enemigos.map(function(enemigo){
                        let pokemonEnemigo = null
                        const pokemonNombre = enemigo.pokemon.nombre||""
                        if(pokemonNombre === "Squirtle"){
                            pokemonEnemigo = new Pokemon('Squirtle','./assets/squirtle.png',5, './assets/squirtlemap.png', enemigo.id)  
                        }else if(pokemonNombre === "Bulbasaur"){
                            pokemonEnemigo = new Pokemon('Bulbasaur','./assets/bulbasaur.png',5, './assets/bulbasaurmap.png', enemigo.id)
                        }else if(pokemonNombre === "Charmander"){
                            pokemonEnemigo = new Pokemon('Charmander','./assets/charmander.png',5, './assets/charmandermap.png', enemigo.Id)

                        }
                        pokemonEnemigo.x = enemigo.x
                        pokemonEnemigo.y = enemigo.y

                        return pokemonEnemigo
                    })
                    
                    
                    
                })
        }
    })

}
 
function moverDerecha() {
    
    mascotaJugadorObjeto.velocidadX = 5
   
}

function moverIzquierda() {
   
    mascotaJugadorObjeto.velocidadX = -5
   
}

function moverAbajo() {
   
    mascotaJugadorObjeto.velocidadY = 5
   
}

function moverArriba() {

    mascotaJugadorObjeto.velocidadY = -5
   
}

function detenerMovimiento(){
   
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event){
    switch(event.key){
        case 'ArrowUp' :
            moverArriba()
            break
        case 'ArrowDown' :
            moverAbajo()
            break
        case 'ArrowLeft' :
            moverIzquierda()
            break
        case 'ArrowRight' :
            moverDerecha()
            break
        default :
             break        

    }

}

function iniciarMapa(){
    
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)
       
    window.addEventListener('keydown', sePresionoUnaTecla)

    window.addEventListener('keyup', detenerMovimiento)
    

}

function obtenerObjetoMascota(){
    for (let i=0; i < pokemones.length; i++) {
        if (mascotaJugador === pokemones[i].nombre){
        return pokemones[i]

        }
    }

}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x
    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x
    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }
    detenerMovimiento()
    clearInterval(intervalo)
    console.log('Se detecto una colision');

    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionaMascotaEnemigo(enemigo)

}
window.addEventListener('load', iniciarJuego)
