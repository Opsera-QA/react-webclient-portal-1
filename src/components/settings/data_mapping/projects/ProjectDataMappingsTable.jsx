import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { useHistory } from "react-router-dom";
import NewProjectDataMappingOverlay from "components/settings/data_mapping/projects/NewProjectDataMappingOverlay";
import {
  getTableBooleanIconColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import FilterContainer from "components/common/table/FilterContainer";
import {faTags} from "@fortawesome/pro-light-svg-icons";
import {getField} from "components/common/metadata/metadata-helpers";

function ProjectDataMappingsTable(
  {
    projectDataMappings,
    loadData,
    isLoading,
    isMounted,
    projectDataMappingMetadata,
  }) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns([]);
    loadColumnMetadata(projectDataMappingMetadata);
  }, [projectDataMappingMetadata]);

  const loadColumnMetadata = () => {
    if (isMounted?.current === true && Array.isArray(projectDataMappingMetadata?.fields)) {
      const fields = projectDataMappingMetadata.fields;

      setColumns(
        [
          getTableTextColumn(getField(fields,"tool_identifier")),
          getTableTextColumn(getField(fields,"key")),
          getTableBooleanIconColumn(getField(fields,"active")),
        ]
      );
    }
  };

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
        projectDataMappingMetadata={projectDataMappingMetadata}
      />
    );
  };

  const getProjectTagsTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={projectDataMappings}
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
      showBorder={false}
      body={getProjectTagsTable()}
      metadata={projectDataMappingMetadata}
      titleIcon={faTags}
      title={"Project Data Mapping Tags"}
      type={"Project Data Mapping Tags"}
      className={"pb-2"}
    />
  );
}

ProjectDataMappingsTable.propTypes = {
  projectDataMappings: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  isMounted: PropTypes.object,
  projectDataMappingMetadata: PropTypes.object,
};

export default ProjectDataMappingsTable;
