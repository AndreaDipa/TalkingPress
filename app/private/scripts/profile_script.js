const app = Vue.createApp({
    data() {
        return {
            stories: [
                {
                    title: "Title test",
                    description: "Description test",
                    comment: "Comment test",
                },
            ],
        };
    },

    created() {
        var self = this;
        const sPageURL = window.location.search.substring(1);
        
        $.ajax({
            url: '/api/users/me',
            type: "GET",
            dataType: "json",
            success: function(res) {
                var myEvents = res.events;
                self.stories = myEvents;

                if(myEvents.length == 0) {
                    var nothing = document.createElement('h1');
                    nothing.appendChild(document.createTextNode("Nothing to show"));
                    nothing.setAttribute('style', "color: gray");
                }

                var event;

                for (i = 0; i < myEvents.length; i++) {
                    event = myEvents[i];
                    
                    self.title = event.title;
                    self.description = event.description;
                    if(event.comment == "") {
                        self.comment = "[NO COMMENT]";
                    } else {
                        self.comment = event.comment;
                    }
                }
            },
            
            error: function(err) {
                console.log("error ajax with profile data");
            },
        });
    },
});

app.mount("#stories");

$(document).ready(() => {
    const sPageURL = window.location.search.substring(1);

    $.ajax({
        url: '/api/users/me',
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            $('#hellouser').html(res.username);
        },
        error: function (err) {
            console.log('error ajax username');
        },
    });
})
