let products = [];

const tbody = document.querySelector('table[data-table="products"] tbody');

const saveBtn = document.getElementById('saveBtn');
const nameInput = document.getElementById('productName');

let editingId = null;

function getCsrfToken() {
    const el = document.querySelector('meta[name="csrf-token"]');
    return el ? el.getAttribute('content') : '';
}

async function loadProducts() {
    try {
        const response = await fetch('/products-json');
        if (!response.ok) {
            throw new Error('Greška pri učitavanju proizvoda');
        }
        products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error('Greška:', error);
    }
}

/* ========== RENDER ========== */
function renderProducts(products) {
    if (!tbody) return;

    tbody.innerHTML = '';

    // Sortiraj proizvode po ID-u rastuće
    const sortedProducts = [...products].sort((a, b) => Number(a.id) - Number(b.id));

    sortedProducts.forEach(product => {
        const rowHtml = `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td><button data-id="${product.id}" class="edit-btn">Edit</button></td>
                <td><button data-id="${product.id}" class="delete-btn">Delete</button></td>
            </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', rowHtml);
    });
}

/* ========== CREATE ========== */
async function createProduct(name) {
    const response = await fetch('/products-create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': getCsrfToken(),
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ name })
    });

    // if (!response.ok) {
    //     const text = await response.text();
    //     throw new Error('Error creating product: ' + text.slice(0, 200));
    // }

    try {
        const data = await response.json();
        return data.product;
    } catch {
        return { name };
    }
}

/* ========== UPDATE ========== */
async function updateProduct(id, name) {
    const response = await fetch(`/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': getCsrfToken(),
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ name })
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error('Error updating product: ' + text.slice(0, 200));
    }

    // Bezbedno parsiranje (u slučaju 204 No Content)
    try {
        const data = await response.json();
        return data.product;
    } catch {
        return { id, name };
    }
}

/* ========== DELETE ========== */
async function handleDelete(id) {
    try {
        const btn = document.querySelector(`.delete-btn[data-id="${id}"]`);
        btn && (btn.disabled = true);

        const response = await fetch(`/products/${id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': getCsrfToken(),
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error('Error deleting product: ' + text.slice(0, 200));
        }

        const deletedProductId = String(id);
        products = products.filter(p => String(p.id) !== deletedProductId);
        renderProducts(products);
    } catch (e) {
        console.error(e);
        alert(e.message || 'Error while deleting product.');
    }
}

/* =========================
   Glavni handler za Save/Update
   ========================= */
saveBtn?.addEventListener('click', async () => {
    const name = nameInput.value.trim();
    if (!name) return alert('Product name is required.');

    // privremeno onemogući dugme dok traje zahtev
    saveBtn.disabled = true;

    try {
        if (!editingId) {
            // CREATE
            const created = await createProduct(name);
            products.push(created);
        } else {
            // UPDATE
            const updated = await updateProduct(editingId, name);

            // Napravi kopiju bez starog proizvoda, pa ubaci ažurirani
            const filteredProducts = products.filter(p => String(p.id) !== String(editingId));
            filteredProducts.push(updated);
            products = filteredProducts;

            // Resetuj edit mod
            editingId = null;
            saveBtn.textContent = 'Save';
        }

        // Očisti formu i osveži tabelu
        nameInput.value = '';
        renderProducts(products);
    } catch (error) {
        console.error(error);
        alert(error.message || 'Error while saving product.');
    } finally {
        saveBtn.disabled = false;
    }
});

// Klik na EDIT dugme u tabeli
async function handleEdit(id) {
    try {
        const response = await fetch(`/products/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error('Error fetching product: ' + text.slice(0, 200));
        }

        const data = await response.json();
        const product = data.product ?? data;

        // Prebaci u edit mod sa podacima iz API-ja
        editingId = String(product.id);
        nameInput.value = product.name ?? '';
        saveBtn.textContent = 'Update';
    } catch (e) {
        console.error(e);
        alert(e.message || 'Could not load product.');
    }
}


// Delegiranje klikova na ceo tbody (jedan listener za sve dugmiće)
tbody.addEventListener('click', (e) => {
    const target = e.target;

    if (target.classList.contains('edit-btn')) {
        handleEdit(target.dataset.id);
    }

    if (target.classList.contains('delete-btn')) {
        handleDelete(target.dataset.id);
    }
});

document.addEventListener('DOMContentLoaded', loadProducts);
