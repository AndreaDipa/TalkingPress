$(document).ready(() => {
    function getCookie(name) {
         const value = `; ${document.cookie}`;
         const parts = value.split(`; ${name}=`);
         if (parts.length === 2) return parts.pop().split(';').shift();
     }
     const x = getCookie('x-auth-token');
     let tit, desc;
     $.ajax({
         url: '/api/events',
         type: 'GET',
         dataType: 'json',
         success: function(res) { tit = res.title;
                                  desc = res.description;
                                  $('#titolo').html(tit);
                                  $('#descrizione').html(desc);; },
         error: function() { console.log('error ajax') },    
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
         url: '/twitter/tweets',
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
                messageBox.value = '';
            }
       
            function init() {
                if (ws) {
                    ws.onerror = ws.onopen = ws.onclose = null;
                    ws.close();
                }
       
                ws = new WebSocket(`ws://server_ws:6969`);
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
                }
            }
            init();
            
            
        })();

});

