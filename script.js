const qS = (el)=> document.querySelector(el);
// armazendo o querySelector em uma variavel para um código mais limpo, utilizando o Arrow Function e sem o return.

const qSAll = function(elAll){
    return document.querySelectorAll(elAll);
   
}

let modalQtd = 1;

let cart = [];

// LISTAGEM DAS PIZZAS
pizzaJson.map ((item, index) => {
    pizzaItem = qS('.models .pizza-item').cloneNode(true); //armazenando os objetos do JSON e realizando o clone desses.

    pizzaItem.setAttribute('data-key', index);
    //adicionando as informações e imagens nos objetos.
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description; 

    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault(); //previnindo a ação do link <a> ao clicar
     
        let key = e.target.closest('.pizza-item').getAttribute('data-key'); //percorrendo o alvo pizza item e pegando o atributo data-key

        maiorQtd = 1;

        modalKey = key; //usamos essa variavel para adicionar as infos no carrinho

        qS('.pizzaBig img').src = pizzaJson[key].img;

        qS('.pizzaInfo h1').innerHTML = pizzaJson[key].name;

        qS('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;

        qS('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

        qS('.pizzaInfo--size.selected').classList.remove('selected');

        qSAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if(sizeIndex == 2){
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML =  
            pizzaJson[key].sizes[sizeIndex];

            
        })
        qS('.pizzaInfo--qt').innerHTML = modalQtd; // variavel foi instanciada para sempre receber 1. 

        qS('.pizzaWindowArea').style.opacity = 0;
        qS('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            qS('.pizzaWindowArea').style.opacity = 1;
        }, 200);      

   });   
   qS('.pizza-area').append(pizzaItem); //adicionamos os 7 objetos que está no JSON na classe .pizza-area através do parametro .Append e instanciamos a variavel pizzaItem que armazenou os obejtos que foram clonados. 

})

//EVENTOS DO MODAL

function closeModal(){ //função para fechar o modal clicando em cancelar ou voltar(mobile)
    qS('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        qS('.pizzaWindowArea').style.display = 'none';
    }, 200); 
}

qSAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});


//Selecionando a quantidade de pizzas.
qS('.pizzaInfo--qtmenos').addEventListener('click', ()=>{

    if(modalQtd > 1){
        modalQtd--;
        qS('.pizzaInfo--qt').innerHTML = maiorQtd;
    }

});

qS('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQtd++;
    qS('.pizzaInfo--qt').innerHTML = modalQtd;
});
qSAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', ()=>{
        qS('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });            

});

qS('.pizzaInfo--addButton').addEventListener('click', () => {
   
    
    let size = parseInt(qS('.pizzaInfo--size.selected').getAttribute('data-key'));

    let identifier = pizzaJson[modalKey].id+'@'+size; //identificador para varrer o Array e setal qual sabor e tamanho.

    let key = cart.findIndex((item)=>{ //procurar dentro do cart o item identifier, se ele achar um item igual ele vai fazer a condição.
         item.identifier == identifier;
    });

    if(key > -1){
        cart[key].qt += modalQtd; 
    }else{
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            qt: modalQtd
        });
    
    }

    updateCart();    
    closeModal();  

});

function updateCart(){
    if(cart.length > 0){
        qS('aside').classList.add('show');

        for(let i in cart){
            
            let pizzaItem = pizzaJson.find((item)=> item.id == cart[i].id);

        }

    }else{
        qS('aside').classList.remove('show');

    }
}