import Model from "core/data_model/model";
import {ldapGroupMetaData} from "components/settings/ldap_groups/ldapGroup.metadata";

export default function useGetLdapGroupModel() {
  const getLdapGroupModel = (
    group,
    isNew,
  ) => {
    return new Model(group, ldapGroupMetaData, isNew);
  };

  return ({
    getLdapGroupModel: getLdapGroupModel,
  });
}

