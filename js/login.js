const login = (e) => {
  var username = document.querySelector("#username").value;
  var password = document.querySelector("#password").value;
  var accounts = JSON.parse(localStorage.getItem("accounts"));
  var btnLogin = document.querySelector("#btnLogin");
  console.log("acc", accounts);
  accounts.map((item) => {
    if (item.username === username && item.password === password) {
      user = {
        username: username,
        password: password,
        ...item,
      };
      localStorage.setItem("login", JSON.stringify(user));
      window.location.replace("../../index.html");
      return;
    } else {
      // window.location.replace("./index.html");
      // return ;
    }
  });
};

login();

const test = () => {
  var username = document.querySelector("#username").value;
  var accounts = JSON.parse(localStorage.getItem("accounts"));
};
