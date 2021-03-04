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

export default service;

