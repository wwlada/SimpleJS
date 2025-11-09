<table data-table="users" border="1" cellpadding="8" cellspacing="0">
    <thead>
        <tr>
            <th>ID</th>
            <th>User name</th>
            <th>Age</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
    </thead>
    <tbody>
    </tbody>
</table>

<!-- Forma ispod tabele -->
<form id="addUserForm" style="margin-top: 15px; display: flex; align-items: center; gap: 8px;">
    <label for="userName">User name:</label>
    <input type="text" id="userName" name="name" placeholder="Enter user name" required>
    <input type="number" id="userAge" name="age" placeholder="Enter user age" required>
    <button type="button" id="saveBtn">Save</button>
</form>
