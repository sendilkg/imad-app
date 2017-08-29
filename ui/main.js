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
        if(request.readyState === XMLHttpRequest.DONE){
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

//name part

var nameInput = document.getElementById('name');

var submit = document.getElementById('submit_btn');
submit.onclick = function(){
    //make a request to the server and send the name
    //capyture the list of names and render it to the list
    var nameValue = nameInput.value;
        //create a request variable
    var request = new XMLHttpRequest();
    
    //process the request info
    request.onreadystatechange = function () {
        if(request.readyState === XMLHttpRequest.DONE){
            //take action
            if(request.status === 200 ){
                var names = request.responseText;
                names = JSON.parse(names);
                var list = '';
                for(var i=0; i< names.length; i++){
                    list += '<li>' + names[i] + '</li>';
                }
                var ul = document.getElementById('namelist');
                ul.innerHTML = list;
            }
           
            //not done yet
        }
        
    };
    //make a request
    request.open('GET', 'http://sendilcareer.imad.hasura-app.io/submit-name?name='+ nameValue, true);
    request.send(null);
    
};

