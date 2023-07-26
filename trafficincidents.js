
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
  xhr.open("GET", "https://data.calgary.ca/resource/35ra-9556.json", true);
  xhr.send();
	
}

function searchByQuadrant(keyvalue){
    
    var output="<tr><th>Date</th><th>Quadrant</th><th>Major Intersection</th></tr>";
    var quadrant;

    for(let i=0; i<parsedrecord.length; i++){
        let record = parsedrecord[i];
        quadrant = record.quadrant;
        if(quadrant.startsWith(keyvalue.toUpperCase())){
            output+="<tr><td>";
            output+=record.start_dt;
            output+="</td><td>";
            output+=record.quadrant;
            output+="</td><td>";
            output+=record.incident_info;
            output+="</td></tr>"
        }  
    }
    document.getElementById("trafficresults").innerHTML=output;
}