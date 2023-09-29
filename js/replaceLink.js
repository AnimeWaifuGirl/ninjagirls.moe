jQuery(function ($) {
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        $("a").each(function () {
            if ($(this).attr("href") == "https://prelaunch.me/android/Njk1") {
                $(this).attr("href", "https://prelaunch.me/ios/Njk2");
            }
        });
    }
});