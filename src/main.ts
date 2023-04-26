import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { webSocket } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import router from './router'

import './assets/main.css'

const app = createApp(App)

// const subject = webSocket('ws://localhost:5173');

// subject.subscribe();
// Note that at least one consumer has to subscribe to the created subject - otherwise "nexted" values will be just buffered and not sent,
// since no connection was established!

// subject.next({message: 'some message'});
// console.log(subject)

// const observableA = subject.multiplex(
//     () => ({ subscribe: 'A' }), // When server gets this message, it will start sending messages for 'A'...
//     () => ({ unsubscribe: 'A' }), // ...and when gets this one, it will stop.
//     message => message.type === 'A' // If the function returns `true` message is passed down the stream. Skipped if the function returns false.
//   );
   
//   const observableB = subject.multiplex( // And the same goes for 'B'.
//     () => ({ subscribe: 'B' }),
//     () => ({ unsubscribe: 'B' }),
//     message => message.type === 'B'
//   );
   
//   const subA = observableA.subscribe(messageForA => console.log(messageForA));
//   // At this moment WebSocket connection is established. Server gets '{"subscribe": "A"}' message and starts sending messages for 'A',
//   // which we log here.
   
//   const subB = observableB.subscribe(messageForB => console.log(messageForB));
//   // Since we already have a connection, we just send '{"subscribe": "B"}' message to the server. It starts sending messages for 'B',
//   // which we log here.


// subject.complete(); // Closes the connection.


app.use(createPinia())
app.use(router)

app.mount('#app')
