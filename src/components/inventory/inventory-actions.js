import { axiosApiService } from "../../api/apiService";
import baseActions from "utils/actionsBase";

const inventoryActions = {};

inventoryActions.deleteTool = async (id, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/registry/${id}`;
  const response = await axiosApiService(accessToken).delete(apiUrl, {})
    .then((result) =>  {return result;})
    .catch(error => {return error;});
  return response;
};

inventoryActions.updateTool = async (tool, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/registry/${tool._id}/update`;
  const response = await axiosApiService(accessToken).put(apiUrl, tool)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

inventoryActions.createTool = async (ldapUserDataDto, getAccessToken) => {
  let postData = {
    "user": {
      ...ldapUserDataDto.getPersistData()
    }
  }
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/create";
  const response = await axiosApiService(accessToken).post(apiUrl, postData)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

inventoryActions.getToolById = async (id, getAccessToken) => {
  const apiUrl = `/registry/${id}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

inventoryActions.getUserByEmail = async (email, getAccessToken) => {
  let postBody = {
    email: email
  };
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/user";
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
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
inventoryActions.getUser = async (userId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/users/${userId}`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

inventoryActions.getUserRegistrations = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/registrations";
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

inventoryActions.getOrganizations = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/organizations";
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

inventoryActions.createOrganizationAccount = async (ldapOrganizationAccountDataDto, getAccessToken) => {
  let postData = {
    orgAccount: ldapOrganizationAccountDataDto.getPersistData()
  }
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/create";
  const response = await axiosApiService(accessToken).post(apiUrl, postData)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

inventoryActions.updateOrganizationAccount = async (ldapOrganizationAccountDataDto, getAccessToken) => {
  let postBody = {
    ...ldapOrganizationAccountDataDto.getPersistData()
  }
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/update";
  const response = await axiosApiService(accessToken).put(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

inventoryActions.createOrganization = async (ldapOrganizationDataDto, getAccessToken) => {
  let postBody = {
    organization: {
      ...ldapOrganizationDataDto.getPersistData(),
    }
  }
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/create";
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

inventoryActions.updateOrganization = async (ldapOrganizationDataDto, getAccessToken) => {
  let postBody = {
    ...ldapOrganizationDataDto.getPersistData()
  }
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/organization/update";
  const response = await axiosApiService(accessToken).put(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

inventoryActions.getOrganizationByName = async (organizationName, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/users/account/organization/${organizationName}`;
  const response = await axiosApiService(accessToken).post(apiUrl, {})
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

inventoryActions.getOrganizationByEmail = async (postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account";
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};
inventoryActions.activateElk = async (userId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/users/tools/activate-elk/${userId}`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

inventoryActions.create = async (accountData, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/create";
  const response = await axiosApiService(accessToken).post(apiUrl, accountData)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

inventoryActions.getGroup = async (orgDomain, groupName, getAccessToken) => {
  let postData = {
    domain: orgDomain,
    groupName: groupName,
  };
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/group";
  const response = await axiosApiService(accessToken).post(apiUrl, postData)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

inventoryActions.updateGroup = async (ldapOrganizationData, ldapGroupDataDto, getAccessToken) => {
  let putData = {
    "domain": ldapOrganizationData.orgDomain,
    "group": {
      ...ldapGroupDataDto.getPersistData()
    }
  }
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/group/update";
  const response = await axiosApiService(accessToken).put(apiUrl, putData)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

inventoryActions.createGroup = async (ldapOrganizationData, ldapGroupDataDto, currentUserEmail, getAccessToken) => {
  let putData = {
    "domain": ldapOrganizationData.orgDomain,
    "group": {
      ...ldapGroupDataDto.getPersistData(),
      ownerEmail: currentUserEmail,
    }
  }
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/group/create";
  const response = await axiosApiService(accessToken).post(apiUrl, putData)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

inventoryActions.syncMembership = async (ldapOrganizationData, groupName, emailList, getAccessToken) => {
  let postData = {
    domain: ldapOrganizationData.orgDomain,
    groupName: groupName,
    emails: emailList,
  };
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/group/sync-membership";
  const response = await axiosApiService(accessToken).post(apiUrl, postData)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

// TODO: Should this be broken into add/remove?
inventoryActions.modifyMemership = async (membershipData, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/group/modify-membership";
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

export default inventoryActions;