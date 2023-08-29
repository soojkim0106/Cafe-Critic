<!doctype html>
<html lang="en"><head>
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <title>My Cookbook</title>
    <style>
    body{
        font-family:Arial,sans-serif;
        margin:0;padding:0;background-color:#f5f5f5}
        
    header{
        background-color:#532201f0;
        color:#fff;text-align:center;
        padding:1rem
        }.container{
            max-width:800px;
            margin:0 auto;
        padding:2rem;background-color:#fff;
        box-shadow:0 0 10px rgba(0,0,0,.1)}.recipe-form{
            display:flex;
            flex-direction:column}
    label{margin-top:1rem;font-weight:700}input[type=text],textarea{padding:.5rem;margin:.2rem 0;border:1px solid #ccc;border-radius:4px}
    button{background-color:#89370077;color:#fff;padding:.5rem 1rem;border:none;border-radius:4px;cursor:pointer}
    </style>
    <script defer="defer" src="/static/js/main.d31a93ff.js"></script>
    <link href="/static/css/main.17c9522b.css" rel="stylesheet">
    </head>
        <body>
            <header>
                <h1>My Cookbook</h1>
            </header><div class="container">
                <h2>Add a New Recipe</h2>
                <form class="recipe-form">
                    <label for="recipe-name">Recipe Name:</label>
                        <input id="recipe-name" name="recipe-name" required>
                    <label for="ingredients">Ingredients:</label> 
                        <textarea id="ingredients" name="ingredients" rows="4" required></textarea> 
                    <label for="Directions">Directions:</label> 
                        <textarea id="Directions" name="Directions" rows="6" required></textarea> 
                    <button type="submit">Write your own recipe!</button>
                </form></div></body></html>