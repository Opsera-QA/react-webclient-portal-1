import React, {useContext} from "react";
import ToolsTable from "components/inventory/tools/ToolsTable";
import TableCardView from "components/common/table/TableCardView";
import ActiveFilter from "components/common/filters/status/ActiveFilter";
import NewToolOverlay from "components/inventory/tools/NewToolOverlay";
import PropTypes from "prop-types";
import ToolCardView from "components/inventory/tools/ToolCardView";
import workflowAuthorizedActions
  from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";
import FilterContainer from "components/common/table/FilterContainer";
import {faTools} from "@fortawesome/pro-light-svg-icons";
import LdapOwnerFilter from "components/common/filters/ldap/owner/LdapOwnerFilter";
import TagFilter from "components/common/filters/tags/tag/TagFilter";
import InlineToolIdentifierFilter from "components/common/filters/tools/tool_identifier/InlineToolIdentifierFilter";
import {DialogToastContext} from "contexts/DialogToastContext";
import toolMetadata from "components/inventory/tools/tool-metadata";

function ToolViews({toolFilterDto, setToolFilterDto, isLoading, loadData, data, saveCookies, customerAccessRules, isMounted}) {
  const toastContext = useContext(DialogToastContext);

  const createNewTool = () => {
    toastContext.showOverlayPanel(<NewToolOverlay loadData={loadData} isMounted={isMounted}/>);
  };

  const authorizedAction = (action, owner, objectRoles) => {
    return workflowAuthorizedActions.toolRegistryItems(customerAccessRules, action, owner, objectRoles);
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
        data={data}
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
        data={data}
        toolFilterDto={toolFilterDto}
        setToolFilterDto={setToolFilterDto}
      />
    );
  };

  const getTableCardView = () => {
    return (
      <TableCardView
        filterDto={toolFilterDto}
        data={data}
        isLoading={isLoading}
        loadData={loadData}
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
        addRecordFunction={authorizedAction("create_tool") ? createNewTool : null}
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

ToolViews.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  toolFilterDto: PropTypes.object,
  setToolFilterDto: PropTypes.func,
  createNewRecord: PropTypes.func,
  loadData: PropTypes.func,
  saveCookies: PropTypes.func,
  customerAccessRules: PropTypes.object,
  isMounted: PropTypes.object
};

export default ToolViews;