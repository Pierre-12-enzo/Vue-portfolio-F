(function ($) {
    // Sidebar Toggler
    $('.bi-speedometer2').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });
})