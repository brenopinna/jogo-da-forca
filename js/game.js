const containerTema = document.querySelector(".tema")
const input = document.getElementById("chute")
const containerChutesRestantes = document.getElementById("chutes-restantes")
const containerChutesAnteriores = document.getElementById("chutes-anteriores")
const palavraContainer = document.querySelector(".palavra")
const situacaoContainer = document.querySelector(".situacao")
const respostaContainer = document.querySelector(".resposta")
const buttons = document.querySelectorAll("button")

input.focus()

const alfabeto = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
]

function removerAcentos(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

const tema = JSON.parse(localStorage.getItem("tema"))
const palavra = retornarPalavraAleatoria(tema)

containerTema.innerText = capitalize(tema.nome)

inserirSpans(palavra)

const spans = palavraContainer.querySelectorAll("span")

input.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    const inputValue = input.value.toLowerCase()
    input.value = ""
    if (inputValue.length == 1 && alfabeto.includes(inputValue)) {
      verificaAcerto(inputValue, palavra)
      if (defineVitoria()) {
        finalizaJogo("VOCÊ GANHOU!!")
      } else if (defineDerrota()) {
        finalizaJogo("PERDEU!!!!")
        respostaContainer.innerHTML = `A palavra secreta era "${palavra}"`
      }
    } else {
      alert("Insira uma única letra, sem acentuação!")
    }
  }
})

function retornarPalavraAleatoria(tema) {
  const palavras = tema.palavras
  const randomIndex = Math.floor(Math.random() * palavras.length)

  return palavras[randomIndex]
}

function inserirSpans(palavra) {
  for (let letra of palavra) {
    const span = document.createElement("span")
    span.style.margin = "0 0.2rem"
    if (letra == "-") {
      span.innerHTML = "-"
    } else if (letra == " ") {
      span.innerHTML = " "
      span.style.margin = "0 0.3rem"
    } else {
      span.innerHTML = "_"
    }
    palavraContainer.append(span)
  }
}

function verificaAcerto(userInput, palavra) {
  let certo = false
  let chutes = containerChutesAnteriores.innerHTML
  const palavraSemAcento = removerAcentos(palavra)
  if (!chutes.includes(userInput)) {
    for (let i = 0; i < palavra.length; i++) {
      if (userInput == palavraSemAcento[i].toLowerCase()) {
        spans[i].innerHTML = palavra[i].toLowerCase()
        certo = true
      }
    }
    if (!certo) {
      containerChutesRestantes.innerHTML -= 1
      containerChutesAnteriores.innerHTML += `${userInput} `
    }
  } else {
    alert(`A letra ${userInput} já foi chutada!`)
  }
}

function defineVitoria() {
  let palavraFormada = ""
  spans.forEach((span) => {
    palavraFormada += span.innerText
  })
  return palavra.toLowerCase() == palavraFormada
}

function defineDerrota() {
  return containerChutesRestantes.innerHTML == 0
}

function finalizaJogo(msg) {
  mostraBotoes()
  situacaoContainer.innerHTML = msg
  input.disabled = true
}

function mostraBotoes() {
  buttons.forEach((button) => {
    button.style.display = "block"
  })
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
