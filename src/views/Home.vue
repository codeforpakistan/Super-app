<template>
  <ion-page>
    <ion-content class="content" :fullscreen="true">
      <ion-tabs @ionTabsWillChange="beforeTabChange" @ionTabsDidChange="afterTabChange">
        <ion-tab-bar slot="top">
          <ion-tab-button tab="services" href="/services">
            <ion-icon :icon="calendar"></ion-icon>
            <ion-label>Services</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="guides" href="/guides">
            <ion-icon :icon="bookOutline"></ion-icon>
            <ion-label>Guides</ion-label>
          </ion-tab-button>
          <ion-tab-button tab="departments" href="/departments">
            <ion-icon :icon="personCircle"></ion-icon>
            <ion-label>Departments</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent,
  IonPage,
  IonIcon, 
  IonLabel, 
  IonTabBar, 
  IonTabButton, 
  IonTabs
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { calendar, personCircle, bookOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonPage,
    IonIcon, 
    IonLabel, 
    IonTabBar, 
    IonTabButton, 
    IonTabs,
  },
  setup() {
    const beforeTabChange = () => {
      // do something before tab change
    }
    const afterTabChange = () => {
      // do something after tab change
    }
    return {
      calendar,
      personCircle,
      bookOutline,
      beforeTabChange,
      afterTabChange
    }
  },
  data: function () {
    return {
      session: {accessToken: ''},
    }
  },
  ionViewDidEnter() {
    console.log('Home page did enter');
    const token = localStorage.getItem('accessToken');
    this.session.accessToken = token || '';
    console.log('token', this.session)
    if (token) {
      this.$router.push({name: 'Services'});
    }
  },
});
</script>

<style scoped>
ion-tab-bar{
  margin-top: 55px;
}
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