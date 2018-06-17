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
  populateDropdownStaff(staff)
  const selectStaff = document.querySelector('#staff');
  selectStaff.addEventListener('change', function(){
    var staffMember = staff[selectStaff.value];
    handleSelectChangeStaff(staffMember);
  });

}
const requestComplete = function(){
  if(this.status !== 200) return;
  const students = JSON.parse(this.response);
  populateDropdownStudent(students)
  const select = document.querySelector('#students');
select.addEventListener('change', function(){
  var student = students[select.value];
  handleSelectChangeStudent(student)
});
  addImage();
};

const addImage = function(){
  crest = document.querySelector('#crest');
  crest.src = "https://vignette.wikia.nocookie.net/harrypotter/images/6/6d/Hogwarts_crest.jpg/revision/latest?cb=20080209002605"
}

const populateDropdownStudent = function(students){
  const dropdown = document.querySelector('#students');
  students.forEach(function(student){
    const option = document.createElement('option');
    option.value = students.indexOf(student);
    option.textContent = student.name;
    dropdown.appendChild(option);
    });

}

const populateDropdownStaff = function(staff){
  const dropdown = document.querySelector('#staff');
  staff.forEach(function(member){
    const option = document.createElement('option');
    option.value = staff.indexOf(member);
    option.textContent = member.name;
    dropdown.appendChild(option);
    });

}

const handleSelectChangeStudent = function(student){
  const ul = document.querySelector('#selected-student');
  const body = document.getElementsByTagName('body')[0];
  body.setAttribute("class", student.house);
  const img = document.querySelector('#img')
  img.src = student.image;
  img.height = 400;
  const nameLi = document.querySelector('#nameLi');
  nameLi.textContent = "Name: " + student.name;
  const houseLi = document.querySelector('#houseLi');
  houseLi.textContent = "House: " + student.house;
  const ancestryLi = document.querySelector('#ancestryLi');
  if(student.ancestry !== ""){
  ancestryLi.textContent = "Ancestry: " + student.ancestry;}
  else {
   ancestryLi.textContent = "Ancestry: Unknown";
  }
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

const handleSelectChangeStaff = function(staffMember){
  const ul = document.querySelector('#selected-staffMember');
  const body = document.getElementsByTagName('body')[0];
  body.setAttribute("class", staffMember.house);
  const img = document.querySelector('#img')
  img.src = staffMember.image;
  img.height = 400;
  const nameLi = document.querySelector('#nameLi');
  nameLi.textContent = "Name: " + staffMember.name;
  const houseLi = document.querySelector('#houseLi');
  houseLi.textContent = "House: " + staffMember.house;
  const ancestryLi = document.querySelector('#ancestryLi');
  if(staffMember.ancestry !== ""){
  ancestryLi.textContent = "Ancestry: " + staffMember.ancestry;}
  else {
   ancestryLi.textContent = "Ancestry: Unknown";
  }
  const patronusLi = document.querySelector('#patronusLi');
  if(staffMember.patronus !== ""){
  patronusLi.textContent = "Patronus: " + staffMember.patronus;
} else {
  patronusLi.textContent = "Patronus: Unknown";
};


  ul.appendChild(nameLi)
  ul.appendChild(houseLi)
  ul.appendChild(ancestryLi);
  ul.appendChild(patronusLi);

}

window.addEventListener('load', app);
