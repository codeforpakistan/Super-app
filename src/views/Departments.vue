<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <img style="max-width: 7em;" src="assets/superapplogo.png">
        <h1>Departments page</h1>
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
  name: 'Departments',
  components: {
    IonContent,
    IonPage,
  },
  data: function () {
    return {
      somekey: '',
    }
  },
  ionViewDidEnter() {
    console.log('Departments page did enter');
  },
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