$(document).ready(() => {
    $("#form").submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: $("#form").attr("action"),
            type: "POST",
            data: $("#form").serialize(),
            success: function (res) {
                window.location.pathname = "home.html";
            },
            error: function (err) {
                $("#username").val("");
                $("#email").val("");
                $("#password").val("");

                $("#invalid").html(err.responseText);
            },
        });
    });
});
