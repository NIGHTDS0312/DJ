song = "";

function preload()
{

    song = loadSound("music.mp3");

}

Puntos_Muñeca_Derecha = 0;
Puntos_Muñeca_Izquierda = 0;

rightWristX = 0;
leftWristX = 0;

rightWristY = 0;
leftWristY = 0;

function setup() 
{
    
    canvas = createCanvas(550,550);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

}

function modelLoaded()
{

    console.log('PoseNet esta inicializando');

}

function gotPoses(results)
{
    
    if(results.length > 0)
    {
    
        Puntos_Muñeca_Derecha = results[0].pose.keypoints[10].score;
        Puntos_Muñeca_Izquierda = results[0].pose.keypoints[9].score;

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;

        leftWristY = results[0].pose.leftWrist.y;
        rightWristY = results[0].pose.rightWrist.y;

    }


}

function draw()
{

    image(video, 0, 100, 550, 550);

    fill('#7375E9');
    stroke('#bad6f0');
    
    if(Puntos_Muñeca_Derecha > 0.2)
    {

        circle(rightWristX, rightWristY, 20)

        if(rightWristY > 0 && rightWristY <= 100 )
        {

            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);

        }

        else if(rightWristY > 100 && rightWristY <= 200)
        {

            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);

        }

        else if(rightWristY > 200 && rightWristY <= 300)
        {

            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);

        }

        else if(rightWristY > 300 && rightWristY <= 400)
        {

            document.getElementById("speed").innerHTML = "Speed = 3x";
            song.rate(3);

        }

        else if(rightWristY > 400)
        {

            document.getElementById("speed").innerHTML = "Speed = 4x";
            song.rate(4);

        }
        
    }

    if(Puntos_Muñeca_Izquierda > 0.2)
    {

        circle(leftWristX, leftWristY, 20);

        InNumberleftWristY = Number(leftWristY);
        new_leftWristY = floor(InNumberleftWristY *2);

        leftWristY_div = new_leftWristY/1000;

        document.getElementById("volume").innerHTML = "Volume = " + leftWristY_div;
        song.setVolume(leftWristY_div);

    }

}

function play()
{

    song.play();
    song.setVolume(1);
    song.rate(1);

}

