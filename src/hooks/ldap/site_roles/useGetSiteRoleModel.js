import Model from "core/data_model/model";
import ldapSiteRoleMetadata from "@opsera/definitions/constants/accounts/groups/role/ldapSiteRoles.metadata";
import {ldapGroupMetaData} from "components/settings/ldap_groups/ldapGroup.metadata";

export default function useGetSiteRoleModel() {
  const getSiteRoleModel = (
    siteRole,
    isNew,
  ) => {
    return new Model(siteRole, ldapGroupMetaData, isNew);
  };

  return ({
    getSiteRoleModel: getSiteRoleModel,
  });
}

