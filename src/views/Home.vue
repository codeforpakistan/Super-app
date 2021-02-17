<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <img style="max-width: 7em;" src="assets/superapplogo.png">
        <h1>Super App</h1>
        <ion-button v-if="!url" class="mt1 btn-green" @click="doPehchanLogin">Log in with Pehchan</ion-button>
        <p v-if="url">Session created. Token: {{url}}</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonButton } from '@ionic/vue';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonPage,
    IonButton
  },
  methods: {
    doPehchanLogin: function() {
      console.log('do pehchan login called', this.url);
      const loginApp = InAppBrowser.create('https://oauth.pehchaan.kpgov.tech/oauth2/code', '_self');
      loginApp.on('exit').subscribe(event => {
        console.log("inAppBrowser is closed now", event);
      });
      loginApp.on('loadstop').subscribe(event => {
        console.log("loadstop called", event);
      });
      loginApp.on('loadstart').subscribe(event => {
        const callBackURL = 'https://oauth.pehchaan.kpgov.tech/callback?code=';
        if (event.url.includes(callBackURL) && event.url.length > callBackURL.length) {
          this.url = event.url.split('code=')[1];
          loginApp.close();
        }
      });
    }
  },
  data: function () {
    return {
      url: '',
    }
  }
});
</script>

<style scoped>
h1 {
  color: #005741;
  font-size: 2em;
  font-weight: bold;
}

#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 40%;
  transform: translateY(-40%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>