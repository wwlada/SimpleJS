<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Simple Table</title>
</head>
<body>

<h2>Users Table</h2>

@include('usersContent.table')

<script src="{{ asset('js/users/users.js') }}"></script>
</body>
</html>
