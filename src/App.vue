<template>
  <ion-app>
    <!-- action bar -->
    <ion-toolbar>
      <ion-buttons style="color: #005741" v-if="hasSession && backButtonRoutes.indexOf(currentRoute) == -1" slot="start">
        <ion-menu-button auto-hide="false"></ion-menu-button>
      </ion-buttons>
      <ion-buttons  v-if="hasSession && backButtonRoutes.indexOf(currentRoute) > -1" slot="start" @click="goBack">
        <ion-button>
          <ion-icon slot="start" class="md-icon" :icon="arrowBack"></ion-icon>
        </ion-button>
      </ion-buttons>
      <!-- search bar -->
      <ion-buttons  v-if="hasSession && searchActive" slot="end">
        <ion-button @click="toggleSearchBar">
          <ion-icon slot="start" class="md-icon" :icon="close"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-searchbar v-if="hasSession && searchActive" debounce="500" type="text" style="border-radius: 7px; background: #F8F8F8;"
      placeholder="Search text" clearInput>
      <!-- search end -->
      </ion-searchbar>
      <ion-buttons  v-if="hasSession && !searchActive" slot="end">
        <ion-button @click="toggleSearchBar">
          <ion-icon slot="start" class="md-icon" :icon="search"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-buttons v-if="hasSession && !searchActive" slot="end">
        <ion-button href="/logout">
        <ion-icon slot="start" class="md-icon" :icon="logOut"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-title class="app-title" v-if="!searchActive && hasSession">Super App</ion-title>
    </ion-toolbar>
    <!-- side menu -->
    <ion-menu side="start" menu-id="first" content-id="main">
      <ion-header>
        <ion-toolbar class="menu-header" color="primary">
          <ion-title style="color: #fff;">
            <span v-if="appUser && appUser.nic">NIC: {{appUser.nic}}</span>
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list class="mt1" lines="none">
          <ion-item href="/">
            <ion-icon slot="start" class="sm-icon" :icon="home"></ion-icon>Home
          </ion-item>
          <ion-item><ion-icon slot="start" class="sm-icon" :icon="personCircle"></ion-icon>My Profile</ion-item>
          <ion-item><ion-icon slot="start" class="sm-icon" :icon="informationCircle"></ion-icon>About Us</ion-item>
          <ion-item><ion-icon slot="start" class="sm-icon" :icon="lockClosed"></ion-icon>Privacy Policy</ion-item>
          <ion-item href="/logout"><ion-icon slot="start" class="sm-icon" :icon="logOut"></ion-icon>Logout</ion-item>
        </ion-list>
      </ion-content>
      <ion-footer>
        <ion-toolbar>
          <ion-title style="color: #616161; padding-left: 40px; font-weight: 500; font-size: .8rem;">KP Super App <br /> {{getAppVersion()}} Version {{appVersion}}</ion-title>
        </ion-toolbar>
      </ion-footer>
    </ion-menu>
    <!-- router -->
    <ion-router-outlet id="main" />
  </ion-app>
</template>
<script lang="ts">
import { IonApp, IonRouterOutlet, IonToolbar, IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonTitle,
  IonSearchbar,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { home, personCircle, informationCircle, lockClosed, logOut, arrowBack, search, close } from 'ionicons/icons';
import { useBackButton, useIonRouter } from '@ionic/vue';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;
import { AppVersion } from '@ionic-native/app-version';
import { User }  from './models/user';
import dataService from './services/DataService';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    IonToolbar,
    IonButton,
    IonContent, 
    IonHeader, 
    IonItem, 
    IonList, 
    IonMenu, 
    IonTitle, 
    IonSearchbar,
  },
  setup() {
    const ionRouter = useIonRouter();
    useBackButton(-1, () => {
      if (!ionRouter.canGoBack()) {
        App.exitApp();
      }
    });
    return {
      home,
      personCircle,
      informationCircle,
      lockClosed,
      logOut,
      arrowBack,
      search,
      close
    }
  },
  methods: {
    logout: function () {
      localStorage.removeItem('session');
      localStorage.removeItem('accessToken');
      this.session.accessToken = '';
      this.$router.replace('Login');
      window.location.reload();
    },
    goBack: function() {
      this.$router.back();
    },
    toggleSearchBar: function() {
      this.searchActive = !this.searchActive;
    },
    getAppVersion: function() {
      AppVersion.getVersionNumber().then(version => {
        this.appVersion = version;
      });
      this.checkUserInfo();
      return '';
    },
    checkUserInfo: async function() {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const userString = localStorage.getItem('userInfo');
          if (userString) {
            this.setUserInfo(userString)
          } else {
            await this.getUserFromToken(token);
          }
        }
      } catch(err) {
        console.error(err);
      }
    },
    setUserInfo: async function(userString: any) {
      try {
        if (!this.appUser || !this.appUser?.nic) {
          const user: User = JSON.parse(userString);
          if (user && user.id) {
            this.appUser = user;
            dataService.addUserInStore(this.appUser);
          }
        }
      } catch(err) {
        console.log('error', err);
      }
    },
    getUserFromToken: async function(token: any) {
      try {
        const res = await dataService.getUserInfo(token);
        localStorage.setItem('userInfo', JSON.stringify(res));
        this.appUser = res;
        dataService.addUserInStore(this.appUser);
      } catch(err) {
        console.log('error', err);
      }
    },
  },
  data: function () {
    return {
      session: { accessToken: ''},
      backButtonRoutes: ['LicenseVerification', 'ChallanInformation', 'TrafficUpdate', 'TrafficUpdateResult'],
      searchActive: false,
      appVersion: '',
      appUser: {} as User,
    }
  },
  computed: {
    hasSession() {
      const token = localStorage.getItem('accessToken');
      return token && token !== '' && token !== null ? true : false;
    },
    currentRoute: function () {
      return this.$route.name;
    }
  },
  ionViewDidEnter() {
    const token = localStorage.getItem('accessToken');
    this.session.accessToken = token || '';
  }
});
</script>

<style>
  @import url('https://cdn.jsdelivr.net/gh/NaurozAhmad/CSSMarginPaddingClasses/margin-padding-classes.css');
  .btn-green {
    --background: #005741;
    --background-activated: #018362;
  }
  ion-title {
    color: var(--ion-color-primary);
    font-size: 1.2rem;
    text-align: left;
    padding-left: 50px;
  }
  ion-toolbar {
    padding: 0px 5px !important;
    margin-top: var(--ion-safe-area-top) !important;
  }
  ion-item {
    font-size: .95rem;
    color: rgb(97, 97, 97);
    font-weight: 450;
    padding: 5px 0px !important;
  }
  .sm-icon {
    color: rgb(97, 97, 97) !important;
    width: 1.1rem;
    margin-right: 10px;
  }
  .md-icon {
    color: #005741 !important;
    width: 1.3rem;
    margin-right: 10px;
  }
  .menu-header {
    padding: 25px 5px !important;
  }
  .menu-header ion-title {
    color: white !important;
    font-weight: 450 !important;
    font-size: 1.1rem !important;
    padding: 15px !important;
  }
  ion-searchbar {
    height: 32px !important;
    color: #005741 !important;
    padding-bottom: 0px !important;
    padding: 0 !important;
    margin-top: 0px !important;
  }
  .home-btn {
    text-align: center;
  }
  .md .app-title {
    padding-left: 0px !important;
  }
</style>