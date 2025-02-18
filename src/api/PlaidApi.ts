import axios from 'axios';

/**
 * PlaidApi
 */
class PlaidApi {
  static async requestLinkToken() {
    const res = await axios.get(`/api/import/plaid/link-token`);
    return res.data.data;
  }

  static async saveAccounts(data: any) {
    const res = await axios.post(`/api/import/plaid/save_account`, data);
    return res.data.data;
  }

  /**
   * 获取账号列表
   */
  static async searchAccountList(params: any) {
    const res = await axios.post(`/api/import/plaid/search`, params);
    return res.data.data;
  }
}
export default PlaidApi;
