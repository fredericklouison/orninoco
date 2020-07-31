let id=localStorage.getItem('id');//récupération de l'id du produit
import {basketNumber} from "../module/numberBasket.js"; 
basketNumber()
async function helloapi(){//requete APi method GET
    const response= await fetch('http://localhost:3000/api/teddies/'+id);//on attent la reponse
    const teddies= await response.json();//on enrengistre la réponse
    if(response.ok){
        //on récupère les valeur
        let id =teddies._id;
        let img=teddies.imageUrl;
        let name=teddies.name;
        let price=teddies.price;
        let description=teddies.description;
        let colors=teddies.colors;
        //on récupère les élément ou on les crée
        let title=document.querySelector('title');
        let item=document.querySelector('.item');
        let text=document.querySelector('.text')
        let select=document.querySelector('select');
        let imgdiv=document.createElement('img');
        let nameDiv=document.createElement('p');
        let priceDiv=document.createElement('p');
        let descDiv=document.createElement('p');
        let btn=document.getElementById('submit');
        let message=document.querySelector('.message');
        //On ajoute le contenu
        nameDiv.textContent='Nom : '+name;
        priceDiv.textContent='Prix : '+price/100+'EUR';
        descDiv.textContent='description :   '+description;
        title.textContent='Produit : '+name;
        imgdiv.setAttribute('src',img);
        item.prepend(imgdiv);
        //code exécuté au clique sur le bouton ajouter au panier
        btn.addEventListener('click',function change_valeur() {
            let choice = select.selectedIndex;// Récupération de l'index du <option> choisi
            let valeur_cherchee;
            if(choice==0){//si aucune couleur n'a été choisi
                message.textContent='Choississez une couleur '; 
            }else{//si une couleur a été choisi
                message.textContent='';
                valeur_cherchee = select.options[choice].value; // Récupération du texte du <option> d'index "choice"
                let itemBasket={"name":name,"img":img,"price":price,"color":valeur_cherchee,"id":id};//création de l'objet produit
                function basket(){//modification de l'indicateur du nombre d'élément contenu dans le panier
                let basketnumber=document.getElementById('basket');
                let mica=localStorage.getItem('basket');
                let echo=JSON.parse(mica);
                let basketLength=echo.length;
                basketnumber.textContent=basketLength+' panier';
                }
                if(localStorage.getItem('basket')){//si un objet a déja été stocker on ajoute notre élément
                    let mica =localStorage.getItem('basket');
                    let echo=JSON.parse(mica);
                    echo.push(itemBasket);
                    let sellItem=JSON.stringify(echo);
                    localStorage.setItem('basket',sellItem);
                    basket();  
                }else{//si aucun objet n'a été sauvegarder on le crée 
                    localStorage.setItem("basket",JSON.stringify([itemBasket]));
                    basket();
                }
            
            }
            
        })
        for (let i = 0; i < colors.length; i++) {//on ajoute les différente couleur a notre liste déroulante
            let option=document.createElement('option');
            option.textContent=colors[i];
            option.setAttribute('type',colors[i]);
            select.append(option);
        }
        text.prepend(descDiv);
        text.prepend(priceDiv);
        text.prepend(nameDiv);
    }
    else{//si la requete échou
        throw error=new Error('erreur de connexion au serveur');
    }
}
helloapi().catch(error=>console.error(error));//appel de la fonction