const optionsContainer = document.querySelector('.options-container');
const nextPageLink = document.querySelector('a')

// OBS: Registrar os temas sem caracteres especiais!!
const temas = {
   'alimentos' : ['maca','banana','pera', 'carne'],
   'profissões' : ['medico','advogado','programador','professor','dentista'],
   'países' : ['brasil','mexico','argentina','espanha','estados-unidos','alemanha'],
   'animais' : ['leao','macaco','mico-leao-dourado','jacare','arara']
}

criaInputs(temas);

const inputs = document.querySelectorAll('input[name=opcao]');

const localStorageTheme = localStorage.length > 0 ? JSON.parse(localStorage.getItem('tema')).nome : false;

if(localStorageTheme){
   for(const input of inputs){
      if(input.value == localStorageTheme){
         input.checked = true;
      }
   }
}

nextPageLink.addEventListener('click', (e) => {
   let checked = false;

   for(const input of inputs){
      if(input.checked){
         checked = true;

         const temaName = input.value;
         const tema = {
            nome : temaName,
            palavras : temas[temaName]
         };

         localStorage.setItem('tema', JSON.stringify(tema));
      }
   }if(!checked){
      e.preventDefault();
      alert('Selecione um tema!!')
   }
});

function criaInputs(temas){
   for(const tema in temas){
      const nome = tema;

      const inputContainer = retornarInputContainer();

      const inputRadio = retornarInputRadio(nome);

      inputContainer.appendChild(inputRadio);
      inputContainer.innerHTML += capitalize(nome);

      optionsContainer.appendChild(inputContainer);
   }
}

function retornarInputContainer(){
   const inputContainer = document.createElement('div');
   inputContainer.classList.add('input-container');

   return inputContainer;
}

function retornarInputRadio(id){
   const inputRadio = document.createElement('input');
   inputRadio.setAttribute('type', 'radio');
   inputRadio.setAttribute('name', 'opcao');
   inputRadio.setAttribute('id', id);
   inputRadio.setAttribute('value', id);

   return inputRadio;
}

function capitalize(str){
   return str.charAt(0).toUpperCase() + str.slice(1);
}