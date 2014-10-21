<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>aa</title>
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<link rel="stylesheet" type="text/css" href="css/main.css">
</head>
<body>
	<h1>Hello world 21</h1>
	<ul>

	<?php 

		for ($i=1; $i < 100 ; $i++) 
		{ 
			echo "<li><a href='#'>Hello world ". $i ."</a></li>";
		}
		
	 ?>
	 </ul>
</body>
</html>