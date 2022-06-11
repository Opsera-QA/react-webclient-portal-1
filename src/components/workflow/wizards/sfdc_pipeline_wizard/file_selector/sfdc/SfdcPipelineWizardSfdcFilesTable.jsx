import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {
  getTableDateTimeColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import sfdcTableConstants from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-table-constants";
import FilterContainer from "components/common/table/FilterContainer";
import InlineSfdcComponentTypesFilter from "components/common/filters/sfdc/sfdc_component/InlineSfdcComponentTypesFilter";
import VanityTable from "components/common/table/VanityTable";
import {faSalesforce} from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import SfdcPipelineWizardSfdcRulesInput
  from "components/workflow/wizards/sfdc_pipeline_wizard/file_selector/sfdc/SfdcPipelineWizardSfdcRulesInput";
import InlineWarning from "components/common/status_notifications/inline/InlineWarning";

const SfdcPipelineWizardSfdcFilesTable = ({ pipelineWizardModel, setPipelineWizardModel, loadData, sfdcFiles, isLoading, setPipelineWizardScreen, sfdcFilesPaginationModel, setSfdcFilesPaginationModel, filePullCompleted }) => {
  const fields = sfdcTableConstants.fields;
  const noDataFilesPulledMessage = "The Salesforce Files pull has been completed. There is no data for the selected criteria.";
  const noDataFilesNotPulledMessage = "The Salesforce Files list has not been received from SFDC yet. Please click the table's refresh button to resume polling for the files.";
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);


  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "committedFileId";})),
      getTableTextColumn(fields.find(field => { return field.id === "componentType";})),
      getTableTextColumn(fields.find(field => { return field.id === "componentName";}), "force-text-wrap"),
      getTableDateTimeColumn(fields.find(field => { return field.id === "committedTime";})),
      getTableTextColumn(fields.find(field => { return field.id === "committedBy";})),
    ],
    [],
  );

  const getSfdcInlineFilters = () => {
    return (
      <InlineSfdcComponentTypesFilter
        className={"mx-2"}
        componentTypes={pipelineWizardModel.getArrayData("selectedComponentTypes")}
        filterDto={sfdcFilesPaginationModel}
        setFilterDto={setSfdcFilesPaginationModel}
        loadData={loadData}
      />
    );
  };

  const getView = () => {
    return (
      <div>
        <VanityTable
          columns={columns}
          data={sfdcFiles}
          isLoading={isLoading}
          loadData={loadData}
          noDataMessage={filePullCompleted ? noDataFilesPulledMessage : noDataFilesNotPulledMessage}
          paginationModel={sfdcFilesPaginationModel}
          setPaginationModel={setSfdcFilesPaginationModel}
        />
      </div>
    );
  };

  return (
    <div>
      <SfdcPipelineWizardSfdcRulesInput
        pipelineWizardModel={pipelineWizardModel}
        sfdcFiles={sfdcFiles}
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
        filterDto={sfdcFilesPaginationModel}
        setFilterDto={setSfdcFilesPaginationModel}
        isLoading={isLoading}
        title={"Salesforce Files"}
        titleIcon={faSalesforce}
        body={getView()}
        supportSearch={true}
        showBorder={false}
        inlineFilters={getSfdcInlineFilters()}
      />
    </div>
  );

};

SfdcPipelineWizardSfdcFilesTable.propTypes = {
  isLoading: PropTypes.bool,
  sfdcFiles: PropTypes.arrayOf(PropTypes.object),
  loadData: PropTypes.func,
  sfdcFilesPaginationModel: PropTypes.object,
  setSfdcFilesPaginationModel: PropTypes.func,
  setPipelineWizardScreen: PropTypes.func,
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  filePullCompleted: PropTypes.bool
};

export default SfdcPipelineWizardSfdcFilesTable;