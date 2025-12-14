    // Basic interactivity: theme toggle, modal, mobile menu simulation, form handling
    document.getElementById('year').textContent = new Date().getFullYear();

    // Theme toggle (persist in localStorage)
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');
   
    function updateThemeIcon(isLight) {
      themeIcon.textContent = isLight ? '🌙' : '☀';
    }
   
    if(savedTheme === 'light') {
      body.classList.add('light');
      updateThemeIcon(true);
    } else {
      updateThemeIcon(false);
    }
   
    themeToggle.addEventListener('click', () => {
      const isLight = body.classList.toggle('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      updateThemeIcon(isLight);
    });

    // Modal open
    document.querySelectorAll('[data-open]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const project = btn.closest('.project');
        const title = project.getAttribute('data-title');
        const desc = project.getAttribute('data-desc');
        const img = project.querySelector('img').src;
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalDesc').textContent = desc;
        const mimg = document.getElementById('modalImg');
        mimg.innerHTML = '<img src="'+img+'" style="width:100%;border-radius:8px" alt="'+title+'"/>';
        document.getElementById('modalSite').href = '#';
        document.getElementById('modal').style.display = 'flex';
        // Focus management for accessibility
        document.getElementById('modalClose').focus();
      });
    });
   
    document.getElementById('modalClose').addEventListener('click', () => {
      document.getElementById('modal').style.display = 'none';
    });
   
    document.getElementById('modal').addEventListener('click', (e) => {
      if(e.target === document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
      }
    });
   
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape' && document.getElementById('modal').style.display === 'flex') {
        document.getElementById('modal').style.display = 'none';
      }
    });

    // Mobile menu button: just scroll to contact for demo
    document.getElementById('menuBtn').addEventListener('click', () => {
      window.location.href = '#contact';
    });

    // Contact form handler: opens default mail client with prefilled content
    function handleForm(e){
      e.preventDefault();
     
      // Show loading state
      const submitBtn = e.target.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Envoi en cours...';
      submitBtn.disabled = true;
     
      // Simulate network delay for better UX
      setTimeout(() => {
        const nom = document.getElementById('nom').value;
        const email = document.getElementById('email').value;
        const entreprise = document.getElementById('clientNom').value || '—';
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        const subject = encodeURIComponent('Demande de devis — ' + service + ' — ' + nom);
        const body = encodeURIComponent(
          "Nom : " + nom + "\\n" +
          "Email : " + email + "\\n" +
          "Entreprise : " + entreprise + "\\n" +
          "Service : " + service + "\\n\\n" +
          "Message :\\n" + message
        );
       
        // Show success message
        const formMessage = document.getElementById('formMessage');
        formMessage.innerHTML = '<div class="success-message">Votre message a été envoyé avec succès !</div>';
       
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
       
        // mailto (ouvre le client mail) ; le client peut copier et utiliser WhatsApp sinon
        window.location.href = "mailto:ton.email@example.com?subject="+subject+"&body="+body;
       
        // Clear form
        document.getElementById('contactForm').reset();
       
        // Remove success message after 5 seconds
        setTimeout(() => {
          formMessage.innerHTML = '';
        }, 5000);
      }, 1000);
    }

    // Download CV button (creates a simple text file and triggers download)
    document.getElementById('downloadCv').addEventListener('click', (e) => {
      e.preventDefault();
      const cvText = "Mba Jonas\\Créateur de sites web & Copywriter\\Yaoundé, Cameroun\\Email: jonasmba78@Gmail.com\\Tel: +237 670289615\\n\\nCompétences:\\n- WordPress, Elementor\\n- Copywriting\\n- SEO de base\\n- Gestion & maintenance de sites\\n\\nProjets clés:\\n- La Terrasse Gourmet (site restaurant)\\n- Cameroon Crafts (e-commerce)\\n";
      const blob = new Blob([cvText], {type: 'text/plain;charset=utf-8'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'CV-Mba-Jonas.word';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
   
    // Animation on scroll
    function checkVisibility() {
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight * 0.85);
        if (isVisible) {
          el.classList.add('visible');
        }
      });
    }
   
    // Initial check and add scroll listener
    window.addEventListener('load', checkVisibility);
    window.addEventListener('scroll', checkVisibility);