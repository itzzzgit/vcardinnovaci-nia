// Contact Page - Display vCard information

document.addEventListener('DOMContentLoaded', async function() {
    const loadingState = document.getElementById('loading');
    const errorState = document.getElementById('error-state');
    const contactCard = document.getElementById('contact-card');

    // Get contact ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const contactId = urlParams.get('i');

    if (!contactId) {
        showError();
        return;
    }

    try {
        // Fetch contact data from Supabase
        const { data: contact, error } = await window.supabaseClient
            .from('vcards')
            .select('*')
            .eq('short_id', contactId)
            .single();

        if (error || !contact) {
            showError();
            return;
        }

        // Display contact information
        displayContact(contact);

    } catch (error) {
        console.error('Error:', error);
        showError();
    }

    function showError() {
        loadingState.style.display = 'none';
        errorState.style.display = 'block';
    }

    function displayContact(contact) {
        loadingState.style.display = 'none';
        contactCard.style.display = 'block';

        // Update page title
        const fullName = `${contact.first_name} ${contact.last_name}`;
        document.title = `${fullName} - Contacto`;

        // Update header
        document.getElementById('contact-name').textContent = fullName;
        
        if (contact.title) {
            document.getElementById('contact-title').textContent = contact.title;
        }
        
        if (contact.company) {
            document.getElementById('contact-company').textContent = contact.company;
        }

        // Update avatar initials
        const avatar = document.getElementById('profile-avatar');
        avatar.innerHTML = `<span style="font-size: 24px; font-weight: bold; color: #333;">${contact.first_name.charAt(0)}${contact.last_name.charAt(0)}</span>`;

        // Quick actions
        const phoneClean = contact.phone.replace(/\D/g, '');
        document.getElementById('action-call').href = `tel:${contact.phone}`;
        document.getElementById('action-email').href = `mailto:${contact.email}`;
        
        // WhatsApp button
        const whatsappBtn = document.getElementById('action-whatsapp');
        if (contact.phone) {
            whatsappBtn.style.display = 'flex';
            whatsappBtn.href = `https://wa.me/${phoneClean}`;
        }

        // Phone details
        document.getElementById('detail-phone').textContent = contact.phone;
        document.getElementById('detail-phone').href = `tel:${contact.phone}`;

        // Work phone
        if (contact.work_phone) {
            document.getElementById('work-phone-section').style.display = 'block';
            document.getElementById('detail-work-phone').textContent = contact.work_phone;
            document.getElementById('detail-work-phone').href = `tel:${contact.work_phone}`;
        }

        // Email
        document.getElementById('detail-email').textContent = contact.email;
        document.getElementById('detail-email').href = `mailto:${contact.email}`;

        // Website
        if (contact.website) {
            document.getElementById('website-section').style.display = 'block';
            const websiteDisplay = contact.website.replace(/^https?:\/\//, '');
            document.getElementById('detail-website').textContent = websiteDisplay;
            document.getElementById('detail-website').href = contact.website;
        }

        // Address
        const addressParts = [
            contact.street,
            contact.city,
            contact.state,
            contact.postal_code,
            contact.country
        ].filter(Boolean);

        if (addressParts.length > 0) {
            document.getElementById('address-section').style.display = 'block';
            document.getElementById('detail-address').textContent = addressParts.join(', ');
        }

        // Social media
        let hasSocial = false;

        if (contact.linkedin) {
            document.getElementById('social-linkedin').style.display = 'flex';
            document.getElementById('social-linkedin').href = contact.linkedin;
            hasSocial = true;
        }

        if (contact.facebook) {
            document.getElementById('social-facebook').style.display = 'flex';
            document.getElementById('social-facebook').href = contact.facebook;
            hasSocial = true;
        }

        if (contact.instagram) {
            document.getElementById('social-instagram').style.display = 'flex';
            document.getElementById('social-instagram').href = contact.instagram;
            hasSocial = true;
        }

        if (contact.twitter) {
            document.getElementById('social-twitter').style.display = 'flex';
            document.getElementById('social-twitter').href = contact.twitter;
            hasSocial = true;
        }

        if (hasSocial) {
            document.getElementById('social-section').style.display = 'block';
        }

        // Download vCard button
        document.getElementById('download-vcard').addEventListener('click', function(e) {
            e.preventDefault();
            downloadVCard(contact);
        });
    }

    function downloadVCard(contact) {
        // Generate vCard string
        let vcard = 'BEGIN:VCARD\n';
        vcard += 'VERSION:3.0\n';
        vcard += `N:${contact.last_name};${contact.first_name};;;\n`;
        vcard += `FN:${contact.first_name} ${contact.last_name}\n`;
        
        if (contact.title) {
            vcard += `TITLE:${contact.title}\n`;
        }
        
        if (contact.company) {
            vcard += `ORG:${contact.company}\n`;
        }
        
        if (contact.phone) {
            vcard += `TEL;TYPE=CELL:${contact.phone}\n`;
        }
        
        if (contact.work_phone) {
            vcard += `TEL;TYPE=WORK:${contact.work_phone}\n`;
        }
        
        if (contact.email) {
            vcard += `EMAIL:${contact.email}\n`;
        }
        
        if (contact.website) {
            vcard += `URL:${contact.website}\n`;
        }

        // Address
        const hasAddress = contact.street || contact.city || contact.state || contact.postal_code || contact.country;
        if (hasAddress) {
            vcard += `ADR;TYPE=WORK:;;${contact.street || ''};${contact.city || ''};${contact.state || ''};${contact.postal_code || ''};${contact.country || ''}\n`;
        }

        // Social media as URLs
        if (contact.linkedin) {
            vcard += `X-SOCIALPROFILE;TYPE=linkedin:${contact.linkedin}\n`;
        }
        if (contact.facebook) {
            vcard += `X-SOCIALPROFILE;TYPE=facebook:${contact.facebook}\n`;
        }
        if (contact.instagram) {
            vcard += `X-SOCIALPROFILE;TYPE=instagram:${contact.instagram}\n`;
        }
        if (contact.twitter) {
            vcard += `X-SOCIALPROFILE;TYPE=twitter:${contact.twitter}\n`;
        }

        vcard += 'END:VCARD';

        // Create and download file
        const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${contact.first_name}_${contact.last_name}.vcf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
});
