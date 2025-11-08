<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{csrf_token()}}">
    <title>Products</title>

    <script src="/js/myJs.js" defer></script>
</head>
    <body>
        <div style="border: 1px solid red;" data-list data-refresh-url="{{route('products.index')}}">
            @foreach($products as $product)
                <div data-row="{{ $product->id }}">
                    <input type="text"
                           name="product"
                           data-name value="{{$product->name}}"
                           style="display: flex; margin-bottom: 5px">

                    <div style="margin-bottom: 20px">
                                <button data-edit data-id="{{$product->id}}">
                                    Edit
                                </button>
                                <button data-delete data-id="{{$product->id}}">
                                    Delete
                                </button>
                    </div>
                </div>
            @endforeach
        </div>

    <form action="{{route('products.store')}}" data-form="create" method="POST" style="margin-top: 50px">
        @csrf
        <input type="text" name="name" data-name >
        <button type="submit" >Create</button>
    </form>

    </body>
</html>
