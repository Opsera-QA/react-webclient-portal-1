import React, { useMemo, useContext } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import projectMappingMetadata from "components/settings/data_mapping/projects/projectMapping.metadata";
import { useHistory } from "react-router-dom";
import NewProjectMappingOverlay from "./NewProjectMappingOverlay";
import {getTableBooleanIconColumn, getTableTextColumn} from "components/common/table/table-column-helpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import FilterContainer from "components/common/table/FilterContainer";
import {faTags} from "@fortawesome/pro-light-svg-icons";
import {getField} from "components/common/metadata/metadata-helpers";

function ProjectsTagTable({ data, loadData, isLoading, isMounted }) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  let fields = projectMappingMetadata.fields;

  const columns = useMemo(() => [
      getTableTextColumn(getField(fields,"tool_identifier")),
      getTableTextColumn(getField(fields,"key")),
      getTableBooleanIconColumn(getField(fields,"active")),
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

  const getProjectTagsTable = () => {
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
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      addRecordFunction={createProjectTag}
      supportSearch={false}
      isLoading={isLoading}
      body={getProjectTagsTable()}
      metadata={projectMappingMetadata}
      titleIcon={faTags}
      title={"Project Tags"}
      type={"Project Tag"}
      className={"px-2 pb-2"}
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
