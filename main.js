class Page {

    constructor() {
        this.isMobile = window.innerWidth < 600;
        this.__nav = document.querySelector("nav");
        this.__header = document.querySelector("header");
        this.__dropdownLinkList = document.querySelectorAll(".list");
    }

    __getDropdownSublinkWidth(links) {
        const charQuantity = [];
        links.forEach(element => charQuantity.push(element.innerText.length))
        const maxChars = Math.max(...charQuantity);
        const widthCh = maxChars + 8;
        return widthCh;
    }

    __applyNavAnimation(scroll) {
        if(scroll > this.__header.offsetHeight * 0.8) {
            this.__nav.classList.remove("removing-nav");
            this.__nav.classList.add("fixed-nav");
        } else {    
            this.__nav.classList.remove("fixed-nav")
            this.__nav.classList.add("removing-nav");
        }
    }

    applyDropdownAnimations() {
        this.__dropdownLinkList.forEach(element => {
            const links = element.querySelectorAll("a");
            const widthCh = this.__getDropdownSublinkWidth(links);

            links.forEach((subElement, index) => {
                if(index == 0)
                    subElement.classList.add("first");
                if(index == links.length - 1) 
                    subElement.classList.add("last")

                subElement.style.setProperty("animation-delay", `${(index + 1) * 24}ms`)
                subElement.style.setProperty("width", `${widthCh}ch`)
                subElement.style.setProperty("margin-left", `-${widthCh/2}ch`)
            })
        })
    }

    addScrollNavListener() {
        let scroll = window.scrollY;
        this.__applyNavAnimation(scroll);
        document.addEventListener("scroll", (event) => {
            scroll = window.scrollY;
            this.__applyNavAnimation(scroll);
        })
    }

    __createNavButton() {
        const button = document.createElement("button");
        button.innerHTML = "<a>Menu</a>";
        return button;
    }

    mountMobileNav() {
        console.log("mount");
        const button = this.__createNavButton();
        this.__nav.append(button);
        console.log("success");
    }

    main() {
        this.applyDropdownAnimations();
        this.addScrollNavListener();
        
        console.log(`size ${this.isMobile}`);
        if(this.isMobile) {
            this.mountMobileNav();
        } else console.log("no entry")
    }

    static init() {
        const page = new Page();
        page.main()
    }

}

document.addEventListener("DOMContentLoaded", Page.init);