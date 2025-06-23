//header
document.addEventListener('DOMContentLoaded', () => {
    let header = document.querySelector('.main-header');
    let logo = document.querySelector('header-logo');

    let scrollHeight = 200;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollHeight) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
});

// 手機板 nav
$("div.hb").on("click", function () {
    let unclick = $("div.hb").hasClass("unclick");
    if (unclick = "ture") {
        $("span.open").toggleClass("hide");
        $("span.close").toggleClass("hide");
        $("div.hb").toggleClass("shownav");
        $("div.main-nav").toggleClass("shownav");
    }
});

//手機板 submenu
$("a.nav-item").on("click", function (e) {
    if ($(window).width() <= 1024) {
        e.preventDefault();
        $("ul.submenu").toggleClass("on");
        $(this).toggleClass("on");
    }
});

//數量加減
function quantityControl(block) {
    let minusBtn = block.querySelector('.quantity-input .minus');
    let plusBtn = block.querySelector('.quantity-input .plus');
    let input = block.querySelector('.quantity-input .qty-input');

    let min = parseInt(input.min);
    let max = parseInt(input.max);

    let updateDispatch = () => {
        let value = parseInt(input.value);
        if (isNaN(value) || value < min) {
            input.value = min;
        }
        else if (value > max) {
            input.value = max;
        }

        input.dispatchEvent(new CustomEvent('quantityUpdated', {
            detail: {
                newQuantity: parseInt(input.value)
            }
        }));
    }

    minusBtn.addEventListener('click', function () {
        let value = parseInt(input.value);
        if (value > min) {
            input.value = value - 1;
        }
        updateDispatch();
    });

    plusBtn.addEventListener('click', function () {
        let value = parseInt(input.value);
        if (value < max) {
            input.value = value + 1;
        }
        updateDispatch();
    });

    input.addEventListener('change', updateDispatch);
    updateDispatch();
}

document.addEventListener('DOMContentLoaded', function () {
    let quantityInput = document.querySelectorAll('.quantity-input');

    quantityInput.forEach(function (block) {
        if (!block.closest('.cartitem')) {
            quantityControl(block);
        }
    });
});

//淡入淡出
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.bottom < 20 || rect.top > window.innerHeight;
}

function addClassToVisibleElements() {
    var aosElements = document.querySelectorAll(".aos");
    aosElements.forEach(function (aosElement) {
        if (!isElementInViewport(aosElement)) aosElement.classList.add("ed");
        else aosElement.classList.remove("ed");
    });
}

document.addEventListener("scroll", addClassToVisibleElements);
addClassToVisibleElements();

// 商品點小圖換大圖
function showLarge(e) {
    let smalls = e.target;
    if (smalls.tagName === "IMG") {
        document.getElementById("large-pic").src = smalls.src;
    }
}

function init() {
    let smallPic = document.querySelectorAll(".small-pic");
    smallPic.forEach(function (img) {
        img.onclick = showLarge;
    });
}

window.addEventListener("load", init);

//購物車按鈕跳燈箱
document.addEventListener('DOMContentLoaded', function () {
    let addcartBtn = document.querySelectorAll('.cart-button');
    let lightbox = document.getElementById('lightbox');
    let closeBtn = lightbox.querySelector('.close-btn');

    function openbox() {
        lightbox.classList.add('show');
    };

    function closebox() {
        lightbox.classList.remove('show');
    };

    addcartBtn.forEach(function (button) {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            openbox();
        })
    });

    closeBtn.addEventListener('click', closebox);

    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            closebox();
        }
    });
});