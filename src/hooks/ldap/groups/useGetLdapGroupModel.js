import useComponentStateReference from "hooks/useComponentStateReference";
import GroupModel from "hooks/ldap/groups/group.model";

export default function useGetLdapGroupModel() {
  const { userData } = useComponentStateReference();
  const getLdapGroupModel = (
    group,
    isNew,
  ) => {
    const newModel = new GroupModel(group, isNew);

    newModel.userData = userData;

    return newModel;
  };

  return ({
    getLdapGroupModel: getLdapGroupModel,
  });
}

