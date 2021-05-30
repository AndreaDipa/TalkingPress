const app = Vue.createApp({
    data() {
        return {
            stories: [
                {
                    _id: "ID",
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
                //generate username
                $('#hellouser').html(res.username);


                //generate news cards
                var myEvents = res.events;
                self.stories = myEvents;

                /*if(myEvents.length == 0) {
                    var nothing = document.createElement('h1');
                    nothing.appendChild(document.createTextNode("Nothing to show"));
                    nothing.setAttribute('style', "color: gray");
                }*/

                var event;

                for (i = 0; i < myEvents.length; i++) {
                    event = myEvents[i];

                    self._id = event._id;
                    
                    self.title = event.title;
                    self.description = event.description;
                    /*if(event.comment == "") {
                        self.comment = "[NO COMMENT]";
                    } else {
                        
                    }*/
                    self.comment = event.comment;

                }
            },
            
            error: function(err) {
                console.log("error ajax with profile data");
            },
        });
    },
    methods: {

        delete_news(id) {
            var self = this.stories;

            $.ajax({
                url: "/api/events/" + id,
                type: "DELETE",
                success: function (res) {
                    for (let i = 0; i < Object.keys(self).length; i++) {
                        if (self[i]._id == id) {
                            self.splice(i, 1);
                            break;
                        }
                    }
                    console.log("deleted");
                },
                error: function (err) {
                    console.log("error ajax");
                },
            });
        },

        edit_news(id) {
            var self = this.stories;

            console.log(id);

            $.ajax({
                url: "/api/events/" + id,
                type: "PUT",
                dataType: "json",
                data: {
                    comment: $(`#${id}`).val(),
                },

                success: function(res) {
                    //self.comment = data.comment;
                    console.log(res.comment);
                    for(let i = 0; i < Object.keys(self).length; i++) {
                        console.log(self[i]);
                        if(self[i]._id == id) {
                            self[i].comment = res.comment;
                            break;
                        }
                        
                    }
                    
                    console.log("sent");
                    $(`#${id}`).val("");
                },
                error: function (err) {
                    console.log("error ajax");
                },
            });
        }
    },
    
});

app.mount("#stories");

/*const app2 = Vue.createApp({
    data() {
        return {
            _id: "User ID",
        }
    },
    created() {
        var self = this;

        $("#deletebutton").click(() => {
            $.ajax({
                url: "/api/users/" + self._id,
                type: "DELETE",
                dataType: "json",
                success: function () {
                    console.log("deleted account");
                    window.location.href('./deleted.html');
                },
                error: function (err) {
                    console.log("error ajax");
                },
            });
        });
    },
});

app2.mount("#profile-settings");*/

