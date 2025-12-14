// Collapsible animation logic
const coll = document.querySelectorAll(".collapsible");

coll.forEach(c => {
    c.addEventListener("click", function () {
        const content = this.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            content.classList.remove("open");
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            content.classList.add("open");
        }
    });
});

// EmailJS removed — using mailto fallback for contact submissions
console.log('Script loaded');

// Toast helper for floating messages
function showToast(message, type = 'success', timeout = 5000) {
    const toast = document.querySelector('#contactSuccess');
    if (!toast) {
        // fallback to alert only if element missing
        alert(message);
        return;
    }

    toast.textContent = message;
    if (type === 'success') {
        toast.style.color = '#00ff00';
        toast.style.background = 'rgba(0, 255, 0, 0.08)';
    } else if (type === 'error') {
        toast.style.color = '#ff6b6b';
        toast.style.background = 'rgba(255, 107, 107, 0.08)';
    } else {
        toast.style.color = '#ffffff';
        toast.style.background = 'rgba(0,0,0,0.6)';
    }

    toast.classList.add('show');
    // clear any existing timer
    if (toast._timer) clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
        toast.classList.remove('show');
    }, timeout);
}

// --- Contact Form Setup ---
function setupContactForm() {
    console.log('Setting up contact form...');
    const contactForm = document.querySelector('#contactForm');
    
    if (!contactForm) {
        console.error('Contact form not found!');
        return;
    }
    
    console.log('Contact form found, attaching event listener');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('✓ Form submitted event triggered');
        
        const contactNameInput = document.querySelector('#contactName');
        const contactEmailInput = document.querySelector('#contactEmail');
        const contactMsgInput = document.querySelector('#contactMsg');
        const contactSuccessDiv = document.querySelector('#contactSuccess');

        const name = contactNameInput.value.trim();
        const email = contactEmailInput.value.trim();
        const message = contactMsgInput.value.trim();

        console.log('Form values - Name:', name, 'Email:', email, 'Message length:', message.length);

        if (!name || !email || !message) {
            console.log('Validation failed - empty fields');
            showToast('⚠️ Please fill in all fields!', 'error', 3800);
            return;
        }

        // Mailto fallback: open user's mail client with prefilled message
        try {
            console.log('Using mailto fallback to open mail client');

            const subject = encodeURIComponent(`Portfolio message from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
            const mailto = `mailto:christianingking123@gmail.com?subject=${subject}&body=${body}`;

            // open mail client (will not send automatically; user must confirm)
            window.location.href = mailto;

            if (contactSuccessDiv) {
                showToast('Message sent!', 'success', 4000);
            }

            contactForm.reset();
        } catch (err) {
            console.error('Mailto fallback failed', err);
            if (contactSuccessDiv) {
                showToast('✗ Failed to open mail client. Please email me at christianingking123@gmail.com', 'error', 6000);
            }
        }
    });
}

// Setup form when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupContactForm);
} else {
    setupContactForm();
}

// --- Project buttons logic ---
const projectBtns = document.querySelectorAll('.project-btn');
const projectTitle = document.querySelector('.project-title');
const projectDesc = document.querySelector('.project-desc');
const projectLink = document.querySelector('.project-link');
const projectImage = document.querySelector('#project-image');
const imageModal = document.querySelector('#imageModal');
const imageModalImg = document.querySelector('#imageModalImg');
const imageModalClose = document.querySelector('#imageModalClose');

projectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // mark clicked button as active and clear others
        projectBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const title = btn.dataset.title;
        const desc = btn.dataset.desc;
        const link = btn.dataset.link;
        const image = btn.dataset.image;

        projectTitle.textContent = title;
        projectDesc.textContent = desc;

        if (link && link !== '#') {
            projectLink.href = link;
            projectLink.style.display = 'inline-block';
        } else {
            projectLink.style.display = 'none';
        }

        // Show project image (only if provided)
        if (projectImage) {
            if (image) {
                projectImage.src = image;
                projectImage.style.display = 'block';
            } else {
                projectImage.src = '';
                projectImage.style.display = 'none';
            }
        }

        // Ensure the projects content area expands if its collapsible is closed
        const projContent = btn.closest('section')?.querySelector('.content');
        if (projContent && !projContent.classList.contains('open')) {
            projContent.style.maxHeight = projContent.scrollHeight + 'px';
            projContent.classList.add('open');
        }
    });
});

// Image click to open modal
if (projectImage) {
    projectImage.addEventListener('click', () => {
        if (projectImage.src) {
            imageModalImg.src = projectImage.src;
            imageModal.classList.add('open');
        }
    });
}

// Close modal on X click
if (imageModalClose) {
    imageModalClose.addEventListener('click', () => {
        imageModal.classList.remove('open');
    });
}

// Close modal on background click
if (imageModal) {
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            imageModal.classList.remove('open');
        }
    });
}
