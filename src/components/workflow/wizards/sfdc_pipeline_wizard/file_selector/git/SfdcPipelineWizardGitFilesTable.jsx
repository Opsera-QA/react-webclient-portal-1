import React, { useMemo }  from 'react';
import PropTypes from "prop-types";
import {
  getTableDateTimeColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import sfdcTableConstants from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-table-constants";
import FilterContainer from "components/common/table/FilterContainer";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import InlineSfdcComponentTypesFilter from "components/common/filters/sfdc/sfdc_component/InlineSfdcComponentTypesFilter";
import VanityTable from "components/common/table/VanityTable";
import {getField} from "components/common/metadata/metadata-helpers";
import SfdcPipelineWizardGitRulesInput
  from "components/workflow/wizards/sfdc_pipeline_wizard/file_selector/git/SfdcPipelineWizardGitRulesInput";
import InlineWarning from "components/common/status_notifications/inline/InlineWarning";

const SfdcPipelineWizardGitFilesTable = ({ pipelineWizardModel, setPipelineWizardModel, loadData, gitFiles, isLoading, gitFilesPaginationModel, setGitFilesPaginationModel, filePullCompleted }) => {
  const fields = sfdcTableConstants.fields;
  const noDataFilesPulledMessage = "The Git Files pull has been completed. There is no data for the selected criteria.";
  const noDataFilesNotPulledMessage = "The Git Files list has not been received from Salesforce yet. Please click the table's refresh button to resume polling for the files.";

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "commitAction"), undefined, 120),
      getTableTextColumn(getField(fields, "componentType")),
      getTableTextColumn(getField(fields, "componentName")),
      getTableTextColumn(getField(fields, "committedFile")),
      getTableDateTimeColumn(getField(fields, "committedTime")),
      getTableTextColumn(getField(fields, "committedBy")),
      getTableTextColumn(getField(fields, "commitID"), undefined, 300),
    ],
    [],
  );

  const getGitInlineFilters = () => {
    return (
      <InlineSfdcComponentTypesFilter
        className={"px-2"}
        componentTypes={pipelineWizardModel.getArrayData("selectedComponentTypes")}
        filterDto={gitFilesPaginationModel}
        setFilterDto={setGitFilesPaginationModel}
        loadData={loadData}
      />
    );
  };

  const getGitModifiedFilesView = () => {
    return (
      <div>
        <VanityTable
          columns={columns}
          data={gitFiles}
          isLoading={isLoading}
          loadData={loadData}
          noDataMessage={filePullCompleted ? noDataFilesPulledMessage : noDataFilesNotPulledMessage}
          paginationModel={gitFilesPaginationModel}
          setPaginationModel={setGitFilesPaginationModel}
        />
      </div>
    );
  };

  return (
    <div>
      <SfdcPipelineWizardGitRulesInput
        pipelineWizardModel={pipelineWizardModel}
        gitFiles={gitFiles}
        setPipelineWizardModel={setPipelineWizardModel}
        isLoading={isLoading}
        filePullCompleted={filePullCompleted}
      />
      <InlineWarning
        className={"ml-2"}
        warningMessage={"Warning: Use of the component or keyword search filter in the table below will not alter the final filtered file list."}
      />
      <FilterContainer
        loadData={loadData}
        filterDto={gitFilesPaginationModel}
        setFilterDto={setGitFilesPaginationModel}
        isLoading={isLoading}
        title={"Git Files"}
        titleIcon={faCode}
        body={getGitModifiedFilesView()}
        supportSearch={true}
        showBorder={false}
        inlineFilters={getGitInlineFilters()}
      />
    </div>
  );

};

SfdcPipelineWizardGitFilesTable.propTypes = {
  isLoading: PropTypes.bool,
  gitFiles: PropTypes.arrayOf(PropTypes.object),
  loadData: PropTypes.func,
  gitFilesPaginationModel: PropTypes.object,
  setGitFilesPaginationModel: PropTypes.func,
  setPipelineWizardModel: PropTypes.func,
  filePullCompleted: PropTypes.bool,
  pipelineWizardModel: PropTypes.object
};

export default SfdcPipelineWizardGitFilesTable;