import {axiosApiService} from "../../../api/apiService";

const templateActions = {};

templateActions.createTemplate = async (templateDataDto, getAccessToken) => {
  let postData = {
    ...templateDataDto.getPersistData()
  }
  const accessToken = await getAccessToken();
  const apiUrl = "/pipelines/workflows/create";
  const response = await axiosApiService(accessToken).post(apiUrl, postData)
    .then((result) => {
      return result;
    })
    .catch(error => {
      throw { error };
    });
  return response;
};

templateActions.updateTemplate = async (templateDataDto, getAccessToken) => {
  const postBody = {
    ...templateDataDto.getPersistData()
  }
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/workflows/${templateDataDto.getData("_id")}/update`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) => {
      return result;
    })
    .catch(error => {
      throw { error };
    });
  return response;
};

templateActions.deleteTemplate = async (templateDataDto, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/workflows/${templateDataDto.getData("_id")}`;
  const response = await axiosApiService(accessToken).delete(apiUrl)
    .then((result) => {
      return result;
    })
    .catch(error => {
      throw { error };
    });
  return response;
};

templateActions.getTemplates = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/pipelines/workflows?hidden=true";
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) => {
      return result;
    })
    .catch(error => {
      throw { error };
    });
  return response;
};

templateActions.getTemplateById = async (templateId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/workflows/${templateId}`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) => {
      return result;
    })
    .catch(error => {
      throw { error };
    });
  return response;
};

export default templateActions;