import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export const groupHelper = {};

groupHelper.getDetailViewLink = (organizationDomain, groupName) => {
  const parsedOrganizationDomain = DataParsingHelper.parseString(organizationDomain);
  const parsedName = DataParsingHelper.parseString(groupName);

  if (!parsedOrganizationDomain || !parsedName) {
    return undefined;
  }

  return `/settings/${parsedOrganizationDomain}/groups/details/${parsedName}`;
};

groupHelper.isUserInGroup = (group, userDistinguishedName) => {
  const groupMembers = group?.members;
  let isMember = false;

  if (Array.isArray(groupMembers) && groupMembers.length > 0 && userDistinguishedName) {
    groupMembers.forEach((member) => {
      if (member === userDistinguishedName) {
        isMember = true;
      }
    });
  }

  return isMember;
};

groupHelper.findUserGroupsByDistinguishedName = (groups, userDistinguishedName) => {
  const userGroups = [];

  if (Array.isArray(groups) && groups.length > 0 && userDistinguishedName) {
    groups.forEach((group) => {
      if (groupHelper.isUserInGroup(group, userDistinguishedName) === true) {
        userGroups.push(group);
      }
    });
  }

  return userGroups;
};