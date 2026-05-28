// vCard QR Generator - Main Application

// Genera un ID corto alfanumérico (6 caracteres)
function generateShortId() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < 6; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('vcard-form');
    const modal = document.getElementById('qr-modal');
    const closeModal = document.querySelector('.close-modal');
    const qrCodeContainer = document.getElementById('qr-code');
    const downloadBtn = document.getElementById('download-qr');
    const viewContactBtn = document.getElementById('view-contact');
    const contactLinkInput = document.getElementById('contact-link');
    const copyLinkBtn = document.getElementById('copy-link');

    // Form submit handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = form.querySelector('.btn-generate');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generando...';
        submitBtn.disabled = true;

        try {
            // Generar ID corto
            const shortId = generateShortId();

            // Gather form data
            const formData = {
                short_id: shortId,
                first_name: document.getElementById('firstName').value.trim(),
                last_name: document.getElementById('lastName').value.trim(),
                title: document.getElementById('title').value.trim(),
                company: document.getElementById('company').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                work_phone: document.getElementById('workPhone').value.trim(),
                email: document.getElementById('email').value.trim(),
                website: document.getElementById('website').value.trim(),
                street: document.getElementById('street').value.trim(),
                city: document.getElementById('city').value.trim(),
                state: document.getElementById('state').value.trim(),
                postal_code: document.getElementById('postalCode').value.trim(),
                country: document.getElementById('country').value.trim(),
                linkedin: document.getElementById('linkedin').value.trim(),
                facebook: document.getElementById('facebook').value.trim(),
                instagram: document.getElementById('instagram').value.trim(),
                twitter: document.getElementById('twitter').value.trim(),
                created_at: new Date().toISOString()
            };

            // Save to Supabase
            const { data, error } = await window.supabaseClient
                .from('vcards')
                .insert([formData])
                .select()
                .single();

            if (error) {
                throw error;
            }

            // Generate contact URL (usando el ID corto)
            const contactUrl = `${getBaseUrl()}c.html?i=${data.short_id}`;
            
            // Generate QR Code using qrcodejs library
            qrCodeContainer.innerHTML = '';
            const qr = new QRCode(qrCodeContainer, {
                text: contactUrl,
                width: 250,
                height: 250,
                colorDark: '#333333',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });

            // Wait for QR code to be generated, then set up download
            setTimeout(() => {
                const img = qrCodeContainer.querySelector('img');
                if (img) {
                    downloadBtn.href = img.src;
                    downloadBtn.download = `vcard-qr-${data.first_name}-${data.last_name}.png`;
                }
            }, 100);
            
            // Set up view contact button
            viewContactBtn.href = contactUrl;
            
            // Set up link copy
            contactLinkInput.value = contactUrl;

            // Show modal
            modal.style.display = 'block';

            // Show success toast
            showToast('¡vCard creada exitosamente!', 'success');

        } catch (error) {
            console.error('Error:', error);
            showToast('Error al crear la vCard. Por favor intenta de nuevo.', 'error');
        } finally {
            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });

    // Close modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Copy link to clipboard
    copyLinkBtn.addEventListener('click', async function() {
        try {
            await navigator.clipboard.writeText(contactLinkInput.value);
            showToast('¡Enlace copiado al portapapeles!', 'success');
        } catch (err) {
            // Fallback for older browsers
            contactLinkInput.select();
            document.execCommand('copy');
            showToast('¡Enlace copiado!', 'success');
        }
    });
});

// Toast notification function
function showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}
