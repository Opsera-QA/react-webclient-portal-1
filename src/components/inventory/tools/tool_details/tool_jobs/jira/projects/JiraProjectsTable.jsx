import React, {useMemo, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import NewJiraProjectModal from "components/inventory/tools/tool_details/tool_jobs/jira/projects/NewJiraProjectModal";
import jiraProjectMetadata from "components/inventory/tools/tool_details/tool_jobs/jira/projects/jira-project-metadata";
import {getTableTextColumn} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import {useHistory} from "react-router-dom";

function JiraProjectsTable({ toolData, loadData, selectRowFunction, isLoading }) {
  let history = useHistory();
  const fields = jiraProjectMetadata.fields;
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);

  const createJiraProject = () => {
    setShowCreateProjectModal(true);
  }

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "description")),
    ],
    []
  );

  const onRowSelect = (rowData) => {
    // selectRowFunction(rowData);
    history.push(`/inventory/tools/details/${toolData.getData("_id")}/projects/${rowData.original.id}`);
  };


  return (
    <div>
      <CustomTable
        columns={columns}
        data={toolData.getData("projects")}
        loadData={loadData}
        createNewRecord={createJiraProject}
        tableTitle={"Jira Projects"}
        type={"Jira Project"}
        onRowSelect={onRowSelect}
        isLoading={isLoading}
      />
      <NewJiraProjectModal toolData={toolData} loadData={loadData} setShowModal={setShowCreateProjectModal} showModal={showCreateProjectModal}/>
    </div>
  );
}

JiraProjectsTable.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  selectRowFunction: PropTypes.func,
  isLoading: PropTypes.bool
};

export default JiraProjectsTable;