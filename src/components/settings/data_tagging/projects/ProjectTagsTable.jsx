import React, { useMemo, useContext } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import projectTagsMetadata from "./tagging-project-metadata";
import { useHistory } from "react-router-dom";
import NewProjectMappingOverlay from "./NewProjectMappingOverlay";
import {getTableBooleanIconColumn, getTableTextColumn} from "components/common/table/table-column-helpers";
import {DialogToastContext} from "contexts/DialogToastContext";

function ProjectsTagTable({ data, loadData, isLoading, isMounted }) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  let fields = projectTagsMetadata.fields;

  const columns = useMemo(() => [
      getTableTextColumn(fields.find((field) => {return field.id === "tool_identifier";})),
      getTableTextColumn(fields.find((field) => {return field.id === "key";})),
      // getTableTextColumn(fields.find(field => { return field.id === "tool_id"})),
      getTableBooleanIconColumn(fields.find((field) => {return field.id === "active";})),
    ],
    []
  );

  const rowStyling = (row) => {
    return !row["values"].active ? " inactive-row" : "";
  };

  const selectedRow = (rowData) => {
    history.push(`/settings/data_mapping/projects/details/${rowData.original._id}`);
  };

  const noDataMessage = "No Project Mappings have been configured";

  const createProjectTag = () => {
    toastContext.showOverlayPanel(<NewProjectMappingOverlay loadData={loadData} isMounted={isMounted} />);
  };

  return (
      <CustomTable
        columns={columns}
        data={data}
        rowStyling={rowStyling}
        noDataMessage={noDataMessage}
        onRowSelect={selectedRow}
        isLoading={isLoading}
        tableTitle={"Project Mapping"}
        type={"Project Mapping"}
        createNewRecord={createProjectTag}
      />
  );
}

ProjectsTagTable.propTypes = {
  data: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  isMounted: PropTypes.object
};

export default ProjectsTagTable;
