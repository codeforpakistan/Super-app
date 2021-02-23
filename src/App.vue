<template>
  <ion-app>
    <ion-toolbar>
      <ion-buttons slot="secondary">
        <ion-button fill="outline">
          <ion-icon slot="start" :icon="star"></ion-icon>
          Star
        </ion-button>
      </ion-buttons>
      <ion-title>Super App</ion-title>
      <ion-buttons slot="primary">
        <ion-button color="danger" fill="outline">
          Edit
          <ion-icon slot="end" :icon="create"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  }
});
</script>

<style>
  @import url('https://cdn.jsdelivr.net/gh/NaurozAhmad/CSSMarginPaddingClasses/margin-padding-classes.css');

  .btn-green {
    --background: #005741;
    --background-activated: #018362;
  }
</style>