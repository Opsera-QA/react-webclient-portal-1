import React, { useMemo }  from 'react';
import PropTypes from "prop-types";
import {
  getTableDateTimeColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import sfdcTableConstants from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-table-constants";
import FilterContainer from "components/common/table/FilterContainer";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import VanityTable from "components/common/table/VanityTable";

const SfdcPipelineWizardOrganizationFilesTableBase = ({ pipelineWizardModel, loadData, data, isLoading, paginationModel, setPaginationModel, title, filePullCompleted }) => {
  const fields = sfdcTableConstants.fields;
  const noDataFilesPulledMessage = "The Git Files pull has been completed. There is no data for the selected criteria.";
  const noDataFilesNotPulledMessage = "The Git Files list has not been received from SFDC yet. Please click the table's refresh button to resume polling for the files.";

  const columns = useMemo(
    () => [
      {...getTableTextColumn(fields.find(field => { return field.id === "componentName";})), class: "force-text-wrap"},
      getTableDateTimeColumn(fields.find(field => { return field.id === "committedTime";})),
    ],
    [],
  );

  const getFilesTable = () => {
    return (
      <VanityTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        loadData={loadData}
        noDataMessage={filePullCompleted ? noDataFilesPulledMessage : noDataFilesNotPulledMessage}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      filterDto={paginationModel}
      setFilterDto={setPaginationModel}
      isLoading={isLoading}
      title={title}
      titleIcon={faCode}
      body={getFilesTable()}
      supportSearch={true}
      showBorder={false}
    />
  );
};

SfdcPipelineWizardOrganizationFilesTableBase.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object),
  loadData: PropTypes.func,
  title: PropTypes.string,
  paginationModel: PropTypes.object,
  setPaginationModel: PropTypes.func,
  pipelineWizardModel: PropTypes.object,
  filePullCompleted: PropTypes.bool,
  fileUploadFlag: PropTypes.bool,
  setFileUploadFlag: PropTypes.func
};

export default SfdcPipelineWizardOrganizationFilesTableBase;