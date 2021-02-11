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