var xhr = new XMLHttpRequest;//XMLHTTPRequest object
var parsedrecord;//parsed JSON file
//load pageSetup
window.onload=pageSetup;

function pageSetup() {
	
    //event listener
    document.getElementById("searchsector").addEventListener("keyup", function (){ searchBySector(this.value);},false);   
    document.getElementById("searchdate").addEventListener("keyup", function (){ searchByDate(this.value);},false);   
    document.getElementById("searchcommunity").addEventListener("keyup", function (){ searchByCommunity(this.value);},false);   

  xhr.onreadystatechange = function() {
    
    if (xhr.readyState == 4 && xhr.status == 200) {
     parsedrecord = JSON.parse(xhr.responseText);
      //displayData(r);
    }
  };
  xhr.open("GET", "https://data.calgary.ca/resource/848s-4m4z.json", true);
  xhr.send();
	
	
}

function searchByDate(keyvalue){
    
  var output="<tr><th>Date</th><th>Sector</th><th>Community Name</th><th>Category</th></tr>";
  var date;

  for(let i=0; i<parsedrecord.length; i++){
      let record = parsedrecord[i];
      date = record.date;
      if(date.startsWith(keyvalue.toUpperCase())){
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

function searchByCommunity(keyvalue){
    
  var output="<tr><th>Date</th><th>Sector</th><th>Community Name</th><th>Category</th></tr>";
  var community;

  for(let i=0; i<parsedrecord.length; i++){
      let record = parsedrecord[i];
      community = record.community_name;
      if(community.startsWith(keyvalue.toUpperCase())){
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