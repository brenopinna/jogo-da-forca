const optionsContainer = document.querySelector(".options-container")
const nextPageLink = document.querySelector("a")

// OBS: Registrar os temas sem caracteres especiais!!
const temas = {
  "palavra 1": ["Bench"],
  "palavra 2": ["Caldeirão"],
  "palavra 3": ["Lead"],
  "palavra 4": ["Selo EJ"],
  "palavra 5": ["Sabatina"],
  "palavra 6": ["Guardião"],
  "palavra 7": ["Liderança"],
  "palavra 8": ["Meta"],
  "palavra 9": ["Reunião de Diagnóstico"],
  "palavra 10": ["EFEJ"],
  "palavra 11": ["Processo Seletivo Personalizado"],
}

criaInputs(temas)

const inputs = document.querySelectorAll("input[name=opcao]")

const localStorageTheme =
  localStorage.length > 0 ? JSON.parse(localStorage.getItem("tema")).nome : false

if (localStorageTheme) {
  for (const input of inputs) {
    if (input.value == localStorageTheme) {
      input.checked = true
    }
  }
}

nextPageLink.addEventListener("click", (e) => {
  let checked = false

  for (const input of inputs) {
    if (input.checked) {
      checked = true

      const temaName = input.value
      const tema = {
        nome: temaName,
        palavras: temas[temaName],
      }

      localStorage.setItem("tema", JSON.stringify(tema))
    }
  }
  if (!checked) {
    e.preventDefault()
    alert("Selecione um tema!!")
  }
})

function criaInputs(temas) {
  for (const tema in temas) {
    const nome = tema

    const inputContainer = retornarInputContainer()

    const inputRadio = retornarInputRadio(nome)

    inputContainer.appendChild(inputRadio)
    inputContainer.innerHTML += capitalize(nome)

    optionsContainer.appendChild(inputContainer)
  }
}

function retornarInputContainer() {
  const inputContainer = document.createElement("label")
  inputContainer.style.display = "block"
  inputContainer.classList.add("input-container")
  inputContainer.addEventListener("mouseover", () => {
    inputContainer.style.backgroundColor = "rgb(210,210,210)"
  })
  inputContainer.addEventListener("mouseout", () => {
    inputContainer.style.backgroundColor = ""
  })

  return inputContainer
}

function retornarInputRadio(id) {
  const inputRadio = document.createElement("input")
  inputRadio.setAttribute("type", "radio")
  inputRadio.setAttribute("name", "opcao")
  inputRadio.setAttribute("id", id)
  inputRadio.setAttribute("value", id)

  return inputRadio
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
