var xhr = new XMLHttpRequest;//XMLHTTPRequest object
var parsedrecord;//parsed JSON file
//load pageSetup
window.onload=pageSetup;

function pageSetup() {
	
    //event listener
    document.getElementById("searchpermit").addEventListener("keyup", function (){ searchByPermitId(this.value);},false);   

  xhr.onreadystatechange = function() {
    console.log("State Changed!")
    if (xhr.readyState == 4 && xhr.status == 200) {
     parsedrecord = JSON.parse(xhr.responseText);
      //displayData(r);
    }
  };
  xhr.open("GET", "https://data.calgary.ca/resource/c2es-76ed.json", true);
  xhr.send();
	
	
}

function searchByPermitId(keyvalue){
    console.log("event added to search permit!")
    console.log(keyvalue);

    //set up table
    var output="<tr><th>Permit Number</th><th>Address</th><th>Latitude</th><th>Longitude</th><th> Project Value</th><th>Select</th></tr>";
    var permitnum; 
    var gmap;//creates hyperlink
    //modify keyvalue to include
    var position="";//Use this to enter latitude and longitude and add this as a value to the Select radio button
    //begin search
    for(var i=0;i<parsedrecord.length;i++)
    {
        var record=parsedrecord[i];
            //check
            permitnum=record.permitnum;//assign
            if(permitnum.startsWith(keyvalue))//partial match on string
            {
                output+="<tr><td>";
                output+=record.permitnum;
                output+="</td><td>"
                output+=record.originaladdress;
                output+="</td><td>";
                output+=record.latitude;
                //add latitude to postition
                position=record.latitude;
                position+=","
                output+="</td><td>";
                output+=record.longitude;
                //add longitude to position
                position+=record.longitude;
                output+="</td><td>";
                output+=record.estprojectcost;
                output+="</td><td>";
                //create hyperlink gmap
                gmap ="<a href=https://www.google.com/maps/search/?api=1&query="+position+" target=_blank>Click here to see map</a> ";
               
              
                output+=gmap;
                
                output+="</td></tr>";
            }
    }
    document.getElementById("buildingresults").innerHTML=output;
}
