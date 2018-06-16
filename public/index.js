const app = function(){
  const url = "http://ron-swanson-quotes.herokuapp.com/v2/quotes";
  makeRequest(url, requestComplete);
}

const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();

}



window.addEventListener(load, app);
