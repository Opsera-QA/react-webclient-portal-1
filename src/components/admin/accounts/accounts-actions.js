import baseActions from "utils/actionsBase";

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

accountsActions.getAllowedDepartmentActions = async (customerAccessRules, organizationName, getUserRecord, getAccessToken) => {
  const user = await getUserRecord();
  const {ldap} = user;
  const userOrganization = ldap["organization"];
  if (customerAccessRules.OpseraAdministrator) {
    return ["get_departments", "get_department_details", "create_department", "update_department"];
  }
  else if (userOrganization !== organizationName) {
    // User from another organization not allowed to do anything with another org, unless they are an Opsera administrator
    return [];
  }

  let orgAccountOwner = await accountsActions.isOrganizationAccountOwner(user);
  let orgOwner = await accountsActions.isOrganizationOwner(organizationName, getUserRecord, getAccessToken);

  if (orgOwner) {
    return ["get_departments", "get_department_details", "create_department", "update_department"];
  }
  else if (orgAccountOwner || customerAccessRules.Administrator) {
    return ["get_departments", "get_department_details", "create_department", "update_department"];
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
    return ["get_groups", "get_group_details", "create_group", "update_group", "update_group_membership", "delete_group"];
  }
  else if (userOrganization !== organizationName) {
    // User from another organization not allowed to do anything with another org, unless they are an Opsera administrator
    return [];
  }

  let orgAccountOwner = await accountsActions.isOrganizationAccountOwner(user);
  let orgOwner = await accountsActions.isOrganizationOwner(organizationName, getUserRecord, getAccessToken);

  if (orgOwner) {
    return ["get_groups", "get_group_details", "create_group", "update_group", "update_group_membership", "delete_group"];
  }
  else if (orgAccountOwner || customerAccessRules.Administrator) {
    return ["get_groups", "get_group_details", "create_group", "update_group", "update_group_membership", "delete_group"];
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
  const apiUrl = "/users/account/user/update";
  return await baseActions.apiPutCall(getAccessToken, apiUrl, postBody);
};

accountsActions.createUser = async (orgDomain, ldapUserDataDto, getAccessToken) => {
  let postData = {
      ...ldapUserDataDto.getPersistData()
  }
  const apiUrl = `/users/account/user/create?domain=${orgDomain}`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postData);
};

accountsActions.getUsers = async (getAccessToken) => {
  const urlParams = {
    params: {
      size: 10000,
    },
  };

  const apiUrl = `/users/get-users`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl, urlParams);
};

accountsActions.getAccountUsers = async (getAccessToken) => {
  const apiUrl = `/users/account-users`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
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


accountsActions.getLdapUsersWithEmail = async (emailAddress, getAccessToken) => {
  const postBody = {
    email: emailAddress
  };
  const apiUrl = "/users/account/users";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

accountsActions.getLdapUsersWithDomain = async (domain, getAccessToken) => {
  const postBody = {
    domain: domain
  };
  const apiUrl = "/users/account/users";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};



accountsActions.getLdapGroupsWithEmail = async (emailAddress, getAccessToken) => {
  const postBody = {
    email: emailAddress
  };
  const apiUrl = "/users/account/groups";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

accountsActions.getLdapGroupsWithDomain = async (domain, getAccessToken) => {
  const postBody = {
    domain: domain
  };
  const apiUrl = "/users/account/groups";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

accountsActions.getUserByEmail = async (email, getAccessToken) => {
  let postBody = {
    email: email
  };
  const apiUrl = "/users/account/user";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

accountsActions.getUser = async (userId, getAccessToken) => {
  const apiUrl = `/users/${userId}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

accountsActions.isEmailAvailable = async (email, getAccessToken) => {
  let postBody = {
    email: email
  };
  const apiUrl = "/users/account/is-email-available";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

accountsActions.getUserRegistrations = async (getAccessToken) => {
  const apiUrl = "/users/registrations";
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

accountsActions.getOrganizations = async (getAccessToken) => {
  const apiUrl = "/users/account/organizations";
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

accountsActions.createIdpAccount = async (ldapIdpAccountDataDto, getAccessToken) => {
  let postData = {
    ...ldapIdpAccountDataDto.getPersistData()
  }
  const apiUrl = "/users/account/idp/create";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postData);
};

accountsActions.updateIdpAccount = async (ldapIdpAccountDataDto,ldapOrganizationAccountData, getAccessToken) => {
  let postData = {
    ...ldapIdpAccountDataDto.getPersistData(),
    // domain: ldapOrganizationAccountData.getData("orgDomain")
  }
  const apiUrl = "/users/account/idp/update";
  return await baseActions.apiPutCall(getAccessToken, apiUrl, postData);
};

accountsActions.createOrganizationAccount = async (ldapOrganizationAccountDataDto, getAccessToken) => {
  let postData = {
    ...ldapOrganizationAccountDataDto.getPersistData()
  }
  const apiUrl = "/users/account/create";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postData);
};

accountsActions.updateOrganizationAccount = async (ldapOrganizationAccountDataDto, getAccessToken) => {
  let postBody = {
    ...ldapOrganizationAccountDataDto.getPersistData()
  }
  const apiUrl = "/users/account/update";
  return await baseActions.apiPutCall(getAccessToken, apiUrl, postBody);
};

accountsActions.createOrganization = async (ldapOrganizationDataDto, getAccessToken) => {
  let postBody = {
      ...ldapOrganizationDataDto.getPersistData(),
  }
  const apiUrl = "/users/account/organization/create";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

accountsActions.updateOrganization = async (ldapOrganizationDataDto, getAccessToken) => {
  let postBody = {
    ...ldapOrganizationDataDto.getPersistData()
  }
  const apiUrl = "/users/account/organization/update";
  return await baseActions.apiPutCall(getAccessToken, apiUrl, postBody);
};

accountsActions.getOrganizationByName = async (organizationName, getAccessToken) => {
  const apiUrl = `/users/account/organization/${organizationName}`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl);
};

accountsActions.getOrganizationOwnerEmailWithName = async (organizationName, getAccessToken) => {
  const apiUrl = `/users/account/organization/${organizationName}?emailOnly=true`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl);
};

accountsActions.getOrganizationAccountByName = async (organizationAccountName, getAccessToken) => {
  let postBody = {
    name: organizationAccountName
  }

  const apiUrl = `/users/account/`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

accountsActions.getOrganizationAccountMembers = async (organizationAccountName, getAccessToken) => {
  const apiUrl = `/users/account/members/${organizationAccountName}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

// TODO: Remove when all use cancel token
accountsActions.getOrganizationAccountByDomain = async (domain, getAccessToken) => {
  const postBody = {
    domain: domain
  }
  const apiUrl = "/users/account";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

accountsActions.getOrganizationAccountByDomainV2 = async (domain, getAccessToken, cancelTokenSource) => {
  const postBody = {
    domain: domain
  }
  const apiUrl = "/users/account";
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

accountsActions.getOrganizationAccountByEmail = async (email, getAccessToken) => {
  const apiUrl = "/users/account";
  const postBody = {
    email: email
  }
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

accountsActions.create = async (accountData, getAccessToken) => {
  const apiUrl = "/users/account/onboard";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, accountData);
};

accountsActions.getGroup = async (orgDomain, groupName, getAccessToken) => {
  let postData = {
    domain: orgDomain,
    groupName: groupName,
  };
  const apiUrl = "/users/account/group";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postData);
};

accountsActions.updateGroup = async (orgDomain, ldapGroupDataDto, getAccessToken) => {
  let putData = {
    "domain": orgDomain,
    "group": {
      ...ldapGroupDataDto.getPersistData()
    }
  }
  const apiUrl = "/users/account/group/update";
  return await baseActions.apiPutCall(getAccessToken, apiUrl, putData);
};

accountsActions.createGroup = async (orgDomain, ldapGroupDataDto, currentUserEmail, getAccessToken) => {
  let postData = {
    "domain": orgDomain,
    "group": {
      ...ldapGroupDataDto.getPersistData(),
      ownerEmail: currentUserEmail,
    }
  }
  const apiUrl = "/users/account/group/create";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postData);
};


accountsActions.deleteGroup = async (orgDomain, ldapGroupDataDto, getAccessToken) => {
  const apiUrl = `/users/account/group/delete?domain=${orgDomain}&name=${ldapGroupDataDto.getData("name")}`;
  return await baseActions.apiDeleteCall(getAccessToken, apiUrl);
};

accountsActions.syncMembership = async (orgDomain, groupName, emailList, getAccessToken) => {
  let postData = {
    domain: orgDomain,
    groupName: groupName,
    emails: emailList,
  };
  const apiUrl = "/users/account/group/sync-membership";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postData);
};

export default accountsActions;