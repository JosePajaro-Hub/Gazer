

const LOOK_DELAY = 1000 // 1 second
const LEFT_CUTOFF = window.innerWidth / 4
const RIGHT_CUTOFF = window.innerWidth - window.innerWidth / 4
let count = 0;
let startLookTime = Number.POSITIVE_INFINITY
let lookDirection = null
let imageElement = getNewImage()
let nextImageElement = getNewImage(true)
var data = localStorage
const video =   webgazer.getVideoElementCanvas();
const canva = webgazer.getVideoElementCanvas();
const snap = document.getElementById('snap');
let db;
var dbobj = openDatabase('GazeData', '1.0', 'Data from SearchGazer', 5*21024*1024);
dbobj.transaction(function (tx) {
  tx.executeSql('CREATE TABLE IF NOT EXISTS GlobalData(GazerGlobalData)')
});



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



