<template>
  <ion-page>
    <ion-content>
      <!-- Popular Services-->
      <ion-grid class="mt2 mb1 border-bottom">
        <label class="heading-label ml1">Popular Services</label>
        <ion-row>
          <ion-col @click="openLicenseVerification('LicenseVerification')">
            <ion-row style="display: block">
              <img class="icon" style="max-width: 7em;" width="30" height="30" src="assets/icon/globe-outline.svg">
            </ion-row>
            <ion-label>License Verification</ion-label>
          </ion-col>
          <ion-col>
            <ion-row style="display: block">
              <img class="icon" style="max-width: 7em;" width="30" height="30" src="assets/icon/globe-outline.svg">
            </ion-row>
            <ion-label>Building Approval</ion-label>
          </ion-col>
          <ion-col>
            <ion-row style="display: block">
              <img class="icon" style="max-width: 7em;" width="30" height="30" src="assets/icon/globe-outline.svg">
            </ion-row>
            <ion-label>CNIC</ion-label>
          </ion-col>
        </ion-row>
      </ion-grid>
      <!-- informational Services-->
      <ion-grid class="mt1 mb1 border-bottom">
        <label class="heading-label ml1">Informational Services</label>
        <ion-row>
          <ion-col @click="openLicenseVerification('ChallanInformation')">
            <ion-row style="display: block">
              <img class="icon" style="max-width: 7em;" width="30" height="30" src="assets/icon/globe-outline.svg">
            </ion-row>
            <ion-label>Challan Info</ion-label>
          </ion-col>
          <ion-col>
            <ion-row style="display: block">
              <img class="icon" style="max-width: 7em;" width="30" height="30" src="assets/icon/globe-outline.svg">
            </ion-row>
            <ion-label>Traffic updates</ion-label>
          </ion-col>
          <ion-col>
            <ion-row style="display: block">
              <img class="icon" style="max-width: 7em;" width="30" height="30" src="assets/icon/globe-outline.svg">
            </ion-row>
            <ion-label>Vehicle Registration</ion-label>
          </ion-col>
        </ion-row>
      </ion-grid>
      <!-- Transactional services -->
      <ion-grid class="mt1 mb1">
        <label class="heading-label ml1">Transactional Services</label>
        <ion-row>
          <ion-col>
            <ion-row style="display: block">
              <img class="icon" style="max-width: 7em;" width="30" height="30" src="assets/icon/globe-outline.svg">
            </ion-row>
            <ion-label>Water Bill</ion-label>
          </ion-col>
          <ion-col>
            <ion-row style="display: block">
              <img class="icon" style="max-width: 7em;" width="30" height="30" src="assets/icon/globe-outline.svg">
            </ion-row>
            <ion-label>Gas Bill</ion-label>
          </ion-col>
          <ion-col>
            <ion-row style="display: block">
              <img class="icon" style="max-width: 7em;" width="30" height="30" src="assets/icon/globe-outline.svg">
            </ion-row>
            <ion-label>Telephone Bill</ion-label>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonRow, IonCol, IonGrid, IonLabel } from '@ionic/vue';
import { defineComponent } from 'vue';

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
    }
  },
  methods: {
    openLicenseVerification: function(name: string) {
      this.$router.push({name: name});
    }
  },
  ionViewDidEnter() {
    console.log('Services page did enter');
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