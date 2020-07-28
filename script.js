
import {basketNumber} from "./module/numberBasket.js"; 
basketNumber()
async function helloapi(){
    const response= await fetch('http://localhost:3000/api/teddies/');
    const teddies= await response.json();
    let error;
    console.log(teddies);
    if (response.ok){
        for(let i=0;i<=4;i++){
                    
            let img=teddies[i].imageUrl;
            let id=teddies[i]._id;
            let price=teddies[i].price;
            let name=teddies[i].name;
            let item=document.createElement('div');
            item.className='item col-md-5 col-sm-12';
            let imgdiv=document.createElement('img');
            let pricediv=document.createElement('p');
            let namediv=document.createElement('p');
            let btn=document.createElement('button');
            let main=document.querySelector('main');
            btn.textContent='Plus d\'info';
            btn.className='btn btn-success';
            btn.setAttribute('type','button');
            
            btn.addEventListener('click',function(){
                localStorage.setItem('id',id);
                location.href='http://127.0.0.1:5500/product/';
            })
            namediv.textContent='Nom : '+name;
            pricediv.textContent='Prix : '+price/100+'EUR';
            imgdiv.setAttribute('src',img);
            main.append(item);
            item.append(imgdiv);
            item.append(namediv);
            item.append(pricediv);
            item.append(btn);
        }
    }
    else{
        
        throw error=new Error('erreur de connexion au serveur');
        
    }
    
}
helloapi().catch(error=>console.error(error))