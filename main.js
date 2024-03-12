// General, Mobile, AnimationSetter

// la pantalla se mide y se aplincan cosas distintas

class Page {

    constructor() {
        this.nav = document.querySelector("nav");
        this.menuButton = document.createElement("button");
        this.links = document.querySelector(".links");
        this.dropdownLinks = document.querySelectorAll(".list");
        this.header = document.querySelector("header");
    }

    createMenuButton() {
        const button = document.createElement("button");
        button.classList.add("mobile-nav")
        button.innerHTML = `
            <span class="line top"></span>
            <span class="line middle"></span>
            <span class="line bottom"></span>
        `;
        return button;
    }

    animateNav(scroll) {
        if(scroll > this.header.offsetHeight * 1) {
            this.nav.classList.remove("removing-nav");
            this.nav.classList.add("fixed-nav");
        } else {    
            this.nav.classList.remove("fixed-nav")
            this.nav.classList.add("removing-nav");
        }
    }

    listenScroll() {
        let scroll = window.scrollY;
        this.animateNav(scroll);
        document.addEventListener("scroll", (event) => {
            scroll = window.scrollY;
            this.animateNav(scroll);
        })
    }

    unmountMobileNav() {
        this.nav.classList.remove("mobile");
        this.nav.remove(this.menuButton);
    }

    mountMobileNav() {
        this.nav.classList.add("mobile");
        this.nav.append(this.menuButton);
    }

    filterMaxWidthInChar(links) {
        const charQuantity = [];
        links.forEach(element => charQuantity.push(element.innerText.length))
        const maxChars = Math.max(...charQuantity);
        const widthCh = maxChars + 8;
        return widthCh;
    }

    mountDropdownAnimations() {
        this.dropdownLinks.forEach(element => {
            const links = element.querySelectorAll("a");
            const width = this.filterMaxWidthInChar(links);

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

    listenResize() {

        document.addEventListener("resize", () => {
            const width = window.innerWidth;
            if(width < 600) this.mountMobileNav();
            if(width > 600) this.unmountMobileNav();
        });
    }

    main() {
        this.mountDropdownAnimations();
        
        this.listenScroll();
        this.listenResize();
    }

    static init() {
        const page = new Page();
        page.main();
        return page;
    }

}

document.addEventListener("DOMContentLoaded", Page.init);