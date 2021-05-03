<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
         <ion-card style="box-shadow: none;">
          <ion-card-header>
            <!-- <ion-card-subtitle>License Verification</ion-card-subtitle> -->
            <ion-card-title style="font-size: 1.3rem;">License Verification</ion-card-title>
          </ion-card-header>
            <ion-card-content>
              <ion-label>Enter CNIC Number</ion-label>
              <ion-input type="number" class="cnic-input" max="13" placeholder="xxxxx xxxxxxx x" 
              :value="cnic" @input="e => cnic = e.target.value"></ion-input>
              <ion-button @click="getLicenseDetails" :disabled="!cnic || cnic.length !== 13" color="primary submit-btn">Search</ion-button>
          </ion-card-content>
        </ion-card>
         <!-- error message -->
        <div style="color: red;" v-if="invalidLicense">
          <ion-row>
            <ion-col class="heading">Invalid CNIC/License</ion-col>
          </ion-row>
        </div>
      </div>
      <TabularResult :jsonData="data" v-if="data.cnic" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent,
  IonPage,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import dataService from '../../../services/DataService';
import TabularResult from '../TabularResult.vue';

export default defineComponent({
  name: 'LicenseVerification',
  components: {
    IonContent,
    IonPage,
    TabularResult,
  },
  data() {
    return {
      cnic: null,
      data: {},
      invalidLicense: false,
    }
  },
  methods: {
    getLicenseDetails: async function() {
      this.data = {};
      this.invalidLicense = false;
      const resp: any = await dataService.getLicenseDetails(this.cnic);
      if (resp.message === 'access_denied') {
        await dataService.logoutSessionExpired();
        setTimeout(() => {
          this.$router.replace('Logout');
        }, 3000);
      }
      if (resp.error === '0') {
        const body = JSON.parse(resp.LICENSE_DATA);
        this.data = {
          dlNumber: body.license_no,
          cnic: body.nic,
          name: body.name,
          fatherName: body.father_name,
          licenseType: body.license_type,
          licenseExpiryDate: body.expiry_date,
          issueDate: body.issue_date,
          district: body.district
        };
      } else {
        this.invalidLicense = true
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
  left: 0;
  right: 0;
  margin-top: 90px;
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