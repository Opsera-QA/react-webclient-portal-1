import { axiosApiService } from "api/apiService";

const AWSActionsHelper = {};

AWSActionsHelper.searchECRRepositories = async (awsToolId, getAccessToken) => {
    const accessToken = await getAccessToken();
    const apiUrl = "/tools/aws/repositories";
    const postBody = {
      toolId: awsToolId
    };
    const res = await axiosApiService(accessToken)
      .post(apiUrl, postBody)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });
    return res;
};

AWSActionsHelper.getBucketList = async (awsToolId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/tools/aws/buckets";
  const postBody = {
    toolId: awsToolId
  };
  const res = await axiosApiService(accessToken)
    .post(apiUrl, postBody)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return res;
};

AWSActionsHelper.getKeyPairs = async (awsToolId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/tools/aws/keypairs";
  const postBody = {
    toolId: awsToolId
  };
  const res = await axiosApiService(accessToken)
    .post(apiUrl, postBody)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw error;
    });
  return res;
};

export default AWSActionsHelper;
