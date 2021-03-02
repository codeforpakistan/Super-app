<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <!-- detail table -->
        <div class="result-table" v-if="data.dlNumber">
          <h5>License Details</h5>
          <div>
            <ion-row>
              <ion-col class="heading">Name</ion-col>
              <ion-col class="sub-heading">{{data.name}}</ion-col>
            </ion-row>
            <ion-row>
              <ion-col class="heading">Father Name</ion-col>
              <ion-col class="sub-heading">{{data.fatherName}}</ion-col>
            </ion-row>
            <ion-row>
              <ion-col class="heading">CNIC Number</ion-col>
              <ion-col class="sub-heading">{{data.cnic}}</ion-col>
            </ion-row>
            <ion-row>
              <ion-col class="heading">District</ion-col>
              <ion-col class="sub-heading">{{data.district}}</ion-col>
            </ion-row>
            <ion-row>
              <ion-col class="heading">License Number</ion-col>
              <ion-col class="sub-heading">{{data.dlNumber}}</ion-col>
            </ion-row>
            <ion-row>
              <ion-col class="heading">License Type</ion-col>
              <ion-col class="sub-heading">{{data.licenseType}}</ion-col>
            </ion-row>
            <ion-row>
              <ion-col class="heading">Issue Date</ion-col>
              <ion-col class="sub-heading">{{data.issueDate}}</ion-col>
            </ion-row>
            <ion-row>
              <ion-col class="heading">Expiry Date</ion-col>
              <ion-col class="sub-heading">{{data.licenseExpiryDate}}</ion-col>
            </ion-row>
          </div>
        </div>
       
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
  name: 'Result',
  components: {
    IonContent,
    IonPage,
  },
  data() {
    return {
      data: {},
    }
  },
  ionViewDidEnter() {
    try {
      if (this.$route.params.data) {
        this.data = JSON.parse(this.$route.params.data.toString());
      }
    } catch(err) {
      console.error('error parsing data', err);
    }
  }
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

.cnic-input {
  border: 1px solid #dedede;
  margin-top: 16px;
  margin-bottom: 16px;
  border-radius: 5px;
}

.submit-btn {
  width: 100%;
}

.result-table {
  margin-top: 20px;
  text-align: left;
  padding: 20px;
}

.result-table div {
  padding: 5px;
  border: 1px solid #dedede;
  border-radius: 5px;
  font-size: .85rem;
}

.heading {
  font-weight: 500;
}

.sub-heading {
  color: rgb(83, 83, 83);
}

</style>