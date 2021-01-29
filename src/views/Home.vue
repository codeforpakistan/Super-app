<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <img style="max-width: 7em;" src="assets/superapplogo.png">
        <h1>Super App</h1>
        <ion-button class="mt1 btn-green" @click="doPehchanLogin">Log in with Pehchan</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { Browser } from "@capacitor/core";
import { IonContent, IonPage, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonPage,
    IonButton
  },
  setup() {
    return {
      doPehchanLogin() {
        console.log('do pehchan login called');
        Browser.open({ url: 'https://pehchan-auth-client.herokuapp.com/' });
      }
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