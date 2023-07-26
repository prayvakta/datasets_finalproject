var xhr = new XMLHttpRequest;//XMLHTTPRequest object
var parsedrecord;//parsed JSON file
//load pageSetup
window.onload=pageSetup;

function pageSetup() {
	
    //event listener
    document.getElementById("searchsector").addEventListener("keyup", function (){ searchBySector(this.value);},false);   

  xhr.onreadystatechange = function() {
    console.log("State Changed!")
    if (xhr.readyState == 4 && xhr.status == 200) {
     parsedrecord = JSON.parse(xhr.responseText);
      //displayData(r);
    }
  };
  xhr.open("GET", "https://data.calgary.ca/resource/848s-4m4z.json", true);
  xhr.send();
	
	
}

function searchBySector(keyvalue){
    
    var output="<tr><th>Date</th><th>Sector</th><th>Community Name</th><th>Category</th></tr>";
    var sector;

    for(let i=0; i<parsedrecord.length; i++){
        let record = parsedrecord[i];
        sector = record.sector;
        if(sector.startsWith(keyvalue.toUpperCase())){
            output+="<tr><td>";
            output+=record.date;
            output+="</td><td>";
            output+=record.sector;
            output+="</td><td>";
            output+=record.community_name;
            output+="</td><td>";
            output+=record.category;
            output+="</td></tr>"
        }  
    }
    document.getElementById("crimeresults").innerHTML=output;
}