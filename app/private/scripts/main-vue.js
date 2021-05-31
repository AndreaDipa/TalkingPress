const app = Vue.createApp({
    data() {
        return {
            tweets: [
                {
                    text: "Ciao amico sono di prova. Lorem ipsum ajaidsiahdaihdasihashiads",
                    date: "Wed May 26 2021",
                    favorite_count: "1k",
                    retweet_count: "8k",
                    user_name: "Ciaone",
                },
                {
                    text: "Ciao amico sono di prova. Lorem ipsum ajaidsiahdaihdasihashiads",
                },
                {
                    text: "Ciao amico sono di prova. Lorem ipsum ajaidsiahdaihdasihashiads",
                },
            ],
        };
    },
    created() {
        var self = this;
        const sPageURL = window.location.search.substring(1);
        const cat = sPageURL.split("=")[1];
        $.ajax({
            url: `/twitter/tweets/${cat}`,
            type: "GET",
            dataType: "json",
            success: function (res) {
                for (i = 0; i < res.length; i++) {
                    let dateArray = res[i].date.split(" ");
                    res[i].date =
                        dateArray[0] +
                        " " +
                        dateArray[1] +
                        " " +
                        dateArray[2] +
                        " " +
                        dateArray[5];
                }
                self.tweets = res;
            },
            error: function (err) {
                if (err.status == 401) {
                    self.tweets = [
                        {
                            text: "",
                            user_name: "Not Logged",
                            user_profile_img: "propic.png",
                        },
                    ];

                    $("#login").attr("href", "/twitter/login");
                    $("#login").html("Login with twitter");
                    $("#tweetBox").hide();
                    $("#sendTweet").hide();
                }
                if (err.status == 404) {
                    self.tweets = [
                        {
                            text: "",
                            user_name: err.responseText,
                            user_profile_img: "propic.png",
                        },
                    ];
                }
            },
        });
    },
});

app.mount("#tweet-vue");
