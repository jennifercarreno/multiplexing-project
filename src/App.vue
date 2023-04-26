<script>
import { NButton, NCard, NSpace } from 'naive-ui'
import { webSocket } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const channelA = `"channel":"bitfinex.spot.ticker.BTCUSD"`
const subject = webSocket({
  url: 'wss://api.goquant.io/ws',
  serializer: '{"event":"subscribe", "channel":"bitfinex.spot.ticker.BTCUSD"}'
  });
console.log(subject)

const observableA = subject.multiplex(
    () => ({ subscribe: 'A' }), // When server gets this message, it will start sending messages for 'A'...
    () => ({ unsubscribe: 'A' }), // ...and when gets this one, it will stop.
    message => message.type === 'A' // If the function returns `true` message is passed down the stream. Skipped if the function returns false.
  );
// {"event":"subscribe", "channel":"bitfinex.spot.ticker.BTCUSD"}

export default {
  props: {
    testing: String
  },
  components: {
  NButton,
  NCard,
  NSpace
  },
  methods: {
    send() { console.log("button clicked") },
    subscribeA() {
      const subA = observableA.subscribe(messageForA => console.log(messageForA));
      console.log(subA)

    },
    subscribeB() {
      const observableB = subject.multiplex( // And the same goes for 'B'.
        () => ({ subscribe: 'B' }),
        () => ({ unsubscribe: 'B' }),
        message => message.type === 'B'
      );
      const subB = observableB.subscribe(messageForB => console.log(messageForB));
      console.log(subB)
    },

  }
}
</script>

<template>
 
    <n-card title="Card" size="large">
      <n-space>
      <n-button @click="subscribeA">Subscriber A</n-button>
      <n-button @click="subscribeB">Subscriber B</n-button>
      <n-button>Unsubscribe A</n-button>
      <n-button>Unsubscribe B</n-button>
    </n-space>

    </n-card>


</template>


