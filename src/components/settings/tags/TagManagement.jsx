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
import TableCardView from "components/common/table/TableCardView";
import {
  FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION
} from "components/common/table/FilterContainer";

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

  const getTableView = () => {
    return (
      <TagsTable
        loadData={loadData}
        isLoading={isLoading}
        data={customerTags}
        error={error}
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
        <TableCardView
          filterModel={tagFilterModel}
          isLoading={isLoading}
          data={customerTags}
          cardView={getTableView()}
          tableView={getTableView()}
          tableHeight={FILTER_CONTAINER_FULL_HEIGHT_IN_SCREEN_CONTAINER_MINUS_DESCRIPTION}
        />
      </PaginationContainer>
    </ScreenContainer>
  );
}
