song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;

function preload()
{
    song =loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(600,450);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw()
{
    image(video,0,0,600,450);

    fill("#ff0000");
    stroke("#ff0000");
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY=Number(leftWristY);
    remove_decimal=floor(InNumberleftWristY);
    volume=remove_decimal/500;
    document.getElementById("volume").innerHTML="VOLUME = "+volume;
    song.setVolume(volume);
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded()
{
    console.log('PoseNet is initialized');
}

function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("Left Wrist X = "+leftWristX+",Y = "+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("Right Wrist X = "+rightWristX+",Y = "+rightWristY);
    }
}