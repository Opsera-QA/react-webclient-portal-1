import accountsActions from "../../admin/accounts/accounts-actions";

export const getGroupsByEmail = async (email, getAccessToken) => {
  await getGroups({email: email});
};

export const getGroupsByDomain = async (ldapDomain, getAccessToken) => {
  if (ldapDomain != null) {
    await getGroups({domain: ldapDomain});
  }
};

const getGroups = async (postBody) => {
  if (postBody != null) {
    const response = await accountsActions.getOrganizationByEmail(postBody, getAccessToken);
    let ldapOrganizationData = response.data;

    return ldapOrganizationData != null ? ldapOrganizationData["groups"] : undefined;
  }
};