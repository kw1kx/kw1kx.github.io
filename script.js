const $ = (s) => document.querySelector(s);

function detectSystem() {
    const ua = navigator.userAgent || "";

    if (/Android/i.test(ua)) return "Android";
    if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
    if (/Windows/i.test(ua)) return "Windows";
    if (/Macintosh|Mac OS X/i.test(ua)) return "macOS";
    if (/Linux/i.test(ua)) return "Linux";

    return "Unknown";
}

function detectBrowser() {
    const ua = navigator.userAgent || "";

    if (/Edg\//i.test(ua)) return "Edge";
    if (/OPR\//i.test(ua)) return "Opera";
    if (/YaBrowser/i.test(ua)) return "Yandex";
    if (/Firefox\//i.test(ua)) return "Firefox";
    if (/Chrome\//i.test(ua) && !/Edg\//i.test(ua)) return "Chrome";
    if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) return "Safari";

    return "Browser";
}


// Печать строки по буквам
function typeLine(element, text, speed = 25) {
    return new Promise((resolve) => {
        let i = 0;

        element.textContent = "";

        function type() {
            if (i < text.length) {
                element.textContent += text[i];
                i++;

                setTimeout(type, speed);
            } else {
                resolve();
            }
        }

        type();
    });
}


// Анимация всей информации
async function animateSystemInfo() {

    await typeLine(
        $("#system"),
        `system: ${detectSystem()}`,
        25
    );

    await new Promise(resolve => setTimeout(resolve, 150));

    await typeLine(
        $("#browser"),
        `browser: ${detectBrowser()}`,
        25
    );

    await new Promise(resolve => setTimeout(resolve, 150));

    await typeLine(
        $("#screen"),
        `screen: ${window.screen.width}x${window.screen.height}`,
        25
    );

    await new Promise(resolve => setTimeout(resolve, 150));

    await typeLine(
        $("#language"),
        `language: ${navigator.language || "unknown"}`,
        25
    );
}


// Запускаем анимацию
animateSystemInfo();


function enterSite() {
    const boot = $("#boot");

    if (boot.classList.contains("hide")) return;

    boot.classList.add("hide");

    setTimeout(() => $("#boot").remove(), 700);
    setTimeout(() => $(".page").classList.add("show"), 80);
}


document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.code === "Space") {
        enterSite();
    }
});


document.addEventListener("click", enterSite, { once: true });

setTimeout(enterSite, 12000);