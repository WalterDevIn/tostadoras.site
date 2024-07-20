//Metodologia funcional
const nav = document.querySelector("nav");
const menuButton = document.createElement("button");
const links = document.querySelector(".links");
const dropdownLinks = document.querySelectorAll(".list");
const header = document.querySelector("header");

function createMenuButton() {
    const button = document.createElement("button");
    button.classList.add("mobile-nav")
    button.innerHTML = `
        <span class="line top"></span>
        <span class="line middle"></span>
        <span class="line bottom"></span>
    `;
    return button;
}

function animateNav(scroll) {
    if(scroll > header.offsetHeight * 1) {
        nav.classList.remove("removing-nav");
        nav.classList.add("fixed-nav");
    } else {    
        nav.classList.remove("fixed-nav")
        nav.classList.add("removing-nav");
    }
}

function listenScroll() {
    let scroll = window.scrollY;
    animateNav(scroll);
    document.addEventListener("scroll", (event) => {
        scroll = window.scrollY;
        animateNav(scroll);
    })
}

function unmountMobileNav() {
    this.nav.classList.remove("mobile");
    this.nav.remove(this.menuButton);
}

function filterMaxWidthInChar(links) {
    const charQuantity = [];
    links.forEach(element => charQuantity.push(element.innerText.length))
    const maxChars = Math.max(...charQuantity);
    const widthCh = maxChars + 8;
    return widthCh;
}

function mountDropdownAnimations() {
    dropdownLinks.forEach(element => {
        const links = element.querySelectorAll("a");
        const width = filterMaxWidthInChar(links);

        links.forEach((subElement, index) => {
            if(index == 0)
                subElement.classList.add("first");
            if(index == links.length - 1) 
                subElement.classList.add("last")

            subElement.style.setProperty("animation-delay", `${(index + 1) * 24}ms`)
            subElement.style.setProperty("width", `${width}ch`)
            subElement.style.setProperty("margin-left", `-${width / 2}ch`)
        })
    })
}

function listenResize() {
    document.addEventListener("resize", () => {
        const width = window.innerWidth;
        if(width < 600) mountMobileNav();
        if(width > 600) unmountMobileNav();
    });
}

mountDropdownAnimations(); 
listenScroll();
listenResize();