import axios from 'axios';

/**
 * PlaidApi
 */
class PlaidApi {
  static async requestLinkToken() {
    const res = await axios.get(`/api/import/plaid/link-token`);
    return res.data.data;
  }
}
export default PlaidApi;
