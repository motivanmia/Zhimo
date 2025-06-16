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