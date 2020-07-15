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
                nameDiv.textContent='Nom : '+name;
                priceDiv.textContent='Prix : '+price;
                descDiv.textContent='description :   '+description;
                title.textContent='Produit : '+name;
                imgdiv.setAttribute('src',img);
                item.prepend(imgdiv);
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