import React, { useMemo, useContext } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import projectDataMappingMetadata from "components/settings/data_mapping/projects/projectDataMapping.metadata";
import { useHistory } from "react-router-dom";
import NewProjectDataMappingOverlay from "components/settings/data_mapping/projects/NewProjectDataMappingOverlay";
import {getTableBooleanIconColumn, getTableTextColumn} from "components/common/table/table-column-helpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import FilterContainer from "components/common/table/FilterContainer";
import {faTags} from "@fortawesome/pro-light-svg-icons";
import {getField} from "components/common/metadata/metadata-helpers";

function ProjectsTagTable({ data, loadData, isLoading, isMounted }) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  const fields = projectDataMappingMetadata.fields;

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

  const noDataMessage = "No Project Data Mapping Tags have been configured";

  const createProjectTag = () => {
    toastContext.showOverlayPanel(
      <NewProjectDataMappingOverlay
        loadData={loadData}
        isMounted={isMounted}
      />
    );
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
      metadata={projectDataMappingMetadata}
      titleIcon={faTags}
      title={"Project Data Mapping Tags"}
      type={"Project Data Mapping Tags"}
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
