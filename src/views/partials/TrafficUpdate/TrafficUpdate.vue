<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
         <ion-card>
          <ion-card-header>
            <ion-card-title style="font-size: 1.3rem;">Traffic Information</ion-card-title>
          </ion-card-header>
            <ion-card-content>
              <ion-item>
                <ion-label>Select Road</ion-label>
                <ion-select :value="selectedRoad" placeholder="Select One" @ionChange="selectedRoad = $event.target.value" >
                  <ion-select-option value="gt_road">G.T road</ion-select-option>
                  <ion-select-option value="khyber_road">Khyber road</ion-select-option>
                  <ion-select-option value="charsadda_road">Charsadda road</ion-select-option>
                  <ion-select-option value="jail_road">Jail road</ion-select-option>
                  <ion-select-option value="university_road">University road</ion-select-option>
                  <ion-select-option value="dalazak_road">Dalazak road</ion-select-option>
                  <ion-select-option value="saddar_road">Saddar road</ion-select-option>
                  <ion-select-option value="baghenaran_road">Bagh-e-naran road</ion-select-option>
                  <ion-select-option value="warsak_road">Warsak road</ion-select-option>
                  <ion-select-option value="kohat_road">Kohat road</ion-select-option>
                </ion-select>
              </ion-item>
              <ion-button @click="getTrafficDetails" color="primary submit-btn">Search</ion-button>
          </ion-card-content>
        </ion-card>
         <!-- error message -->
        <div style="color: red;" v-if="error">
          <ion-row>
            <ion-col class="heading">{{error}}</ion-col>
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
  name: 'TrafficUpdate',
  components: {
    IonContent,
    IonPage,
  },
  data() {
    return {
      selectedRoad: null,
      data: {},
      error: '',
    }
  },
  methods: {
    getTrafficDetails: async function() {
      this.data = {};
      this.error = '';
      try {
        const resp: any = await dataService.trafficUpdate(this.selectedRoad);
        if (resp.status) {
          this.data = {
            routeName: resp.data[0].route_name,
            routeStatus: resp.data[0].route_status,
            updatedTime: resp.data[0].updated_time
          };
          console.log('resp', resp);
          this.$router.push({ name: 'TrafficUpdateResult', params: { data: JSON.stringify(this.data) } });
        } else {
          this.error = resp.message
        }
      } catch(err) {
        console.log('err', err);
        this.error = 'No Route was found'
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