<template>
  <ion-app>
    <ion-toolbar>
      <ion-buttons  v-if="hasSession && backButtonRoutes.indexOf(currentRoute) == -1" slot="start">
        <ion-menu-button auto-hide="false"></ion-menu-button>
      </ion-buttons>
      <ion-buttons  v-if="hasSession && backButtonRoutes.indexOf(currentRoute) > -1" slot="start" @click="goBack">
        <ion-button>
          <img class="icon" style="max-width: 7em;" width="20" height="20" src="assets/icon/arrow-back-outline.svg">
        </ion-button>
      </ion-buttons>
      <ion-buttons  v-if="hasSession" slot="end">
        <ion-button>
          <img class="icon" style="max-width: 7em;" width="20" height="20" src="assets/icon/search-outline.svg">
        </ion-button>
      </ion-buttons>
      <ion-buttons v-if="hasSession" slot="end">
        <ion-button @click="logout">
          <img class="icon" style="max-width: 7em;" width="20" height="20" src="assets/icon/log-out-outline.svg">
        </ion-button>
      </ion-buttons>
      <ion-title>Super App</ion-title>
    </ion-toolbar>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet, IonToolbar, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    IonToolbar,
    IonButton,
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
    }
  },
  data: function () {
    return {
      session: { accessToken: ''},
      backButtonRoutes: ['LicenseVerification', 'Result']
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
    padding: 0px 10px !important;
  }
</style>