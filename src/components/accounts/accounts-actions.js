import { axiosApiService } from "../../api/apiService";

const accountsActions = {};

// TODO: Implement
// accountsActions.deleteUser = async (userId, getAccessToken) => {
//   const accessToken = await getAccessToken();
//   const apiUrl = `/users/${userId}`;
//   const response = await axiosApiService(accessToken).delete(apiUrl, {})
//     .then((result) =>  {return result;})
//     .catch(error => {return error;});
//   return response;
// };
//
// accountsActions.rollbackUser = async (userId, getAccessToken) => {
//   const accessToken = await getAccessToken();
//   const apiUrl = `/users/${userId}/reset/`;
//   const response = await axiosApiService(accessToken).get(apiUrl)
//     .then((result) =>  {return result;})
//     .catch(error => {return { error };});
//   return response;
// };
//
// accountsActions.updateUser = async (userId, postBody, getAccessToken) => {
//   const accessToken = await getAccessToken();
//   const apiUrl = `/users/${userId}/update/`;
//   const response = await axiosApiService(accessToken).post(apiUrl, postBody)
//     .then((result) =>  {return result;})
//     .catch(error => {return { error };});
//   return response;
// };

// TODO: Add ?hidden=true if needed
accountsActions.getUsers = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/get-users";
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

accountsActions.getLdapUsers = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/accounts";
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

// Not sure what to call this or what it's for
// accountsActions.getUsers = async (getAccessToken) => {
//   const accessToken = await getAccessToken();
//   const apiUrl = "/users";
//   const response = await axiosApiService(accessToken).get(apiUrl)
//     .then((result) =>  {return result;})
//     .catch(error => {return { error };});
//   return response;
// };

// TODO: Modify if incorrect
accountsActions.getUser = async (userId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/users/${userId}`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

accountsActions.getUserRegistrations = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/registrations";
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

accountsActions.getOrganizations = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/organizations";
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

// accountsActions.getOrganizationByName = async (organizationName, getAccessToken) => {
//   const accessToken = await getAccessToken();
//   const apiUrl = `/users/account/organizations/${organizationName}`;
//   const response = await axiosApiService(accessToken).get(apiUrl)
//     .then((result) =>  {return result;})
//     .catch(error => {return { error };});
//   return response;
// };

accountsActions.getOrganizationByEmail = async (postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/";
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

accountsActions.activateElk = async (userId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/users/tools/activate-elk/${userId}`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

// TODO: Should we have different queries for different posts?
// TODO: should it be /users/?
accountsActions.create = async (accountData, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/create";
  const response = await axiosApiService(accessToken).post(apiUrl, accountData)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};



accountsActions.getGroup = async (groupData, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/group";
  const response = await axiosApiService(accessToken).post(apiUrl, groupData)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

accountsActions.updateGroup = async (groupData, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/groups/update";
  const response = await axiosApiService(accessToken).put(apiUrl, groupData)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

accountsActions.createGroup = async (groupData, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/groups/create";
  const response = await axiosApiService(accessToken).post(apiUrl, groupData)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

// TODO: Should this be broken into add/remove?
accountsActions.modifyMemership = async (membershipData, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/groups/modify-membership";
  const response = await axiosApiService(accessToken).post(apiUrl, membershipData)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

// TODO: Implement if necessary
// accountsActions.duplicate = async (tagId, getAccessToken) => {
//   const accessToken = await getAccessToken();
//   const apiUrl = `/pipelines/${tagId}/duplicate/`;
//   const response = await axiosApiService(accessToken).put(apiUrl)
//     .then((result) =>  {return result;})
//     .catch(error => {return { error };});
//   return response;
// };

export default accountsActions;