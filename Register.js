
  const buttonReg = document.getElementById('buttonRegister');
  let href = document.location.href;
   
const config = {
    "urlFacialRegister": "http://localhost:90/v1/faceRegister/",
    "urlFacialLogin": "http://localhost:90/v1/auth/login"
  }

async function faceRegister() {
  let token = await login();
  let body = {
    "firstName": document.getElementById(fname),
    "lastName": document.getElementById(lname),
    "email": document.getElementById(eadress),
    "documentType": document.getElementById(eadress),
    "documentNumber": document.getElementById(dNumber),
    "phone": document.getElementById(phone),
   
    "sendToEmail": false
}
console.log(document.getElementById(phone));
  let Headers = {
    "Authorization": "Token " + token
  }

  await axios.post(config.urlFacialRegister, body, {headers: Headers}).then(function (response) {
      console.log(response.data)
      localStorage.setItem("companyReq", response.data.result.a)
      console.log(window.location);
      window.location = "http://127.0.0.1:5500/PhotoRegister.html";
  }).catch(err => {
    console.log("REGISTRO FALLIDO ", err.response.data);
  })
 
}

async function login() {
    let body = {
      "email": "aulappprueba2@gmail.com",
        "password": "Pruebas123@"
    }
  
    return await axios.post(config.urlFacialLogin, body).then(function (response) {
        return response.data.result.token
    })
  }
