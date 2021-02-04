import React, {useState} from "react";
import ToolsTable from "components/inventory/tools/ToolsTable";
import TableCardView from "components/common/table/TableCardView";
import FilterBar from "components/common/filters/FilterBar";
import StatusFilter from "components/common/filters/status/StatusFilter";
import ToolIdentifierFilter from "components/common/filters/tools/ToolIdentifierFilter";
import TagFilter from "components/common/filters/tags/TagFilter";
import NewToolModal from "components/inventory/tools/NewToolModal";
import PropTypes from "prop-types";
import ToolCardView from "components/inventory/tools/ToolCardView";
import workflowAuthorizedActions
  from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";
import LdapOwnerFilter from "components/common/filters/pipelines/LdapOwnerFilter";

function ToolViews({toolFilterDto, setToolFilterDto, isLoading, loadData, data, saveCookies, customerAccessRules}) {
  const [showCreateToolModal, setShowCreateToolModal] = useState(false);

  const createNewTool = () => {
    setShowCreateToolModal(true);
  };

  const getFilterBar = () => {
    if (toolFilterDto == null) {
      return null;
    }

    const authorizedAction = (action, owner, objectRoles) => {
      return workflowAuthorizedActions.toolRegistryItems(customerAccessRules, action, owner, objectRoles);
    };

    return(
      <FilterBar
        loadData={loadData}
        filterDto={toolFilterDto}
        setFilterDto={setToolFilterDto}
        filters={["status", "toolIdentifier", "tag", "search"]}
        addRecordFunction={authorizedAction("create_tool") ? createNewTool : null}
        supportSearch={true}
        saveCookies={saveCookies}
        // supportViewToggle={true}
      >
        <StatusFilter filterDto={toolFilterDto} setFilterDto={setToolFilterDto} />
        <LdapOwnerFilter filterDto={toolFilterDto} setFilterDto={setToolFilterDto} />
        <ToolIdentifierFilter filterDto={toolFilterDto} setFilterDto={setToolFilterDto} />
        <TagFilter filterDto={toolFilterDto} setFilterDto={setToolFilterDto} />
      </FilterBar>
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

  return (
    <div className="px-2">
      {getFilterBar()}
      {getTableView()}
      <NewToolModal loadData={loadData} setShowModal={setShowCreateToolModal} showModal={showCreateToolModal}/>
    </div>
  );

  // return (
  //   <div className="px-2">
  //     {getFilterBar()}
  //     <TableCardView
  //       filterDto={toolFilterDto}
  //       setFilterDto={setToolFilterDto}
  //       isLoading={isLoading}
  //       loadData={loadData}
  //       cardView={getCardView()}
  //       tableView={getTableView()}
  //     />
  //     <NewToolModal loadData={loadData} setShowModal={setShowCreateToolModal} showModal={showCreateToolModal}/>
  //   </div>
  // );
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