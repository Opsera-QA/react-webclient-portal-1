import baseActions from "utils/actionsBase";
import { apiTokenHelper } from "temp-library-components/helpers/api/token/apiToken.helper";
import routeTokenConstants from "@opsera/definitions/constants/routes/tokens/routeToken.constants";

const accountsActions = {};

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

accountsActions.createUserV2 = async (getAccessToken, cancelTokenSource, orgDomain, ldapUserModel) => {
  const postData = {
    ...ldapUserModel.getPersistData()
  };
  const apiUrl = `/users/account/user/create?domain=${orgDomain}`;

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postData);
};


accountsActions.getUsersV2 = async (getAccessToken, cancelTokenSource) => {
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

accountsActions.getLdapUsersWithDomainV2 = async (getAccessToken, cancelTokenSource, domain) => {
  const apiUrl = `/account/users/${domain}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

accountsActions.getLdapRoleGroupsWithDomainV2 = async (getAccessToken, cancelTokenSource, domain) => {
  const apiUrl = `/account/site-roles/${domain}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

accountsActions.isFreeTrialAccountActive = async (cancelTokenSource, email) => {
  const token = apiTokenHelper.generateApiCallToken(routeTokenConstants.ROUTE_MIDDLEWARE_TOKEN_KEYS.IS_ACCOUNT_ACTIVE);
  const apiUrl = "/users/trial/is-account-active";
  const postBody = {
    email: email,
    hostname: window.location.hostname,
  };

  return await baseActions.customTokenApiPostCallV2(
    cancelTokenSource,
    token,
    apiUrl,
    postBody,
  );
};

accountsActions.getFreeTrialAccountMetrics = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/trial/users/account/metrics`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

accountsActions.getFreeTrialAccountWorkflowMetrics = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/trial/users/workflow/metrics`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

accountsActions.getFreeTrialActivityReportUsers = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/trial/users/account/activity-report/users`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
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

accountsActions.getSsoUserOrganizationNames = async (getAccessToken, cancelTokenSource) => {
  const apiUrl = `/users/sso-user-organization-names`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
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

accountsActions.isNameAvailableForLdapUidV2 = async (getAccessToken, cancelTokenSource, organization, firstName, lastName,) => {
  const apiUrl = "/users/account/is-name-available";
  const postBody = {
    organization: organization,
    firstName: firstName,
    lastName: lastName,
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

accountsActions.createOrganizationV2 = async (getAccessToken, cancelTokenSource, ldapOrganizationModel) => {
  const apiUrl = "/users/account/organization/create";
  const postBody = {
    ...ldapOrganizationModel?.getPersistData(),
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

accountsActions.updateOrganizationV2 = async (getAccessToken, cancelTokenSource, ldapOrganizationModel) => {
  const apiUrl = "/users/account/organization/update";
  const postBody = {
    ...ldapOrganizationModel?.getPersistData()
  };

  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
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

accountsActions.getGroupWithoutMembersV2 = async (getAccessToken, cancelTokenSource, orgDomain, groupName) => {
  const apiUrl = `/users/account/${orgDomain}/groups/${groupName}`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

accountsActions.updateGroupV2 = async (getAccessToken, cancelTokenSource, orgDomain, ldapGroupDataDto) => {
  const apiUrl = "/users/account/group/update";
  const putData = {
    domain: orgDomain,
    group: {
      ...ldapGroupDataDto.getPersistData()
    }
  };

  return await baseActions.apiPutCallV2(getAccessToken, cancelTokenSource, apiUrl, putData);
};


accountsActions.createGroupV2 = async (getAccessToken, cancelTokenSource, orgDomain, ldapGroupDataDto, currentUserEmail) => {
  const apiUrl = "/users/account/group/create";
  const postData = {
    domain: orgDomain,
    group: {
      ...ldapGroupDataDto.getPersistData(),
      ownerEmail: currentUserEmail,
    }
  };

  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postData);
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