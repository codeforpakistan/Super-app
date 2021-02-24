<template>
  <ion-app>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button auto-hide="false"></ion-menu-button>
      </ion-buttons>
      <ion-buttons slot="end">
        <ion-button>
          <img class="icon" style="max-width: 7em;" width="20" height="20" src="assets/icon/search-outline.svg">
        </ion-button>
      </ion-buttons>
      <ion-buttons slot="end">
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
      console.log('logout hit');
      localStorage.removeItem('session');
      localStorage.removeItem('accessToken');
      this.$router.replace('Login');
    }
  },
  data: function () {
    return {
      session: {accessToken: ''},
    }
  },
  ionViewDidEnter() {
    console.log('Guides page did enter');
    const token = localStorage.getItem('accessToken');
    this.session.accessToken = token || '';
    console.log('token11', this.session.accessToken);
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