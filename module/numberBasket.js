export let basketNumber=()=>{
    
    if( localStorage.getItem('basket')){//si le panier existe on ajoute le nombre d'élément qu'il contient a note indicateur
        let mica =localStorage.getItem('basket');
        let echo=JSON.parse(mica);
        let basketnumber=document.getElementById('basket');
        basketnumber.textContent= echo.length+' panier';
        return true
    }else{//s'il n'existe pas notre indicateur indique Zero
        let basketLength=0;
        let basketnumber=document.getElementById('basket');
        basketnumber.textContent= basketLength+' panier';
        return false
    }
}