function init() {
    var readMoreBtn = document.getElementById("readMore");
    var flag = 0;
    readMoreBtn.addEventListener("click", function() {
        var readMore = document.getElementById("demo_homepage");
        if (!flag) {
            readMore.style.display = "block";
            readMoreBtn.innerHTML = 'Read Less <i class="fa fa-chevron-circle-up" aria-hidden="true"></i>';
            flag = 1;
        } else {
            readMore.style.display = "none";
            readMoreBtn.innerHTML = 'Read More <i class="fa fa-chevron-circle-down" aria-hidden="true"></i>';
            flag = 0;
        }
    });
}

init();