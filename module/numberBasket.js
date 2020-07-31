export let basketNumber=()=>{
    if( localStorage.getItem('basket')){
        let mica =localStorage.getItem('basket');
        let echo=JSON.parse(mica);
        let basketnumber=document.getElementById('basket');
        basketnumber.textContent= echo.length+' panier';
        return true
    }else{
        let basketLength=0;
        let basketnumber=document.getElementById('basket');
        basketnumber.textContent= basketLength+' panier';
        return false
    }
}