let body = document.querySelector("body");

function toggletheme(){
    if (body.classList.contains('light')){
        body.classList.remove('light');
        body.classList.add('dark');
    }else{
        body.classList.remove('dark');
        body.classList.add('light');
    }
}