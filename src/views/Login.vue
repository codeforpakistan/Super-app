<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <img style="max-width: 7em;" src="assets/icon.png">
        <h1>Super App</h1>
        <ion-button v-if="!url" class="mt1 btn-green" @click="doPehchanLogin">Log in with Pehchan</ion-button>
        <!-- account selection -->
        <div class="mt2" style="padding: 0px 10px;" v-if="accounts && accounts.length > 0" >
          <ion-label>
            <h4>OR</h4>
            <h4 class="mt3">Choose an existing account</h4>
          </ion-label>
          <ion-item>
            <ion-label>NIC</ion-label>
            <ion-select placeholder="Select One" :value="selectedAccount" 
              @ionChange="selectedAccount= $event.target.value">
              <ion-select-option v-for="acc in accounts" :key="acc.nic" :value="acc.nic">{{acc.nic}}</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-button v-if="selectedAccount" @click="doExistingAccountLogin" class="mt2" style="width: 50%;">Next</ion-button>
        </div>
      </div>
      <p class="app-version">KP Super App <br /> {{getAppVersion()}} Version {{appVersion}}</p>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage, IonButton } from '@ionic/vue';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { defineComponent } from 'vue';
import { AppVersion } from '@ionic-native/app-version';
import dataService from '../services/DataService';

export default defineComponent({
  name: 'Login',
  components: {
    IonContent,
    IonPage,
    IonButton
  },
  methods: {
    doPehchanLogin: function() {
      // for browser
      localStorage.setItem('accessToken', 'nchTfX2_Bv1Wte9Q-OLB2IiZy3LiS5I-fkRxoGShesg.4eCDVF018l3fZBYbUtFWD62it0EQSnEJIeJSK6XNW3A'); // for web dev
      this.$router.replace('Home');
      window.location.reload();
      
      // const loginApp = InAppBrowser.create('https://oauth.pehchaan.kpgov.tech/oauth2/code', '_blank', 'location=yes,hidden=no,clearcache=yes,enableViewportScale=no,hidenavigationbuttons=no,zoom=no');
      // loginApp.on('exit').subscribe(event => {
      //   console.log('inAppBrowser is closed now', event);
      // });
      // loginApp.on('loadstart').subscribe(event => {
      //   // close the browser when user cancels the login/signup process
      //   const closeBrowserURL = 'https://oauth.pehchaan.kpgov.tech/cancel-auth';
      //   if (event.url.includes(closeBrowserURL)) {
      //     loginApp.close();
      //   }
      // });
      // loginApp.on('loadstop').subscribe(event => {
      //   console.log('loadstop called', event);
      //   const callBackURL = 'https://oauth.pehchaan.kpgov.tech/callback?code=';
      //   if (event.url.includes(callBackURL) && event.url.length > callBackURL.length) {
      //     console.log('executing script in inapp browser');
      //     loginApp.executeScript({
      //       code: 'document.getElementsByTagName("pre")[0].innerHTML'
      //     }).then(async html => {
      //       console.log('got the html', html);
      //       try {
      //         const data = JSON.parse(html);
      //         console.log(data.token);
      //         this.session = data.token;
      //         if (this.session) {
      //           localStorage.setItem('session', JSON.stringify(this.session));
      //           localStorage.setItem('accessToken', data.token.access_token);
      //         }
      //       } catch(err) {
      //         console.error('error parsing the html data', err);
      //       }
      //       loginApp.close();
      //       if (this.session) {
      //         console.log('want to redirect');
      //         this.$router.replace('Home');
      //         window.location.reload();
      //       }
      //     });
      //   }
      // });
    },
    doExistingAccountLogin: async function() {
       this.doPehchanLogin();
      // const found: any = this.accounts.find((x: any) => x.nic === this.selectedAccount);
      // if (found) {
      //   console.log(found.token);
      //   try {
      //     const resp: any = await dataService.tokenIntrospection(found.token);
      //     if (resp && resp.active) {
      //       localStorage.setItem('session', found.session);
      //       localStorage.setItem('accessToken', found.token);
      //       window.location.reload();
      //     } else {
      //       this.doPehchanLogin();
      //     }
      //   } catch(err) {
      //     console.error('error validating token', err);
      //     this.doPehchanLogin();
      //   }
      // } else {
      //   this.doPehchanLogin();
      // }
    },
    getAppVersion: function() {
      AppVersion.getVersionNumber().then(version => {
        this.appVersion = version;
        return this.appVersion;
      });
      if (!this.accounts || this.accounts?.length == 0) {
      dataService.getUsersInStore().then((res: any) => {
          this.accounts = res;
          console.log('userAaccount', this.accounts);
        });
      }
      return '';
    },
  },
  data: function () {
    return {
      token: '',
      session: null,
      appVersion: '',
      accounts: [],
      selectedAccount: '',
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
  transform: translateY(-40%);
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

.app-version {
  color: #616161;
  font-weight: 500;
  font-size: .8rem;
  position: absolute;
  text-align: center;
  width: 100%;
  bottom:0;
}
</style>