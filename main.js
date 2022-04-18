prediction1= "";
prediction2= "";

Webcam.set({
    width: 350,
    height: 300, 
    image_format: 'png',
    png_quality: 100
});

camera= document.getElementById("camera"); 
Webcam.attach('#camera'); 

function take_snapshot() {
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML= '<img id="capap" src="'+ data_uri +'">'; 
    });
}

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Q9l9cXAux/model.json' , modelloaded);

function modelloaded() {
    console.log("Model is Loaded");
}

function speak() {
    var synth= window.speechSynthesis; 
    data1= "The First Prediction Is  " + prediction1; 
    data2= " and The Second Prediction Is" + prediction2; 
    var utter= new SpeechSynthesisUtterance(data1+data2); 
    synth.speak(utter); 
}

function check() {
    img=document.getElementById("capap"); 
    classifier.classify(img, gotResult); 
}

function gotResult(error,results) {
    if (error) {
        console.log(error); 
    }
    else {
        console.log(results); 
        document.getElementById("result_name").innerHTML= results[0].label; 
        document.getElementById("result_name2").innerHTMl= results[1].label;
        prediction1= results[0].label;
        prediction2= results[1].label; 
        speak();
        if (results[0].label=="Up") {
            document.getElementById("result_gesture").innerHTML= "&#128070;"; 
        }
        if (results[0].label=="Down") {
            document.getElementById("result_gesture").innerHTML= "&#128071;"; 
        }
        if (results[0].label=="Left") {
            document.getElementById("result_gesture").innerHTML= "&#128072;"; 
        }
        if (results[1].label=="Right") {
            document.getElementById("result_gesture2").innerHTML= "&#128073;"; 
        }
    }
}