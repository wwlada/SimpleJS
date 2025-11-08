document.addEventListener("DOMContentLoaded", function(e) {
    const form = document.querySelector('[data-form="create"]');
    const list = document.querySelector('[data-list]');
    if (!form || !list) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        await fetch(form.action, {
            method: form.method,
            headers: {
                'Accept': 'application/json',
            },
            body: formData,
        });

        const url = list.dataset.refreshUrl;
        const response = await fetch(url, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'text/html',
            }
        });
        list.innerHTML = await response.text();

        form.reset();
    });

    document.addEventListener('click', async (e) => {
        const deleteBtn = e.target.closest('[data-delete]');
        if (!deleteBtn) return;

        const id = deleteBtn.dataset.id;
        await fetch (`/products/${id}`, {
            method: "DELETE",
            headers: {
                "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content,
                'Accept': 'application/json',
            }
        });

        const response = await fetch(list.dataset.refreshUrl, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'text/html',
            }
        });
        list.innerHTML = await response.text();
    });

    document.addEventListener('click', async (e) => {
        const editBtn = e.target.closest('[data-edit]');
        if (!editBtn) return;

        const id = editBtn.dataset.id;
        const row = editBtn.closest('[data-row]');
        const name = row.querySelector('[data-name]').value.trim();

        await fetch (`/products/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content,
            },
            body: JSON.stringify({ name }),
        });

        const response = await fetch(list.dataset.refreshUrl, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'text/html',
            }
        });
        list.innerHTML = await response.text();
    })
})
