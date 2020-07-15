"use strict"
const url= 'http://localhost:3000/api/teddies/';
    let requete= new XMLHttpRequest();
    requete.open('GET',url);
    requete.responseType='json';
    requete.send();
    requete.onload=function(){
        if(requete.readyState===XMLHttpRequest.DONE){
            if(requete.status===200){
                let i;
                for(i=0;i<=4;i++){
                    let reponse=requete.response[i];
                    let img=reponse.imageUrl;
                    let price=reponse.price;
                    let name=reponse.name;
                    let item=document.createElement('div');
                    item.className='item col-md-5';
                    let imgdiv=document.createElement('img');
                    let pricediv=document.createElement('p');
                    let namediv=document.createElement('p');
                    let btn=document.createElement('button');
                    let main=document.querySelector('main');
                    btn.textContent='Plus d\'info';
                    btn.className='btn btn-success';
                    btn.setAttribute('type','button');
                    namediv.textContent='Nom : '+name;
                    pricediv.textContent='Prix : '+price/100+'$';
                    imgdiv.setAttribute('src',img);
                    main.append(item);
                    item.append(imgdiv);
                    item.append(namediv);
                    item.append(pricediv);
                    item.append(btn);
                }
                
            }
            else{
                console.log('error');
            }
        }
    }