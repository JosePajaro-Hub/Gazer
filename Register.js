const form = document.getElementById('form');
const buttonReg = document.getElementById('buttonRegister');
let href = document.location.href;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log("HOLA ENTRE");
  console.log(e.target.dType.value);
  let token = await login();
  let body = {
    "firstName": e.target.fname.value,
    "lastName": e.target.lname.value,
    "email": e.target.eaddress.value,
    "documentType": e.target.dType.value,
    "documentNumber": e.target.dNumber.value,
    "phone": e.target.phone.value,
    "sendToEmail": false
  }
  let Headers = {
    "Authorization": "Token " + token
  }

  await axios.post(config.urlFacialRegister, body, { headers: Headers }).then(function (response) {
    localStorage.setItem("companyReq", response.data.result.a)
    window.location = "/PhotoRegister.html"
  }).catch(err => {
    console.log("REGISTRO FALLIDO ", err.response.data);
  })
});

const config = {
  "urlFacialRegister": "http://localhost:90/v1/faceRegister/",
  "urlFacialLogin": "http://localhost:90/v1/auth/login"
}

async function onSubmit(event) {
  console.log("HOLA ENTRE");
  localStorage.setItem("entre", "entrado")
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

  await axios.post(config.urlFacialRegister, body, { headers: Headers }).then(function (response) {
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