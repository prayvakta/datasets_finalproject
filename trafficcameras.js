
var xhr = new XMLHttpRequest;//XMLHTTPRequest object
var parsedrecord;//parsed JSON file
//load pageSetup
window.onload=pageSetup;

function pageSetup() {
	
    //event listener
    document.getElementById("searchquadrant").addEventListener("keyup", function (){ searchByQuadrant(this.value);},false);   
    document.getElementById("searchcamera").addEventListener("keyup", function (){ searchByCamera(this.value);},false);   
    document.getElementById("searchlocation").addEventListener("keyup", function (){ searchByLocation(this.value);},false);   

  xhr.onreadystatechange = function() {
    
    if (xhr.readyState == 4 && xhr.status == 200) {
     parsedrecord = JSON.parse(xhr.responseText);
      //displayData(r);
    }
  };
  xhr.open("GET", "https://data.calgary.ca/resource/k7p9-kppz.json", true);
  xhr.send();
	
}

function searchByQuadrant(keyvalue){
    
    var output="<tr><th>Camera Description</th><th>Camera Location</th><th>Quadrant</th><th>Photo</th></tr>";
    var quadrant;

    for(let i=0; i<parsedrecord.length; i++){
        let record = parsedrecord[i];
        quadrant = record.quadrant;
        if(quadrant.startsWith(keyvalue.toUpperCase())){
            output+="<tr><td>";
            output+=record.camera_url.description;
            output+="</td><td>";
            output+=record.camera_location;
            output+="</td><td>";
            output+=record.quadrant;
            output+="</td><td>";
            output+=record.camera_url.url;
            output+="</td></tr>"
        }  
    }
    document.getElementById("cameraresults").innerHTML=output;
}

function searchByCamera(keyvalue){
    
    var output="<tr><th>Camera Description</th><th>Camera Location</th><th>Quadrant</th><th>Photo</th></tr>";
    var camera;

    for(let i=0; i<parsedrecord.length; i++){
        let record = parsedrecord[i];
        camera = record.camera_url.description;
        if(camera.startsWith(keyvalue)){
            output+="<tr><td>";
            output+=record.camera_url.description;
            output+="</td><td>";
            output+=record.camera_location;
            output+="</td><td>";
            output+=record.quadrant;
            output+="</td><td>";
            output+=record.camera_url.url;
            output+="</td></tr>"
        }  
    }
    document.getElementById("cameraresults").innerHTML=output;
}

function searchByLocation(keyvalue){
    
    var output="<tr><th>Camera Description</th><th>Camera Location</th><th>Quadrant</th><th>Photo</th></tr>";
    var location;

    for(let i=0; i<parsedrecord.length; i++){
        let record = parsedrecord[i];
        location = record.camera_location.toUpperCase();
        if(location.startsWith(keyvalue.toUpperCase())){
            output+="<tr><td>";
            output+=record.camera_url.description;
            output+="</td><td>";
            output+=record.camera_location;
            output+="</td><td>";
            output+=record.quadrant;
            output+="</td><td>";
            output+=record.camera_url.url;
            output+="</td></tr>"
        }  
    }
    document.getElementById("cameraresults").innerHTML=output;
}