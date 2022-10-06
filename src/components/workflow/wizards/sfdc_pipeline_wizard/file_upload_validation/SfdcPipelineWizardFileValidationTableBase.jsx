import React, { useMemo }  from 'react';
import PropTypes from "prop-types";
import {
  getTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import sfdcTableConstants from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-table-constants";
import FilterContainer from "components/common/table/FilterContainer";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import VanityTable from "components/common/table/VanityTable";
import {getField} from "components/common/metadata/metadata-helpers";

// TODO: If we need to show different fields based on type,
//  just copy this into each individual directory (sfdc, git, org to org) and wire up the relevant fields
const SfdcPipelineWizardFileValidationTableBase = ({ pipelineWizardModel, loadData, data, isLoading, paginationModel, setPaginationModel, title, filePullCompleted, reasonAvailable }) => {
  const fields = sfdcTableConstants.fields;
  const noDataFilesPulledMessage = "The file validation has been completed. There is no data for the selected criteria.";
  const noDataFilesNotPulledMessage = "The file validation has not been been completed by the service yet. Please click the table's refresh button to resume polling for the files.";

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "commitAction")),
      getTableTextColumn(getField(fields, "componentType")),
      getTableTextColumn(getField(fields, "componentName")),
    ],
    [],
  );
  const reasonColumns = useMemo(
      () => [
        getTableTextColumn(getField(fields, "commitAction")),
        getTableTextColumn(getField(fields, "componentType")),
        getTableTextColumn(getField(fields, "componentName")),
        getTableTextColumn(getField(fields, "errorReason")),
      ],
      [],
  );

  const getFilesTable = () => {
    return (
      <VanityTable
        columns={reasonAvailable ? reasonColumns : columns}
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

SfdcPipelineWizardFileValidationTableBase.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object),
  loadData: PropTypes.func,
  title: PropTypes.string,
  paginationModel: PropTypes.object,
  setPaginationModel: PropTypes.func,
  pipelineWizardModel: PropTypes.object,
  filePullCompleted: PropTypes.bool,
  fileUploadFlag: PropTypes.bool,
  setFileUploadFlag: PropTypes.func,
  reasonAvailable: PropTypes.bool
};

SfdcPipelineWizardFileValidationTableBase.defaultProps = {
  reasonAvailable: false,
};

export default SfdcPipelineWizardFileValidationTableBase;