import React, {useState} from "react";
import ToolsTable from "components/inventory/tools/ToolsTable";
import TableCardView from "components/common/table/TableCardView";
import StatusFilter from "components/common/filters/status/StatusFilter";
import ToolIdentifierFilter from "components/common/filters/tools/ToolIdentifierFilter";
import TagFilter from "components/common/filters/tags/TagFilter";
import NewToolModal from "components/inventory/tools/NewToolModal";
import PropTypes from "prop-types";
import ToolCardView from "components/inventory/tools/ToolCardView";
import workflowAuthorizedActions
  from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";
import LdapOwnerFilter from "components/common/filters/pipelines/LdapOwnerFilter";
import FilterContainer from "components/common/table/FilterContainer";
import {faTools} from "@fortawesome/pro-light-svg-icons";

function ToolViews({toolFilterDto, setToolFilterDto, isLoading, loadData, data, saveCookies, customerAccessRules}) {
  const [showCreateToolModal, setShowCreateToolModal] = useState(false);

  const createNewTool = () => {
    setShowCreateToolModal(true);
  };

  const authorizedAction = (action, owner, objectRoles) => {
    return workflowAuthorizedActions.toolRegistryItems(customerAccessRules, action, owner, objectRoles);
  };

  const getDropdownFilters = () => {
    if (toolFilterDto == null) {
      return null;
    }

    return(
      <>
        <StatusFilter filterDto={toolFilterDto} setFilterDto={setToolFilterDto} className="mb-2" />
        <LdapOwnerFilter filterDto={toolFilterDto} setFilterDto={setToolFilterDto} className="mb-2" />
        <ToolIdentifierFilter filterDto={toolFilterDto} setFilterDto={setToolFilterDto} className={"mb-2"} />
        <TagFilter filterDto={toolFilterDto} setFilterDto={setToolFilterDto} />
      </>
    );
  };

  const getInlineFilters = () => {
    return (
      null
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
  }

  return (
    <div className="px-2 pb-2">
      <FilterContainer
        loadData={loadData}
        filterDto={toolFilterDto}
        setFilterDto={setToolFilterDto}
        addRecordFunction={authorizedAction("create_tool") ? createNewTool : null}
        supportSearch={true}
        saveCookies={saveCookies}
        supportViewToggle={true}
        isLoading={isLoading}
        body={getTableCardView()}
        dropdownFilters={getDropdownFilters()}
        inlineFilters={getInlineFilters()}
        titleIcon={faTools}
        title={"Tools"}
      />
      <NewToolModal loadData={loadData} setShowModal={setShowCreateToolModal} showModal={showCreateToolModal}/>
    </div>
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
};

export default ToolViews;