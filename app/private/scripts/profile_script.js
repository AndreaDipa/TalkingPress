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
                /*var ul = document.getElementById("stories-ul");
                
                var event = myEvents[i];
                
                if(myEvents.length == 0) {
                    var h1 = document.createElement('h1');
                    var italich1 = h1.appendChild(document.createElement('i'));
                    var nostories = italich1.appendChild(document.createTextNode("Nothing to show"));
                    h5.setAttribute('style', "color: gray");
                } else {
                    for (i = 0; i < myEvents.length; i++) {
                        var li = document.createElement('li');

                        li.setAttribute('class', "list-group-item col-12 col-md-6");

                        var div1 = li.appendChild(document.createElement('div'));
                        var h3 = div1.appendChild(document.createElement('h3'));
                        var h6 = div1.appendChild(document.createElement('h6'));

                        h3.appendChild(document.createTextNode(event.title));
                        h6.appendChild(document.createTextNode(event.description));

                        var hr = div1.appendChild(document.createElement('hr'));

                        var div2 = li.appendChild(document.createElement('div'));
                        var h5 = div2.appendChild(document.createElement('h5'));

                        if(event.comment == "") {
                            var italich5 = h5.appendChild(document.createElement('i'));
                            var nocomment = italich5.appendChild(document.createTextNode("NO COMMENT"));
                            h5.setAttribute('style', "color: gray");
                        }

                        h5.appendChild(document.createTextNode(event.comment));

                        ul.appendChild(li);
                    }   
                }*/          
            

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
