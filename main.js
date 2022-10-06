status = "";
objects = [];

function preload(){
  video = createVideo("video.mp4");

}

function setup(){
  canvas = createCanvas(450, 375);
  canvas.center();
  video.hide();
}

function draw(){
  image(video, 0, 0, 450, 375);
  if(status != ""){
    objectDetector.detect(video, gotResult);
    for(i = 0 ; i < objects.length; i++){
        document.getElementById("status1").innerHTML = "Objects Detected!";
        document.getElementById("number1").innerHTML = "Number of objects in video : " + objects.length;
        percentage = floor(objects[i].confidence*100);
        fill("red");
        text(objects[i].label + " " + percentage + "%", objects[i].x + 5, objects[i].y + 15);
        noFill();
        stroke("red");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }
}

function start(){
    video.play();
    objectDetector = ml5.objectDetector("cocossd", ModelLoaded);
    document.getElementById("status1").innerHTML = "Status : Detecting Objects";
}

function ModelLoaded(){
    console.log("Model Loaded!");
    status = true;
    video.speed(1.5);
    video.volume(0.5);
    video.loop();
}

function gotResult(error, results){
    if(error){
        console.log(error);
        console.log("an error has occured..");
    }
    else{
        console.log(results);
        objects = results;
    }
}