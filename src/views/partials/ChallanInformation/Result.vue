<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <!-- detail table -->
        <div class="result-table" v-if="data.ChallanNo">
          <h5>Challan Details</h5>
          <div>
            <ion-row>
              <ion-col class="heading">Challan Number</ion-col>
              <ion-col class="sub-heading">{{data.ChallanNo}}</ion-col>
            </ion-row>
            <ion-row>
              <ion-col class="heading">Amount</ion-col>
              <ion-col style="color: red;" class="sub-heading">{{data.Amount}}</ion-col>
            </ion-row>
            <ion-row>
              <ion-col class="heading">Challan Status</ion-col>
              <ion-col class="sub-heading">
                <span v-if="data.ChallanStatus === 'Paid'" style="color: green;">{{data.ChallanStatus}}</span>
                <span v-if="data.ChallanStatus !== 'Paid'" style="color: red;">{{data.ChallanStatus}}</span>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col class="heading">Creation Date</ion-col>
              <ion-col class="sub-heading">{{data.CreationDate}}</ion-col>
            </ion-row>
            <ion-row>
              <ion-col class="heading">District</ion-col>
              <ion-col class="sub-heading">{{data.District}}</ion-col>
            </ion-row>
            <ion-row>
              <ion-col class="heading">Name</ion-col>
              <ion-col class="sub-heading">{{data.Name}}</ion-col>
            </ion-row>
            <ion-row>
              <ion-col class="heading">Payment Date</ion-col>
              <ion-col class="sub-heading">{{data.PaymentDate}}</ion-col>
            </ion-row>
            <!-- <ion-row>
              <ion-col class="heading">Status</ion-col>
              <ion-col class="sub-heading">{{data.Status}}</ion-col>
            </ion-row> -->
            <ion-row>
              <ion-col class="heading">Violation Name</ion-col>
              <ion-col class="sub-heading">{{data.ViolationName}}</ion-col>
            </ion-row>
          </div>
        </div>
        <div class="home-btn" v-if="data.ChallanNo">
          <ion-button href="/">
            <ion-icon :icon="arrowBack">
              <slot name="start"></slot>
            </ion-icon>
            Home Page
          </ion-button>
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
import { arrowBack } from 'ionicons/icons';

export default defineComponent({
  name: 'ChallanResult',
  components: {
    IonContent,
    IonPage,
  },
  data() {
    return {
      data: {},
    }
  },
  setup() {
    return {
      arrowBack
    }
  },
  ionViewDidEnter() {
    try {
      if (this.$route.params.data) {
        this.data = JSON.parse(this.$route.params.data.toString());
        console.log(' this.data',  this.data);
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