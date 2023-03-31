import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import CreateJiraToolProjectOverlay from "components/inventory/tools/tool_details/tool_jobs/jira/projects/CreateJiraToolProjectOverlay";
import {jiraToolProjectMetadata} from "components/inventory/tools/tool_details/tool_jobs/jira/projects/jiraToolProject.metadata";
import {getLimitedTableTextColumn, getTableTextColumn} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import {useHistory} from "react-router-dom";
import {faBrowser} from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import {DialogToastContext} from "contexts/DialogToastContext";

function JiraToolProjectsTable({ toolData, loadData, isLoading }) {
  const toastContext = useContext(DialogToastContext);
  let history = useHistory();
  const fields = jiraToolProjectMetadata.fields;

  const createJiraProject = () => {
    toastContext.showOverlayPanel(
      <CreateJiraToolProjectOverlay
        toolData={toolData}
        loadData={loadData}
      />
    );
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getLimitedTableTextColumn(getField(fields, "description"), 100),
    ],
    []
  );

  const onRowSelect = (rowData) => {
    history.push(`/inventory/tools/details/${toolData.getData("_id")}/projects/${rowData.original._id}`);
  };

  const getJiraProjectsTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={toolData.getData("projects")}
        onRowSelect={onRowSelect}
        isLoading={isLoading}
      />
    );
  };

  return (
    <FilterContainer
      showBorder={false}
      loadData={loadData}
      addRecordFunction={createJiraProject}
      body={getJiraProjectsTable()}
      isLoading={isLoading}
      metadata={jiraToolProjectMetadata}
      titleIcon={faBrowser}
      title={"Projects"}
    />
  );
}

JiraToolProjectsTable.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  selectRowFunction: PropTypes.func,
  isLoading: PropTypes.bool
};

export default JiraToolProjectsTable;