import React, {useState, useEffect, useContext, useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableBooleanIconColumn,
  getTableDateColumn,
  getTableTextColumn,
  getTableButtonColumn,
  getGitTaskTableRunButtonColumn,
  getPipelineActivityStatusColumn
} from "components/common/table/table-column-helpers";
import gitTasksMetadata from "./git-tasks-metadata";
import Model from "core/data_model/model";
import {useHistory} from "react-router-dom";
import CustomModalDialog from "components/common/modal/modal.jsx";
import { DialogToastContext } from "contexts/DialogToastContext";
import SFDCViewOverlay from "components/git/git_task_details/configuration_forms/sfdc/SFDCViewOverlay";

function GitTasksTable({ data, gitTasksFilterDto, setGitTasksFilterDto, loadData, isLoading }) {
  const toastContext = useContext(DialogToastContext);
  let history = useHistory();
  const fields = gitTasksMetadata.fields;
  const [showModal, setShowModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(false);
  
  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const handleConfirmation = (rowData) => {
    console.log(rowData);
    setSelectedRowData(new Model(rowData, gitTasksMetadata, false));
    // history.push({pathname: `/git/details/${rowData._id}`, state: { runTask : true }});
    // TODO: Create a new modal for confirmation and then direclty proceed with sfdc component selection
    setShowModal(true);
  };

  const handleCancelModal = () => {
    setSelectedRowData({});
    setShowModal(false);
  };

  const handleRunGitTask = () => {   
    setShowModal(false);
    if (selectedRowData.getData("type") !== "sync-sfdc-repo") {
      return;
    }
    // open sfdc wizard views
    toastContext.showOverlayPanel(<SFDCViewOverlay gitTasksData={selectedRowData} refreshData={loadData}/>);
  };

  const viewDetails = (rowData) => {
    history.push({pathname: `/git/details/${rowData._id}`, state: { runTask : false }});
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name";})),
      getTableTextColumn(fields.find(field => { return field.id === "description";})),
      getTableTextColumn(fields.find(field => { return field.id === "type";})),
      getTableDateColumn(fields.find(field => { return field.id === "createdAt";})),
      getTableBooleanIconColumn(fields.find(field => { return field.id === "active";})),
      getPipelineActivityStatusColumn(fields.find(field => { return field.id === "status";})),
      getTableButtonColumn("_id", "", "outline-primary", "View Details", viewDetails),
      getGitTaskTableRunButtonColumn("row", "", "primary", "Run Task", handleConfirmation),
    ],
    []
  );

  return (
    <>
      <CustomTable
        className={"no-table-border"}
        columns={columns}
        data={data}
        isLoading={isLoading}
        // onRowSelect={onRowSelect}
        paginationDto={gitTasksFilterDto}
        setPaginationDto={setGitTasksFilterDto}
        rowStyling={rowStyling}
        loadData={loadData}
      />
      {showModal && <CustomModalDialog show={showModal} header="Git Task Confirmation" message={`Do you want to run "${selectedRowData.getData("name")}" task?`} size="lg" handleCancelModal={handleCancelModal} handleConfirmModal={handleRunGitTask}/>}
    </>
  );
}

GitTasksTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  gitTasksFilterDto: PropTypes.object,
  setGitTasksFilterDto: PropTypes.func,
};

export default GitTasksTable;