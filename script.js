const config = {
  "urlFacialRegister": "http://localhost:90/v1/faceRegister/",
  "urlFacialRegisterPhoto": "http://localhost:90/v1/faceRegister/photos",
  "urlFacialMatcher": "http://localhost:90/v1/matchFace/match",
  "urlFacialLogin": "http://localhost:90/v1/auth/login"
}
const LOOK_DELAY = 1000 // 1 second
const LEFT_CUTOFF = window.innerWidth / 4
const RIGHT_CUTOFF = window.innerWidth - window.innerWidth / 4
let count = 0;
let startLookTime = Number.POSITIVE_INFINITY
let lookDirection = null
let imageElement = getNewImage()
let nextImageElement = getNewImage(true)
var data = localStorage

webgazer
  .setGazeListener((data, timestamp) => {
   
    window.onbeforeunload = function(){
      window.saveDataAcrossSessions = true;
      webgazer.end()
    }
   
    localforage.getItem('webgazerGlobalData').then(function(value) {
    });


    if (data == null || lookDirection === "STOP") return 

    if (
      data.x < LEFT_CUTOFF &&
      lookDirection !== "LEFT" &&
      lookDirection !== "RESET"
    ) {
      startLookTime = timestamp
      lookDirection = "LEFT"
    } else if (
      data.x > RIGHT_CUTOFF &&
      lookDirection !== "RIGHT" &&
      lookDirection !== "RESET"
    ) {
      startLookTime = timestamp
      lookDirection = "RIGHT"
    } else if (data.x >= LEFT_CUTOFF && data.x <= RIGHT_CUTOFF) {
      startLookTime = Number.POSITIVE_INFINITY
      lookDirection = null
    }

    if (startLookTime + LOOK_DELAY < timestamp) {
      if (lookDirection === "LEFT") {
        imageElement.classList.add("left")
      } else {
        imageElement.classList.add("right")
      }

      startLookTime = Number.POSITIVE_INFINITY
      lookDirection = "STOP"
      setTimeout(() => {
        imageElement.remove()
        nextImageElement.classList.remove("next")
        imageElement = nextImageElement
        nextImageElement = getNewImage(true)
        lookDirection = "RESET"
      }, 200)
    }
   
  })
  .begin()

function getNewImage(next = false) {
  const img = document.createElement("img")
  img.src = "https://picsum.photos/1000?" + Math.random()
  if (next) img.classList.add("next")
  document.body.append(img)
  return img
}

function takePhoto() {
  let c = document.getElementById("webgazerVideoCanvas");
  let v = document.getElementById("webgazerVideoFeed");
  c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
  let image_data_url = c.toDataURL('image/jpeg');
  photoFacialRegister(image_data_url)
  downloadImage(image_data_url)

}

async function photoFacialRegister(image_data_url) {
  let token = await login();
  console.log(token)
  let body = {
    "companyReq": localStorage.getItem("companyReq"),
    "base64front": image_data_url
}
  let Headers = {
    "Authorization": "Token " + token
  }

  await axios.post(config.urlFacialRegisterPhoto, body, {headers: Headers}).then(function (response) {
      console.log(response.data)
  }).catch(err => {
    console.log("REGISTRO FALLIDO ", err.response.data);
  })
}

function matchPhoto() {
  let c = document.getElementById("webgazerVideoCanvas");
  let v = document.getElementById("webgazerVideoFeed");
  c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
  let image_data_url = c.toDataURL('image/jpeg');
  matchFacial(image_data_url)
  downloadImage(image_data_url)

}

async function matchFacial(image_data_url) {
  let token = await login();
  console.log(token)
  let body = {
    "companyReq": localStorage.getItem("companyReq"),
    "base64File": image_data_url
}
  let Headers = {
    "Authorization": "Token " + token
  }

  await axios.post(config.urlFacialMatcher, body, {headers: Headers}).then(function (response) {
      console.log(response.data)
  }).catch(err => {
    console.log("REGISTRO FALLIDO ", err.response.data);
  })
}

faceRegister()

async function faceRegister() {
  let token = await login();
  console.log(token)
  let body = {
    "firstName": "asd",
    "lastName": "qwe",
    "email": "jeisa1as12on@lopez.co",
    "documentType": "CC",
    "documentNumber": "22312221344",
    "phone": "104805434",
    "sendToEmail": false
}
  let Headers = {
    "Authorization": "Token " + token
  }

  await axios.post(config.urlFacialRegister, body, {headers: Headers}).then(function (response) {
      console.log(response.data)
      localStorage.setItem("companyReq", response.data.result.a)
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


function downloadImage(url) {
  fetch(url, {
    mode : 'no-cors',
  })
    .then(response => response.blob())
    .then(blob => {
    let blobUrl = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.download = url.replace(/^.*[\\\/]/, '');
    a.href = blobUrl;
    document.body.appendChild(a);
    a.click();
    a.remove();
    console.log(url);
  })
}




