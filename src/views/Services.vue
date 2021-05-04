<template>
  <ion-page>
    <ion-content>
      <ion-grid v-for="serv in services" :key="serv.category" class="mt2 mb1 border-bottom">
        <label class="heading-label ml1">{{serv.category}}</label>
        <ion-row>
          <ion-col v-for="opt in serv.options" :key="opt.name" @click="openPage(opt.route)">
            <ion-row style="display: block">
              <img class="icon" style="max-width: 7em;" width="30" height="30" :src="opt.logo">
            </ion-row>
            <ion-label>{{opt.name}}</ion-label>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonRow, IonCol, IonGrid, IonLabel } from '@ionic/vue';
import { defineComponent } from 'vue';
import servicesJson from "../uiconfig/services.json";

export default defineComponent({
  name: 'Services',
  components: {
    IonContent,
    IonPage,
    IonRow,
    IonGrid,
    IonCol,
    IonLabel
  },
  data: function () {
    return {
      somekey: '',
      services: servicesJson.services
    }
  },
  methods: {
    openPage: function(name: string) {
      if (name) {
        this.$router.push({name: name});
      }
    }
  },
  ionViewDidEnter() {
    console.log('Services page did enter', this.services);
  }
});
</script>
<style scoped>
  .ion-page {
    padding: 0px 10px;
  }
  .heading-label {
    font-weight: 500;
  }
  .border-bottom {
    border-bottom: .5px solid gainsboro;
  }
  ion-col {
    padding: 15px;
    font-size: .9rem;
    text-align: center;
  }
</style>