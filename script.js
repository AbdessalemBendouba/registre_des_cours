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

function getFilesFromServer(){
    var fs = require('fs');
    var courses_files = fs.readdirSync('/pdf/courses');
    var TD_files = fs.readdirSync('/pdf/TD');
}