var ws;

const app2 = Vue.createApp({
    data() {
        return {
            messages: [
            ]
        }
    },
    created(){
        const sPageURL = window.location.search.substring(1);
        const cat = sPageURL.split('=')[1];


        if (ws) {
            ws.onerror = ws.onopen = ws.onclose = null;
            ws.close();
        }

        ws = new WebSocket(`wss://localhost/chat/${cat}`);
        ws.onopen = () => {
            console.log('connection opened');
        }
        ws.onmessage = ({data}) => this.showMessage(data,false);
        ws.onclose = function() {
            ws = null;
        }
    },
    methods: {
        invioMessaggio() {
            const messageBox = document.querySelector('#messageBox');

            if (!ws) {
                this.showMessage("no WS connection :(",true);
                return;
            }
            if (messageBox.value != "") {
                ws.send(messageBox.value);
                this.showMessage(messageBox.value,true);
                messageBox.value = '';

            }
        },
        showMessage(message,mioMex){
            var hour= new Date().getHours().toString();
            var minutes = new Date().getMinutes().toString();
            var orario = hour+':'+minutes;
            this.messages.push({
                'text': message,
                'date': orario,
                'miomes': mioMex
            });
            
        },
        mioMessaggio(valore){
            if(valore){
                return true;
            }
            else return false;
        }
    }
});

app2.mount('#messandbox')