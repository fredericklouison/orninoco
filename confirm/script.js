import {basketNumber} from "../module/numberBasket.js"; 
basketNumber()
let message=document.createElement('p');
let item=document.querySelector('.item');
let totalprice=localStorage.getItem('total');//on récupère le prix total
let orderId=JSON.parse(localStorage.getItem('order'))['orderId'];//on récupère l'ID de la commande
message.textContent='Oriteddies vous remercie de votre commande, Le prix total est : '+totalprice/100+'EURO et le numero de votre commande est : '+orderId;//ajout du contenu
item.append(message);//on ajoute notre élément a notre page HTML