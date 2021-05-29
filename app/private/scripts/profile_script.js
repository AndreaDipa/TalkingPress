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
        const sPageURL = window.location.search.substring(1);
        
        $.ajax({
            url: '/api/users/me',
            type: "GET",
            dataType: "json",
            success: function(res) {
                var myEvents = res.events;
                var ul = document.getElementById("stories-ul");
                
                for (i = 0; i < myEvents.length; i++) {
                    var event = myEvents[i];
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
                        var italic = h5.appendChild(document.createElement('i'));
                        var nocomment = italic.appendChild(document.createTextNode("NO COMMENT"));
                        h5.setAttribute('style', "color: gray");
                    }

                    h5.appendChild(document.createTextNode(event.comment));

                    ul.appendChild(li);
                }               
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
