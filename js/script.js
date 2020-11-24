// 1 - Temos que referenciar o input 
let input = document.querySelector('input[name=tarefa]');

// 2 - Temos que referenciar o button
let btn = document.getElementById('botao');

// 3 - Temos que referenciar a lista
let lista = document.getElementById('lista');
//Tenta acessar o banco Tarefas, se tiver transforma num array e coloca na variavel
//caso não tenha, retorne um array vazio
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

//Recuperando o card

let card = document.querySelector('.card');


function renderizarTarefas(){
    //Limpar a listagem de itens antes de renderizar novamente a tela
    lista.innerHTML = '';
    for(tarefa of tarefas){
        //Criar o item da lista
        let itemLista = document.createElement('li');

        //Adicionar classes no item da lista

        itemLista.setAttribute('class', 'list-group-item list-group-item-action');

        //Adicionar evento de clique no item da lista
        itemLista.onclick = function(){
            deletarTarefa(this)
        }
        //Criar um texto

        let itemTexto = document.createTextNode(tarefa);

        //Adicionar o texto no item da lista
        itemLista.appendChild(itemTexto);

        //Adicionar o item na lista

        lista.appendChild(itemLista);
    }
}

//executando a função para renderizar as tarefas
renderizarTarefas();

// 1 - Precisamos escutar o evento de click no botão
btn.onclick = function(){
    // 2 - Precisamos capturar o valor digitado pelo usuario no input
    let novaTarefa = input.value;

    if(novaTarefa !== ""){
        // 3 - Precisamos atualizar a nova tarefa na lista (array) de tarefas e renderizar a tela
        tarefas.push(novaTarefa);
        renderizarTarefas();
        
        //Limpar o input
        input.value = '';

        //Limpar mensagens de erros
        removerSpans();
        //salva os novos dados no banco de dados
        salvarDadosNoStorage();
    }else{
        //Limpar mensagens de erros
        removerSpans();

        let span = document.createElement('span');
        span.setAttribute('class', 'alert alert-danger');
        //Colocando texto no elemento
        let msg = document.createTextNode('Você precisa informar a tarefa');
        //Tornar a variavel como filho do span
        span.appendChild(msg);
        //Tornar o span como filho do card
        card.appendChild(span);
    }
    
}

function removerSpans(){
    //recuperamos os spans
    let spans = document.querySelectorAll('span');

    for(let i = 0; i < spans.length; i++){
        card.removeChild(spans[i]);
    }
}

function deletarTarefa(tar){
    // console.log(tar.textContent);
    // Remove a tarefa do array
    tarefas.splice(tarefas.indexOf(tar.textContent), 1);

    // Renderiza novamente a tela
    renderizarTarefas();
    //salva os novos dados no banco de dados
    salvarDadosNoStorage();
}


function salvarDadosNoStorage(){
    //Todo navegador web possui essa capacidade
    //so pode passar strings
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}