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
import TagTypeFilter from "../../../common/filters/tags/tag_type/TagTypeFilter";
import ActiveFilter from "../../../common/filters/status/ActiveFilter";
import InlineTagTypeFilter from "../../../common/filters/tags/tag_type/InlineTagTypeFilter";
import ProjectMappingToolIdentifierSelectInput
  from "../../../common/list_of_values_input/settings/data_tagging/projects/ProjectMappingToolIdentifierSelectInput";
import tagMetadata from "../../tags/tag.metadata";
import InLineToolTypeFilter from "../../../common/filters/data_mapping/InLineToolTypeFilter";
import ToolTypeFilter from "../../../common/filters/data_mapping/ToolTypeFilter";
import ProjectDataMappingActiveFilter from "../../../common/filters/status/ProjectDataMappingActiveFilter";

function ProjectDataMappingsTable(
  {
    projectDataMappings,
    loadData,
    isLoading,
    isMounted,
    projectDataMappingMetadata,
      toolFilterDto,
      setToolFilterDto
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

  const getDropdownFilters = () => {
    return (
        <>
          <ToolTypeFilter filterModel={toolFilterDto} setFilterModel={setToolFilterDto} className={"mb-2"} />
          <ProjectDataMappingActiveFilter filterDto={toolFilterDto} setFilterDto={setToolFilterDto} />
        </>
    );
  };

  const getInlineFilters = () => {
    return (
        <InLineToolTypeFilter filterModel={toolFilterDto} setFilterModel={setToolFilterDto} loadData={loadData} className={"mr-2"} />
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
      filterDto={toolFilterDto}
      setFilterDto={setToolFilterDto}
      addRecordFunction={createProjectTag}
      supportSearch={true}
      isLoading={isLoading}
      showBorder={false}
      body={getProjectTagsTable()}
      inlineFilters={getInlineFilters()}
      dropdownFilters={getDropdownFilters()}
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
  toolFilterDto: PropTypes.object,
  setToolFilterDto: PropTypes.func,
};

export default ProjectDataMappingsTable;
