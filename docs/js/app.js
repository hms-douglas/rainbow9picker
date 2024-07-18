const DOCUMENTATION = document.getElementById("documentation"),
      SIDEBAR = document.getElementById("sidebar");

var AUTO_SCROLL = false,
    HELPER;

window.onload = function() {
    showLatestVersion();

    addGoToOnClick();

    highlightCode();

    initListenerScroll();

    initSidebarToggle();

    initListenerImageZoom();

    initColorPills();
};

function showLatestVersion() {
    const version = document.getElementById("latest").parentElement.innerHTML.split("<")[0];

    document.querySelectorAll(".library_version").forEach((el) => el.innerHTML = "Latest: " + version);
}

function addGoToOnClick() {
    document.querySelectorAll("[data-goto]").forEach((el) => {
        el.addEventListener("click", (e) => {
            e.stopPropagation();

            forceCloseSidebar();
            
            goToHighlight(el);

            AUTO_SCROLL = true;

            const id = el.getAttribute("data-goto");

            document.getElementById(id).scrollIntoView({behavior: "smooth"});

            history.pushState({}, '', window.location.href.split("#")[0] + "#" + id);
        });

        el.addEventListener("mousedown", (e) => {
            if(e.which == 2 || e.button == 4 ) {
                e.preventDefault();

                const id = el.getAttribute("data-goto");

                window.open(window.location.href.split("#")[0] + "#" + id, "_blank");

                return;
            }
        });
    });
}

function goToHighlight(el) {
    if(el == null) {
        return;
    }

    removeShowing();

    el.classList.add("showing");

    var parent = el.parentElement;

    while(parent.classList.contains("sidebar_title") || parent.classList.contains("sidebar_subtitle")) {               
        parent.classList.add("showing");

        parent = parent.parentElement;
    }
}

function removeShowing() {
    document.querySelectorAll(".showing").forEach((el) => el.classList.remove("showing"));
}

function highlightCode() {
    hljs.configure({languages:["javascript"]});
    hljs.highlightAll();

    hljs.initLineNumbersOnLoad({startFrom: 0});

    setTimeout(() => {
        document.querySelectorAll("pre code").forEach((el) => {
            const div = document.createElement("div");

            div.className = "btn_copy";

            div.setAttribute("title", "Copy");

            div.addEventListener("click", () => copy(div));

            el.prepend(div);
        });
    }, 3000);
}

function initListenerScroll() {
    DOCUMENTATION.addEventListener("scroll", () => {
        if(!AUTO_SCROLL) {
            document.querySelectorAll(".title").forEach((el) => {
                if(isInViewport(el)) {                      
                    goToHighlight(document.querySelector('[data-goto="' + el.parentElement.getAttribute("id") + '"]'));
                    return;
                }
            });
        }
    });

    DOCUMENTATION.addEventListener("scrollend", () => {
        if(AUTO_SCROLL) {
            AUTO_SCROLL = false;
        }
    });

    window.onhashchange = () => {
        const id = location.hash.replaceAll("#", "");

        const el = document.getElementById(id);

        if(el != null) {
            AUTO_SCROLL = true;

            el.scrollIntoView({behavior: "smooth"});
        }
    };
}

function initSidebarToggle() {
    const toggle = document.getElementById("toggle");

    toggle.addEventListener("change", () => {
        console.log(toggle.checked);
        if(toggle.checked) {
            SIDEBAR.classList.add("show");
        } else {
            SIDEBAR.classList.remove("show");
        }
    });

    DOCUMENTATION.addEventListener("click", () => {
        if(toggle.checked) {
            forceCloseSidebar();
        }
    });
}

function forceCloseSidebar() {
    toggle.checked = false;
    SIDEBAR.classList.remove("show");
}

function initListenerImageZoom() {
    document.querySelectorAll(".screenshots img").forEach((el) => {
        el.addEventListener("click", () => {
            const image = new Image;

            image.src = el.src,
            image.style = "height: 100%; width: 100%; object-fit: contain;";
            
            const a = window.open("", "_blank");

            a.document.write(image.outerHTML),

            a.document.title = "Image :: Rainbow9",

            a.document.close();
        })
    });
}

function isInViewport(el) {
    const rect = el.getBoundingClientRect();

    if(rect.bottom < 0 || rect.top > ((window.innerHeight || doc.documentElement.clientHeight) / 2)) {
        return false;
    }

    return true;
}

function copyTable(el) {
    el = el.nextElementSibling;
    
    var table = document.getElementById(el);
    
    if (navigator.clipboard) {
        var text = table.innerText.trim();
        navigator.clipboard.writeText(text).catch(function () { });
    }
}

function copy(el) {
    el = el.nextElementSibling;

    const range = document.createRange(),
          selection = window.getSelection();

    selection.removeAllRanges();

    range.selectNodeContents(el);
    range.setStart(el.firstChild, 1);

    selection.addRange(range);
    
    document.execCommand("copy");

    selection.removeAllRanges();

    showToast("Copied!");
}

function showToast(msg) {
    const toast = document.getElementById("toast");

    toast.innerHTML = msg;

    toast.classList.add("show");

    setTimeout(() => toast.classList.remove("show"), 3000);
}

function initColorPills() {
    document.querySelectorAll("[data-c]").forEach((el) => {
        const c = el.getAttribute("data-c");

        el.addEventListener("click", () => {
            const i = document.createElement("input");

            i.style.height = "0px";
            i.value = c;

            DOCUMENTATION.appendChild(i);

            i.select();

            document.execCommand("copy");

            DOCUMENTATION.removeChild(i);

            showToast("Color copied!")
        });
    });
}