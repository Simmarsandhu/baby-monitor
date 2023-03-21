object=[];
img="";
var status="";
function preload(){
 img=loadImage("dog_cat.jpg");
 song=loadSound("z_alert.mp3");
}
function setup(){
    canvas= createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    object_detection=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="STATUS : Detecting objects";
}

function draw(){
    
    image(video,0,0,380,380);
    if(status !=""){
    object_detection.detect(video, gotresults);
    r=floor(random(255))
    g=floor(random(255))
    b=floor(random(255))
    }
    for(i=0;i<object.length;i++){
        if(object[i].label=="person"){
        document.getElementById("status").innerHTML="STATUS: baby detected"
        
    fill(r,g,b);
    stroke(r,g,b);
    accuracy= floor(object[i].confidence*100);
    text(object[i].label+" "+accuracy+"%",object[i].x+15,object[i].y+15);
    noFill();
    rect(object[i].x,object[i].y,object[i].width,object[i].height);
    song.stop()
}
else{
    document.getElementById("status").innerHTML="STATUS: baby not detected";
    song.play();
}
}  
}
function modelLoaded(){
    console.log("modelLaded");
    status= true;
    

}
function gotresults(error,results){
    if(error){
        console.log("error");

    }
    else{
        console.log(results)
        object=results;
    }
}