var request = {
	"getAll":"_php/getRecipes.php",
	"Search":"_php/getRecipes.php?q=",
	"getRecipe":"_php/getRecipes.php?id="
	};


$(document).ready(function() {
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
			handelResult(this.responseText);
		}
	};
	xmlhttp.open("GET", query, true);
	xmlhttp.send();

}


function handelResult(result){
	result = JSON.parse(result);
	
	if(!result.recepten){
		displayRecipe(result);
	}
	else{
		buildList(result);
	}
}


function openRecipe(recipeIndex){
	
	$('#content-info').html('');
	$('body').css("overflow","hidden");
	$('#nav').html('<a href="javascript:closeAside()">&#10094;</a>');
	$('aside').width('100%');
	getdata(recipeIndex);
	
}


function closeAside(){
	$('#nav').html('');
	$('aside').width('0');
	$('body').css("overflow","auto");
	$('#page-title').html("Mamma's recepten");
	$('header').removeClass('shadow');
}


function buildList(data){
	window.scrollTo(0, 0);
	var resultList = data.recepten;
	var outputList = "<ul>";
	
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
			
		outputList += '<li><a href="javascript:openRecipe('+ resultList[i][0] +')">'+
					resultList[i][1] + '</br>'+
					'<small>'+ resultList[i][2] +'</small></a></li>'
	}
	outputList += "</ul>";
	
	$('#main-content').html(outputList);
}


function displayRecipe(data){
	
	
	var comment = '';
	var ingredients = '<ul>';
	var discription = '<p>' + data.discription + '</p></br></br></br>';
	
	if(data.comment !== ''){
		comment += '<p>' + data.comment + '</p>';
	}
		
	for (var i = 0; i < data.ingredients.length; i++){
		ingredients += '<li>' + data.ingredients[i] + '</li>';
	}
	
	ingredients += '</ul>';
	
	
	var recipe = comment +	ingredients + discription;
	
	$('#page-title').html(data.title);
	$('header').addClass('shadow');
	$('aside').html(recipe);
	
}











