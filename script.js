// Initialize Animations on Scroll
AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 50 });

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMenu() {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
}

hamburger.addEventListener('click', toggleMenu);

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => { 
    if(mobileMenu.classList.contains('open')) toggleMenu(); 
  });
});

// View Switching Logic (Home, About, Departments)
function switchView(viewName) {
  document.getElementById('view-home').style.display = 'none';
  document.getElementById('view-about').style.display = 'none';
  document.getElementById('view-department').style.display = 'none';

  if (viewName === 'home') document.getElementById('view-home').style.display = 'block';
  else if (viewName === 'about') document.getElementById('view-about').style.display = 'block';
  else if (viewName === 'department') document.getElementById('view-department').style.display = 'block';

  window.scrollTo({ top: 0, behavior: 'instant' });
  if(mobileMenu.classList.contains('open')) toggleMenu();
  setTimeout(() => { AOS.refresh(); }, 100);
}

// Smooth Scrolling Logic
function scrollToElement(selector, targetView = null) {
  if (targetView && document.getElementById('view-' + targetView).style.display === 'none') {
    switchView(targetView);
    setTimeout(() => {
      const el = document.querySelector(selector);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  } else {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}

// Find a Doctor Form Logic
function handleFindDoctor(e) {
  e.preventDefault();
  const specialty = document.getElementById('searchSpecialty').value;
  const disease = document.getElementById('searchDisease').value;
  const name = document.getElementById('searchName').value;
  
  let resultMsg = "Showing available doctors matching your criteria:<br><br>";
  if(specialty) resultMsg += `<strong>Specialty:</strong> ${specialty}<br>`;
  if(disease) resultMsg += `<strong>Condition:</strong> ${disease}<br>`;
  if(name) resultMsg += `<strong>Doctor Name:</strong> ${name}<br>`;
  if(!specialty && !disease && !name) resultMsg = "Please select a specialty or disease to find a doctor.";
  
  document.getElementById('searchResultText').innerHTML = resultMsg;
  openModal('searchResultModal');
}

// Donation Form Logic
// --- THE WAITER ---
async function handleDonationSubmit(e) {
  e.preventDefault(); // Stops the page from refreshing
  
  // 1. Write down what the customer ordered
  const item = document.getElementById('donationItem').value;
  const type = document.querySelector('input[name="donationType"]:checked').value;
  const name = document.querySelector('input[placeholder="Your Name"]').value; 
  
  // Package it into a neat little ticket
  const orderTicket = {
      name: name,
      item: item,
      type: type
  };

  try {
      // 2. The Waiter runs to the kitchen (http://localhost:3000)
      const response = await fetch('http://localhost:3000/api/donations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderTicket)
      });

      // 3. The Waiter listens to what the chef says back
      const chefReply = await response.json();

      // 4. Show the chef's reply to the customer on the screen
      document.getElementById('searchResultText').innerHTML = chefReply.message + `<br><br>Thank you, ${name}.`;
      openModal('searchResultModal');
      e.target.reset(); // Clear the form

  } catch (error) {
      alert("Oh no! The waiter tripped and couldn't reach the kitchen. Is server.js running?");
  }
}
// Department Data Logic
const departmentData = {
  endo: { title: "Endocrinology", bgImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1920&q=80", overview: "<p>Discipline focusing on metabolic diseases, diabetes, and thyroid conditions. Often consulted by patients experiencing rapid weight changes, chronic fatigue, or blood sugar anomalies.</p>", treatments: "<ul><li>Comprehensive Diabetes Management</li><li>Advanced Thyroid Center</li></ul>", facts: ["State of the art technology", "Expert Diabetologists"] },
  hema: { title: "Oncology", bgImage: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1920&q=80", overview: "<p>Comprehensive care for all types of cancers. Offering medical, surgical, and radiation oncology under one roof.</p>", treatments: "<ul><li>Chemotherapy Protocols</li><li>Advanced Radiation</li></ul>", facts: ["Tumor Board Reviews", "Precision Medicine"] },
  cardio: { title: "Cardiology", bgImage: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=1920&q=80", overview: "<p>Comprehensive heart care utilizing the latest interventional technologies. People consult this department for chest pains, palpitations, shortness of breath, and routine heart health checks.</p>", treatments: "<ul><li>Interventional Cardiology</li><li>Electrophysiology</li></ul>", facts: ["24/7 Heart Attack Response", "Advanced Cath Labs"] },
  neuro: { title: "Neurology", bgImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1920&q=80", overview: "<p>Dedicated to treating conditions affecting the brain, spinal cord, and nerves. Patients usually visit for chronic migraines, memory loss, stroke recovery, and unexplained numbness or weakness.</p>", treatments: "<ul><li>Stroke Rehabilitation</li><li>Epilepsy Center</li></ul>", facts: ["State-of-the-art MRI facilities", "Renowned Stroke Team"] },
  peds: { title: "Pediatrics", bgImage: "https://images.unsplash.com/photo-1584516150909-c43483ee7932?auto=format&fit=crop&w=1920&q=80", overview: "<p>Providing specialized care for infants, children, and adolescents. Parents consult us for their children's routine vaccinations, developmental checks, high fevers, and pediatric asthma.</p>", treatments: "<ul><li>Neonatal Intensive Care</li><li>Childhood Immunizations</li></ul>", facts: ["Child-friendly wards", "Specialized Pediatric ICU"] },
  ortho: { title: "Orthopedics", bgImage: "https://images.unsplash.com/photo-1576089291114-1188435d64e9?auto=format&fit=crop&w=1920&q=80", overview: "<p>Focused on the musculoskeletal system. Highly consulted for sports injuries, joint replacements, chronic back pain, and resetting broken bones.</p>", treatments: "<ul><li>Joint Replacement Surgery</li><li>Sports Medicine & Rehab</li></ul>", facts: ["Advanced Robotic Surgery", "Dedicated Rehab Unit"] }
};

function openDepartment(deptKey) {
  const data = departmentData[deptKey];
  if (!data) return;
  document.getElementById('dd-title').innerText = data.title;
  document.getElementById('dd-bg').style.backgroundImage = `url('${data.bgImage}')`;
  document.getElementById('dd-overview').innerHTML = data.overview;
  document.getElementById('dd-treatments').innerHTML = data.treatments;
  
  const factsList = document.getElementById('dd-facts');
  factsList.innerHTML = '';
  data.facts.forEach(fact => { 
    const li = document.createElement('li'); 
    li.innerHTML = `<i class='fa-solid fa-check'></i> ${fact}`; 
    factsList.appendChild(li); 
  });
  switchView('department');
}

// Modal Logic
function openModal(modalId) { 
  document.getElementById(modalId).classList.add('active'); 
  document.body.style.overflow = 'hidden'; 
}

function closeModal(modalId) { 
  document.getElementById(modalId).classList.remove('active'); 
  document.body.style.overflow = ''; 
}

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => { 
    if(e.target === overlay) closeModal(overlay.id); 
  });
});

// Chatbot Logic
const chatWindow = document.getElementById('chatWindow');
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');

function toggleChat() { 
  chatWindow.classList.toggle('open'); 
}

function sendChat() {
  const text = chatInput.value.trim().toLowerCase();
  if(!text) return;
  
  // Add user message
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-msg msg-user';
  userMsg.innerText = chatInput.value;
  chatBody.appendChild(userMsg);
  chatInput.value = '';

  // Scroll to bottom
  chatBody.scrollTop = chatBody.scrollHeight;

  setTimeout(() => {
    let botResponse = "Thank you for reaching out. Please use our booking portal to schedule a visit.";
    
    // Symptom & Demographic Logic
    if(text.includes('fever') || text.includes('headache') || text.includes('pain')) {
      botResponse = "For common symptoms like fever or headache, over-the-counter medicines like Paracetamol are often used. <strong>However, please always consult an experienced doctor to get the correct diagnosis and best treatment.</strong>";
    } else if(text.includes('kid') || text.includes('child') || text.includes('baby')) {
      botResponse = "For children, we recommend our specialized <strong>Pediatrics Department</strong>. Our pediatricians provide gentle, expert care. <strong>Please consult an experienced pediatrician to get the best treatment.</strong>";
    } else if(text.includes('female') || text.includes('woman') || text.includes('girl')) {
      botResponse = "For female health, maternity, or specific concerns, we recommend our <strong>Gynecology & Women's Health</strong> specialists. <strong>Please consult our experienced doctors to get the best treatment.</strong>";
    } else if(text.includes('male') || text.includes('man') || text.includes('boy')) {
      botResponse = "For male-specific health issues, we recommend our <strong>Urology or General Medicine</strong> specialists. <strong>Please consult an experienced doctor to get the best treatment.</strong>";
    }

    const botMsg = document.createElement('div');
    botMsg.className = 'chat-msg msg-bot';
    botMsg.innerHTML = botResponse;
    chatBody.appendChild(botMsg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 600);
}