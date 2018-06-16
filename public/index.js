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
  const select = document.querySelector('select');
select.addEventListener('change', function(){
  var student = students[select.value];
  handleSelectChange(student)
});
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

const handleSelectChange = function(student){
  const ul = document.querySelector('#selected-student');
  const img = document.querySelector('#img')
  img.src = student.image;
  img.height = 400;
  const nameLi = document.querySelector('#nameLi');
  nameLi.textContent = "Name: " + student.name;
  const houseLi = document.querySelector('#houseLi');
  houseLi.textContent = "House: " + student.house;
  const ancestryLi = document.querySelector('#ancestryLi');
  ancestryLi.textContent = "Ancestry: " + student.ancestry;
  const patronusLi = document.querySelector('#patronusLi');
  if(student.patronus !== ""){
  patronusLi.textContent = "Patronus: " + student.patronus;
} else {
  patronusLi.textContent = "Patronus: Unknown";
};


  ul.appendChild(nameLi)
  ul.appendChild(houseLi)
  ul.appendChild(ancestryLi);
  ul.appendChild(patronusLi);

}


window.addEventListener('load', app);
