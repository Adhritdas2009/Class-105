Webcam.set(
    {
        width: 250,
        height: 250,
        image_format: 'png',
        png_quality: 90
    }
);

camera=  document.getElementById('camera');

Webcam.attach('#camera');

function cap(){
    Webcam.snap(function(data_uri){
        document.getElementById('result').innerHTML="<img src="+data_uri+" id='image'>"
    });
}

console.log("ml5 version is ", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/RvmSbHBHF/model.json", modelLoaded);

function modelLoaded(){
    console.log("model has been loaded");
}

function ident(){
   img= document.getElementById('image');
   classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("object_identify").innerHTML=results[0].label;
        p = results[0].confidence*100;
        document.getElementById("accurate").innerHTML=p.toFixed(3) + " % ";
    }
}