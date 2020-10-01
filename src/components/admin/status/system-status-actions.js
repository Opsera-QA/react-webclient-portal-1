import {axiosApiService} from "../../../api/apiService";

const systemStatusActions = {};

systemStatusActions.getSystemStatuses = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/tools/status/";
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

export default systemStatusActions;