import ModelBase from "core/data_model/model.base";
import {siteRoleHelper} from "components/settings/ldap_site_roles/siteRole.helper";
import ldapSiteRoleMetadata from "@opsera/definitions/constants/accounts/groups/role/ldapSiteRoles.metadata";

export default class SiteRoleModel extends ModelBase {
  constructor(
    data,
    newModel,
  ) {
    super(
      data,
      ldapSiteRoleMetadata,
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
  };
}


