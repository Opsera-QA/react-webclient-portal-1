import {axiosApiService} from "../../../api/apiService";
import baseActions from "utils/actionsBase";

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

templateActions.createTemplateV2 = async (getAccessToken, cancelTokenSource, templateDataDto) => {
  let postBody = {
    ...templateDataDto.getPersistData(),
  };
  const apiUrl = "/pipelines/workflows/create";
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
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

templateActions.updateTemplateV2 = async (getAccessToken, cancelTokenSource, templateDataDto) => {
  let postBody = {
    ...templateDataDto.getPersistData(),
  };
  const apiUrl = `/pipelines/workflows/${templateDataDto.getData("_id")}/update`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

templateActions.deleteTemplateV2 = async (getAccessToken, cancelTokenSource, templateDataDto) => {
  const apiUrl = `/pipelines/workflows/${templateDataDto.getData("_id")}/delete`;
  return await baseActions.apiDeleteCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

templateActions.getTemplatesV2 = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = "/pipelines/workflows?hidden=true";
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

templateActions.getTemplateByIdV2 = async (getAccessToken, cancelTokenSource, templateId) => {
  const apiUrl = `/pipelines/workflows/${templateId}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl)
};

export default templateActions;