import {basketNumber} from "../module/numberBasket.js"; 
basketNumber()
let message=document.createElement('p');
let item=document.querySelector('.item');
let totalprice=localStorage.getItem('total');
let orderId=JSON.parse(localStorage.getItem('order'))['orderId']
message.textContent='Oriteddies vous remercie de votre commande, Le prix total est : '+totalprice/100+'EURO et le numero de votre commande est : '+orderId;
item.append(message);