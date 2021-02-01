import accountsActions from "components/admin/accounts/accounts-actions";

export const getOrganizationList = async (getAccessToken) => {
  return getOrganizationAccountDropdownList("orgDomain", getAccessToken);
};

export const getOrganizationAccountDropdownList = async (valueField, getAccessToken) => {
  const response = await accountsActions.getOrganizations(getAccessToken);
  if (response?.data) {
    let parsedOrganizationNames = [];
    response.data.map(organization => {
      organization["orgAccounts"].map(orgAccount => {
        parsedOrganizationNames.push({
          text: orgAccount["name"] + ": " + orgAccount["orgDomain"],
          groupId: organization["name"],
          id: orgAccount[valueField]
        });
      });
    });
    return parsedOrganizationNames;
  }
};

export const getOrganizationDropdownList = async (valueField, getAccessToken) => {
  const response = await accountsActions.getOrganizations(getAccessToken);
  if (response?.data) {
    let parsedOrganizationNames = [];
    response.data.map(organization => {
      parsedOrganizationNames.push({
        text: organization["name"] + ": " + organization["orgOwner"],
        groupId: organization["orgOwnerEmail"],
        id: organization[valueField]
      });
    });
    return parsedOrganizationNames;
  }
};

export const getOrganizationByEmail = async (email, getAccessToken) => {
  if (email != null) {
    const response = await accountsActions.getOrganizationAccountByEmail(email, getAccessToken);
    return response?.data;
  }
};

export const getOrganizationByDomain = async (ldapDomain, getAccessToken) => {
  if (ldapDomain != null) {
    const response = await accountsActions.getOrganizationAccountByDomain(ldapDomain, getAccessToken);
    return response?.data;
  }
};