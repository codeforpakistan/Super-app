<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
         <ion-card>
          <ion-card-header>
            <ion-card-title style="font-size: 1.3rem;">Challan Information</ion-card-title>
          </ion-card-header>
            <ion-card-content>
              <ion-label>Enter Challan Number</ion-label>
              <ion-input type="number" class="cnic-input" max="7" placeholder="xxxxxxx" 
              :value="challanNumber" @input="e => challanNumber = e.target.value"></ion-input>
              <ion-button @click="getChallanDetails" :disabled="!challanNumber" color="primary submit-btn">Search</ion-button>
          </ion-card-content>
        </ion-card>
         <!-- error message -->
        <div style="color: red;" v-if="error">
          <ion-row>
            <ion-col class="heading">Challan Not Found</ion-col>
          </ion-row>
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
import dataService from '../../../services/DataService';

export default defineComponent({
  name: 'ChallanInformation',
  components: {
    IonContent,
    IonPage,
  },
  data() {
    return {
      challanNumber: null,
      data: {},
      error: false,
    }
  },
  methods: {
    getChallanDetails: async function() {
      this.data = {};
      this.error = false;
      try {
        const resp: any = await dataService.getChallanInfo(this.challanNumber);
        if (resp.message === 'access_denied') {
          await dataService.logoutSessionExpired();
          setTimeout(() => {
            this.$router.replace('Logout');
          }, 3000);
        }
        if (resp.Status !== 'Challan Not Found') {
          this.data = {
            Amount: resp.Amount,
            ChallanNo: resp.ChallanNo,
            ChallanStatus: resp.ChallanStatus,
            CreationDate: resp.CreationDate,
            District: resp.District,
            Name: resp.Name,
            PaymentDate: resp.PaymentDate,
            Status: resp.Status,
            ViolationName: (resp.ViolationName && Array.isArray(resp.ViolationName)) ? resp.ViolationName.map((x: any)=> x.Name).join() : '',
          };
          console.log('resp', resp);
          this.$router.push({ name: 'ChallanResult', params: { data: JSON.stringify(this.data) } });
        } else {
          this.error = true
        }
      } catch(err) {
        console.log('err', err);
        this.error = true
      }
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