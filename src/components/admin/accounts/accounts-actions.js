import baseActions from "utils/actionsBase";

const accountsActions = {};

// TODO: We need to rewrite this entire file to be role definitions instead

// TODO: We should remove the way I handled permissions to align with the new standards.
accountsActions.isOrganizationAccountOwner = (user) => {
  const orgOwnerAccountEmail = user?.ldap?.orgAccountOwnerEmail;
  return orgOwnerAccountEmail === user?.email;
};

// TODO: Use call in AuthContext instead
accountsActions.isOrganizationOwner = async (organizationName, getUserRecord, getAccessToken) => {
  const response = await accountsActions.getOrganizationOwnerEmailWithName(organizationName, getAccessToken);
  const organizationOwnerEmail = response.data["orgOwnerEmail"];
  const user = await getUserRecord();

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

  const orgOwner = await accountsActions.isOrganizationOwner(organizationName, getUserRecord, getAccessToken);

  if (orgOwner) {
    return ["get_organization_details", "update_organization"];
  }
  else {
    return [];
  }
};

accountsActions.getAllowedOrganizationAccountActions = async (customerAccessRules) => {

  if (customerAccessRules.OpseraAdministrator) {
    return ["get_organization_accounts", "get_organization_account_details", "create_organization_account", "update_organization_account"];
  }
  // else if (userOrganization !== organizationName) {
  //   // User from another organization not allowed to do anything with another org, unless they are an Opsera administrator
  //   return [];
  // }
  //
  // let orgAccountOwner = await accountsActions.isOrganizationAccountOwner(user);
  // let orgOwner = await accountsActions.isOrganizationOwner(organizationName, getUserRecord, getAccessToken);
  //
  // if (orgOwner) {
  //   return ["get_organization_account_details", "create_organization_account", "update_organization_account"];
  // }
  // else if (orgAccountOwner || customerAccessRules.Administrator) {
  //   return ["get_organization_account_details", "update_organization_account"];
  // }
  // else {
    return [];
  // }
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

  if (orgOwner || orgAccountOwner || customerAccessRules.Administrator) {
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
    return ["get_departments", "get_department_details", "create_department", "update_department", "update_group_membership"];
  }
  else if (userOrganization !== organizationName) {
    // User from another organization not allowed to do anything with another org, unless they are an Opsera administrator
    return [];
  }

  let orgAccountOwner = await accountsActions.isOrganizationAccountOwner(user);
  let orgOwner = await accountsActions.isOrganizationOwner(organizationName, getUserRecord, getAccessToken);

  if (orgOwner || orgAccountOwner || customerAccessRules.Administrator) {
    return ["get_departments", "get_department_details", "update_department", "update_group_membership"];
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

  const orgAccountOwner = await accountsActions.isOrganizationAccountOwner(user);
  const orgOwner = await accountsActions.isOrganizationOwner(organizationName, getUserRecord, getAccessToken);

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
  };
  const apiUrl = "/users/account/user/update";
  return await baseActions.apiPutCall(getAccessToken, apiUrl, postBody);
};

// TODO: Remove when V2 is wired up everywhere
accountsActions.updateUserV2 = async (getAccessToken, cancelTokenSource, orgDomain, ldapUserModel) => {
  const apiUrl = "/users/account/user/update";
  const postBody = {
    domain: orgDomain,
    user: {
      ...ldapUserModel.getPersistData()
    }
  };

  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

accountsActions.createUser = async (orgDomain, ldapUserDataDto, getAccessToken) => {
  let postData = {
      ...ldapUserDataDto.getPersistData()
  };
  const apiUrl = `/users/account/user/create?domain=${orgDomain}`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postData);
};

accountsActions.createUserV2 = async (getAccessToken, cancelTokenSource, orgDomain, ldapUserModel) => {
  const postData = {
    ...ldapUserModel.getPersistData()
  };
  const apiUrl = `/users/account/user/create?domain=${orgDomain}`;

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postData);
};


accountsActions.getUsers = async (getAccessToken, cancelTokenSource) => {
  const urlParams = {
    params: {
      size: 10000,
    },
  };

  const apiUrl = `/users/get-users`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

accountsActions.getAccountUsersV2 = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/users/account-users`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

accountsActions.getPendingUsersV2 = async (getAccessToken, cancelTokenSource, organizationDomain, organizationAccount) => {
  const apiUrl = `/users/pending-users`;
  const urlParams = {
    params: {
      domain: organizationDomain,
      account: organizationAccount,
    },
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
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

accountsActions.getLdapUsersWithDomainV2 = async (getAccessToken, cancelTokenSource, domain) => {
  const postBody = {
    domain: domain
  };
  const apiUrl = "/users/account/users";
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

accountsActions.getLdapGroupsWithEmail = async (emailAddress, getAccessToken) => {
  const postBody = {
    email: emailAddress
  };
  const apiUrl = "/users/account/groups";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

accountsActions.getLdapGroupsWithDomainV2 = async (getAccessToken, cancelTokenSource, domain) => {
  const postBody = {
    domain: domain
  };
  const apiUrl = "/users/account/groups";
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

// TODO: Remove when V2 is wired up everywhere
accountsActions.getUserByEmail = async (email, getAccessToken) => {
  const postBody = {
    email: email
  };
  const apiUrl = "/users/account/user";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

accountsActions.getUserByEmailV2 = async (getAccessToken, cancelTokenSource, email) => {
  const postBody = {
    email: email
  };
  const apiUrl = "/users/account/user";
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

accountsActions.getPendingUserByIdV2 = async (getAccessToken, cancelTokenSource, organizationDomain, id) => {
  const apiUrl = `/users/pending-users/${id}`;
  const urlParams = {
    params: {
      domain: organizationDomain,
    },
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

accountsActions.getUser = async (userId, getAccessToken) => {
  const apiUrl = `/users/${userId}`;
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

// TODO: Remove after all references are updated to V2
accountsActions.isEmailAvailable = async (email, getAccessToken) => {
  const postBody = {
    email: email
  };
  const apiUrl = "/users/account/is-email-available";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

accountsActions.isEmailAvailableV2 = async (getAccessToken, cancelTokenSource, email) => {
  const apiUrl = "/users/account/is-email-available";
  const postBody = {
    email: email
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

accountsActions.getUserRegistrations = async (getAccessToken) => {
  const apiUrl = "/users/registrations";
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

accountsActions.getOrganizations = async (getAccessToken) => {
  const apiUrl = "/users/account/organizations";
  return await baseActions.apiGetCall(getAccessToken, apiUrl);
};

accountsActions.getOrganizationsV2 = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = "/users/account/organizations";
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

accountsActions.createIdpAccount = async (ldapIdpAccountDataDto, getAccessToken) => {
  const postData = {
    ...ldapIdpAccountDataDto.getPersistData()
  };
  const apiUrl = "/users/account/idp/create";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postData);
};

accountsActions.updateIdpAccount = async (ldapIdpAccountDataDto,ldapOrganizationAccountData, getAccessToken) => {
  const postData = {
    ...ldapIdpAccountDataDto.getPersistData(),
    // domain: ldapOrganizationAccountData.getData("orgDomain")
  };
  const apiUrl = "/users/account/idp/update";
  return await baseActions.apiPutCall(getAccessToken, apiUrl, postData);
};

accountsActions.createOrganizationAccount = async (ldapOrganizationAccountDataDto, getAccessToken) => {
  const postData = {
    ...ldapOrganizationAccountDataDto.getPersistData()
  };
  const apiUrl = "/users/account/create";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postData);
};

accountsActions.updateOrganizationAccount = async (ldapOrganizationAccountDataDto, getAccessToken) => {
  const postBody = {
    ...ldapOrganizationAccountDataDto.getPersistData()
  };
  const apiUrl = "/users/account/update";
  return await baseActions.apiPutCall(getAccessToken, apiUrl, postBody);
};

accountsActions.createOrganization = async (ldapOrganizationDataDto, getAccessToken) => {
  const postBody = {
      ...ldapOrganizationDataDto.getPersistData(),
  };
  const apiUrl = "/users/account/organization/create";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

accountsActions.updateOrganization = async (ldapOrganizationDataDto, getAccessToken) => {
  const postBody = {
    ...ldapOrganizationDataDto.getPersistData()
  };
  const apiUrl = "/users/account/organization/update";
  return await baseActions.apiPutCall(getAccessToken, apiUrl, postBody);
};

accountsActions.getOrganizationByNameV2 = async (getAccessToken, cancelTokenSource, organizationName) => {
  const apiUrl = `/users/account/organization/${organizationName}`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

accountsActions.getOrganizationOwnerEmailWithName = async (organizationName, getAccessToken) => {
  const apiUrl = `/users/account/organization/${organizationName}?emailOnly=true`;
  return await baseActions.apiPostCall(getAccessToken, apiUrl);
};

accountsActions.getOrganizationOwnerEmailWithNameV2 = async (getAccessToken, cancelTokenSource, organizationName) => {
  const apiUrl = `/users/account/organization/${organizationName}?emailOnly=true`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

accountsActions.getOrganizationAccountByName = async (organizationAccountName, getAccessToken) => {
  const postBody = {
    name: organizationAccountName
  };

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
  };
  const apiUrl = "/users/account";

  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

accountsActions.getOrganizationAccountByDomainV2 = async (getAccessToken, cancelTokenSource, domain) => {
  const postBody = {
    domain: domain
  };
  const apiUrl = "/users/account";
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

accountsActions.getOrganizationAccountByEmail = async (email, getAccessToken) => {
  const apiUrl = "/users/account";
  const postBody = {
    email: email
  };
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postBody);
};

accountsActions.create = async (accountData, getAccessToken) => {
  const apiUrl = "/users/account/onboard";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, accountData);
};

accountsActions.getGroupV2 = async (getAccessToken, cancelTokenSource, orgDomain, groupName) => {
  const postData = {
    domain: orgDomain,
    groupName: groupName,
  };
  const apiUrl = "/users/account/group";
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postData);
};


accountsActions.updateGroup = async (orgDomain, ldapGroupDataDto, getAccessToken) => {
  const putData = {
    "domain": orgDomain,
    "group": {
      ...ldapGroupDataDto.getPersistData()
    }
  };
  const apiUrl = "/users/account/group/update";
  return await baseActions.apiPutCall(getAccessToken, apiUrl, putData);
};

accountsActions.createGroup = async (orgDomain, ldapGroupDataDto, currentUserEmail, getAccessToken) => {
  const postData = {
    "domain": orgDomain,
    "group": {
      ...ldapGroupDataDto.getPersistData(),
      ownerEmail: currentUserEmail,
    }
  };
  const apiUrl = "/users/account/group/create";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postData);
};


accountsActions.deleteGroup = async (orgDomain, ldapGroupDataDto, getAccessToken) => {
  const apiUrl = `/users/account/group/delete?domain=${orgDomain}&name=${ldapGroupDataDto.getData("name")}`;
  return await baseActions.apiDeleteCall(getAccessToken, apiUrl);
};

accountsActions.syncMembership = async (orgDomain, groupName, emailList, getAccessToken) => {
  const postData = {
    domain: orgDomain,
    groupName: groupName,
    emails: emailList,
  };
  const apiUrl = "/users/account/group/sync-membership";
  return await baseActions.apiPostCall(getAccessToken, apiUrl, postData);
};

accountsActions.syncMembershipV2 = async (getAccessToken, cancelTokenSource, orgDomain, groupName, emailList) => {
  const apiUrl = "/users/account/group/sync-membership";
  const postData = {
    domain: orgDomain,
    groupName: groupName,
    emails: emailList,
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postData);
};

export default accountsActions;