var request = {
	"getAll":"_php/getRecipes.php",
	"Search":"_php/getRecipes.php?q=",
	"getRecipe":"_php/getRecipes.php?id="
	};




$( document ).ready(function() {
    getdata();
	
});



function getdata(searchInput){
	


	if(searchInput === undefined || searchInput === ''){
		var query = request.getAll;
		document.getElementById("uInput").value = '';
		
	}else if(Number.isInteger(searchInput)) {
		
		var query = request.getRecipe + searchInput;

	}else{
		
		var query = request.Search + searchInput;
	}
	
	
	
	 var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               
				outputResults(this.responseText);
				
            }
        };
        xmlhttp.open("GET", query, true);
        xmlhttp.send();
	
	
}



function outputResults(data){
	data = JSON.parse(data);
	window.scrollTo(0, 0);
	if(!data.recepten){
		
		var title = data.title;
		var comment = '<p>' + data.comment + '</p>';
		var discription = '<p>' + data.discription + '</p>';
		var backBtn = '<a href="">&#10094;</a>';//'<img src="_img/back.png" onclick="getdata()"/>';
		var ingredients = '<ul>';
		
		for (var i = 0; i < data.ingredients.length; i++){
			
			ingredients += '<li>' + data.ingredients[i] + '</li>';
			
		}
		ingredients += '</ul>';
		
		
		var recipe = comment +	ingredients + discription;
		

		document.getElementById('page-title').innerHTML = title;
		document.getElementById('nav-logo').innerHTML = backBtn;
		document.getElementById('content-info').innerHTML = '';
		document.getElementById('header').setAttribute("class", "shadow");
		$('aside').width('100%');
		$('aside').innerHTML =  recipe;
		
		$('body').css("overflow","hidden");

	
	}else{
	
		var resultNumbers = data.totalResults + " / " + data.totalRecipes;
		var resultList = data.recepten;
		var outputList = "<ul>";
		var logo = '';//'<img src="_img/logoKlein.png" onclick="getdata()">';
		
		resultList.sort(function (a, b) {
			var o1 = a[3];
			var o2 = b[3];
			var p1 = a[1];
			var p2 = b[1];

			if (o1 < o2) return 1;
			if (o1 > o2) return -1;
			if (p1 < p2) return -1;
			if (p1 > p2) return 1;
			return 0;
		});
		
		for (var i = 0; i < resultList.length; i++){
			
			outputList += '<li><a href="javascript:getdata('+ resultList[i][0] +')">'+
							resultList[i][1] + '</br>'+
							'<small>'+ resultList[i][2] +'</small></a></li>'
		}
		outputList += "</ul>";
		
		
		document.getElementById("content-info").innerHTML = resultNumbers;
		document.getElementById("main-content").innerHTML = outputList;
		document.getElementById('page-title').innerHTML = "Mamma's recepten";
		document.getElementById('nav-logo').innerHTML = logo;
		document.getElementById('main-content').setAttribute("class", "list-styles");
		document.getElementById('header').setAttribute("class", "");
	
	}
	
	
	

	
	

	
}

