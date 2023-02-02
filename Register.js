const form = document.getElementById('form');
form.addEventListener('submit', faceRegister());
  const buttonReg = document.getElementById('buttonRegister');
  let href = document.location.href;
   
const config = {
    "urlFacialRegister": "http://localhost:90/v1/faceRegister/",
    "urlFacialLogin": "http://localhost:90/v1/auth/login"
  }

async function faceRegister(event) {
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
      localStorage.setItem("companyReq", response.data.result.a)
     
  }).catch(err => {
    console.log("REGISTRO FALLIDO ", err.response.data);
  })
  event.preventDefault();
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
