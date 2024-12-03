const form = document.getElementById('edit-post');
const postIndex = document.getElementById('post-index');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(`/edit-post/${postIndex}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log('Respuesta del servidor:', result);
    } catch (error) {
        console.error('Error en la solicitud', error);
    };
});