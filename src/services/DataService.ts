import axios from 'axios';
const service: any = {};

service.getLicenseDetails = async (cnic: string) => {
  try {
    const resp = await axios.post(
      `${process.env.VUE_APP_REHNUMA_API}/get-license`,
      { cnic }
    );
    return resp.data;
  } catch(err) {
    console.error('exception in getLicenseDetails', err);
    return null;
  }
}

service.getChallanInfo = async (challanNumber: number) => {
  try {
    const resp = await axios.get(
      `${process.env.VUE_APP_REHNUMA_API}/challan-info/${challanNumber}`,
    );
    return resp.data;
  } catch(err) {
    console.error('exception in getChallanInfo', err);
    return null;
  }
}

service.trafficUpdate = async (roadName: string) => {
  try {
    const resp = await axios.get(
      `${process.env.VUE_APP_REHNUMA_API}/live-traffic-updates/${roadName}`,
    );
    return resp.data;
  } catch(err) {
    console.error('exception in trafficUpdate', err);
    return null;
  }
}

export default service;

