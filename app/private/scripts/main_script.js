$(document).ready(() => {

    let tit, desc;
    const sPageURL = window.location.search.substring(1);
    const cat = sPageURL.split('=')[1]; 
    $.ajax({
        url: `/api/events/${cat}`,
        type: 'GET',
        dataType: 'json',
        success: function(res) { tit = res.title;
                                 desc = res.description;
                                 $('#titolo').html(tit);
                                 $('#descrizione').html(desc);; },
        error: function(err) { 
            if (err.status == 404)
            $('#titolo').html('Sembra che non ci siano notizie interessanti :/');
            $('#save').attr("data-toggle", "");
            $('#save').attr("data-target", "");
                    
        }    
    });
      
    $('#salva').click( () => {
         $.ajax({
             url: '/api/events',
             type: 'POST',
             dataType: 'json',
             contentType: 'application/json',
             data: JSON.stringify({ title: tit, description: desc ,comment: $('#comment').val()}),
             success: function(data) { 
                                        console.log('sended');
                                        $('#comment').val('');
                                     },
             error: function(err) { console.log('error ajax') },
         
         });
     })
     $('#sendTweet').click( () => {
         const t = $('#tweetBox').val();
         $.ajax({
             url: '/twitter/tweets',
             type: 'POST',
             dataType: 'json',
             contentType: 'application/json',
             data: JSON.stringify({ tweet: t }),
             success: function(data) { $('#tweetBox').val(''); },
             error: function(err) { console.log('error ajax tweet') },
         
         });
     })
     
    $(document).on('keypress',function(e) {
     if(e.which == 13) {
         if ($('#messageBox').is(':focus')) 
             $('#send').click();
         if ($('#tweetBox').is(':focus'))
             $('#sendTweet').click();
     }
         
     });
     $.ajax({
         url: `/twitter/tweets/${cat}`,
         type: 'GET',
         dataType: 'json',
         success: function(res) { 
                                  $('#t1').html(res.t1);
                                  $('#t2').html(res.t2)
                                  $('#t3').html(res.t3)
                                  $('#t4').html(res.t4) },
         error: function() { console.log('error ajax') },    
         });

        (function() {
            const sendBtn = document.querySelector('#send');
            const messages = document.querySelector('#messages');
            const messageBox = document.querySelector('#messageBox');
            let ws;
            
            function showMessage(message) {
                messages.textContent += `\n\n${message}`;
                messages.scrollTop = messages.scrollHeight;
            }
       
            function init() {
                if (ws) {
                    ws.onerror = ws.onopen = ws.onclose = null;
                    ws.close();
                }
       
                ws = new WebSocket(`ws://localhost:5000/chat/${cat}`);
                ws.onopen = () => {
                    console.log('connection opened');
                }
                ws.onmessage = ({data}) => showMessage(data);
                ws.onclose = function() {
                    ws = null;
                }
            }
            sendBtn.onclick = function() {
                if (!ws) {
                    showMessage("no WS connection :(");
                    return;
                }
                if (messageBox.value != "") {
                    ws.send(messageBox.value);
                    showMessage(messageBox.value);
                    messageBox.value = '';

                }
            }
            init();
            
            
        })();

    $.ajax({
        url: '/api/users/me',
        type: 'GET',
        dataType: 'json',
        success: function(res) {
            $('#dropdownMenuLink').html(res.username);
        },
        error: function (p) {
            console.log('error ajax username');
        },
    });
    
});

