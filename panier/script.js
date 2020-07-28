

import {basketNumber} from "../module/numberBasket.js"; 
basketNumber()
let main=document.querySelector('main');
let  basket=JSON.parse(localStorage.getItem('basket'));
let totalPrice=0;

for (let i=0;i<basket.length;i++){
    let item=document.createElement('div');
    item.className='item';
    let name=basket[i]['name'];
    let img=basket[i]['img'];
    let price=basket[i]['price'];
    totalPrice+=price;
    let colors=basket[i]['color'];
    let imgdiv=document.createElement('img');
    let nameDiv=document.createElement('p');
    let priceDiv=document.createElement('p');
    let colorDiv=document.createElement('p');
    priceDiv.textContent='Prix : '+price/100+'EUR';
    imgdiv.setAttribute('src',img);
    nameDiv.textContent=name;
    colorDiv.textContent='color : '+ colors
    main.prepend(item);
    item.append(nameDiv);
    item.append(imgdiv);
    item.append(priceDiv);
    item.append(colorDiv);
};
let total=document.querySelector('.total');
let totalCost= document.createElement('p');
totalCost.textContent='Prix total : '+totalPrice/100+'EURO';
total.append(totalCost);
let btn=document.querySelector('.commande');
btn.addEventListener('click',function validation(){
    event.preventDefault();
    let inputName=document.querySelector('#inputName').value;
    let inputLastName=document.querySelector('#inputLastName').value;
    let inputAddress=document.querySelector('#inputAddress').value;
    let inputCity=document.querySelector('#inputCity').value;
    let inputEmail=document.querySelector('#inputEmail4').value;
    let contact={"firstName":inputName,"lastName":inputLastName,"address":inputAddress,"city":inputCity,"email":inputEmail};
    let command=[];
    for(let i=0;i<basket.length;i++){
        let ids=basket[i]['id'];
        command.push(ids)
    }
    let order=JSON.stringify({
        "contact":contact,
        "products":command
    })
    console.log(order);
    async function helloapi(){
        const response= await fetch('http://localhost:3000/api/teddies/order',{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:order    
        });
        const teddies= await response.json();
        let error;
        if(response.ok){
            localStorage.setItem('total',totalPrice);
            console.log(teddies); 
            localStorage.setItem('order',JSON.stringify(teddies));
            localStorage.removeItem('basket');
            location.href='http://127.0.0.1:5500/confirm/';
        }else{
            
             throw error = new Error('erreur de connexion au serveur');
        }
    }
    helloapi().catch(error=>console.error(error))
}) 

