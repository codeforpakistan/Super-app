<template>
  <ion-page>
    <ion-content class="content" :fullscreen="true">
      <ion-tabs @ionTabsWillChange="beforeTabChange" @ionTabsDidChange="afterTabChange">
        <ion-tab-bar slot="top" style="border-bottom: none;">
          <ion-tab-button v-bind:style="isActiveTab('Services') ? 'border-bottom: 2.5px solid;' : 'border-bottom: .5px solid;'" tab="services" href="/services">
            <ion-icon :icon="calendar"></ion-icon>
            <ion-label>Services</ion-label>
          </ion-tab-button>
          <ion-tab-button v-bind:style="isActiveTab('Guides') ? 'border-bottom: 2.5px solid;' : 'border-bottom: .5px solid;'"  tab="guides" href="/guides">
            <ion-icon :icon="bookOutline"></ion-icon>
            <ion-label>Guides</ion-label>
          </ion-tab-button>
          <ion-tab-button v-bind:style="isActiveTab('Departments') ? 'border-bottom: 2.5px solid;' : 'border-bottom: .5px solid;'"  tab="departments" href="/departments">
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
  IonTabs,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { calendar, personCircle, bookOutline } from 'ionicons/icons';
import dataService from '../services/DataService';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';

const { PushNotifications } = Plugins;

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
  methods: {
    isActiveTab: function(name: string) {
      return name === this.$route.name;
    },
    registerPushNotification: function() {
      // Request permission to use push notifications
      // iOS will prompt user and return if they granted permission or not
      // Android will just grant without prompting
      PushNotifications.requestPermission().then( result => {
        if (result.granted) {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
        }
      });
      // On success, we should be able to receive notifications
      PushNotifications.addListener('registration',
        (token: PushNotificationToken) => {
          // alert('Push registration success, token: ' + token.value);
        }
      );
      // Some issue with our setup and push will not work
      PushNotifications.addListener('registrationError',
        (error: any) => {
          // alert('Error on registration: ' + JSON.stringify(error));
        }
      );
      // Show us the notification payload if the app is open on our device
      PushNotifications.addListener('pushNotificationReceived',
        (notification: PushNotification) => {
          alert('Push received: ' + JSON.stringify(notification));
        }
      );
      // Method called when tapping on a notification
      PushNotifications.addListener('pushNotificationActionPerformed',
        (notification: PushNotificationActionPerformed) => {
          alert('Push action performed: ' + JSON.stringify(notification));
        }
      );
    }
  },
  async ionViewDidEnter() {
    console.log('Home page did enter', process.env.VUE_APP_REHNUMA_API);
    const token = localStorage.getItem('accessToken');
    this.session.accessToken = token || '';
    if (token) {
      try {
        // validate accessToken and logout if expired.
        const resp: any = await dataService.tokenIntrospection();
        console.log('resp', resp);
        if (resp && resp.active) {
          this.$router.push({name: 'Services'});
        } else {
          // this.$router.replace('Logout');
          this.$router.push({name: 'Services'});
        }
      } catch(err) {
        console.error('error validating token', err);
        this.$router.replace('Logout');
      }
    }
    this.registerPushNotification();
  },
});
</script>

<style scoped>
ion-tab-bar{
  margin-top: 50px;
  padding-bottom: 10px;
}
.active-tab {
  border-bottom: 1px solid !important;
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