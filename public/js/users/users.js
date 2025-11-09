/** @typedef {{age:number}} User */
let users = [];
let editingId = null;

const tbody = document.querySelector('table[data-table="users"] tbody');
const saveBtn = document.getElementById('saveBtn');
const nameInput = document.getElementById('userName');
const ageInput = document.getElementById('userAge');

function getCsrfToken() {
    const el = document.querySelector('meta[name="csrf-token"]');
    return el ? el.getAttribute('content') : '';
}

function renderUsers(users) {
    if (!tbody) return;

    tbody.innerHTML = '';

    const sortedUsers = [...users].sort((a, b) => Number(a.id) - Number(b.id));

    sortedUsers.forEach(user => {
        const rowHtml = `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.age}</td>
                <td><button data-id="${user.id}" class="edit-btn">Edit</button></td>
                <td><button data-id="${user.id}" class="delete-btn">Delete</button></td>
            </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', rowHtml);
    });
}

async function loadProducts() {
    try {
        const response = await fetch(`/users-json`);
        if (!response.ok) {
            throw new Error('Could not get users');
        }
        users = await response.json();
        renderUsers(users);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function createUser(name, age) {
    const response = await fetch(`/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': getCsrfToken(),
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({name, age}),
    });
    console.log(response);
    try{
        const data = await response.json();
        return data.user;
    }catch {
        return {name, age}
    }
}

async function updateUser(id, name, age) {
    const response = await fetch(`/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': getCsrfToken(),
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({name, age}),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error('Error updating user: ' + text.slice(0, 200));
    }

    try {
        const data = await response.json();
        return data.user;
    } catch {
        return {id, name, age}
    }
}

async function handleEdit(id) {
    try {
        const response = await fetch(`/users/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            }
        });
        if (!response.ok) {
            const text = await response.text();
            throw new Error('Error updating user: ' + text.slice(0, 200));
        }
        const data = await response.json();
        const user = data.user ?? data;

        editingId = String(user.id);
        nameInput.value = user.name ?? '';
        ageInput.value = user.age ?? '';
        saveBtn.textContent = 'Update';
    } catch (error) {
        console.error(error);
        alert(error.message || 'Could not update user');
    }
}

async function handleDelete(id) {
    try {
        const btn = document.querySelector(`.delete-btn[data-id="${id}"]`);
        btn && (btn.disabled = true);

        const response = await fetch(`/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'X-CSRF-TOKEN': getCsrfToken(),
            }
        });
        if (!response.ok) {
            const text = await response.text();
            throw new Error('Error updating user: ' + text.slice(0, 200));
        }
        const deleteUserId = String(id);
        users = users.filter(user => String(user.id) !== deleteUserId);
        renderUsers(users);
    } catch (error) {
        console.error(error);
        alert(error.message || 'Could not delete user');
    }
}

tbody.addEventListener('click', (e) => {
    const target = e.target;

    if (target.classList.contains('edit-btn')) {
        handleEdit(target.dataset.id);
    }

    if (target.classList.contains('delete-btn')) {
        handleDelete(target.dataset.id);
    }
})

saveBtn?.addEventListener('click', async()=> {
    const name = nameInput.value.trim();
    const age = ageInput.value.trim();
    if (!name) return alert('Please enter a name');
    if (!age) return alert('Please enter a age');

    saveBtn.disabled = true;

    try {
        if (!editingId) {
            const created = await createUser(name, age);
            users.push(created);
        } else {
            const updated = await updateUser(editingId, name, age);

            const filteredUsers = users.filter(u => String(u.id) !== String(editingId));
            filteredUsers.push(updated);
            users = filteredUsers;

            editingId = null;
            saveBtn.textContent = 'Save';
        }
        nameInput.value = '';
        ageInput.value = '';
        renderUsers(users);
    } catch (error) {
        console.error(error);
        alert(error.message || 'Error while saving user.');
    } finally {
        saveBtn.disabled = false;
    }
})









document.addEventListener('DOMContentLoaded', loadProducts);
