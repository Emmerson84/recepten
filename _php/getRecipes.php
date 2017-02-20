<?php
$string = file_get_contents("../_data/recepten.json");
$json_a = json_decode($string, true);
$resultArray = [];
$totalRecipes = count($json_a['recipes']);


if(!isset($_REQUEST["q"]) && !isset($_REQUEST["id"])){
	
	for($i = 0; $i < $totalRecipes; $i++){
		$title = $json_a['recipes'][$i]['title'];
		$comment = $json_a['recipes'][$i]['comment'];
		$ingredients = implode('', $json_a['recipes'][$i]['ingredients']);
		$arrayItem = [$i, $title, $comment];
		
		if($title != ""){
			$resultArray[] = $arrayItem;
		}
		
	}

	
}
else if(!isset($_REQUEST["id"])) {
	$searchInput = $_REQUEST["q"];
	
	for($i = 0; $i < $totalRecipes; $i++) {
		
		$title = $json_a['recipes'][$i]['title'];
		$comment = $json_a['recipes'][$i]['comment'];
		$ingredients = implode('', $json_a['recipes'][$i]['ingredients']);
		
		$inputlength=strlen($searchInput);
		$arrayItem = [$i, $title, $comment, 0];
		
		if (stristr($searchInput, substr($title, 0, $inputlength))) {
			$arrayItem[3] += 5; 
		}
		
		if (stristr($title, $searchInput)) {
			$arrayItem[3] += 3;
		}
		
		if (stristr($ingredients, $searchInput)) {
			$arrayItem[3] += 1;
		} 
		
		if($arrayItem[3] > 0){
			$resultArray[] = $arrayItem;
		}
		
	}

}else{
	
	$id = $_REQUEST["id"];
	$title = $json_a['recipes'][$id]['title'];
	$comment = $json_a['recipes'][$id]['comment'];
	$ingredients = $json_a['recipes'][$id]['ingredients'];
	$discription = $json_a['recipes'][$id]['discription'];
	
	$result = '{
		"id":"'.$id.'",
		"title":"'.$title.'",
		"comment":"'.$comment.'",
		"ingredients":'.json_encode($ingredients).',
		"discription":"'.$discription.'"		
	}';
	


	echo  $result;
	die;
}



echo '
	{
		"totalRecipes":"'. $totalRecipes .'",
		"totalResults":"'. count($resultArray) .'",
		"recepten":'. json_encode($resultArray) .'
	}
	';

?>