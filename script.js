
import {basketNumber} from "./module/numberBasket.js"; //importation du module basketnumber
basketNumber();//appel de la fonction
async function helloapi(){//requette get
    const response= await fetch('http://localhost:3000/api/teddies/');//on attend la reponse de la requette
    const teddies= await response.json();
    let error;
    console.log(teddies);
    if (response.ok){
        //code a exécuter si la reponse est correcte
        for(let i=0;i<=teddies.length;i++){//boucle de création des 
            //récupération des valeur
            let img=teddies[i].imageUrl;
            let id=teddies[i]._id;
            let price=teddies[i].price;
            let name=teddies[i].name;
            //récupération et création des élements
            let item=document.createElement('div');
            item.className='item col-md-5 col-sm-12';
            let imgdiv=document.createElement('img');
            let pricediv=document.createElement('p');
            let namediv=document.createElement('p');
            let btn=document.createElement('button');
            let main=document.querySelector('main');
            //ajout du contenu
            btn.textContent='Plus d\'info';
            btn.className='btn btn-success';
            btn.setAttribute('type','button');
            //code a exécuter en cas de clique sur le bouton 
            btn.addEventListener('click',function(){
                localStorage.setItem('id',id);//on stock l'id du produit sur lequel on clique dans local
                location.href='http://127.0.0.1:5500/product/';//redirection vers la page produit
            });
            //ajout des élément a notre page html
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
    else{//code a exécuter si la requete GET échou
        
        throw error=new Error('erreur de connexion au serveur');
        
    }
    
}
helloapi().catch(error=>console.error(error));//appel de notre requete