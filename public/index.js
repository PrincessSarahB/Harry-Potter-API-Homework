const app = function(){
  const url = "http://hp-api.herokuapp.com/api/characters/students";
  makeRequest(url, requestComplete);
}

const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();

}

const requestComplete = function(){
  if(this.status !== 200) return;
  const students = JSON.parse(this.response);
  populateDropdown(students)
};


const populateDropdown = function(students){
  const dropdown = document.querySelector('#students');
  students.forEach(function(student){
    const option = document.createElement('option');
    option.value = students.indexOf(student);
    option.textContent = student.name;
    dropdown.appendChild(option);
    });

}


window.addEventListener('load', app);
