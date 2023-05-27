import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import tagMetadata from "components/settings/tags/tag.metadata";
import {
  getFormattedLabelWithFunctionColumnDefinition,
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import NewTagOverlay from "components/settings/tags/NewTagOverlay";
import ActiveFilter from "components/common/filters/status/ActiveFilter";
import FilterContainer from "components/common/table/FilterContainer";
import {faTags} from "@fortawesome/pro-light-svg-icons";
import InlineTagTypeFilter from "components/common/filters/tags/tag_type/InlineTagTypeFilter";
import {DialogToastContext} from "contexts/DialogToastContext";
import TagTypeFilter from "components/common/filters/tags/tag_type/TagTypeFilter";
import useComponentStateReference from "hooks/useComponentStateReference";
import SiteRoleHelper from "@opsera/know-your-role/roles/helper/site/siteRole.helper";
import tagTypeConstants from "@opsera/definitions/constants/settings/tags/tagType.constants";

function TagsTable(
  {
    data,
    loadData,
    isLoading,
    tagFilterDto,
    setTagFilterDto,
    isMounted,
    error,
  }) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  const fields = tagMetadata.fields;
  const { userData } = useComponentStateReference();
  const siteRole = SiteRoleHelper.getSiteRoleLevel(userData);

  const columns = useMemo(
    () => [
      getFormattedLabelWithFunctionColumnDefinition(getField(fields, "type"), tagTypeConstants.getTagTypeLabel),
      getTableTextColumn(getField(fields, "value")),
      getTableBooleanIconColumn(getField(fields, "active")),
      getTableDateColumn(getField(fields, "createdAt")),
    ],
    []
  );

  const onRowSelect = (rowData, type) => {
    history.push("/settings/tags/" + rowData.original._id);
  };

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const createTag = () => {
    toastContext.showOverlayPanel(<NewTagOverlay loadData={loadData} isMounted={isMounted} />);
  };

  const getDropdownFilters = () => {
    return (
      <>
        <TagTypeFilter filterModel={tagFilterDto} setFilterModel={setTagFilterDto} className={"mb-2"} />
        <ActiveFilter filterDto={tagFilterDto} setFilterDto={setTagFilterDto} />
      </>
    );
  };

  const getInlineFilters = () => {
    return (
      <InlineTagTypeFilter filterModel={tagFilterDto} setFilterModel={setTagFilterDto} loadData={loadData} className={"mr-2"} />
    );
  };

  const getTagsTable = () => {
    return (
      <CustomTable
        onRowSelect={onRowSelect}
        data={data}
        rowStyling={rowStyling}
        columns={columns}
        isLoading={isLoading}
        loadData={loadData}
        paginationDto={tagFilterDto}
        setPaginationDto={setTagFilterDto}
        error={error}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      filterDto={tagFilterDto}
      setFilterDto={setTagFilterDto}
      addRecordFunction={siteRole !== SiteRoleHelper.SITE_ROLES.AUDITOR && siteRole !== SiteRoleHelper.SITE_ROLES.SECURITY_MANAGER ? createTag : undefined}
      supportSearch={true}
      isLoading={isLoading}
      body={getTagsTable()}
      inlineFilters={getInlineFilters()}
      dropdownFilters={getDropdownFilters()}
      metadata={tagMetadata}
      titleIcon={faTags}
      title={"Tags"}
      className={"px-2 pb-2"}
    />
  );
}

TagsTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  tagFilterDto: PropTypes.object,
  activeTagFilterDto: PropTypes.object,
  setTagFilterDto: PropTypes.func,
  isMounted: PropTypes.object,
  error: PropTypes.any,
};

export default TagsTable;