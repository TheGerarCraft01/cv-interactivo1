// Este código va dentro de tu main.js
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-button');

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita que la página parpadee o se recargue
            
            // 1. Cambiar el botón a estado "Enviando..."
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            // 2. Enviar los datos en segundo plano
            fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                // 3. Éxito: Botón Verde
                submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> ¡Mensaje Enviado!';
                submitBtn.style.backgroundColor = '#22c55e'; // Verde
                submitBtn.style.color = '#fff';
                contactForm.reset(); 

                // Restaurar el botón cyan original después de 3 segundos
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = '#06b6d4'; // Cyan
                    submitBtn.style.color = '#000';
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                }, 3000);
            })
            .catch(error => {
                // 4. Error: Botón Rojo
                submitBtn.innerHTML = '<i class="fa-solid fa-xmark"></i> Error al enviar';
                submitBtn.style.backgroundColor = '#ef4444'; // Rojo
                submitBtn.style.color = '#fff';

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = '#06b6d4'; // Cyan
                    submitBtn.style.color = '#000';
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                }, 3000);
            });
        });
    }
});