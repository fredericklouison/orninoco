let id=localStorage.getItem('id');
import {basketNumber} from "../module/numberBasket.js"; 
basketNumber()
async function helloapi(){
    const response= await fetch('http://localhost:3000/api/teddies/'+id);
    const teddies= await response.json();
    if(response.ok){
        let id =teddies._id
        let img=teddies.imageUrl;
        let name=teddies.name;
        let price=teddies.price;
        let description=teddies.description;
        let colors=teddies.colors;
        let title=document.querySelector('title');
        let item=document.querySelector('.item');
        let text=document.querySelector('.text')
        let select=document.querySelector('select');
        let imgdiv=document.createElement('img');
        let nameDiv=document.createElement('p');
        let priceDiv=document.createElement('p');
        let descDiv=document.createElement('p');
        let btn=document.getElementById('submit');
        nameDiv.textContent='Nom : '+name;
        priceDiv.textContent='Prix : '+price/100+'EUR';
        descDiv.textContent='description :   '+description;
        title.textContent='Produit : '+name;
        imgdiv.setAttribute('src',img);
        item.prepend(imgdiv);
        
        btn.addEventListener('click',function change_valeur() {
            let choice = select.selectedIndex  // Récupération de l'index du <option> choisi
            let valeur_cherchee = select.options[choice].value; // Récupération du texte du <option> d'index "choice"
            let itemBasket={"name":name,"img":img,"price":price,"color":valeur_cherchee,"id":id};
            function basket(){
                let basketnumber=document.getElementById('basket');
                let mica=localStorage.getItem('basket');
                let echo=JSON.parse(mica);
                let basketLength=echo.length;
                basketnumber.textContent=basketLength+' panier';
            }
            if(localStorage.getItem('basket')){
                let mica =localStorage.getItem('basket');
                let echo=JSON.parse(mica);
                echo.push(itemBasket);
                let sellItem=JSON.stringify(echo)
                localStorage.setItem('basket',sellItem);
                basket();  
                console.log(echo);
            }else{
                localStorage.setItem("basket",JSON.stringify([itemBasket]));
                let mica=localStorage.getItem('basket');
                let echo=JSON.parse(mica);
                console.log(JSON.parse(mica));
                basket();
            }
            
        })
        for (let i = 0; i < colors.length; i++) {
            let option=document.createElement('option');
            option.textContent=colors[i];
            option.setAttribute('type',colors[i]);
            select.append(option);
        }
        text.prepend(descDiv);
        text.prepend(priceDiv);
        text.prepend(nameDiv);
    }
    else{
        throw error=new Error('erreur de connexion au serveur');
    }
}
helloapi().catch(error=>console.error(error))