import axios from 'axios';
const service: any = {};
import { toastController } from '@ionic/vue';
import { Storage } from '@ionic/storage';
const store = new Storage();
store.create();
const AccountsKey = 'userAccounts';

service.logoutSessionExpired = async () => {
  try {
    const toast = await toastController.create({
      message: 'Your session has expired, Please login again.',
      duration: 3000
    });
    return toast.present();
  } catch (err) {
    console.error('exception in logoutSessionExpired', err);
    return null;
  }
}

service.clearStore = async () => {
  store.clear();
}

service.addUserInStore = async (item: any) => {
  try {
    const toSave = JSON.parse(JSON.stringify(item)); 
    toSave.token = localStorage.getItem('accessToken');
    toSave.session = localStorage.getItem('session');
    const current = await store.get(AccountsKey);
    if (current && current.length > 0) {
      const alreadyExists = current.find((x: any) => x.nic === toSave.nic);
      if (alreadyExists) {
        return;
      } else {
        current.push(toSave);
        await store.set(AccountsKey, current);
      }
    } else {
      await store.set(AccountsKey, [toSave]);
    }
  } catch(err) {
    console.error('error in ionic store', err);
  }
}

service.getUsersInStore = async () => {
  try {
    const current = await store.get(AccountsKey);
    if (current && current.length > 0) {
      return current;
    } else {
      return [];
    }
  } catch(err) {
    console.error('error in ionic store');
  }
}
 
service.getLicenseDetails = async (cnic: string) => {
  try {
    console.log('process.env.VUE_APP_REHNUMA_API', process.env.VUE_APP_REHNUMA_API);
    const headers = {
      'Token': localStorage.getItem('accessToken'),
      'Scopes': 'na'
    };
    const resp = await axios.get(
      `${process.env.VUE_APP_REHNUMA_API}/get-license/${cnic}`, { headers }
    );
    return resp.data;
  } catch(err) {
    console.error('exception in getLicenseDetails', err);
    return null;
  }
}

service.getChallanInfo = async (challanNumber: number) => {
  try {
    console.log('process.env.VUE_APP_REHNUMA_API', process.env.VUE_APP_REHNUMA_API);
    const headers = {
      'Token': localStorage.getItem('accessToken'),
      'Scopes': 'na'
    };
    const resp = await axios.get(
      `${process.env.VUE_APP_REHNUMA_API}/challan-info/${challanNumber}`, { headers }
    );
    return resp.data;
  } catch(err) {
    console.error('exception in getChallanInfo', err);
    return null;
  }
}

service.trafficUpdate = async (roadName: string) => {
  try {
    const headers = {
      'Token': localStorage.getItem('accessToken'),
      'Scopes': 'na'
    };
    const resp = await axios.get(
      `${process.env.VUE_APP_REHNUMA_API}/live-traffic-updates/${roadName}`, { headers }
    );
    return resp.data;
  } catch(err) {
    console.error('exception in trafficUpdate', err);
    return null;
  }
}

service.tokenIntrospection = async (token = '') => {
  try {
    const headers = {
      'Token': token || localStorage.getItem('accessToken'),
      'Scopes': 'na'
    };
    const resp = await axios.get(
      `${process.env.VUE_APP_REHNUMA_API}/token-introspection`, { headers }
    );
    return resp.data;
  } catch(err) {
    console.error('exception in tokenIntrospection', err);
    return null;
  }
};

service.getUserInfo = async (token: any) => {
  try {
    // const headers = {
    //   'access_token': token
    // };
    // const resp = await axios.get(
    //   `https://consent.pehchaan.kpgov.tech/usersinfo`, { headers }
    // );
    // return resp.data;
    return {
      email: "demo@test.com",
      id: 1,
      name: "Demo User",
      nic: "61101982832211",
      phone: "03001345678"
    }
  } catch(err) {
    console.error('exception in getUserInfo', err);
    return null;
  }
}

export default service;

