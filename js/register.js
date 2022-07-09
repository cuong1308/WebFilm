const signup = () => {
    // e.preventDefault();
    var formSubmit = $(".submit-register");
    var username = document.querySelector("#username").value;
    var email = document.querySelector("#email").value;
    var fullname = document.querySelector("#fullname").value;
    var phone = document.querySelector("#phone").value;
    var password = document.querySelector("#password").value;
    var confirmPassword = document.querySelector("#confirm-password").value;
    var accounts = JSON.parse(localStorage.getItem("accounts"));
    var btnSigup = document.querySelector("#btnSignup");
    if (accounts == null) accounts = [];
    // var btnSigup = document.querySelector("#btnSignup").value;
    var user = {
      username: username,
      email: email,
      fullname: fullname,
      phone: phone,
      password : password ,
    };
  
    accounts.push(user);
    localStorage.setItem("accounts", JSON.stringify(accounts));
    window.location.replace("../login/index.html");
  };