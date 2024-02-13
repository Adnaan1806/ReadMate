const wrapper = document.querySelector(".wrapper");
const registerLink = document.querySelector(".register-link");
const loginLink = document.querySelector(".login-link");

registerLink.onclick = () => {
  wrapper.classList.add("active");
};

loginLink.onclick = () => {
  wrapper.classList.remove("active");
};

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyAlKkKR3a1rU8q9vdz5bQr5bW6motQ1VFI",
    authDomain: "signin-8445a.firebaseapp.com",
    databaseURL: "https://signin-8445a-default-rtdb.firebaseio.com",
    projectId: "signin-8445a",
    storageBucket: "signin-8445a.appspot.com",
    messagingSenderId: "895799640437",
    appId: "1:895799640437:web:1506a6c48027c3b982133c",
  };
  
  firebase.initializeApp(firebaseConfig);
  
  const signupFormDB = firebase.database().ref("signupForm");
  
  document.getElementById('signupForm').addEventListener('submit', submitForm);
  
  function submitForm(e) {
      e.preventDefault();
  
      var username = getElementVal("username");
      var emailid = getElementVal("email");
      var password = getElementVal("password");

      if (!validate_email(emailid) || !validate_password(password)) {
        alert('Email or Password is outta line!!!');
        return;
    }

    if (!validate_field(username)) {
        alert('Field is outta line!!!');
        return;
    }
  
    window.location.href = "http://127.0.0.1:5502/Login%20and%20Registration%20Page/index.html?#";
      saveMessages(username,emailid,password);
      alert("Registered Successfully!")
  }

  const saveMessages = (username,emailid,password) => {
     
    var newSignUpForm = signupFormDB.push();

    newSignUpForm.set({
        username: username,
        emailid: emailid,
        password: password
    })

  };
  
  const getElementVal = (id) => {
      return document.getElementById(id).value;
  }


  function validate_email(emailid){
        
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if(expression.test(emailid) == true){
        return true
    }
    else{
        return false
    }
}

function validate_password(password){
    
  if(password < 6){
    return false
}
else{
    return true
}
}

function validate_field(username){
    
if(username == null){
    return false
}

if(username.length <= 0){
    return false
}
else{
    return true
}
}


// SIGN IN //

  document.getElementById('signinForm').addEventListener('submit', signIn);

function signIn(e) {
    e.preventDefault();

    var signInUsername = getElementVal("logusername");
    var signInPassword = getElementVal("logpassword");

    // Retrieve user data from the database based on the entered username
    signupFormDB.orderByChild("username").equalTo(signInUsername).once("value", function(snapshot) {
        if (snapshot.exists()) {
            // User found, check if the password matches
            snapshot.forEach(function(childSnapshot) {
                var storedPassword = childSnapshot.val().password;
                if (storedPassword === signInPassword) {
                    // Password matches, user is signed in
                    alert("Sign in successful!");
        
                    document.body.classList.add('fade-out');

                    // Redirect to the home page after a delay (adjust the delay as needed)
                    setTimeout(function() {
                        window.location.href = "http://127.0.0.1:5502/home.html";
                    }, 500);
                    
                } else {
                    // Password does not match
                    alert("Incorrect password");
                }
            });
        } else {
            // User not found
            alert("User not found");
        }
    });
}