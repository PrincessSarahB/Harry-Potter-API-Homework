const app = function(){
  const urlStudent = "http://hp-api.herokuapp.com/api/characters/students";
  const urlStaff  = "http://hp-api.herokuapp.com/api/characters/staff";
  makeRequest(urlStudent, requestComplete);
  makeRequest(urlStaff, secondRequestComplete);
}

const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();

}

const secondRequestComplete = function(){
  if(this.status !== 200) return;
  const staff = JSON.parse(this.response);
  populateDropdown('#staff', staff)
  const selectStaff = document.querySelector('#staff');
  selectStaff.addEventListener('change', function(){
    var staffMember = staff[selectStaff.value];
    if(selectStaff.value === ""){
      reset('#staff');
    } else {
      handleSelectChange('#selected',staffMember);
    }
  });
}
const requestComplete = function(){
  if(this.status !== 200) return;
  const students = JSON.parse(this.response);
  populateDropdown('#students', students)
  const select = document.querySelector('#students');
  select.addEventListener('change', function(){
    var student = students[select.value];
    if(select.value === ""){
      reset('#students');
    } else {
    handleSelectChange('#selected', student)
  }
  });
  addImage();
};

const addImage = function(){
  crest = document.querySelector('#crest');
  crest.src = "https://vignette.wikia.nocookie.net/harrypotter/images/6/6d/Hogwarts_crest.jpg/revision/latest?cb=20080209002605"
}

const populateDropdown = function(tagId, characters){
  const dropdown = document.querySelector(tagId);
  const selectOption = document.createElement('option');
  selectOption.value = ""
  dropdown.appendChild(selectOption);
  characters.forEach(function(character){
    const option = document.createElement('option');
    option.value = characters.indexOf(character);
    option.textContent = character.name;
    dropdown.appendChild(option);
  });

}

const reset = function(listId){
  const img = document.querySelector('#img')
  img.src = ""
  const ul = document.querySelector(listId);
  const nameLi = document.querySelector('#nameLi');
  nameLi.textContent = "";
  const houseLi = document.querySelector('#houseLi');
  houseLi.textContent = "";
  const ancestryLi = document.querySelector('#ancestryLi');
  ancestryLi.textContent = "";
  const patronusLi = document.querySelector('#patronusLi');
  patronusLi.textContent = "";
  const body = document.getElementsByTagName('body')[0];
  body.setAttribute("class", "");

}

const handleSelectChange = function(listId, character){
  const img = document.querySelector('#img')
  img.src = character.image;
  img.height = 400;
  const ul = document.querySelector(listId);
  const body = document.getElementsByTagName('body')[0];
  body.setAttribute("class", character.house);
  const nameLi = document.querySelector('#nameLi');
  nameLi.textContent = "Name: " + character.name;
  const houseLi = document.querySelector('#houseLi');
  houseLi.textContent = "House: " + character.house;
  const ancestryLi = document.querySelector('#ancestryLi');
  if(character.ancestry !== ""){
    ancestryLi.textContent = "Ancestry: " + character.ancestry;}
    else {
      ancestryLi.textContent = "Ancestry: Unknown";
    }
    const patronusLi = document.querySelector('#patronusLi');
    if(character.patronus !== ""){
      patronusLi.textContent = "Patronus: " + character.patronus;
    } else {
      patronusLi.textContent = "Patronus: Unknown";
    };


    ul.appendChild(nameLi)
    ul.appendChild(houseLi)
    ul.appendChild(ancestryLi);
    ul.appendChild(patronusLi);

  }


  window.addEventListener('load', app);
