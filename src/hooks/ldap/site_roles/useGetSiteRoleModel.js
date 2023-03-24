import Model from "core/data_model/model";
import ldapSiteRoleMetadata from "@opsera/definitions/constants/accounts/groups/role/ldapSiteRoles.metadata";
import ldapGroupMetadata from "@opsera/definitions/constants/accounts/groups/user/ldapGroup.metadata";

export default function useGetSiteRoleModel() {
  const getSiteRoleModel = (
    siteRole,
    isNew,
  ) => {
    return new Model(siteRole, ldapGroupMetadata, isNew);
  };

  return ({
    getSiteRoleModel: getSiteRoleModel,
  });
}

