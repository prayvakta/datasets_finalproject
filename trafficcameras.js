
var xhr = new XMLHttpRequest;//XMLHTTPRequest object
var parsedrecord;//parsed JSON file
//load pageSetup
window.onload=pageSetup;

function pageSetup() {
	
    //event listener
    document.getElementById("searchquadrant").addEventListener("keyup", function (){ searchByQuadrant(this.value);},false);   

  xhr.onreadystatechange = function() {
    console.log("State Changed!")
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