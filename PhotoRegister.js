let video = document.querySelector('#VideoElement')
const config = {
    "urlFacialRegisterPhoto": "http://localhost:90/v1/faceRegister/photos",
    "urlFacialLogin": "http://localhost:90/v1/auth/login"
  }
if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({video: true})
    .then(function (stream) {
        video.srcObject = stream;
        
    }).catch(function (err) {
        console.log('Error al registro de camara');
    })
} else {
    console.log("GetUserMedia no supported");
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

  async function login() {
    let body = {
      "email": "aulappprueba2@gmail.com",
        "password": "Pruebas123@"
    }
  
    return await axios.post(config.urlFacialLogin, body).then(function (response) {
        return response.data.result.token
    })
  }
  

async function takePhoto() {
    let c = document.getElementById("CanvasElement");
    let v = document.getElementById("VideoElement");
    c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
    let image_data_url = c.toDataURL('image/jpeg');
    await photoFacialRegister(image_data_url);
    //console.log(image_data_url);
    window.location = '/calibration.html'
  
  }
  