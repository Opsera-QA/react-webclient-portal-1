import {axiosApiService} from "../../../../../../api/apiService";

const pipelineStepNotificationActions = {};

pipelineStepNotificationActions.getJiraBoards = async (toolId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/connectors/jira/${toolId}/boards`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineStepNotificationActions.getJiraSprints = async (toolId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/jira/${toolId}/sprints`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineStepNotificationActions.getJiraProjects = async (toolId, getAccessToken) => {
  console.log("toolId: " + JSON.stringify(toolId));
  const accessToken = await getAccessToken();
  const apiUrl = `/connectors/jira/${toolId}/projects`;
  console.log("apiUrl: " + JSON.stringify(apiUrl));
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineStepNotificationActions.getJiraProjectUsers = async (toolId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/connectors/jira/${toolId}/project/users`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

pipelineStepNotificationActions.getJiraTicketDetails = async (toolId, ticketId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/connectors/jira/${toolId}/ticket/${ticketId}/details`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

export default pipelineStepNotificationActions;