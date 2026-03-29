const API_BASE = 'http://localhost:3000/api';

const aboutBtn = document.getElementById("aboutBtn"),
    goHome = document.getElementById("goHome"),
    aboutText = document.getElementById("aboutText"),
    heroTitle = document.getElementById("heroTitle"),
    loginOverlay = document.getElementById("loginOverlay"),
    registerOverlay = document.getElementById("registerOverlay"),
    openLogin = document.getElementById("openLogin"),
    openRegister = document.getElementById("openRegister"),
    switchToRegister = document.getElementById("switchToRegister"),
    switchToLogin = document.getElementById("switchToLogin"),
    loginBtn = document.getElementById("loginBtn"),
    loginModal = document.getElementById("loginModal"),
    registerBtn = document.getElementById("registerBtn"),
    registerModal = document.getElementById("registerModal"),
    welcomeDiv = document.getElementById("welcomeDiv"),
    logoutBtn = document.getElementById("logoutBtn"),
    userBtn = document.getElementById("userBtn"),
    khekBtn = document.getElementById("khekBtn"),
    khekPage = document.getElementById("khekPage");

// Կայքի մասին
aboutBtn.addEventListener("click", e => { e.preventDefault(); aboutText.style.display = "block"; heroTitle.textContent = ""; });
goHome.addEventListener("click", e => { e.preventDefault(); aboutText.style.display = "none"; heroTitle.textContent = "Գյուղատնտեսությունը կյանք է"; });

// Մուտք/Գրանցվել
openLogin.addEventListener("click", e => { e.preventDefault(); registerOverlay.classList.remove("open"); loginOverlay.classList.add("open"); });
openRegister.addEventListener("click", e => { e.preventDefault(); loginOverlay.classList.remove("open"); registerOverlay.classList.add("open"); });
switchToRegister.addEventListener("click", e => { e.preventDefault(); loginOverlay.classList.remove("open"); registerOverlay.classList.add("open"); });
switchToLogin.addEventListener("click", e => { e.preventDefault(); registerOverlay.classList.remove("open"); loginOverlay.classList.add("open"); });
window.addEventListener("click", e => { if (e.target === loginOverlay) loginOverlay.classList.remove("open"); if (e.target === registerOverlay) registerOverlay.classList.remove("open"); });

// Մուտք
loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const inputs = loginModal.querySelectorAll("input");
    const email = inputs[0].value.trim();
    const password = inputs[1].value.trim();
    
    if (!email || !password) {
        alert("Լրացրեք բոլոր դաշտերը");
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            alert(data.message || 'Login failed');
            return;
        }
        
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        inputs[0].value = '';
        inputs[1].value = '';
        showWelcome();
    } catch (error) {
        alert('Connection error: Could not connect to server');
        console.error(error);
    }
});

// Գրանցում
registerBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const inputs = registerModal.querySelectorAll("input");
    const name = inputs[0].value.trim();
    const email = inputs[2].value.trim();
    const password = inputs[4].value.trim();
    const passwordConfirm = inputs[5].value.trim();
    
    // Validation
    let ok = true;
    inputs.forEach(x => { if (!x.value.trim()) ok = false; });
    if (!ok) {
        alert("Լրացրեք բոլոր դաշտերը");
        return;
    }
    
    if (password !== passwordConfirm) {
        alert("Գաղտնաբառերը չեն համընկնում");
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            alert(data.message || 'Registration failed');
            return;
        }
        
        // Clear inputs
        inputs.forEach(x => x.value = '');
        
        // Show success message
        registerModal.innerHTML = '<h2 class="success-message">Գրանցումը հաջողվեց ✅</h2><p>Այժմ կարող եք մուտք գործել</p>';
        
        // Reset after 2 seconds
        setTimeout(() => {
            registerModal.innerHTML = `
                <h2>Գրանցվել</h2>
                <input type="text" placeholder="Անուն" required>
                <input type="text" placeholder="Ազգանուն" required>
                <input type="email" placeholder="Էլ․ հասցե" required>
                <input type="tel" placeholder="Հեռ. համար" required>
                <input type="password" placeholder="Գաղտնաբառ" required>
                <input type="password" placeholder="Կրկնել գաղտնաբառը" required>
                <button id="registerBtn">Գրանցվել</button>
                <p>Արդեն հաշիվ ունե՞ս։ <a href="#" id="switchToLogin">Մուտք</a></p>
            `;
            registerOverlay.classList.remove("open");
            loginOverlay.classList.add("open");
            // Re-attach event listeners
            document.getElementById("registerBtn").addEventListener("click", arguments.callee);
            document.getElementById("switchToLogin").addEventListener("click", (e) => {
                e.preventDefault();
                registerOverlay.classList.remove("open");
                loginOverlay.classList.add("open");
            });
        }, 2000);
    } catch (error) {
        alert('Connection error: Could not connect to server');
        console.error(error);
    }
});

// Ելք
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    khekPage.style.display = "none";
    welcomeDiv.style.display = "none";
    document.querySelector("header").style.display = "flex";
    document.querySelector(".hero").style.display = "flex";
    document.querySelector("footer").style.display = "block";
});

// Օգտատիրոջ տվյալներ
userBtn.addEventListener("click", async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert("You are not logged in");
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/user/profile`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const user = await response.json();
        
        if (!response.ok) {
            alert(user.message || 'Error fetching profile');
            return;
        }
        
        alert(`Անուն: ${user.name || 'N/A'}\nԷլ: ${user.email}\nՀաստ. ամսաթիվ: ${new Date(user.created_at).toLocaleDateString()}`);
    } catch (error) {
        alert('Error fetching user profile');
        console.error(error);
    }
});

// Էջի վիճակ բեռնելիս
window.addEventListener("load", () => {
    const token = localStorage.getItem('token');
    if (token) {
        showWelcome();
    }
});

function showWelcome() {
    document.querySelector("header").style.display = "none";
    document.querySelector(".hero").style.display = "none";
    document.querySelector("footer").style.display = "none";
    loginOverlay.classList.remove("open");
    registerOverlay.classList.remove("open");
    welcomeDiv.style.display = "flex";
}

// ԽԵԿ սեղմելիս
khekBtn.addEventListener("click", () => { welcomeDiv.style.display = "none"; khekPage.style.display = "flex"; });

// Վերադառնալ կոճակ
function goBack() {
    khekPage.style.display = "none";
    welcomeDiv.style.display = "flex";
}

// Check authorization for protected pages
function checkAuthorization() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Մուտք գործեք տվյալներ դիտելու համար');
        window.history.back();
        return false;
    }
    return true;
}

// Բացել համապատասխան էջ (page1.html ... page8.html)
function openPage(num) {
    if (!checkAuthorization()) return;
    if (num == 1) {
        window.location.href = `tvyalneri mutq.html`;
    }
    else {
        window.location.href = `page${num}.html`;
    }
}

function openKhekPage() {
    if (!checkAuthorization()) return;
    window.location.href = "tvyalneri mutq.html";
}

function openGoatSheepPage() {
    if (!checkAuthorization()) return;
    window.location.href = "tvyalneri mutq sheep.html";
}

function openPigPage() {
    if (!checkAuthorization()) return;
    window.location.href = "pig.html";
}

function openPoultryPage() {
    if (!checkAuthorization()) return;
    window.location.href = "poultry.html";
}

function openRabbitPage() {
    if (!checkAuthorization()) return;
    window.location.href = "rabbit.html";
}