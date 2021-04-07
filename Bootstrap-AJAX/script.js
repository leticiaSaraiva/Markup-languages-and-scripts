let modal = new bootstrap.Modal(document.getElementById("modal-nome"), {
    keyboard: false,
    backdrop: 'static',
});
modal.show();

let form_submit = document.getElementById("form-nome");
let new_name = document.querySelector("#form-nome #new-nome");
var nome_usuario;

form_submit.addEventListener("submit", (event) => {
    if(new_name.value == ""){
        new_name.focus();
        return false;
    }
    else{
        event.preventDefault();
    }

    nome_usuario = new_name.value;
    modal.hide()

    campo_nome = document.querySelector("#navegador-superior .container-fluid #usuario-nav");
    campo_nome.textContent = nome_usuario;
})

let groups_galeria = document.querySelector(".groups-galeria");
let mensagens_galeria = document.querySelector(".mensagens-galeria");
let no_select_group = document.getElementById("no-select-group");
var id_grupo;
var grupos_buttons;

function criarGroup(nome, id){
    let group_item = document.createElement("div");
    group_item.setAttribute('id', 'groups-item');
    group_item.onclick = function() {
        id_grupo = id;
        getChatOfGroup(id);

        no_select_group.classList.add("hide");
        new_msg.classList.remove("hide");

        grupos_buttons.forEach(group => {
            group.classList.remove("active");
        });

        group_item.classList.add("active");
    }

    let div_icone = document.createElement("div");
    div_icone.setAttribute('id', 'div-icone');

    let img_icone = document.createElement("img");
    img_icone.setAttribute('id', 'img-group');
    img_icone.setAttribute('src', 'img/group.png');
    img_icone.setAttribute('alt', 'Ícone do grupo');

    let nome_grupo = document.createElement("span");
    nome_grupo.setAttribute('id', 'span-name');
    nome_grupo.textContent = nome;

    div_icone.appendChild(img_icone);
    group_item.appendChild(div_icone);
    group_item.appendChild(nome_grupo);

    return group_item;
}


function renderChatOfGroup(nome, corpo){
    let mensagem_item = document.createElement("div");
    mensagem_item.setAttribute('id', 'mensagem-item');

    let nome_pessoa = document.createElement("h5");
    nome_pessoa.textContent = nome;

    let texto = document.createElement("p");
    texto.textContent = corpo;

    mensagem_item.appendChild(nome_pessoa);
    mensagem_item.appendChild(texto);

    return mensagem_item;
}

function getChatOfGroup(grupo_id){
    mensagens_galeria.innerHTML = "";
    axios({
        method: "GET",
        url: "https://server-json-lms.herokuapp.com/grupos/"+grupo_id+"/mensagens",
    }).then((response) => {
        let msgs = response.data;
        if(msgs.length == 0){
            let mensagem_vazio = document.createElement("h6");
            mensagem_vazio.textContent = "Não há mensagens nesse grupo!"
            mensagens_galeria.appendChild(mensagem_vazio);
        }else{
            for(let msg = 0; msg < msgs.length; msg++){
                let item_msg = renderChatOfGroup(msgs[msg].nome, msgs[msg].corpo);
                mensagens_galeria.appendChild(item_msg);
            }
        }
    }).catch((error) => {
        console.log(error);
    })
}

function atualizarGroupList(){
    groups_galeria.innerHTML = "";
    axios({
        method: "GET",
        url: "https://server-json-lms.herokuapp.com/grupos"
    }).then((response) => {
        let grupos = response.data;
        for(let grupo of grupos){
            let group = criarGroup(grupo.nome, grupo.id);
            groups_galeria.appendChild(group);
        }

        grupos_buttons = document.querySelectorAll("#groups-item")
    }).catch((error) => {
        console.log(error);
    })
}

atualizarGroupList();

// Formulário novo grupo
let new_group = document.getElementById("form-new-group");

let input_group_titulo = document.querySelector("#form-new-group #new-group-nome");

new_group.addEventListener("submit", (event) => {
    if(input_group_titulo.value == ""){
        input_group_titulo.focus();
        return false;
    }
    else{
        event.preventDefault();
    }

    axios({
        method: "POST",
        url: "https://server-json-lms.herokuapp.com/grupos",
        data: {
            nome: input_group_titulo.value,
        }
    }).then((response) => {
        atualizarGroupList();
    }).catch((error) => {
        console.log(error);
    });

    input_group_titulo.value = '';
})

// Formulário nova mensagem
let new_msg = document.getElementById("form-new-mensagem");

let input_msg_texto = document.getElementById("new-mensagem-text");

new_msg.addEventListener("submit", (event) => {
    if(input_msg_texto.value == ""){
        input_msg_texto.focus();
        return false;
    }
    else{
        event.preventDefault();
    }

    axios({
        method: "POST",
        url: "https://server-json-lms.herokuapp.com/mensagens",
        data: {
            grupoId: id_grupo,
            corpo: input_msg_texto.value,
            nome: nome_usuario
        }
    }).then((response) => {
        getChatOfGroup(id_grupo)
    }).catch((error) => {
        console.log(error);
    });

    input_msg_texto.value = '';
});