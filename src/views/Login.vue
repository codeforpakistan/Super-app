<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <img style="max-width: 7em;" src="assets/superapplogo.png">
        <h1>Super App</h1>
        <ion-button v-if="!url" class="mt1 btn-green" @click="doPehchanLogin">Log in with Pehchan</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonButton } from '@ionic/vue';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Login',
  components: {
    IonContent,
    IonPage,
    IonButton
  },
  methods: {
    doPehchanLogin: function() {
      // for browser
      // localStorage.setItem('accessToken', 'THkcaLlYGIOzHHPFUGkptZDPeZXYERMLXrs4D8L5Axs.p1RivEYkw8W5BLdhAbQmsZFw0tmk2KDZpT7AAUFa_6U'); // for web dev
      const loginApp = InAppBrowser.create('https://oauth.pehchaan.kpgov.tech/oauth2/code', '_blank', 'location=no, hidden=no, clearcache=yes');
      loginApp.on('exit').subscribe(event => {
        console.log('inAppBrowser is closed now', event);
      });
      loginApp.on('loadstart').subscribe(event => {
        // close the browser when user cancels the login/signup process
        const closeBrowserURL = 'https://oauth.pehchaan.kpgov.tech/cancel-auth';
        if (event.url.includes(closeBrowserURL)) {
          loginApp.close();
        }
      });
      loginApp.on('loadstop').subscribe(event => {
        console.log('loadstop called', event);
        const callBackURL = 'https://oauth.pehchaan.kpgov.tech/callback?code=';
        if (event.url.includes(callBackURL) && event.url.length > callBackURL.length) {
          console.log('executing script in inapp browser');
          loginApp.executeScript({
            code: 'document.getElementsByTagName("pre")[0].innerHTML'
          }).then(html => {
            console.log('got the html', html);
            try {
              const data = JSON.parse(html);
              console.log(data.token);
              this.session = data.token;
              if (this.session) {
                localStorage.setItem('session', JSON.stringify(this.session));
                localStorage.setItem('accessToken', data.token.access_token);
              }
            } catch(err) {
              console.error('error parsing the html data', err);
            }
            loginApp.close();
            if (this.session) {
              console.log('want to redirect');
              this.$router.replace('Home');
              window.location.reload();
            }
          });
        }
      });
    }
  },
  data: function () {
    return {
      token: '',
      session: null,
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