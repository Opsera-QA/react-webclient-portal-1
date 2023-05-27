import React, {useEffect} from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import TagsTable from "components/settings/tags/TagsTable";
import TagManagementSubNavigationBar from "components/settings/tags/TagManagementSubNavigationBar";
import useGetFilteredCustomerTags from "hooks/settings/tags/useGetFilteredCustomerTags";
import NewTagOverlay from "components/settings/tags/NewTagOverlay";
import InlineTagTypeFilter from "components/common/filters/tags/tag_type/InlineTagTypeFilter";
import useComponentStateReference from "hooks/useComponentStateReference";
import SiteRoleHelper from "@opsera/know-your-role/roles/helper/site/siteRole.helper";
import TagFilterOverlay from "components/settings/tags/TagFilterOverlay";
import PaginationContainer from "components/common/pagination/PaginationContainer";

export default function TagManagement() {
  const {
    customerTags,
    tagFilterModel,
    setTagFilterModel,
    error,
    loadData,
    isLoading,
  } = useGetFilteredCustomerTags();
  const {
    toastContext,
    userData,
  } = useComponentStateReference();
  const siteRole = SiteRoleHelper.getSiteRoleLevel(userData);

  useEffect(() => {}, []);

  const createTag = () => {
    toastContext.showOverlayPanel(<NewTagOverlay loadData={loadData} />);
  };

  const getInlineFilters = () => {
    return (
      <InlineTagTypeFilter
        filterModel={tagFilterModel}
        setFilterModel={setTagFilterModel}
        loadData={loadData}
        className={"ml-2"}
      />
    );
  };

  return (
    <ScreenContainer
      breadcrumbDestination={"tagManagement"}
      navigationTabContainer={<TagManagementSubNavigationBar activeTab={"tags"} />}
      addRecordFunction={siteRole !== SiteRoleHelper.SITE_ROLES.AUDITOR && siteRole !== SiteRoleHelper.SITE_ROLES.SECURITY_MANAGER ? createTag : undefined}
      filterOverlay={<TagFilterOverlay tagFilterModel={tagFilterModel} loadDataFunction={loadData} />}
      titleActionBar={getInlineFilters()}
      filterModel={tagFilterModel}
      setFilterModel={setTagFilterModel}
      loadDataFunction={loadData}
    >
      <PaginationContainer
        loadData={loadData}
        isLoading={isLoading}
        filterDto={tagFilterModel}
        setFilterDto={setTagFilterModel}
        data={customerTags}
        nextGeneration={true}
      >
        <TagsTable
          loadData={loadData}
          isLoading={isLoading}
          data={customerTags}
          error={error}
        />
      </PaginationContainer>
    </ScreenContainer>
  );
}
