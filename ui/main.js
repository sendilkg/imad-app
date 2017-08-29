/*console.log('Loaded!');
var img = document.getElementById('madi');
img.onclick = function(){
    img.style.marginLeft = '10px';

}*/
//counter code

var button = document.getElementById('counter');

button.onclick = function () {
    
    //create a request variable
    var request = new XMLHttpRequest();
    
    //process the request info
    request.onreadystatechange = function () {
        if(request.readystate === XMLHttpRequest.DONE){
            //take action
            if(request.status === 200 ){
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
            //not done yet
        }
        
    };
    
    //make a request
    request.open('GET', 'http://sendilcareer.imad.hasura-app.io/counter', true);
    request.send(null);
    
};