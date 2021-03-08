// Feed
let posts_data = [
    {
        nome: "Victor",
        mensagem: "Oi! Tudo bem?"
    },
    {
        nome: "Letícia",
        mensagem: "Que atividade difícil!"
    },
    {
        nome: "João",
        mensagem: "Tudo certo?"
    },
    {
        nome: "Luana",
        mensagem: "E ai galera!?"
    },
    {
        nome: "Paulo",
        mensagem: "De boas!"
    },
    {
        nome: "Julia",
        mensagem: "Boa tarde!"
    },
    {
        nome: "Rodrigo",
        mensagem: "Aê meu povo"
    },
    {
        nome: "Maria",
        mensagem: "Finalmente!"
    },
    {
        nome: "Italo",
        mensagem: "Bom dia!"
    },
    
];

let feed = document.querySelector(".feed");
let i;

function adicionar(item){
    let post = document.createElement("div");
    post.classList.add("post-feed")
    feed.appendChild(post);

    let h3 = document.createElement("h3");
    h3.classList.add("nome-post");
    h3.innerHTML = item.nome;
    post.appendChild(h3);

    let p = document.createElement("p");
    p.classList.add("mensagem-post");
    p.innerHTML = item.mensagem;
    post.appendChild(p);            
    
    if (i == 0){
        post.classList.add("first");
        i++;
    }
}

function alterar(){
    feed.innerHTML = "";
    i = 0;
    posts_data.forEach((item) => {
        adicionar(item);
    });

    // Mudar o elemento da primeira posição para a última
    posts_data.push(posts_data.splice(0,1)[0]);
}

alterar();
// A cada 2 segundos um dos posts é exibido como destaque (no primeiro post)
let interval = setInterval(alterar, 2000);

// Modal
let open_modal = document.querySelector(".open-modal");
let overlay_modal = document.querySelector(".overlay-modal");

let modal_close = document.querySelector(".modal-container .modal-header .modal-close");

open_modal.addEventListener("click", function(){
    overlay_modal.classList.add("active");
});

modal_close.addEventListener("click", function(){
    overlay_modal.classList.remove("active");
});

window.addEventListener("click", function(event){
    if(event.target == overlay_modal){
        overlay_modal.classList.remove("active")
    }
});

// Formulário
let nome_form = document.querySelector(".nome-form");
let mensagem_form = document.querySelector(".mensagem-form");

let submit_button = document.querySelector(".submit-button");

submit_button.addEventListener("click", function(event){
    // Tratanto o formulário vazio
    if(nome_form.value == ""){
        nome_form.focus();
        return false;
    }else if(mensagem_form.value == ""){
        mensagem_form.focus();
        return false;
    }
    else{
        event.preventDefault();
    }
    
    let nome = nome_form.value;
    let mensagem = mensagem_form.value;

    posts_data.push({nome: nome, mensagem: mensagem});

    adicionar(posts_data[posts_data.length-1]);

    overlay_modal.classList.remove("active");

    nome_form.value = '';
    mensagem_form.value = '';
});

// Navegador retrátil esquerdo
let button = document.querySelector(".navegador .opcoes-nav button");
let menu_retratil = document.querySelector(".container .esquerdo");

button.addEventListener("click", function(){
    menu_retratil.classList.toggle("active");
});