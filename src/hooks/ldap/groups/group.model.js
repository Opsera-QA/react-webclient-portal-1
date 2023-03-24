import ModelBase from "core/data_model/model.base";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import ldapGroupMetadata from "@opsera/definitions/constants/accounts/groups/user/ldapGroup.metadata";

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

  getDetailViewTitle = () => {
    const name = DataParsingHelper.parseString(this.getOriginalValue("name"), []);

    if (name === "PowerUsers") {
      return "Power Users";
    }

    if (name === "SecurityManagers") {
      return "Security Managers";
    }

    return name;
  };

  getType = () => {
    return "Group";
  }
}


