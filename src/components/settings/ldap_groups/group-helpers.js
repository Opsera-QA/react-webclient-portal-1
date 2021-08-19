export function isUserInGroup(group, userDistinguishedName) {
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
}

export function findUserGroupsByDistinguishedName(groups, userDistinguishedName) {
  const userGroups = [];

  if (Array.isArray(groups) && groups.length > 0 && userDistinguishedName) {
    groups.forEach((group) => {
      if (isUserInGroup(group, userDistinguishedName) === true) {
        userGroups.push(group);
      }
    });
  }

  return userGroups;
}