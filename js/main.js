document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Lógica del Cursor Personalizado
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-dot-outline');
    const hoverTargets = document.querySelectorAll('.hover-target, .card, .social-btn, .download-btn, a');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 250, fill: "forwards" });
    });

    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => { document.body.classList.add('cursor-hover'); });
        target.addEventListener('mouseleave', () => { document.body.classList.remove('cursor-hover'); });
    });

    // 2. Efecto Tilt 3D
    const tiltElements = document.querySelectorAll('.tilt');
    const tiltConfig = { maxRotation: 10, perspective: 1000 };

    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const rotateX = (y - 0.5).toFixed(2) * -tiltConfig.maxRotation;
            const rotateY = (x - 0.5).toFixed(2) * tiltConfig.maxRotation;

            el.style.transform = `perspective(${tiltConfig.perspective}px) rotateX(${rotateX}px) rotateY(${rotateY}px) scale3d(1.02, 1.02, 1.02)`;
            el.style.transition = 'none';
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(${tiltConfig.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            el.style.transition = 'transform 0.5s ease-out';
        });
    });

    // 3. Pestañas Dinámicas
    const cards = document.querySelectorAll('.card');
    const sections = document.querySelectorAll('.content-section');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            if(card.classList.contains('active')) return;

            cards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            sections.forEach(section => { section.classList.remove('active'); });

            const targetId = card.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            targetSection.classList.add('active');

            if (targetId === 'habilidades') animateProgressBars();
        });
    });

    // 4. Barras de Progreso
    function animateProgressBars() {
        const progresses = document.querySelectorAll('.progress');
        progresses.forEach(p => {
            const finalWidth = p.getAttribute('data-width');
            p.style.width = '0';
            p.style.setProperty('--final-width', finalWidth);
            p.classList.remove('animate');
            setTimeout(() => { p.classList.add('animate'); }, 50);
        });
    }

    if (document.getElementById('habilidades').classList.contains('active')) animateProgressBars();

    // 5. Máquina de Escribir
    const texts = ["Ingeniero en Tecnologías de la Información", "Desarrollador Android & Web Full-Stack", "Ilustrador Digital Freelance"];
    let count = 0, index = 0, isDeleting = false;
    const typingElement = document.getElementById('typewriter');

    function typewriter() {
        if (count === texts.length) count = 0;
        let currentText = texts[count];
        let letter = isDeleting ? currentText.slice(0, --index) : currentText.slice(0, ++index);
        
        typingElement.textContent = letter;
        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && letter.length === currentText.length) {
            typeSpeed = 2000; isDeleting = true;
        } else if (isDeleting && letter.length === 0) {
            isDeleting = false; count++; typeSpeed = 500;
        }
        setTimeout(typewriter, typeSpeed);
    }
    setTimeout(typewriter, 1000);

    // 6. ENVÍO DE CORREO (AJAX FormSubmit Reintegrado)
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-button');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => response.json())
            .then(data => {
                submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Mensaje Enviado';
                submitBtn.style.backgroundColor = '#22c55e';
                submitBtn.style.color = '#fff';
                
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.color = '';
                    submitBtn.disabled = false;
                }, 3000);
            })
            .catch(error => {
                submitBtn.innerHTML = '<i class="fa-solid fa-xmark"></i> Error al enviar';
                submitBtn.style.backgroundColor = '#ef4444';
                submitBtn.style.color = '#fff';

                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.color = '';
                    submitBtn.disabled = false;
                }, 3000);
            });
        });
    }
});