// Get the elements with class="column"
var elements = document.getElementsByClassName("column");

// Declare a loop variable
var i;

// Full-width images
function two() {
    for (i = 0; i < elements.length; i++) {
        elements[i].style.msFlex = "50%";  // IE10
        elements[i].style.flex = "50%";
        }
    }

// Two images side by side
function four() {
    for (i = 0; i < elements.length; i++) {
        elements[i].style.msFlex = "25%";  // IE10
        elements[i].style.flex = "25%";
        }
    }

// Four images side by side
/*function four() {
    for (i = 0; i < elements.length; i++) {
        elements[i].style.msFlex = "20%";  // IE10
        elements[i].style.flex = "20%";
        }
    }*/

// Add active class to the current button (highlight it)
var header = document.getElementById("myHeader");
var btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
    });
}


// backgroundColor
function bgcolor(e){
    var x = e.style.background;
    document.body.style.backgroundColor = x;
}

function textColor(e){
    var y = e.style.background;
    var x = document.getElementsByName("text");
    for(var i = 0; i < x.length; i++){
        x[i].style.color=y;
    }
}
var open = true;
function toggleback(){
    
    if(open){
        document.getElementById("txtback").style.display = "block";
        open = false;
    }else{
        document.getElementById("txtback").style.display = "none";
        open = true;
        
    }
    
    console.log(open);
}
var openx = true;
function toggletext(){
    
    if(openx){
        document.getElementById("txtcolor").style.display = "block";
        openx = false;
    }else{
        document.getElementById("txtcolor").style.display = "none";
        openx = true;
        
    }
    
    console.log(open);
}

function closeimg(){
    document.getElementById("imageviewer").style.display="none";
    document.getElementById("imageholder").style.display="none";
}
function popup(dis, gal){
    document.getElementById("imageviewer").style.display="block";
    document.getElementById("imageholder").style.display="block";
    document.getElementById("imagehold").src=gal.src;
    document.getElementById("imagedes").innerHTML = dis;
    
}