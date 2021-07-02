import React, {useContext, useState, useEffect, useRef, useMemo} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import { AuthContext } from "contexts/AuthContext";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import sfdcComponentFilterMetadata
  from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-component-filter-metadata";
import axios from "axios";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import SfdcPipelineWizardCsvFileUploadComponent
  from "components/workflow/wizards/sfdc_pipeline_wizard/csv_file_upload/SfdcPipelineWizardCsvFileUploadComponent";
import {getTableDateTimeColumn, getTableTextColumn} from "components/common/table/table-column-helpers-v2";
import VanityTable from "components/common/table/VanityTable";
import sfdcTableConstants from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-table-constants";
import {DialogToastContext} from "contexts/DialogToastContext";
import Model from "core/data_model/model";
import FilterContainer from "components/common/table/FilterContainer";
import ToggleUploadButton from "components/common/buttons/toggle/ToggleUploadButton";
import InlineSfdcComponentTypesFilter
  from "components/common/filters/sfdc/sfdc_component/InlineSfdcComponentTypesFilter";
import SfdcPipelineWizardProfileComponentRulesInput
  from "components/workflow/wizards/sfdc_pipeline_wizard/profile_component_selector/SfdcPipelineWizardProfileComponentRulesInput";
import SfdcPipelineWizardGitRulesInput
  from "components/workflow/wizards/sfdc_pipeline_wizard/file_selector/git/SfdcPipelineWizardGitRulesInput";
import InlineWarning from "components/common/status_notifications/inline/InlineWarning";

const SfdcPipelineWizardProfileComponentTable = ({ pipelineWizardModel, setPipelineWizardModel, generateXml, setFilteredFileCount }) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const noDataFilesPulledMessage = "The Profile Component list pull has been completed. There is no data for the selected criteria.";
  const noDataFilesNotPulledMessage = "The Profile Component list has not been received from SFDC yet. Please click the table's refresh button to resume polling for the files.";
  const [isLoading, setIsLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [profileComponentList, setProfileComponentList] = useState([]);
  const [filePullCompleted, setFilePullCompleted] = useState(false);
  const [filterDto, setFilterDto] = useState(new Model({ ...sfdcComponentFilterMetadata.newObjectFields }, sfdcComponentFilterMetadata, false));
  let timerIds = [];
  const [showFileUpload, setShowFileUpload] = useState(false);
  const fields = sfdcTableConstants.fields;

  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(filterDto, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [JSON.stringify(pipelineWizardModel.getArrayData("profileComponentsRuleList"))]);

  const loadData = async (newFilterDto = filterDto, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await profilePolling(cancelSource, undefined, newFilterDto);
    } catch (error) {
      toastContext.showInlineErrorMessage(error);
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const profilePolling = async (cancelSource = cancelTokenSource, newFilterDto = filterDto, count = 1) => {
    if (isMounted?.current !== true) {
      return;
    }

    const sfdcCommitList = await getProfileFiles(newFilterDto, cancelSource);

    if (isMounted?.current === true && !Array.isArray(sfdcCommitList) && count <= 5 && filePullCompleted === false) {
      await new Promise(resolve => timerIds.push(setTimeout(resolve, 15000)));
      return await profilePolling(cancelSource, count + 1, newFilterDto);
    }
  };

  const getProfileFiles = async (newFilterDto = filterDto, cancelSource = cancelTokenSource) => {
    const response = await sfdcPipelineActions.getProfileComponentListV2(getAccessToken, cancelSource, pipelineWizardModel, newFilterDto, false);
    const data = response?.data;
    const fileList = data?.data;

    if (isMounted?.current === true && data) {
      let newSfdcFilterDto = newFilterDto;
      newSfdcFilterDto.setData("totalCount", data.count);
      newSfdcFilterDto.setData("activeFilters", newSfdcFilterDto.getActiveFilters());
      setFilterDto({...newSfdcFilterDto});
      setFilteredFileCount(data.count);

      if (Array.isArray(fileList)) {
        setProfileComponentList(fileList);
        setIsLoading(false);
        setFilePullCompleted(true);
      }
    }

    return fileList;
  };

  const getAllModifiedFiles = async () => {
    const sfdcResponse =  await sfdcPipelineActions.getProfileComponentListV2(getAccessToken, cancelTokenSource, pipelineWizardModel, undefined, true);
    return sfdcResponse?.data?.data;
  };

  const sfdcColumnsWithCheckBoxCell = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "committedFileId";})),
      getTableTextColumn(fields.find(field => { return field.id === "componentType";})),
      getTableTextColumn(fields.find(field => { return field.id === "committedFile";}), "force-text-wrap"),
      getTableDateTimeColumn(fields.find(field => { return field.id === "committedTime";})),
      getTableTextColumn(fields.find(field => { return field.id === "committedBy";})),
    ],
    [],
  );

  const getProfileFilesView = () => {
    return (
      <div>
        {showFileUpload &&
        <SfdcPipelineWizardCsvFileUploadComponent
          pipelineWizardModel={pipelineWizardModel}
          callbackFunc={generateXml}
          fetchAttribute={"profileComponentList"}
          pullComponentsFunction={getAllModifiedFiles}
          setFiles={setFiles}
        />
        }
        <VanityTable
          className={"table-no-border" + (files.length > 0 ? " opacity-half" : " ") }
          columns={sfdcColumnsWithCheckBoxCell}
          data={profileComponentList}
          isLoading={isLoading}
          loadData={loadData}
          noDataMessage={filePullCompleted ? noDataFilesPulledMessage : noDataFilesNotPulledMessage}
          paginationModel={filterDto}
          setPaginationModel={setFilterDto}
        />
      </div>
    );
  };

  const getSfdcInlineFilters = () => {
    return (
      <div className="px-2 d-flex">
          <InlineSfdcComponentTypesFilter
            className={"mx-2"}
            componentTypes={pipelineWizardModel.getData("selectedComponentTypes")}
            filterDto={filterDto}
            setFilterDto={setFilterDto}
            loadData={loadData}
          />
        <div className={"mx-2"}><ToggleUploadButton toggleUpload={() => {setShowFileUpload(!showFileUpload);}} uploadType={"File CSV"} /></div>
      </div>
    );
  };

  return (
    <div>
      <SfdcPipelineWizardProfileComponentRulesInput
        pipelineWizardModel={pipelineWizardModel}
        profileComponentList={profileComponentList}
        setPipelineWizardModel={setPipelineWizardModel}
        isLoading={isLoading}
        filePullCompleted={filePullCompleted}
      />
      <InlineWarning
        className={"ml-2"}
        warningMessage={"Warning: Use of the component or keyword search filter in the table below will not alter the final filtered profile component list."}
      />
      <FilterContainer
        loadData={loadData}
        filterDto={filterDto}
        setFilterDto={setFilterDto}
        isLoading={isLoading}
        title={"Profile Components"}
        titleIcon={faSalesforce}
        body={getProfileFilesView()}
        supportSearch={true}
        showBorder={false}
        inlineFilters={getSfdcInlineFilters()}
      />
    </div>
  );
};

SfdcPipelineWizardProfileComponentTable.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  generateXml: PropTypes.func,
  setFilteredFileCount: PropTypes.func
};

export default SfdcPipelineWizardProfileComponentTable;

