// let signInButton =  document.getElementById("signInButton");

// signInButton.addEventListener("click", submit);
// function submit(event){
//   event.preventDefault();
//   let name = document.getElementById('name').value ;
//   var phone = document.getElementById('phoneNumber').value;
//   let age = document.getElementById("age").value  ;
//   let pincode = document.getElementById('pincode').value ;
//   let aadhar  = document.getElementById('aadharNo').value ; 
//   var password = document.getElementById('password').value ; 

//   let data  = {
//     name :name ,
//     phone : phone, 
//    age : age, 
//    pincode : pincode,
//    aadhar : aadhar , 
//    password : password
//   };
// axios.post('http://localhost:3000/user/signIn' , data).then((response)=>{
//   console.log(response.data)
// }).catch((error)=>{
//   console.log(error)
// })

// };



// let loginButton = document.getElementById('loginInButton');
// loginButton.addEventListener('click' , login);
// function login(event){
//   event.preventDefault();
// var password = document.getElementById("password").value ; 
// var phone = document.getElementById("phoneNumber").value ; 
// let loginDetails = {
//   phone:phone,
//   password:password
// };
// axios.post('http://localhost:3000/user/login' , loginDetails).then((response)=>{
//   console.log(response.data);
// }).catch((error)=>{
//   console.log(error)
// })

// }



// JavaScript to toggle form visibility
const registrationForm = document.getElementById("registrationForm");
const loginForm = document.getElementById("loginForm");
const showRegistrationButton = document.getElementById("signInButton");
const showLoginButton = document.getElementById("loginInButton");

showRegistrationButton.addEventListener("click", () => {
    registrationForm.style.display = "block";
    loginForm.style.display = "none";
});

showLoginButton.addEventListener("click", () => {
    registrationForm.style.display = "none";
    loginForm.style.display = "block";
});

// Add an event listener for the registration form submission
registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let name = document.getElementById('name').value ;
    let email = document.getElementById('email').value
    var phone = document.getElementById('phoneNumber').value;
    let age = document.getElementById("age").value  ;
    let pincode = document.getElementById('pincode').value ;
    let aadhar  = document.getElementById('aadharNo').value ; 
    var password = document.getElementById('password').value ; 
  
    let data  = {
      name :name ,
      email:email,
      phone : phone, 
     age : age, 
     pincode : pincode,
     aadhar : aadhar , 
     password : password
    };
  axios.post('http://localhost:3000/user/signIn' , data).then((response)=>{
    
    if(response.data[1] === false){
      alert('This email address in use please login....')
    }else{
      alert(response.data.message)
      console.log(response.data)
    }
  }).catch((error)=>{
    console.log(error)
  })
    registrationForm.style.display = "none";
    loginForm.style.display = "block";
});

// Add an event listener for the login form submission
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();  
  var password = document.getElementById("password").value ; 
    var phone = document.getElementById("phoneNumber").value ; 
    let loginDetails = {
      phone:phone,
      password:password
    };
    axios.post('http://localhost:3000/user/login' , loginDetails).then((response)=>{
     // console.log(response.data);
      console.log(response.data.token)
      localStorage.setItem('token' , response.data.token);
      window.location.href = "./slots/slot.html";

    }).catch((error)=>{
      console.log(error)
    })
});
