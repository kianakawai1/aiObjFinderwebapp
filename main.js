statuss = "";
objectName = "";
objects = [];

function setup(){
    canvas = createCanvas(600, 440);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(600, 440);
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects";
    objectName = document.getElementById("inputObj").value;
}

function modelLoaded(){
    console.log("model loaded");
    statuss=true;
}

function draw(){
    image(video, 0, 0, 600, 440);
    if(statuss != ""){
        objectDetector.detect(video, gotResult)
        for(i=0; i < objects.length; i++){
            fill("#FF0000");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == objectName){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("objFound").innerHTML = "Object Found : " + objectName;
            };
        }
    }
}

function gotResult(error, results){
   if(error){
    console.log(error);
   } 
   console.log(results);
   objects = results;
    
}