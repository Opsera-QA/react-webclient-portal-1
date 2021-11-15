import React, {useContext} from "react";
import ToolsTable from "components/inventory/tools/ToolsTable";
import TableCardView from "components/common/table/TableCardView";
import ActiveFilter from "components/common/filters/status/ActiveFilter";
import NewToolOverlay from "components/inventory/tools/create_overlay/NewToolOverlay";
import PropTypes from "prop-types";
import ToolCardView from "components/inventory/tools/ToolCardView";
import FilterContainer from "components/common/table/FilterContainer";
import {faTools} from "@fortawesome/pro-light-svg-icons";
import LdapOwnerFilter from "components/common/filters/ldap/owner/LdapOwnerFilter";
import TagFilter from "components/common/filters/tags/tag/TagFilter";
import InlineToolIdentifierFilter from "components/common/filters/tools/tool_identifier/InlineToolIdentifierFilter";
import {DialogToastContext} from "contexts/DialogToastContext";
import {isActionAllowed} from "components/common/helpers/role-helpers";

function ToolTableCardView(
  {
    toolFilterDto,
    setToolFilterDto,
    toolMetadata,
    isLoading,
    loadData,
    tools,
    saveCookies,
    customerAccessRules,
    roleDefinitions,
    isMounted
  }) {
  const toastContext = useContext(DialogToastContext);

  const createNewTool = () => {
    toastContext.showOverlayPanel(
      <NewToolOverlay
        loadData={loadData}
        isMounted={isMounted}
        toolMetadata={toolMetadata}
      />
    );
  };

  const getCreateNewToolFunction = () => {
    const canCreate = isActionAllowed(customerAccessRules, "create_tool", undefined, undefined, roleDefinitions);
    if (canCreate === true) {
     return createNewTool;
    }
  };

  const getDropdownFilters = () => {
    return(
      <>
        <ActiveFilter filterDto={toolFilterDto} setFilterDto={setToolFilterDto} className="mb-2" />
        <LdapOwnerFilter filterDto={toolFilterDto} setFilterDto={setToolFilterDto} className="mb-2" />
        <TagFilter filterDto={toolFilterDto} setFilterDto={setToolFilterDto} />
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
        toolMetadata={toolMetadata}
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
        isMounted={isMounted}
        toolMetadata={toolMetadata}
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
        saveCookies={saveCookies}
        supportViewToggle={true}
        isLoading={isLoading}
        metadata={toolMetadata}
        body={getTableCardView()}
        dropdownFilters={getDropdownFilters()}
        inlineFilters={getInlineFilters()}
        titleIcon={faTools}
        title={"Tools"}
        className="px-2 pb-2"
      />
  );
}

ToolTableCardView.propTypes = {
  tools: PropTypes.array,
  isLoading: PropTypes.bool,
  toolFilterDto: PropTypes.object,
  setToolFilterDto: PropTypes.func,
  createNewRecord: PropTypes.func,
  loadData: PropTypes.func,
  saveCookies: PropTypes.func,
  customerAccessRules: PropTypes.object,
  isMounted: PropTypes.object,
  toolMetadata: PropTypes.object,
  roleDefinitions: PropTypes.object,
};

export default ToolTableCardView;