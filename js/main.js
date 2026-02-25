document.addEventListener('DOMContentLoaded', () => {

    // Initialize Lucide Icons
    lucide.createIcons();

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const icon = mobileMenu.classList.contains('active') ? 'x' : 'menu';
            // Re-render icon
            mobileBtn.innerHTML = `<i data-lucide="${icon}"></i>`;
            lucide.createIcons();
        });

        // Close menu when clicking a link
        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileBtn.innerHTML = `<i data-lucide="menu"></i>`;
                lucide.createIcons();
            });
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Target elements to animate
    const animatedElements = document.querySelectorAll('.fade-up, .hero-visual, .story-card, .feature-card, .timeline-step, .testimonial-card');
    animatedElements.forEach(el => {
        el.classList.add('fade-up'); // Ensure class is present
        observer.observe(el);
    });

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ========================================
// IMPORTED SCRIPTS FROM ALMA LANDING
// ========================================

// Initialize Lucide icons
lucide.createIcons();

// ========================================
// NAVIGATION & SCROLL
// ========================================
const nav = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');
const closeIcon = document.getElementById('closeIcon');

// Handle scroll for navbar styling
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Smooth scroll to section
function scrollToSection(id) {
  // Close mobile menu if open
  if (mobileMenu.classList.contains('open')) {
    toggleMobileMenu();
  }
  
  const element = document.querySelector(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Toggle mobile menu
function toggleMobileMenu() {
  const isOpen = mobileMenu.classList.contains('open');
  
  if (isOpen) {
    mobileMenu.classList.remove('open');
    menuIcon.style.display = 'block';
    closeIcon.style.display = 'none';
    document.body.style.overflow = '';
  } else {
    mobileMenu.classList.add('open');
    menuIcon.style.display = 'none';
    closeIcon.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}

// ========================================
// ANIMATIONS ON SCROLL
// ========================================
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});

// ========================================
// FEATURES SECTION (PHONE MOCKUP)
// ========================================
const features = [
  { screen: 'rdv', navId: 'nav-rdv' },
  { screen: 'pharmacy', navId: 'nav-pharmacy' },
  { screen: 'delivery', navId: 'nav-pharmacy' },
  { screen: 'reimbursement', navId: 'nav-reimbursement' },
  { screen: 'history', navId: 'nav-rdv' }, // Reusing calendar icon for history
  { screen: 'chat', navId: 'nav-chat' }
];

let currentFeatureIndex = 0;

function switchScreen(screenId, btnElement) {
  // Update buttons state
  document.querySelectorAll('.feature-item').forEach(btn => {
    btn.classList.remove('active');
  });
  if (btnElement) {
    btnElement.classList.add('active');
  } else {
    // Find button by data-screen if triggered via arrows
    const btn = document.querySelector(`.feature-item[data-screen="${screenId}"]`);
    if (btn) btn.classList.add('active');
  }

  // Update phone screen
  document.querySelectorAll('.app-screen').forEach(screen => {
    screen.classList.remove('active');
  });
  document.getElementById(`screen-${screenId}`).classList.add('active');

  // Update phone bottom nav
  document.querySelectorAll('.nav-icon').forEach(icon => {
    icon.classList.remove('active');
  });
  
  const feature = features.find(f => f.screen === screenId);
  if (feature) {
    document.getElementById(feature.navId).classList.add('active');
    currentFeatureIndex = features.findIndex(f => f.screen === screenId);
  }
}

function navigateScreen(direction) {
  if (direction === 'next') {
    currentFeatureIndex = (currentFeatureIndex + 1) % features.length;
  } else {
    currentFeatureIndex = (currentFeatureIndex - 1 + features.length) % features.length;
  }
  
  const nextFeature = features[currentFeatureIndex];
  switchScreen(nextFeature.screen);
}

// ========================================
// FAQ SECTION
// ========================================
function toggleFaq(header) {
  const item = header.parentElement;
  const isOpen = item.classList.contains('open');
  
  // Close all other items
  document.querySelectorAll('.faq-item').forEach(el => {
    el.classList.remove('open');
  });
  
  // Toggle current
  if (!isOpen) {
    item.classList.add('open');
  }
}

// ========================================
// CHAT WIDGET
// ========================================
const chatWidget = document.getElementById('chatWidget');
const chatButton = document.getElementById('chatButton');
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');

const botResponses = {
  'remboursement': "Les remboursements Alma, c'est simple : tu envoies ta facture via l'app, on calcule le montant et tu le vois direct. En général, c'est sur ton compte en 3-10 jours. Pas de paperasse, pas de prise de tête ! 💪",
  'medicament': "Pour commander tes médocs, va dans l'onglet \"Pharmacie\" de l'app. Tu peux scanner ton ordonnance ou chercher directement ce qu'il te faut. Livraison en 2-4h en moyenne. Easy ! 📦",
  'prix': "Alma, c'est 16€/mois tout compris : remboursements, pharmacie en ligne, livraison, chatbot 24/7... Sans engagement, tu peux résilier quand tu veux. On est fair. ✌️",
  'default': "Bonne question ! Pour une réponse personnalisée, je te conseille de consulter notre FAQ ou de nous contacter directement. On est là pour t'aider ! 😊"
};

function openChat() {
  chatWidget.classList.add('open');
  chatButton.style.transform = 'scale(0) rotate(180deg)';
  setTimeout(() => {
    chatButton.style.display = 'none';
  }, 300);
}

function closeChat() {
  chatWidget.classList.remove('open');
  chatButton.style.display = 'flex';
  setTimeout(() => {
    chatButton.style.transform = 'scale(1) rotate(0deg)';
  }, 10);
}

function addMessage(text, type) {
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-message ${type}`;
  msgDiv.innerHTML = `<p>${text}</p>`;
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function getBotResponse(text) {
  const lower = text.toLowerCase();
  if (lower.includes('rembours')) return botResponses.remboursement;
  if (lower.includes('médic') || lower.includes('command') || lower.includes('pharma')) return botResponses.medicament;
  if (lower.includes('prix') || lower.includes('coût') || lower.includes('tarif') || lower.includes('€')) return botResponses.prix;
  return botResponses.default;
}

function sendChatMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  // User message
  addMessage(text, 'user');
  chatInput.value = '';

  // Bot typing simulation
  setTimeout(() => {
    const response = getBotResponse(text);
    addMessage(response, 'bot');
  }, 1000 + Math.random() * 1000);
}

function sendQuickReply(text) {
  chatInput.value = text;
  sendChatMessage();
}

function handleChatKeypress(e) {
  if (e.key === 'Enter') {
    sendChatMessage();
  }
}

// ========================================
// REIMBURSEMENT WIDGET
// ========================================
const reimbOverlay = document.getElementById('reimbursementOverlay');
const reimbForm = document.getElementById('reimbForm');
const reimbResults = document.getElementById('reimbResults');
const reimbAmountInput = document.getElementById('reimbAmount');

let selectedType = { rate: 0.7, delay: '3-5 jours' };

function openReimbursement() {
  reimbOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeReimbursement() {
  reimbOverlay.classList.remove('open');
  document.body.style.overflow = '';
  resetReimbursement();
}

function selectType(btn) {
  // Update UI
  document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Update data
  selectedType = {
    rate: parseFloat(btn.dataset.rate),
    delay: btn.dataset.delay
  };
}

function calculateReimbursement() {
  const amount = parseFloat(reimbAmountInput.value);
  if (!amount || amount <= 0) return;

  const secu = amount * 0.7; // Base sécu assumption
  const alma = (amount - secu) * selectedType.rate; // Alma part
  // Note: Simplified calculation logic for demo
  
  // Actually, let's follow the logic: Secu covers X%, Alma covers rest or part of rest
  // Let's use a simpler logic for the demo that looks good:
  // Secu 70%, Alma covers the gap up to 100% or less depending on sector
  
  const secuAmount = amount * 0.70;
  let almaAmount = (amount - secuAmount); 
  
  // Adjust alma coverage based on rate (just for visual variety)
  if (selectedType.rate < 0.7) {
     almaAmount = almaAmount * 0.8; // Not fully covered
  }

  const total = secuAmount + almaAmount;
  const reste = amount - total;

  // Update DOM
  document.getElementById('resultTotal').textContent = total.toFixed(2) + '€';
  document.getElementById('resultOf').textContent = amount.toFixed(2);
  document.getElementById('resultSecu').textContent = secuAmount.toFixed(2) + '€';
  document.getElementById('resultAlma').textContent = almaAmount.toFixed(2) + '€';
  
  const resteRow = document.getElementById('resteRow');
  const resultReste = document.getElementById('resultReste');
  
  if (reste > 0.01) {
    resteRow.style.display = 'flex';
    resultReste.textContent = reste.toFixed(2) + '€';
  } else {
    resteRow.style.display = 'none';
  }

  document.getElementById('resultDelay').textContent = selectedType.delay;

  // Switch views
  reimbForm.style.display = 'none';
  reimbResults.style.display = 'block';
}

function resetReimbursement() {
  reimbAmountInput.value = '';
  reimbForm.style.display = 'block';
  reimbResults.style.display = 'none';
}

// Initialize
// Open reimbursement widget via console for testing: openReimbursement()
