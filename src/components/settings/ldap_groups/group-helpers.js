export function isUserInGroup(group, emailAddress) {
  const groupMembers = group?.members;
  let isMember = false;

  if (Array.isArray(groupMembers) && groupMembers.length > 0 && emailAddress) {
    groupMembers.forEach((member) => {
      if (member.emailAddress === emailAddress) {
        isMember = true;
      }
    });
  }

  return isMember;
}

export function findUserGroups(groups, emailAddress) {
  const userGroups = [];

  if (Array.isArray(groups) && groups.length > 0 && emailAddress) {
    groups.forEach((group) => {
      if (isUserInGroup(group, emailAddress) === true) {
        userGroups.push(group);
      }
    });
  }

  return userGroups;
}