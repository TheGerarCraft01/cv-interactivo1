document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Efecto Máquina de Escribir (Typewriter)
    const texts = [
        "Ingeniero en Tecnologías de la Información", 
        "Desarrollador de Software", 
        "Ilustrador Digital"
    ];
    let count = 0, index = 0, isDeleting = false;
    const typingElement = document.getElementById('typewriter');

    function typewriter() {
        if (!typingElement) return; 
        
        if (count === texts.length) count = 0;
        let currentText = texts[count];
        let letter = isDeleting ? currentText.slice(0, --index) : currentText.slice(0, ++index);
        
        typingElement.textContent = letter;
        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && letter.length === currentText.length) {
            typeSpeed = 2000; 
            isDeleting = true;
        } else if (isDeleting && letter.length === 0) {
            isDeleting = false; 
            count++; 
            typeSpeed = 500; 
        }
        setTimeout(typewriter, typeSpeed);
    }
    setTimeout(typewriter, 1000); 

    // 2. Cerrar el menú móvil al hacer clic
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('navbarNav');
    
    if(menuToggle) {
        const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle: false});
        navLinks.forEach((l) => {
            l.addEventListener('click', () => {
                if (menuToggle.classList.contains('show')) bsCollapse.toggle();
            });
        });
    }

    // 3. Envío de formulario de contacto
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-button');

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Enviando...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                submitBtn.innerHTML = '¡Mensaje Enviado!';
                submitBtn.style.backgroundColor = '#22c55e'; // Verde éxito
                submitBtn.style.color = '#fff';
                contactForm.reset(); 

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = '#06b6d4'; // Volver al Cyan
                    submitBtn.style.color = '#000';
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                }, 3000);
            })
            .catch(error => {
                submitBtn.innerHTML = 'Error al enviar';
                submitBtn.style.backgroundColor = '#ef4444'; // Rojo error
                submitBtn.style.color = '#fff';

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = '#06b6d4'; // Volver al Cyan
                    submitBtn.style.color = '#000';
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                }, 3000);
            });
        });
    }
});