omi = "";
town = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
songOne = "";
songTwo = "";

function preload(){
    omi = loadSound("cheerleader.mp3");
    town = loadSound("disney.mp3");
};

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO)
    video.size(600, 500);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
};

function modelLoaded(){
    console.log("poseNet loaded succesfully")
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
    }
}
function draw(){
    image(video, 0, 0, 600, 500);
    fill("#8CF198");
    stroke("#db27bd");
        
    songOne = omi.isPlaying();
    songTwo = town.isPlaying();

    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        town.stop();
        if(songOne == false){
            omi.play();
            document.getElementById("song_name").innerHTML = "Now playing: Cheerleader -Omi"
        }
    }
};