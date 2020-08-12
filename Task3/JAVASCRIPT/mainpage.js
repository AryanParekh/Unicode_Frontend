// to generate each country table
function generate_table1(countries){
  var table=document.getElementById("my-table");
  var x = document.getElementById("country-input").value;
  for(var i=0;i<countries.length;i++){
    var row= table.insertRow();
    var cell1= row.insertCell();
    var cell2= row.insertCell();
    var cell3= row.insertCell();
    var cell4= row.insertCell();
    var cell5= row.insertCell();
    cell1.innerHTML=i+1;
    cell2.innerHTML=countries[i]["country_name"];
    cell3.innerHTML=countries[i]["cases"];
    cell4.innerHTML=countries[i]["deaths"];
    cell5.innerHTML=countries[i]["total_recovered"];
  }
}
// to search for country
function searchFun(){
  let filter = document.getElementById('country-input').value.toUpperCase();
  let mytable = document.getElementById('my-table');
  let tr = mytable.getElementsByTagName('tr');
  for(var i=0;i<tr.length;i++){
    let td1=tr[i].getElementsByTagName('td')[1];
    let td2=tr[i].getElementsByTagName('td')[0];
    var flag=0;
    if(td1){
      let textvalue= td1.textContent || td1.innerHTML;
      if(textvalue.toUpperCase().indexOf(filter)>=0){
        flag=1;
        tr[i].style.display = '';
      }
      else{

        tr[i].style.display = "none";
      }
    }
    if(flag==0 && td2){
      let textvalue= td2.textContent || td2.innerHTML;
      if(textvalue.toUpperCase().substring(0,filter.length)==filter){
        tr[i].style.display = '';
      }
      else{
        tr[i].style.display = "none";
      }
    }
  }
}
// to generate world table
function generate_table2(world){
  var cell1=document.getElementById('1');
  var cell2=document.getElementById('2');
  var cell3=document.getElementById('3');
  cell1.innerHTML=world["total_cases"];
  cell2.innerHTML=world["total_deaths"];
  cell3.innerHTML=world["total_recovered"];
}
// to convert numbers to integers
function toint(s){
  var s1=s.split(",");
  var s2="";
  for(var i=0;i<s1.length;i++){
    s2=s2+s1[i];
  }
  var num=parseInt(s2);
  return num;
}

// main

fetch("https://corona-virus-world-and-india-data.p.rapidapi.com/api", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "corona-virus-world-and-india-data.p.rapidapi.com",
		"x-rapidapi-key": "b7f9c404abmsh5f96ecaa71ca206p136662jsn39cd478aa927"
	}
})
.then(response => {
return(response.json());
})
.then(json=> {
  var data=json;
  generate_table1(data['countries_stat']);
  var p1=document.getElementById('para1');
  p1.innerHTML='Last updated at: '+data["statistic_taken_at"];
  var p2=document.getElementById('para2');
  p2.innerHTML='Last updated at: '+data["world_total"]["statistic_taken_at"];
  generate_table2(data["world_total"]);
})
.catch(err => {
console.log(err);
});
