import accountsActions from "../../admin/accounts/accounts-actions";

export const getGroupsByEmail = async (email, getAccessToken) => {
  await getGroups({email: email}, getAccessToken);
};

export const getGroupsByDomain = async (ldapDomain, getAccessToken) => {
  if (ldapDomain != null) {
    await getGroups({domain: ldapDomain}, getAccessToken);
  }
};

const getGroups = async (postBody, getAccessToken) => {
  if (postBody != null) {
    const response = await accountsActions.getOrganizationAccountByEmail(postBody, getAccessToken);
    let ldapOrganizationData = response.data;

    return ldapOrganizationData != null ? ldapOrganizationData["groups"] : undefined;
  }
};