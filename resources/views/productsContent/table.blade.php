<table data-table="products" border="1" cellpadding="8" cellspacing="0">
    <thead>
    <tr>
        <th>ID</th>
        <th>Product name</th>
        <th>Edit</th>
        <th>Delete</th>
    </tr>
    </thead>
    <tbody>
    </tbody>
</table>

<!-- Forma ispod tabele -->
<form id="addProductForm" style="margin-top: 15px; display: flex; align-items: center; gap: 8px;">
    <label for="productName">Product name:</label>
    <input type="text" id="productName" name="name" placeholder="Enter product name" required>
    <button type="button" id="saveBtn">Save</button>
</form>
