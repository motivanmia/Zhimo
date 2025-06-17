// 表格切換
$("#registerBTN").on("click", function () {
    if ($(this).hasClass("active") == false) {
        $(this).toggleClass("active");
        $("#loginBTN").removeClass("active");
        $("#login-form").toggleClass("hidden");
        $("#register-form").removeClass("hidden");
    }
});

$("#loginBTN").on("click", function () {
    if ($(this).hasClass("active") == false) {
        $(this).toggleClass("active");
        $("#registerBTN").removeClass("active");
        $("#register-form").toggleClass("hidden");
        $("#login-form").removeClass("hidden");
    }
});

// 密碼眼睛
$("span.toggle-password").on("click", function () {
    //console.log($(this).attr("title"));
    if ($(this).attr("title") == "顯示密碼") {
        $(this).attr("title", "隱藏密碼");
        $("img.eyeclose").toggleClass("hidden");
        $("img.eyeopen").removeClass("hidden");
        $("input.psw").attr("type", "text");
    } else {
        $(this).attr("title", "顯示密碼");
        $("img.eyeopen").toggleClass("hidden");
        $("img.eyeclose").removeClass("hidden");
        $("input.psw").attr("type", "password");
    }
});