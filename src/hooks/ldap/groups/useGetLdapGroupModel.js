import useComponentStateReference from "hooks/useComponentStateReference";
import GroupModel from "components/settings/ldap_groups/group.model";

export default function useGetLdapGroupModel() {
  const { userData } = useComponentStateReference();
  const getLdapGroupModel = (
    organizationDomain,
    group,
    isNew,
  ) => {
    const newModel = new GroupModel(group, isNew);
    newModel.organizationDomain = organizationDomain;
    newModel.userData = userData;

    return newModel;
  };

  return ({
    getLdapGroupModel: getLdapGroupModel,
  });
}

