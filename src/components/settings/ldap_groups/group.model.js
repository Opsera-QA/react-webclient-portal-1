import ModelBase from "core/data_model/model.base";
import ldapGroupMetadata from "@opsera/definitions/constants/accounts/groups/user/ldapGroup.metadata";
import {groupHelper} from "components/settings/ldap_groups/group.helper";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

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
    groupHelper.getDetailViewLink(this.organizationDomain, this.getData("name"));
  };

  getDetailViewTitle = () => {
    return DataParsingHelper.parseString(this.getData("name"), "");
  };

  getType = () => {
    return "Group";
  };
}


