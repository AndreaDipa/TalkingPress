<h1> Progetto Linguaggi e Tecnologie per il web e Reti di Calcolatori </h1>

<h2> Talking Press </h2>

Talking Press è una piattaforma web di condivisione tra utenti di pensieri e opinioni sulle ultime notizie dall'Italia e dal Mondo.

<h2> Architettura di riferimento </h2>

![mockup](https://user-images.githubusercontent.com/57904745/120097198-7ece3900-c12f-11eb-9f18-25758cb45075.png)
![MOQ-RETI](https://user-images.githubusercontent.com/57904745/123254531-0e78c480-d4ef-11eb-9cff-31567697a0a3.png)
![MOQ-rabbit](https://user-images.githubusercontent.com/57904745/123254640-336d3780-d4ef-11eb-964e-504be9a9a8cc.png)

<h2>Tecnologie utilizzate</h2>

Lato Server:
- Node.js: Server REST;
- Nginx: web server, reverse proxy, load balancer;
- ssl: cifratura messaggi client server;
- WebSocket: protocollo asincrono per implementare chat;
- MongoDb: database non relazionale;
- amqp: protocollo asincrono per la gestione della chat tra i diversi server, publisher-subscriber;
- Docker, Docker compose

Lato Client:
- HTML and CSS
- Javascript
- Bootstrap
- JQuery
- Vue

<h2>  Soddisfacimento dei requisiti </h2>
 <ul>
  <li> Servizio REST: API documentate tramite ApiDoc; </li>
  <li> Servizio REST di terze parti <a href="https://www.thenewsapi.com/documentation"> The News Api </a>; </li>
  <li> Servizio REST commerciale: Twitter; </li>
  <li> Servizio Oauth: Twitter; </li>
  <li> Protocolli asincroni: websocket e amqp; </li>
</ul>
<h2> Installazione, esecuzione e test</h2>
<ul>
  <li> git clone della repository; </li>
  <li> nella directory principale eseguire 'docker-compose build' e 'docker-compose up' (oppure docker-compose up --build); </li>
  <li> da browser visitare  <a href="https://localhost"> localhost </a>; </li>
  <li> registrarsi tramite account propretario Talking Press o effettuare il login tramite twitter; </li>
  <li> successivamente scegliere una tra le dieci categorie e testare le funzionalità tra cui: news request, real time multi rooms chat, tweets request, post tweets e visitare il profilo; </li> 
</ul>
L'applicazione è scalabile orizzontalmente, si possono aggiungere più server:
<ul>
 <li> aprire il file 'docker-compose.yml'; </li>
 <li> aggiungere nella sezione 'services' un nuovo node_server provvisto di variabile d'ambiente che lo identifichi; </li>
 <li> aggiungere la dipendenza ad nginx; </li>
</ul>







