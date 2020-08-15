import accountsActions from "../accounts-actions";

export const getOrganizationList = async (getAccessToken) => {
  return getOrganizationDropdownList("orgDomain", getAccessToken);
};

export const getOrganizationDropdownList = async (valueField, getAccessToken) => {
  const response = await accountsActions.getOrganizations(getAccessToken);
  if (response.data) {
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
    // console.log("Parsed Organization Names: " + JSON.stringify(parsedOrganizationNames));
    return parsedOrganizationNames;
  }
};

export const getOrganizationByEmail = async (email, getAccessToken) => {
  return getOrganization({email: email}, getAccessToken);
};

export const getOrganizationByDomain = async (ldapDomain, getAccessToken) => {
  if (ldapDomain != null) {
    return getOrganization({domain: ldapDomain}, getAccessToken);
  }
};

const getOrganization = async (postBody, getAccessToken) => {
  if (postBody != null) {
    const response = await accountsActions.getOrganizationByEmail(postBody, getAccessToken);
    return response.data;
  }
}