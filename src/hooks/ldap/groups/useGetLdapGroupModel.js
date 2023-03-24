import Model from "core/data_model/model";
import ldapGroupMetadata from "@opsera/definitions/constants/accounts/groups/user/ldapGroup.metadata";

export default function useGetLdapGroupModel() {
  const getLdapGroupModel = (
    group,
    isNew,
  ) => {
    return new Model(group, ldapGroupMetadata, isNew);
  };

  return ({
    getLdapGroupModel: getLdapGroupModel,
  });
}

