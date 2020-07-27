if( localStorage.getItem('basket')){
    let mica =localStorage.getItem('basket');
    let echo=JSON.parse(mica);
    let basketnumber=document.getElementById('basket');
    basketnumber.textContent= echo.length+' panier';
}else{
    let basketLength=0;
    let basketnumber=document.getElementById('basket');
    basketnumber.textContent= basketLength+' panier';
}
let message=document.createElement('p');
let item=document.querySelector('.item');
let totalprice=localStorage.getItem('total');
let orderId=JSON.parse(localStorage.getItem('order'))['orderId']
message.textContent='Oriteddies vous remercie de votre commande, Le prix total est : '+totalprice/100+'EURO et le numero de votre commande est : '+orderId;
item.append(message);