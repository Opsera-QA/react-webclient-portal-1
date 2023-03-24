import GroupModel from "hooks/ldap/groups/group.model";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function useGetSiteRoleModel() {
  const { userData } = useComponentStateReference();
  const getSiteRoleModel = (
    siteRole,
    isNew,
  ) => {
    const newModel = new GroupModel(siteRole, isNew);

    newModel.userData = userData;

    return newModel;
  };

  return ({
    getSiteRoleModel: getSiteRoleModel,
  });
}

