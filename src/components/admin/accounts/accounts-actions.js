import { axiosApiService } from "../../../api/apiService";

const accountsActions = {};

accountsActions.isOrganizationAccountOwner = (user) => {
  let {ldap} = user;
  return ldap["orgAccountOwnerEmail"] === user["email"];
};

accountsActions.isOrganizationOwner = async (organizationName, getUserRecord, getAccessToken) => {
    let response = await accountsActions.getOrganizationOwnerEmailWithName(organizationName, getAccessToken);
    let organizationOwnerEmail = response.data["orgOwnerEmail"];
    let user = await getUserRecord();

    return organizationOwnerEmail === user["email"];
};

accountsActions.getAllowedOrganizationActions = async (customerAccessRules, organizationName, getUserRecord, getAccessToken) => {
  const user = await getUserRecord();
  const {ldap} = user;
  const userOrganization = ldap["organization"];
  if (customerAccessRules.OpseraAdministrator) {
    return ["get_organizations", "get_organization_details", "create_organization", "update_organization"];
  }
  else if (userOrganization !== organizationName) {
    // User from another organization not allowed to do anything with another org, unless they are an Opsera administrator
    return [];
  }

  let orgOwner = await accountsActions.isOrganizationOwner(organizationName, getUserRecord, getAccessToken);

  if (orgOwner) {
    return ["get_organization_details", "update_organization"];
  }
  else {
    return [];
  }
};

accountsActions.getAllowedOrganizationAccountActions = async (customerAccessRules, organizationName, getUserRecord, getAccessToken) => {
  const user = await getUserRecord();
  const {ldap} = user;
  const userOrganization = ldap["organization"];
  if (customerAccessRules.OpseraAdministrator) {
    return ["get_organization_accounts", "get_organization_account_details", "create_organization_account", "update_organization_account"];
  }
  else if (userOrganization !== organizationName) {
    // User from another organization not allowed to do anything with another org, unless they are an Opsera administrator
    return [];
  }

  let orgAccountOwner = await accountsActions.isOrganizationAccountOwner(user);
  let orgOwner = await accountsActions.isOrganizationOwner(organizationName, getUserRecord, getAccessToken);

  if (orgOwner) {
    return ["get_organization_account_details", "create_organization_account", "update_organization_account"];
  }
  else if (orgAccountOwner || customerAccessRules.Administrator) {
    return ["get_organization_account_details", "update_organization_account"];
  }
  else {
    return [];
  }
};

accountsActions.getAllowedIdpAccountActions = async (customerAccessRules, organizationName, getUserRecord, getAccessToken) => {
  const user = await getUserRecord();
  const {ldap} = user;
  const userOrganization = ldap["organization"];
  if (customerAccessRules.OpseraAdministrator) {
    return ["get_idp_account_details", "create_idp_account", "update_idp_account"];
  }
  else if (userOrganization !== organizationName) {
    // User from another organization not allowed to do anything with another org, unless they are an Opsera administrator
    return [];
  }

  let orgAccountOwner = await accountsActions.isOrganizationAccountOwner(user);
  let orgOwner = await accountsActions.isOrganizationOwner(organizationName, getUserRecord, getAccessToken);

  if (orgOwner) {
    return ["get_idp_account_details", "create_idp_account", "update_idp_account"];
  }
  else if (orgAccountOwner || customerAccessRules.Administrator) {
    return ["get_idp_account_details", "create_idp_account", "update_idp_account"];
  }
  else {
    return [];
  }
};

accountsActions.getAllowedUserActions = async (customerAccessRules, organizationName, selected_user_email, getUserRecord, getAccessToken) => {
  const user = await getUserRecord();
  const {ldap} = user;
  const userOrganization = ldap["organization"];
  if (customerAccessRules.OpseraAdministrator) {
    return ["get_users", "get_user_details", "create_user", "update_user"];
  }
  else if (userOrganization !== organizationName) {
    // User from another organization not allowed to do anything with another org, unless they are an Opsera administrator
    return [];
  }

  // TODO: How to determine group owner?
  let groupOwner = false;
  let orgAccountOwner = await accountsActions.isOrganizationAccountOwner(user);
  let orgOwner = await accountsActions.isOrganizationOwner(organizationName, getUserRecord, getAccessToken);

  if (orgOwner) {
    return ["get_users", "get_user_details", "create_user", "update_user"];
  }
  else if (orgAccountOwner || customerAccessRules.Administrator) {
    return ["get_users", "get_user_details", "create_user", "update_user"];
  }
  else if (customerAccessRules.PowerUser || customerAccessRules.User || groupOwner) {
    let permissions = ["get_users", "get_user_details"];

    // Users can update their own records
    if (selected_user_email && selected_user_email === user.email) {
      permissions.push("update_user");
    }

    return permissions;
  }
  else {
    return [];
  }
};

accountsActions.getAllowedGroupActions = async (customerAccessRules, organizationName, getUserRecord, getAccessToken) => {
  const user = await getUserRecord();
  const {ldap} = user;
  const userOrganization = ldap["organization"];
  if (customerAccessRules.OpseraAdministrator) {
    return ["get_groups", "get_group_details", "create_group", "update_group", "update_group_membership"];
  }
  else if (userOrganization !== organizationName) {
    // User from another organization not allowed to do anything with another org, unless they are an Opsera administrator
    return [];
  }

  let orgAccountOwner = await accountsActions.isOrganizationAccountOwner(user);
  let orgOwner = await accountsActions.isOrganizationOwner(organizationName, getUserRecord, getAccessToken);

  if (orgOwner) {
    return ["get_groups", "get_group_details", "create_group", "update_group", "update_group_membership"];
  }
  else if (orgAccountOwner || customerAccessRules.Administrator) {
    return ["get_groups", "get_group_details", "create_group", "update_group", "update_group_membership"];
  }
  else if (customerAccessRules.PowerUser) {
    return ["get_groups", "get_group_details", "create_group", "update_group", "update_group_membership"];
  }
  // TODO: If we have a better way to get group owner, enable this
  // else if (groupOwner) {
  //   return ["get_group_details", "update_group", "update_group_membership"];
  // }
  else {
    return [];
  }
};

accountsActions.getAllowedRoleGroupActions = async (customerAccessRules, organizationName, getUserRecord, getAccessToken) => {
  const user = await getUserRecord();
  const {ldap} = user;
  const userOrganization = ldap["organization"];
  if (customerAccessRules.OpseraAdministrator) {
    return ["get_groups", "get_group_details", "create_group", "update_group", "update_group_membership"];
  }
  else if (userOrganization !== organizationName) {
    // User from another organization not allowed to do anything with another org, unless they are an Opsera administrator
    return [];
  }

  let orgAccountOwner = await accountsActions.isOrganizationAccountOwner(user);
  let orgOwner = await accountsActions.isOrganizationOwner(organizationName, getUserRecord, getAccessToken);

  if (orgOwner) {
    return ["get_groups", "get_group_details", "update_group_membership"];
  }
  else if (orgAccountOwner || customerAccessRules.Administrator) {
    return ["get_groups", "get_group_details", "update_group_membership"];
  }
  else {
    return [];
  }
};

accountsActions.updateUser = async (orgDomain, ldapUserDataDto, getAccessToken) => {
  const postBody = {
    domain: orgDomain,
    user: {
      ...ldapUserDataDto.getPersistData()
    }
  }
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/user/update";
  const response = await axiosApiService(accessToken).put(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

accountsActions.createUser = async (ldapUserDataDto, getAccessToken) => {
  let postData = {
      ...ldapUserDataDto.getPersistData()
  }
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/user/create";
  const response = await axiosApiService(accessToken).post(apiUrl, postData)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

accountsActions.getUsers = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/get-users?page=1&size=10000`;";
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

accountsActions.getUserDetailViewLink = async (getUserRecord) => {
  const user = await getUserRecord();
  const {ldap} = user;
  if (ldap == null) {
    return undefined;
  }
  else {
    return `/settings/${ldap.domain}/users/details/${user.email}`;
  }
};


accountsActions.getLdapUsers = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/accounts";
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

accountsActions.getUserByEmail = async (email, getAccessToken) => {
  let postBody = {
    email: email
  };
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/user";
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

accountsActions.getUser = async (userId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/users/${userId}`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

accountsActions.getUserRegistrations = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/registrations";
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

accountsActions.getOrganizations = async (getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/organizations";
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

accountsActions.createIdpAccount = async (ldapIdpAccountDataDto, getAccessToken) => {
  let postData = {
    ...ldapIdpAccountDataDto.getPersistData()
  }
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/idp/create";
  const response = await axiosApiService(accessToken).post(apiUrl, postData)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

accountsActions.updateIdpAccount = async (ldapIdpAccountDataDto,ldapOrganizationAccountData, getAccessToken) => {
  let postData = {
    ...ldapIdpAccountDataDto.getPersistData(),
    // domain: ldapOrganizationAccountData.getData("orgDomain")
  }
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/idp/update";
  const response = await axiosApiService(accessToken).put(apiUrl, postData)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

accountsActions.createOrganizationAccount = async (ldapOrganizationAccountDataDto, getAccessToken) => {
  let postData = {
    ...ldapOrganizationAccountDataDto.getPersistData()
  }
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/create";
  const response = await axiosApiService(accessToken).post(apiUrl, postData)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

accountsActions.updateOrganizationAccount = async (ldapOrganizationAccountDataDto, getAccessToken) => {
  let postBody = {
    ...ldapOrganizationAccountDataDto.getPersistData()
  }
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/update";
  const response = await axiosApiService(accessToken).put(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

accountsActions.createOrganization = async (ldapOrganizationDataDto, getAccessToken) => {
  let postBody = {
      ...ldapOrganizationDataDto.getPersistData(),
  }
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/organization/create";
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

accountsActions.updateOrganization = async (ldapOrganizationDataDto, getAccessToken) => {
  let postBody = {
    ...ldapOrganizationDataDto.getPersistData()
  }
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/organization/update";
  const response = await axiosApiService(accessToken).put(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

accountsActions.getOrganizationByName = async (organizationName, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/users/account/organization/${organizationName}`;
  const response = await axiosApiService(accessToken).post(apiUrl, {})
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

accountsActions.getOrganizationOwnerEmailWithName = async (organizationName, getAccessToken) => {
  console.log("Trying to get owner email for: " + organizationName);
  const accessToken = await getAccessToken();
  const apiUrl = `/users/account/organization/${organizationName}?emailOnly=true`;
  const response = await axiosApiService(accessToken).post(apiUrl, {})
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

// TODO: Implement
// accountsActions.getOrganizationAccountByName = async (organizationAccountName, getAccessToken) => {
//   let postBody = {
//     accountName: organizationAccountName
//   }
//
//   const accessToken = await getAccessToken();
//   const apiUrl = `/users/account/organization/`;
//   const response = await axiosApiService(accessToken).post(apiUrl, postBody)
//     .then((result) =>  {return result;})
//     .catch(error => {throw error;});
//   return response;
// };

accountsActions.getOrganizationAccountByDomain = async (domain, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account";
  const postBody = {
    domain: domain
  }
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

accountsActions.getOrganizationAccountByEmail = async (email, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account";
  const postBody = {
    email: email
  }
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

accountsActions.activateElk = async (userId, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/users/tools/activate-elk/${userId}`;
  const response = await axiosApiService(accessToken).get(apiUrl)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

accountsActions.create = async (accountData, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/onboard";
  const response = await axiosApiService(accessToken).post(apiUrl, accountData)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

accountsActions.getGroup = async (orgDomain, groupName, getAccessToken) => {
  let postData = {
    domain: orgDomain,
    groupName: groupName,
  };
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/group";
  const response = await axiosApiService(accessToken).post(apiUrl, postData)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

accountsActions.updateGroup = async (ldapOrganizationData, ldapGroupDataDto, getAccessToken) => {
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
    .catch(error => {throw error;});
  return response;
};

accountsActions.createGroup = async (ldapOrganizationData, ldapGroupDataDto, currentUserEmail, getAccessToken) => {
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
    .catch(error => {throw error;});
  return response;
};

accountsActions.syncMembership = async (ldapOrganizationData, groupName, emailList, getAccessToken) => {
  let postData = {
    domain: ldapOrganizationData.orgDomain,
    groupName: groupName,
    emails: emailList,
  };
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/group/sync-membership";
  const response = await axiosApiService(accessToken).post(apiUrl, postData)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
  return response;
};

// TODO: Should this be broken into add/remove?
accountsActions.modifyMemership = async (membershipData, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = "/users/account/group/modify-membership";
  const response = await axiosApiService(accessToken).post(apiUrl, membershipData)
    .then((result) =>  {return result;})
    .catch(error => {throw error;});
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