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
                $("#navbarDropdownMenuLink").html(res.username);
                $('#hellouser').html(res.username);
                
                self.stories = res.events;
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

            $.ajax({
                url: "/api/events/" + id,
                type: "PUT",
                dataType: "json",
                data: {
                    comment: $(`#${id}`).val(),
                },

                success: function(res) {
                    for(let i = 0; i < Object.keys(self).length; i++) {
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
