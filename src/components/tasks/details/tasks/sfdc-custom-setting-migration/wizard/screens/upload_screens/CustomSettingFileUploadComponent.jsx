import React, {useRef, useState, useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import ErrorDialog from "components/common/status_notifications/error";
import {csvStringToObj} from "components/common/helpers/string-helpers";
import 'components/workflow/wizards/sfdc_pipeline_wizard/csv_file_upload/fileupload.css';
import {Button} from 'react-bootstrap';
import { getTableTextColumn } from "components/common/table/table-column-helpers-v2";
import { getField } from "components/common/metadata/metadata-helpers";
import PipelineWizardFileUploadMetadata from "components/workflow/wizards/sfdc_pipeline_wizard/csv_file_upload/pipeline-wizard-file-upload-metadata.js";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import SfdcPipelineWizardSubmitFileTypeButton
  from "components/workflow/wizards/sfdc_pipeline_wizard/csv_file_upload/SfdcPipelineWizardSubmitFileTypeButton";
import CancelButton from "components/common/buttons/CancelButton";
import ExternalPageLink from "components/common/links/ExternalPageLink";
import {faSalesforce} from "@fortawesome/free-brands-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import VanityTable from "components/common/table/VanityTable";
import _ from "lodash";
import PackageXmlFieldBase from "components/common/fields/code/PackageXmlFieldBase";
import SfdcPipelineWizardIncludeDependenciesToggle
  from "components/workflow/wizards/sfdc_pipeline_wizard/component_selector/SfdcPipelineWizardIncludeDependenciesToggle";
import SfdcPipelineWizardTranslationToggleInput
  from "components/workflow/wizards/sfdc_pipeline_wizard/component_selector/SfdcPipelineWizardTranslationToggleInput";
import SfdcPipelineWizardUploadComponentSummary
  from "components/workflow/wizards/sfdc_pipeline_wizard/initialization_screen/past_run_xml/SfdcPipelineWizardUploadComponentSummary";

function CustomSettingFileUploadComponent({ wizardModel, setWizardModel, setPipelineWizardScreen, handleClose }) {
  const fileInputRef = useRef();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [validFiles, setValidFiles] = useState([]);
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [save, setSave] = useState(false);
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    resetStoredFileContents();
    let filteredArr = selectedFiles.reduce((acc, current) => {
      const x = acc.find(item => item.name === current.name);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    setValidFiles([...filteredArr]);

  }, [selectedFiles]);

  const resetStoredFileContents = () => {
    let newDataObject = {...wizardModel};
    newDataObject.setData("xmlFileContent", "");
    newDataObject.setData("csvFileContent", []);
    newDataObject.setData("isXml", false);
    newDataObject.setData("isCsv", false);
    setCsvData([]);
    setWizardModel({...newDataObject});
  };

  const preventDefault = (e) => {
    e.preventDefault();
    // e.stopPropagation();
  };

  const dragOver = (e) => {
    preventDefault(e);
  };

  const dragEnter = (e) => {
    preventDefault(e);
  };

  const dragLeave = (e) => {
    preventDefault(e);
  };

  const fileDrop = (e) => {
    preventDefault(e);
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
  };

  const filesSelected = () => {
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files);
    }
  };

  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

  const handleFiles = (files) => {
    setError(false);


    resetStoredFileContents();
    setSelectedFiles([]);
    setErrorMessage('');
    setUnsupportedFiles([]);

    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        setSelectedFiles([files[i]]);
      } else {
        files[i]['invalid'] = true;
        setSelectedFiles([files[i]]);

        setErrorMessage('File size not permitted');
        setUnsupportedFiles([files[i]]);
      }
    }
  };

  const validateFile = (file) => {
    let newDataObject = {...wizardModel};
    newDataObject.setData("isXml", file?.type === "text/xml");
    newDataObject.setData("isCsv", file?.type !== "text/xml");
    setWizardModel({...newDataObject});

    const validSize = 10000000; // 500KB
    if (file.size > validSize) {
      return false;
    }

    return true;
  };

  const fileSize = (size) => {
    if (size === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const fileType = (fileName) => {
    return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length).toUpperCase() || fileName;
  };

  const removeFile = () => {
    setError(false);
    resetStoredFileContents();
    setSelectedFiles([]);
    setErrorMessage('');
    setUnsupportedFiles([]);

    let newDataObject = {...wizardModel};
    newDataObject.setData("isXml", false);
    newDataObject.setData("isCsv", false);
    setWizardModel({...newDataObject});
  };


  const validateCSVObj = (obj) => {
    setSave(true);

    let csvKeys = obj.length > 0 ? Object.keys(obj[0]) : [];
    let csvobj = obj.length > 0 ? obj : [];
    // let validationKeys = ["commitAction", "componentType", "componentName"];
    //
    // let validKeys = validationKeys.every((val) => csvKeys.includes(val));

    // if (!validKeys) {
    //   // setError("Invalid CSV Provided!");
    //   let files = selectedFiles;
    //   files[0]['invalid'] = true;
    //   setUnsupportedFiles(files);
    //   setErrorMessage('Invalid CSV Headers!');
    //   setSave(false);
    //   return;
    // }
    // setCsvContent(obj);
    let newDataObject = {...wizardModel};
    newDataObject.setData("csvFileContent", csvobj);
    setCsvData(_.cloneDeep(csvobj));
    setWizardModel({...newDataObject});
    setSave(false);
  };


  const validateFiles = async () => {
    // read the csv file and send string to node
    const file = validFiles[0];
    const reader = new FileReader();
    reader.onload = async (evt) => {
      /* Parse data */
      const dataString = evt.target.result;
      let processedObj = csvStringToObj(dataString);
      // console.log(processedObj);
      if (processedObj) {
        validateCSVObj(processedObj);
      }

    };
    reader.readAsBinaryString(file);
  };

  const buttonContainer = () => {
    return (
      <SaveButtonContainer>

        <CancelButton className={"ml-2"} showUnsavedChangesMessage={false} cancelFunction={handleClose} size={"sm"} />
      </SaveButtonContainer>
    );
  };

  const getTable = () => {
    return (
      <>
        {JSON.stringify(csvData, null, 4)}
      </>
    );
  };

  const getCsvView = () => {
    if (wizardModel.getData("csvFileContent") && wizardModel.getData("csvFileContent").length > 0) {
      return (
        <>
          <div>
            <FilterContainer
              title={"CSV File Content"}
              titleIcon={faSalesforce}
              body={getTable()}
              showBorder={false}
            />
          </div>
          {buttonContainer()}
        </>
      );
    }
  };

  const getFileUploadBody = () => {
    if (wizardModel?.getData("csvFileContent")?.length === 0) {
      return (
        <div className="drop-container"
             onDragOver={dragOver}
             onDragEnter={dragEnter}
             onDragLeave={dragLeave}
             onDrop={fileDrop}
             onClick={fileInputClicked}
        >
          <div className="drop-message">
            <div className="upload-icon"><i className="fa fa-upload" aria-hidden="true" /></div>
            Drop files here or click to select file
          </div>
          <input
            ref={fileInputRef}
            className="file-input"
            disabled={save}
            type="file"
            accept=".csv"
            onChange={filesSelected}
            onClick={ e => e.target.value = null}
          />
        </div>
      );
    }
  };

  const getFilesBody = () => {
    if (Array.isArray(validFiles) && validFiles.length > 0) {
      return (
        <div>
          {validFiles.map((data, i) =>
            <div className="d-flex my-2" key={i}>
              <div className={"badge badge-opsera mr-2 d-flex"}><div className={"h-100 file-type-badge"}>{fileType(data?.name)}</div></div>
              <div className={`file-name ${data.invalid ? 'file-error' : ''}`}>{data.name}</div>
              <div className="file-size ml-2">({fileSize(data.size)})</div>
              {data.invalid && <span className='file-error-message'>({errorMessage})</span>}
              <div className="ml-3 danger-red pointer fa fa-trash my-auto" onClick={() => removeFile()} />
            </div>
          )}
        </div>
      );
    }
  };

  const getValidateButton = () => {
    if (unsupportedFiles?.length === 0 && validFiles?.length && wizardModel?.getData("csvFileContent")?.length === 0) {
      return (
        <Button variant="primary" className={"mt-3"} onClick={() => validateFiles()}>Process File</Button>
      );
    }
  };

  const getBody = () => {
    if (wizardModel?.getData("recordId") && wizardModel?.getData("recordId").length > 0) {
      return (
        <div>
          <div className="my-4 w-100">
            {getFileUploadBody()}
            {getFilesBody()}
            {getValidateButton()}
          </div>
          {getCsvView()}
        </div>
      );
    }
  };

  const getErrorDialog = () => {
    if (error) {
      return (
        <div className="mt-3">
          <ErrorDialog error={error}/>
        </div>
      );
    }
  };

  const getHelpText = () => {
    return (
      <div className="my-2">
        <div>The file must match these requirements:</div>
        <div>4. The maximum number of components supported is 10,000</div>
        <div>5. Upload file can be of .csv extension only (single file is allowed) </div>
        <div>6. The maximum file size supported is 10MB</div>
      </div>
    );
  };

  console.log(wizardModel.getPersistData());
  console.log(csvData);

  return (
    <div>
      <div className="my-2">
        Select components using a CSV file to use for deployment.
      </div>
      <div>
        <ExternalPageLink
          linkText={"Please click here to view detailed Help Documentation for the File Upload process."}
          link={`https://opsera.atlassian.net/l/c/6eQ9BMAw`}
        />
      </div>
      {getHelpText()}
      {getErrorDialog()}
      <div className={"file-display-container"}>
        {getBody()}
      </div>
    </div>
  );
}

CustomSettingFileUploadComponent.propTypes = {
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
  setPipelineWizardScreen : PropTypes.func,
  handleClose : PropTypes.func,
};

export default CustomSettingFileUploadComponent;

