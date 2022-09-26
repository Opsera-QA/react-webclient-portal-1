import React from "react";
import ToolsTable from "components/inventory/tools/ToolsTable";
import TableCardView from "components/common/table/TableCardView";
import ActiveFilter from "components/common/filters/status/ActiveFilter";
import NewToolOverlay from "components/inventory/tools/create_overlay/NewToolOverlay";
import PropTypes from "prop-types";
import ToolCardView from "components/inventory/tools/ToolCardView";
import FilterContainer from "components/common/table/FilterContainer";
import {faTools} from "@fortawesome/pro-light-svg-icons";
import TagFilter from "components/common/filters/tags/tag/TagFilter";
import InlineToolIdentifierFilter from "components/common/filters/tools/tool_identifier/InlineToolIdentifierFilter";
import OwnerFilter from "components/common/filters/ldap/owner/OwnerFilter";
import RegistryToolRoleHelper from "@opsera/know-your-role/roles/registry/tools/registryToolRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import registryToolMetadata from "@opsera/definitions/constants/registry/tools/registryTool.metadata";

function ToolTableCardView(
  {
    toolFilterDto,
    setToolFilterDto,
    isLoading,
    loadData,
    tools,
  }) {
  const {
    userData,
    toastContext,
  } = useComponentStateReference();

  const createNewTool = () => {
    toastContext.showOverlayPanel(
      <NewToolOverlay
        loadData={loadData}
      />
    );
  };

  const getCreateNewToolFunction = () => {
    const canCreate = RegistryToolRoleHelper.canCreateRegistryTool(userData);
    if (canCreate === true) {
     return createNewTool;
    }
  };

  const getDropdownFilters = () => {
    return(
      <>
        <ActiveFilter
          filterDto={toolFilterDto}
          setFilterDto={setToolFilterDto}
          className={"mb-2"}
        />
        <OwnerFilter
          filterModel={toolFilterDto}
          setFilterModel={setToolFilterDto}
          className={"mb-2"}
        />
        <TagFilter
          filterDto={toolFilterDto}
          setFilterDto={setToolFilterDto}
        />
      </>
    );
  };

  const getInlineFilters = () => {
    return (
      <InlineToolIdentifierFilter
        filterModel={toolFilterDto}
        setFilterModel={setToolFilterDto}
        loadData={loadData}
        className={"mr-2"}
        isLoading={isLoading}
      />
    );
  };

  const getCardView = () => {
    return (
      <ToolCardView
        isLoading={isLoading}
        loadData={loadData}
        data={tools}
        toolFilterDto={toolFilterDto}
        setToolFilterDto={setToolFilterDto}
      />
    );
  };

  const getTableView = () => {
    return (
      <ToolsTable
        isLoading={isLoading}
        loadData={loadData}
        data={tools}
        toolFilterDto={toolFilterDto}
        setToolFilterDto={setToolFilterDto}
      />
    );
  };

  const getTableCardView = () => {
    return (
      <TableCardView
        filterModel={toolFilterDto}
        data={tools}
        isLoading={isLoading}
        cardView={getCardView()}
        tableView={getTableView()}
      />
    );
  };

  return (
      <FilterContainer
        loadData={loadData}
        filterDto={toolFilterDto}
        setFilterDto={setToolFilterDto}
        addRecordFunction={getCreateNewToolFunction()}
        supportSearch={true}
        supportViewToggle={true}
        isLoading={isLoading}
        metadata={registryToolMetadata}
        body={getTableCardView()}
        dropdownFilters={getDropdownFilters()}
        inlineFilters={getInlineFilters()}
        titleIcon={faTools}
        title={"Tools"}
        className={"px-2 pb-2"}
      />
  );
}

ToolTableCardView.propTypes = {
  tools: PropTypes.array,
  isLoading: PropTypes.bool,
  toolFilterDto: PropTypes.object,
  setToolFilterDto: PropTypes.func,
  loadData: PropTypes.func,
};

export default ToolTableCardView;