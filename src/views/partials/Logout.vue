<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <ion-row>
          <ion-col class="heading">Loging out..</ion-col>
        </ion-row>
      </div>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { IonContent,
  IonPage,
} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Logout',
  components: {
    IonContent,
    IonPage,
  },
  ionViewDidEnter() {
    localStorage.removeItem('session');
    localStorage.removeItem('accessToken');
    this.$router.replace('Login');
    window.location.reload();
  },
});
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 35%;
  transform: translateY(-35%);
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