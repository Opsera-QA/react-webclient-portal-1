import ModelBase from "core/data_model/model.base";
import ldapGroupMetadata from "@opsera/definitions/constants/accounts/groups/user/ldapGroup.metadata";
import {groupHelper} from "components/settings/ldap_groups/group.helper";
import {siteRoleHelper} from "components/settings/ldap_site_roles/siteRole.helper";

export default class GroupModel extends ModelBase {
  constructor(
    data,
    newModel,
  ) {
    super(
      data,
      ldapGroupMetadata,
      newModel,
    );
  }

  canUpdate = () => {
    return false;
  };

  // canDelete = () => {
  //   return LdapUserGroupRoleHelper.canDeleteGroup(this.userData, this.getOriginalData());
  // };

  getDetailViewLink = () => {
    siteRoleHelper.getBaseDetailViewLink(this.organizationDomain, this.getData("name"));
  };

  getDetailViewTitle = () => {
    return siteRoleHelper.getFormattedSiteRoleName(this.getData("name"));
  };

  getType = () => {
    return "Group";
  }
}


