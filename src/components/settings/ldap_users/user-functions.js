import accountsActions from "../../admin/accounts/accounts-actions";

export const getUsersByEmail = async (email, getAccessToken) => {
  const response = await accountsActions.getOrganizationAccountByEmail(email, getAccessToken);
  let ldapOrganizationData = response.data;

  return ldapOrganizationData != null ? ldapOrganizationData["users"] : undefined;
};

export const getUsersByDomain = async (ldapDomain, getAccessToken) => {
  const response = await accountsActions.getOrganizationAccountByDomain(ldapDomain, getAccessToken);
  let ldapOrganizationData = response.data;

  return ldapOrganizationData != null ? ldapOrganizationData["users"] : undefined;
};