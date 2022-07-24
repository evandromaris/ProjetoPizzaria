const qS = (el)=> document.querySelector(el);
// armazendo o querySelector em uma variavel para um código mais limpo, utilizando o Arrow Function e sem o return.

const qSAll = function(elAll){
    return document.querySelectorAll(elAll);
   
}

let modalQtd = 1;
let key;
let cart = [];

// LISTAGEM DAS PIZZAS
pizzaJson.map ((item, index) => { //mapear o array buscando cada elemento
    pizzaItem = qS('.models .pizza-item').cloneNode(true); //armazenando os objetos do JSON e realizando o clone desses.

    pizzaItem.setAttribute('data-key', index);
    //adicionando as informações e imagens nos objetos.
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `${item.price[2].toFixed(2).replace(".",",")} €`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description; 

    qS('.pizza-area').append(pizzaItem); //adicionamos os 7 objetos que está no JSON na classe .pizza-area através do parametro .Append e instanciamos a variavel pizzaItem que armazenou os obejtos que foram clonados. 


    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault(); //previnindo a ação do link <a> ao clicar
     
        key = e.target.closest('.pizza-item').getAttribute('data-key'); //percorrendo o alvo pizza-item e pegando o atributo data-key

        maiorQtd = 1;

        modalKey = key; //usamos essa variavel para adicionar as infos no carrinho

        qS('.pizzaBig img').src = pizzaJson[key].img;

        qS('.pizzaInfo h1').innerHTML = pizzaJson[key].name;

        qS('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;

        qS('.pizzaInfo--actualPrice').innerHTML = `${pizzaJson[key].price[2].toFixed(2).replace(".",",")} €`;

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
  
})

//EVENTOS DO MODAL

function closeModal(){ //função para fechar o modal clicando em cancelar ou voltar(mobile)
    qS('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        qS('.pizzaWindowArea').style.display = 'none';
    }, 500); 
}

qSAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});


//Selecionando a quantidade de pizzas.
qS('.pizzaInfo--qtmenos').addEventListener('click', ()=>{

    if(modalQtd > 1){
        modalQtd--;
        qS('.pizzaInfo--qt').innerHTML = modalQtd;
    }
    
});

qS('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQtd++;
    qS('.pizzaInfo--qt').innerHTML = modalQtd;
});
qSAll('.pizzaInfo--size').forEach((size) => {
    size.addEventListener('click', ()=>{
        qS('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
        qS('.pizzaInfo--actualPrice').innerHTML = `${pizzaJson[key].price[size.getAttribute('data-key')].toFixed(2).replace(".",",")} €`;
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

qS('.menu-openner').addEventListener('click',() => {
    if(cart.length > 0){
        qS('aside').style.left = '0';
    }
});

qS('.menu-closer').addEventListener('click', ()=>{
    qS('aside').style.left = '100vw';
});

function updateCart(){

    qS('.menu-openner span').innerHTML = cart.length;

    if(cart.length > 0){
        qS('aside').classList.add('show');
        qS('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart){
            let pizzaItem = pizzaJson.find((item)=> item.id == cart[i].id);

            let pz = cart[i].size;
            subtotal += pizzaItem.price[pz] * cart[i].qt;

            let cartItem = qS('.models .cart--item').cloneNode(true);

            let pizzaSizeName;
            switch(pz){
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2:
                    pizzaSizeName = 'G';
                    break;        
            }

            let pizzaName = `${pizzaItem.name}(${pizzaSizeName})`;

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML =cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if(cart[i].qt > 1){
                    cart[i].qt--;
                }else {
                    cart.splice(i, 1);
                }
                updateCart();
            });

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++;
                updateCart();
            });



            qS('.cart').append(cartItem);
        }

        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        qS('.subtotal span:last-child').innerHTML = `${subtotal.toFixed(2).replace(".",",")}€`;
        qS('.desconto span:last-child').innerHTML = `${desconto.toFixed(2).replace(".",",")}€`;
        qS('.total span:last-child').innerHTML = `${total.toFixed(2).replace(".",",")}€`;

    }else{
        qS('aside').classList.remove('show');
        qS('aside').style.left = '100vw';
    }
}