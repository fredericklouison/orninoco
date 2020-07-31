

import {basketNumber} from "../module/numberBasket.js"; 
basketNumber()
function empty(){
    let emptyBasket=document.querySelector('h6');
    let formulaire=document.querySelector('form');
    if(basketNumber()){
        emptyBasket.style.display='none';
        formulaire.style.display='block';
    }else{
        formulaire.style.display='none';
        emptyBasket.style.display='block';
    }
}
empty()
let main=document.querySelector('main');
let  basket=JSON.parse(localStorage.getItem('basket'));
let totalPrice=0;
let errorfName=document.querySelector('#firstnameError');
errorfName.style.display='none';
let errorlName=document.querySelector('#lastnameError');
errorlName.style.display='none';
let errorAdress=document.querySelector('#adressError');
errorAdress.style.display='none';
let errorCity=document.querySelector('#CityError');
errorCity.style.display='none';
let errorEmail=document.querySelector('#emailError');
errorEmail.style.display='none';
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

    function ValidateEmail(input){
        let x=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input);
        if(x){
            errorEmail.style.display='none'
           return true 
        }else{
            errorEmail.style.display='block'
           return false
        } 
    } 
    function Validatefname(input){
        let x=/^([a-zA-Z\u00C0-\u00FF]+['-]?[a-zA-Z\u00C0-\u00FF]+){1,30}$/.test(input);
        if(x){
            errorfName.style.display='none'
           return true 
        }else{
            errorfName.style.display='block'
           return false
        } 
    } 
    function Validatelname(input){
        let x=/^([a-zA-Z\u00C0-\u00FF]+['-]?[a-zA-Z\u00C0-\u00FF]+){1,30}$/.test(input);
        if(x){
            errorlName.style.display='none'
           return true 
        }else{
            errorlName.style.display='block'
           return false
        } 
    }
    function Validateadress(input){
        if(input==""){
            errorAdress.style.display='block'
            return false
        }else{
            errorAdress.style.display='none'
            return true
        } 
    }
    function ValidateCity(input){
        let x=/^([a-zA-Z\u00C0-\u00FF]+['-]?[a-zA-Z\u00C0-\u00FF]+){1,30}$/.test(input);
        if(x){
            errorCity.style.display='none'
           return true 
        }else{
            errorCity.style.display='block'
           return false
        } 
    }
    function validateInput(){
      let email=  ValidateEmail(inputEmail);
       let fname= Validatefname(inputName);
       let lname= Validatelname(inputLastName);
       let adress= Validateadress(inputAddress);
       let city= ValidateCity(inputCity)
       if ((email&&fname&&lname&&adress&&city)==true){
           return true
       }else{
           return false
       }
    }
    validateInput()
    if (validateInput()) {
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
    } 
}) 

