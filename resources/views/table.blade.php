<div data-list data-refresh-url="{{route('products.index')}}">
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
