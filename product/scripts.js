let id=localStorage.getItem('id');
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
const url= 'http://localhost:3000/api/teddies/'+id;
    let requete= new XMLHttpRequest();
    requete.open('GET',url);
    requete.responseType='json';
    requete.send();
    requete.onload=function(){
        if(requete.readyState===XMLHttpRequest.DONE){
            if(requete.status===200){
               
                let reponse=requete.response;
                let id =reponse._id
                let img=reponse.imageUrl;
                let name=reponse.name;
                let price=reponse.price;
                let description=reponse.description;
                let colors=reponse.colors;
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
                        basketLength=echo.length;
                        basketnumber.textContent=basketLength+' panier';
                    }
                    if(localStorage.getItem('basket')){
                        let mica =localStorage.getItem('basket');
                        echo=JSON.parse(mica);
                        echo.push(itemBasket);
                        sellItem=JSON.stringify(echo)
                        localStorage.setItem('basket',sellItem);
                        basket();  
                        console.log(echo);
                    }else{
                        localStorage.setItem("basket",JSON.stringify([itemBasket]));
                        let mica=localStorage.getItem('basket');
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
                console.log('error');
            }
        }
    }