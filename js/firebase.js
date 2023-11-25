const firebaseConfig = {
  apiKey: "AIzaSyAwjUpFKxJ3Xo6K5x49PfD4QW6IuKY78L4",
  authDomain: "projeto-nosqleduardo.firebaseapp.com",
  projectId: "projeto-nosqleduardo",
  storageBucket: "projeto-nosqleduardo.appspot.com",
  messagingSenderId: "509930815537",
  appId: "1:509930815537:web:add7d2d4e1b180b83d9510",
};

//Inicializando o Firebase
firebase.initializeApp(firebaseConfig)
//Definindo a URL padrão do site
const urlApp = 'http://127.0.0.1:5500'

function logaGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      window.location.href = 'menu.html'
    }).catch((error) => {
      alert(`Erro ao efetuar o login: ${error.message}`)
    })
}

function verificaLogado() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) { //Contém dados do login?
      //Salvamos o id do usuário localmente
      localStorage.setItem('usuarioId', user.uid)

      //Inserindo a imagem do usuário      
      let imagem = document.getElementById('imagemUsuario')

      user.photoURL
        ? imagem.innerHTML += `<img src="${user.photoURL}" title="${user.displayName}" class="img rounded-circle" width="48" />`
        : imagem.innerHTML += '<img src="images/logo-google.svg" title="Usuário sem foto" class="img rounded-circle" width="32" />'

    } else {
      localStorage.removeItem('usuarioId') //Removemos o id salvo
      window.location.href = 'index.html' //direcionamos para o login        
    }
  })
}

function logoutFirebase() {
  firebase.auth().signOut()
    .then(function () {
      localStorage.removeItem('usuarioId')
      window.location.href = 'index.html'
    })
    .catch(function (error) {
      alert(`Não foi possível efetuar o logout: ${error.message}`)
    })
}
// função criado no dia 07/11/2023 
async function salvarPrestador(prestador) {
  //obtendo usuario atual
  let usuarioAtual = firebase.auth().currentUser
  try {
    await firebase.database().ref('prestadores').push({
      ...prestador,
      usuarioInclusao: {
        uid: usuarioAtual.uid,
        nome: usuarioAtual.displayName
      }
    })
    alert('✔Registro incluido com sucesso!')

    //limpar o formulario
    document.getElementById('formCadastro').reset()

  } catch (error) {
    alert(`❌ erro ao salvar:${error.message}`)
  }
}
// evento submite formulario monitorando
document.getElementById('formCadastro').addEventListener('submit', function (event) { 
  event.preventDefault()// evita o carremento
  const tipoEstoque = document.getElementById('retirada').value =='on' ? 'retirada' : 'entrega'
  const prestador = {
    razao: document.getElementById('razao').value,
    endereco: document.getElementById('endereco').value,
    equipamento: document.getElementById('equip').value,
    dataLocacao: document.getElementById('dataLocacao').value,
    tefone: document.getElementById('tel').value,
    cep: document.getElementById('cep').value,    
    latitude: document.getElementById('lat').value,
    longitude: document.getElementById('long').value,    
    quantidade: document.getElementById('qtd').value,
    tipoEstoque: tipoEstoque
  }
  salvarPrestador(prestador)
})
async function carregaPrestadores() {
  const tabela = document.getElementById('dadosTabela')
  const usuarioAtual = localStorage.getItem('usuarioId')

  await firebase.database().ref('prestadores').orderByChild('razao')
    .on('value', (snapshot) => {
      //limpar a tabela 
      tabela.innerHTML =''    
      if (!snapshot.exists()) {// não existe o snapshot
        tabela.innerHTML = `<tr class='table-danger'><td colspan='4'> Ainda não existe nenhum
      registro cadastrado.</td></tr>`
      } else {// se existir o snapshot mostra na tabela
        snapshot.forEach(item => {
          const dados = item.val()//obtendo os itens
          const id = item.key //obtendo os dados
          const isUsuarioAtual = (dados.usuarioInclusao.uid === usuarioAtual) // verificando o Id do usuario logado
          const botao = isUsuarioAtual
            ? `<button class='btn btn-sm btn-danger' onclick='removePrestador("${id}")'
          title='Excluir o registro atual'> 🗑 Excluir </button>`
            : `🚫 Indisponível`

          tabela.innerHTML += `
        <tr>
        <td> ${dados.razao}</td>
        <td> ${dados.endereco}-${dados.cep}</td> 
        <td> ${dados.equipamento}</td>
        <td> ${dados.dataLocacao}</td>
        <td> ${dados.tefone}</td>   
        <td> ${dados.quantidade}</td>  
        <td> ${dados.tipoEstoque}</td>          
        <td> ${dados.latitude}/ ${dados.longitude}</td>        
        <td> ${botao}</td>
        </tr>
        `
        })
      }
    })
}
async function removePrestador(id) {
  if (confirm('Deseja realmente excluiro prestador?')) {
    const prestadorRef = await firebase.database().ref('prestadores/' + id)

    //remove prestador
    prestadorRef.remove()
      .then(function () {
        alert('Prestador removido com sucesso!')
      })
      .catch(function (error) {
        alert(`Erro ao excluir o prestador: ${error.message}. Tente novamente`)
      })
  }
}
