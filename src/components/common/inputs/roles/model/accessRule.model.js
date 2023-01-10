import ModelBase from "core/data_model/model.base";
import {roleAccessRuleMetadata} from "components/common/inputs/roles/model/roleAccessRule.metadata";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import RoleParsingHelper from "@opsera/persephone/helpers/data/roles/roleParsing.helper";

// TODO: Put these in library
const ROLE_ACCESS_RULE_TYPES = {
  USER: "user",
  GROUP: "group",
  SITE_ROLE: "site_role",
};

const getRoleAccessType = (rule) => {
  const parsedRule = DataParsingHelper.parseObject(rule);

  if (!parsedRule) {
    return undefined;
  }

  const userRule = DataParsingHelper.parseEmailAddress(parsedRule?.user);

  if (userRule) {
    return ROLE_ACCESS_RULE_TYPES.USER;
  }

  const groupRule = DataParsingHelper.parseString(parsedRule?.group);

  if (groupRule) {
    return ROLE_ACCESS_RULE_TYPES.GROUP;
  }

  const siteRoleRule = DataParsingHelper.parseString(parsedRule?.site_role);

  if (siteRoleRule) {
    return ROLE_ACCESS_RULE_TYPES.SITE_ROLE;
  }
};

export default class AccessRuleModel extends ModelBase {
  constructor(
    data,
    newModel,
  ) {
    super(
      data,
      roleAccessRuleMetadata,
      newModel,
    );
  }

  // TODO: Put in access rule helper in roles library
  getType = () => {
    const type = getRoleAccessType(this.data);

    if (!type) {
      return this.getData("type");
    }

    return type;
  };

  isRoleComplete = () => {
    return RoleParsingHelper.isRoleValid(this.data);
  };
}


