import {axiosApiService} from "../../../../../api/apiService";

const departmentActions = {};

departmentActions.getDepartmentsByDomain = async (domain, getAccessToken) => {
  let postBody = {
    domain: domain
  };
  const accessToken = await getAccessToken();
  const apiUrl = `/users/account/departments`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {return error;});
  return response;
};

departmentActions.getDepartment = async (domain, departmentName, getAccessToken) => {
  let postBody = {
    domain: domain,
    name: departmentName
  };
  const accessToken = await getAccessToken();
  const apiUrl = `/users/account/department`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {return error;});
  return response;
};

departmentActions.createDepartment = async (orgDomain, departmentDto, getAccessToken) => {
  let postBody = {
    domain: orgDomain,
    name: departmentDto.getData("name"),
    ownerEmail: departmentDto.getData("ownerEmail")
  };
  const accessToken = await getAccessToken();
  const apiUrl = `/users/account/department/create`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

departmentActions.createTool = async (ldapUserDataDto, getAccessToken) => {
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

// TODO: Add ?hidden=true if needed
// TODO: add manual options
departmentActions.getTools = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/get-users?page=1&size=10000`;";
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

departmentActions.getToolById = async (id, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/registry/${id}`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

departmentActions.getUserByEmail = async (email, getAccessToken) => {
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
departmentActions.getUser = async (userId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/users/${userId}`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

departmentActions.getUserRegistrations = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/registrations";
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

departmentActions.getOrganizations = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/organizations";
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

departmentActions.createOrganizationAccount = async (ldapOrganizationAccountDataDto, getAccessToken) => {
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

departmentActions.updateOrganizationAccount = async (ldapOrganizationAccountDataDto, getAccessToken) => {
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

departmentActions.createOrganization = async (ldapOrganizationDataDto, getAccessToken) => {
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

departmentActions.updateOrganization = async (ldapOrganizationDataDto, getAccessToken) => {
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

departmentActions.getOrganizationByName = async (organizationName, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/users/account/organization/${organizationName}`;
  const response = await axiosApiService(accessToken).post(apiUrl, {})
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

departmentActions.getOrganizationByEmail = async (postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account";
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};
departmentActions.activateElk = async (userId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/users/tools/activate-elk/${userId}`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

departmentActions.create = async (accountData, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/create";
  const response = await axiosApiService(accessToken).post(apiUrl, accountData)
    .then((result) =>  {return result;})
    .catch(error => {return { error };});
  return response;
};

departmentActions.getGroup = async (orgDomain, groupName, getAccessToken) => {
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

departmentActions.updateGroup = async (ldapOrganizationData, ldapGroupDataDto, getAccessToken) => {
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

departmentActions.createGroup = async (ldapOrganizationData, ldapGroupDataDto, currentUserEmail, getAccessToken) => {
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

departmentActions.syncMembership = async (ldapOrganizationData, groupName, emailList, getAccessToken) => {
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
departmentActions.modifyMemership = async (membershipData, getAccessToken) => {
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

export default departmentActions;