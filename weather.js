$(document).ready(function(){
	//For autocomplete.
	 let input = document.getElementById('auto');
      let autocomplete = new google.maps.places.Autocomplete(input);
	 //For current location.
	  $("#current").click(function(){
				 if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
		   }
		else{
			alert("Geolocation not supported.");
		}
			});
		//For city search.
	  $("#weather").click(function(){
		  let text=document.getElementById("auto").value;
		  text=parse(text);
		  $.getJSON("http://api.openweathermap.org/data/2.5/weather?q="+text+"&appid=9978fc8ea32153c71390eadb35ef5070",function(data){
			  makePage(data);
			   $("#temperature").click(function(){
					let tempInC=data.main.temp-273;
					let tempInF=tempInC*1.8+32;
					let str="";
					if($("#temperature").text()[$("#temperature").text().length-1]=="C"){
						str=String(tempInF.toFixed(2))+" &degF";
					}
					else{
						str=String(tempInC.toFixed(2))+" &degC";
					}
				  $("#temperature").html(str);
			  });
		  });
	  });
});
function showPosition(position) {
	let lat=position.coords.latitude; 
	let lon=position.coords.longitude;
	$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+String(lat.toFixed(0))+"&lon="+String(lon.toFixed(0))+"&appid=9978fc8ea32153c71390eadb35ef5070",function(data){
		makePage2(data);
		 $("#temperature1").click(function(){
					let tempInC=data.main.temp-273;
					let tempInF=tempInC*1.8+32;
					let str="";
					if($("#temperature1").text()[$("#temperature1").text().length-1]=="C"){
						str=String(tempInF.toFixed(2))+" &degF";
					}
					else{
						str=String(tempInC.toFixed(2))+" &degC";
					}
				  $("#temperature1").html(str);
			  });
	});
	}
	//Used for parsing text for only the city name.
function parse(text){
	let a=text.split(",");
	return a[0];
}
//Used for rendering the page.
function makePage(data){
	let icon=data.weather[0].id;
	$("#icon").removeClass();
	$("#icon").addClass("wi wi-owm-"+String(icon));
	let tempInC=data.main.temp-273;
	let tempInF=tempInC*1.8+32;
	let str=String(tempInC.toFixed(2))+" &degC";
	$("#temperature").html(str);
	$("#weatherDescription").text(String(data.weather[0].description));
}
function makePage2(data){
	$("#name").text(data.name);
	let icon=data.weather[0].id;
	$("#icon1").removeClass();
	$("#icon1").addClass("wi wi-owm-"+String(icon));
	let tempInC=data.main.temp-273;
	let tempInF=tempInC*1.8+32;
	let str=String(tempInC.toFixed(2))+" &degC";
	$("#temperature1").html(str);
	$("#weatherDescription1").text(String(data.weather[0].description));
}

