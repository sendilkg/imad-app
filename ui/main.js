/*console.log('Loaded!');
var img = document.getElementById('madi');
img.onclick = function(){
    img.style.marginLeft = '10px';

}*/

var counter = 0;
var button = document.getElementById('counter');
button.onclick = function(){
    counter = counter + 1;
    var span = document.getElementbyId('count');
    span.innerHtml = counter.toString();
    
};