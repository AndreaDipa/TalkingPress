$(document).ready(() => {
    let tit, desc, id;
    const sPageURL = window.location.search.substring(1);
    const cat = sPageURL.split("=")[1];
    $.ajax({
        url: `/api/events/${cat}`,
        type: "GET",
        dataType: "json",
        success: function (res) {
            tit = res.title;
            desc = res.description;
            id = res._id;
            $("#titolo").html(tit);
            $("#descrizione").html(desc);
        },
        error: function (err) {
            if (err.status == 404) {
                $("#titolo").html(
                    "Sembra che non ci siano notizie interessanti :/"
                );
                $("#save").attr("data-toggle", "");
                $("#save").attr("data-target", "");
            }
        },
    });

    const alertNews = $('#alert-news');
    alertNews.hide();
    $("#salva").click(() => {
        $.ajax({
            url: "/api/events",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                _id: id,
                title: tit,
                description: desc,
                comment: $("#comment").val(),
            }),
            success: function (data) {
                console.log("sended");
                $("#comment").val("");
                alertNews.show();
                setTimeout(function() {
                    alertNews.hide();
                }, 3000);
            },
            error: function (err) {
                if (err.status == 409) {
                    alertNews.html('News already sent!');
                    alertNews.addClass('alert-danger');
                    alertNews.show();
                    setTimeout(function() {
                        alertNews.hide();
                    }, 4000);
                    $("#comment").val("");
                }
                console.log("error ajax " + err.status);
            },
        });
    });

    const alertTweet = $('#alert-tweet');
    alertTweet.hide();
    $("#sendTweet").click(() => {
        const t = $("#tweetBox").val();
        $.ajax({
            url: "/twitter/tweets",
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({ tweet: t }),
            success: function (data) {
                if(t!=""){
                    alertTweet.show();
                    setTimeout(function() {
                        alertTweet.hide();
                    }, 4000);
                }
                $("#tweetBox").val("");
            },
            error: function (err) {
                console.log("error ajax tweet");
            },
        });
    });
    let user;
    $.ajax({
        url: "/api/users/username",
        type: "GET",
        success: function (res) {
            user = res;
            $("#navbarDropdownMenuLink").html(user);
        },
        error: function (p) {
            console.log("error ajax username");
        },
    });

    $(document).on("keypress", function (e) {
        if (e.which == 13) {
            if ($("#messageBox").is(":focus")) $("#send").click();
            if ($("#tweetBox").is(":focus")) $("#sendTweet").click();
        }
    });

});
