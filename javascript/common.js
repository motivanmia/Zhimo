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

// nav
$("div.hb").on("click", function () {
    let unclick = $("div.hb").hasClass("unclick");
    if (unclick = "ture") {
        $("span.open").toggleClass("hide");
        $("span.close").toggleClass("hide");
        $("div.hb").toggleClass("shownav");
        $("div.main-nav").toggleClass("shownav");
    }
});

//submenu
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
