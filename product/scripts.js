let id=localStorage.getItem('id');

const url= 'http://localhost:3000/api/teddies/'+id;
    let requete= new XMLHttpRequest();
    requete.open('GET',url);
    requete.responseType='json';
    requete.send();
    requete.onload=function(){
        if(requete.readyState===XMLHttpRequest.DONE){
            if(requete.status===200){
                let reponse=requete.response;
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
                    localStorage.setItem('itemNumber','0');
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