import useComponentStateReference from "hooks/useComponentStateReference";
import SiteRoleModel from "components/settings/ldap_site_roles/siteRole.model";

export default function useGetSiteRoleModel() {
  const { userData } = useComponentStateReference();
  const getSiteRoleModel = (
    organizationDomain,
    siteRole,
    isNew,
  ) => {
    const newModel = new SiteRoleModel(siteRole, isNew);
    newModel.organizationDomain = organizationDomain;
    newModel.userData = userData;

    return newModel;
  };

  return ({
    getSiteRoleModel: getSiteRoleModel,
  });
}

