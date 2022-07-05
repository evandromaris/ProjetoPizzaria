const qS = (el)=> document.querySelector(el);
// armazendo o querySelector em uma variavel para um código mais limpo, utilizando o Arrow Function e sem o return.

const qSAll = function(elAll){
    return document.querySelectorAll(elAll);
   
}

pizzaJson.map ((item, index)=>{
    pizzaItem = qS('.models .pizza-item').cloneNode(true); //armazenando os objetos do JSON e realizando o clone desses.


    pizzaItem.setAttribute('data-key', index);
    //adicionando as informações e imagens nos objetos.
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;  
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault(); //previnindo a ação do link <a> ao clicar

        let key = e.target.closest('.pizza-item').getAttribute('data-key');

        qS('.pizzaBig img').src = pizzaJson[key].img;
        qS('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        qS('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        qS('.pizzaInfo--actualPrice').innerHTML =`R$ ${pizzaJson[key].price.toFixed(2)}`;
        
        qS('.pizzaWindowArea').style.opacity = '0';
        qS('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            qS('.pizzaWindowArea').style.opacity = '1';
        }, 200);

        qSAll('.pizzaInfo--size').forEach((size, sizeIndex) => {


            size.querySelector('span').innerHTML =  
            pizzaJson[key].sizes[sizeIndex];
        })
   });
   
   qS('.pizza-area').append(pizzaItem); //adicionamos os 7 objetos que está no JSON na classe .pizza-area através do parametro .Append e instanciamos a variavel pizzaItem que armazenou os obejtos que foram clonados. 

})

