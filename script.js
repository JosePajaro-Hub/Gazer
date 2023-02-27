
const LEFT_CUTOFF = window.innerWidth / 4
const RIGHT_CUTOFF = window.innerWidth - window.innerWidth / 4
let startLookTime = Number.POSITIVE_INFINITY
var data = localStorage


setInterval(() => {
  takePhoto();
}, 20000)

webgazer
  .setGazeListener((data, timestamp) => {
   
    window.onbeforeunload = function(){
      window.saveDataAcrossSessions = true;
      webgazer.end()
    }
  })
  .begin();
  webgazer.showVideoPreview(false).showPredictionPoints(false);


function takePhoto() {
  let c = document.getElementById("webgazerVideoCanvas");
  let v = document.getElementById("webgazerVideoFeed");
  c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
  let image_data_url = c.toDataURL('image/jpeg');
  console.log(image_data_url)
}






