import accountsActions from "../accounts-actions";

export const getUsersByEmail = async (email, getAccessToken) => {
  await getUsers({email: email});
};

export const getUsersByDomain = async (ldapDomain, getAccessToken) => {
  if (ldapDomain != null) {
    await getUsers({domain: ldapDomain});
  }
};

const getUsers = async (postBody, getAccessToken) => {
  if (postBody != null) {
    const response = await accountsActions.getOrganizationByEmail(postBody, getAccessToken);
    let ldapOrganizationData = response.data;

    return ldapOrganizationData != null ? ldapOrganizationData["users"] : undefined;
  }
};