<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Simple Table</title>
</head>
<body>

<h2>Products Table</h2>

@include('productsContent.table')

<script src="{{ asset('js/products/products.js') }}"></script>
</body>
</html>
