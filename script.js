
if( localStorage.getItem('basket')){
    let mica =localStorage.getItem('basket');
    echo=JSON.parse(mica);
    console.log(echo);
    let basketnumber=document.getElementById('basket');
    basketnumber.textContent= echo.length+' panier';
}else{
    let mica =localStorage.getItem('basket');
    let basketLength=0;
    let basketnumber=document.getElementById('basket');
    basketnumber.textContent= basketLength+' panier';
}
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
                    let id=reponse._id;
                    let price=reponse.price;
                    let name=reponse.name;
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
                alert('Erreur de connexion au serveur, veuillez réessayer ultérieurement.');
            }
        }
    }