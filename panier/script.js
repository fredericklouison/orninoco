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
let main=document.querySelector('main');
let  basket=JSON.parse(localStorage.getItem('basket'));
let totalPrice=0;
for (i=0;i<basket.length;i++){
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
    for(i=0;i<basket.length;i++){
        let ids=basket[i]['id'];
        command.push(ids)
    }
    let order={
        "contact":contact,
        "products":command
    }
    console.log(order);
    const url= 'http://localhost:3000/api/teddies/order';
    let requete= new XMLHttpRequest();
    requete.open('POST',url);
    requete.setRequestHeader('Content-type','application/json');
    requete.responseType='json';
    requete.send(JSON.stringify(order));
    requete.onload=function(){
        if(requete.readyState===XMLHttpRequest.DONE){
            if(requete.status===201){
                let reponse=requete.response;
                console.log(reponse);
                
            }
            else{
                console.log('error');
            }
        }
    }
})
