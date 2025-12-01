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
loginBtn.addEventListener("click", e => { e.preventDefault(); const inputs = loginModal.querySelectorAll("input"); let ok = true; inputs.forEach(i => { if (!i.value.trim()) ok = false; }); if (!ok) { alert("Լրացրեք բոլոր դաշտերը"); return; } sessionStorage.setItem("loggedIn", "true"); showWelcome(); });

// Գրանցում
registerBtn.addEventListener("click", e => { e.preventDefault(); const i = registerModal.querySelectorAll("input"); let ok = true; i.forEach(x => { if (!x.value.trim()) ok = false; }); if (!ok) { alert("Լրացրեք բոլոր դաշտերը"); return; } if (i[4].value !== i[5].value) { alert("Գաղտնաբառերը չեն համընկնում"); return; } registerModal.innerHTML = '<h2 class="success-message">Գրանցումը հաջողվեց ✅</h2>'; });

// Ելք
logoutBtn.addEventListener("click", () => { sessionStorage.removeItem("loggedIn"); khekPage.style.display = "none"; welcomeDiv.style.display = "none"; document.querySelector("header").style.display = "flex"; document.querySelector(".hero").style.display = "flex"; document.querySelector("footer").style.display = "block"; });

// Օգտատիրոջ տվյալներ
userBtn.addEventListener("click", () => { alert("Օգտատիրոջ տվյալները կհայտնվեն այստեղ։"); });

// Էջի վիճակ բեռնելիս
window.addEventListener("load", () => { if (sessionStorage.getItem("loggedIn") === "true") { showWelcome(); } });

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

// Բացել համապատասխան էջ (page1.html ... page8.html)
function openPage(num) {
    if (num == 1) {
        window.location.href = `tvyalneri mutq.html`;
    }
    else {
        window.location.href = `page${num}.html`;
    }
}
