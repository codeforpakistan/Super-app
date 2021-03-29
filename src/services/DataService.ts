import axios from 'axios';
const service: any = {};
import { toastController } from '@ionic/vue';

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

service.getLicenseDetails = async (cnic: string) => {
  try {
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

service.tokenIntrospection = async () => {
  try {
    const headers = {
      'Token': localStorage.getItem('accessToken'),
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

export default service;

