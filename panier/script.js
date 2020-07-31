

import {basketNumber} from "../module/numberBasket.js"; 
basketNumber()
function empty(){//on vérifie si le panier est vide ou pas
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
let  basket=JSON.parse(localStorage.getItem('basket'));//on récupère notre panier
let totalPrice=0;
//on cache les message d'erreur
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
for (let i=0;i<basket.length;i++){//boucle de création des élément du panier
    let item=document.createElement('div');
    //on réupere les valeur stocker
    item.className='item';
    let name=basket[i]['name'];
    let img=basket[i]['img'];
    let price=basket[i]['price'];
    totalPrice+=price;//ajout du prix au prix total
    let colors=basket[i]['color'];
    //on crée nos élément
    let imgdiv=document.createElement('img');
    let nameDiv=document.createElement('p');
    let priceDiv=document.createElement('p');
    let colorDiv=document.createElement('p');
    //on ajoute le contenu
    priceDiv.textContent='Prix : '+price/100+'EUR';
    imgdiv.setAttribute('src',img);
    nameDiv.textContent=name;
    colorDiv.textContent='color : '+ colors
    //on ajoute nos élément a notre page html
    main.prepend(item);
    item.append(nameDiv);
    item.append(imgdiv);
    item.append(priceDiv);
    item.append(colorDiv);
};
// affichage prix totale
let total=document.querySelector('.total');
let totalCost= document.createElement('p');
totalCost.textContent='Prix total : '+totalPrice/100+'EURO';
total.append(totalCost);
let btn=document.querySelector('.commande');
btn.addEventListener('click',function validation(){//code exécuter au clique qur le bouton valider
    event.preventDefault();
    //on récupère les valeur des input
    let inputName=document.querySelector('#inputName').value;
    let inputLastName=document.querySelector('#inputLastName').value;
    let inputAddress=document.querySelector('#inputAddress').value;
    let inputCity=document.querySelector('#inputCity').value;
    let inputEmail=document.querySelector('#inputEmail4').value;
//fonction de vérification de nos différent input
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

    function validateInput(){//on vérifie nos input
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
    if (validateInput()) {//si tout les input sont correct
        let contact={"firstName":inputName,"lastName":inputLastName,"address":inputAddress,"city":inputCity,"email":inputEmail};//on crée l'objet contact a envoyer au serveur
        let command=[];
        for(let i=0;i<basket.length;i++){//on ajoute les id de nos produit au array command
            let ids=basket[i]['id'];
            command.push(ids)
        }
        let order=JSON.stringify({
            "contact":contact,
            "products":command
        })
        console.log(order);
        async function helloapi(){//requete POST
            const response= await fetch('http://localhost:3000/api/teddies/order',{//requete POST
                method:'POST',
                headers:{'Content-type':'application/json'},
                body:order    //l'objet que nous envoyons
            });
            const teddies= await response.json();
            if(response.ok){//si le statut est 200
                localStorage.setItem('total',totalPrice);
                console.log(teddies); 
                localStorage.setItem('order',JSON.stringify(teddies));
                localStorage.removeItem('basket');
                location.href='http://127.0.0.1:5500/confirm/';//redirection vers la page de confirmation
            }else{//si le code est 400
                
                 throw error = new Error('erreur de connexion au serveur');
            }
        }
        helloapi().catch(error=>console.error(error))
    } 
}) 

