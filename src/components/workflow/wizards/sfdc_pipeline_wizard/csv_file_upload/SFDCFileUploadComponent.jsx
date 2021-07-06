import React, {useRef, useState, useEffect, useContext, useMemo} from 'react';
import PropTypes, {array} from 'prop-types';
import {AuthContext} from "contexts/AuthContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";

import sfdcPipelineActions from ".././sfdc-pipeline-actions";
import ErrorDialog from "components/common/status_notifications/error";
import {csvStringToObj} from "components/common/helpers/string-helpers";
import './fileupload.css';
import {Container, Button, Row, Col} from 'react-bootstrap';
import SelectedObjPanel from './panels/SelectedObjPanel';
import RejectedObjPanel from './panels/RejectedObjPanel';
import LoadingDialog from "components/common/status_notifications/loading";import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import xml from "react-syntax-highlighter/dist/esm/languages/hljs/xml";
import docco from "react-syntax-highlighter/dist/esm/styles/hljs/docco";
import { getLimitedTableTextColumn, getTableTextColumn } from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import SfdcPipelineWizardUploadComponentTypesRadioInput from "components/workflow/wizards/sfdc_pipeline_wizard/csv_file_upload/SfdcPipelineWizardUploadComponentTypesRadioInput";
import CSVMetadata from "components/workflow/wizards/sfdc_pipeline_wizard/csv_file_upload/csv-metadata.js";
import IconBase from "components/common/icons/IconBase";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import SfdcPipelineWizardSubmitComponentTypesButton
  from "components/workflow/wizards/sfdc_pipeline_wizard/component_selector/SfdcPipelineWizardSubmitComponentTypesButton";
import CancelButton from "components/common/buttons/CancelButton";

// TODO: This needs to be completely refactored
// TODO: Make base component and handle data pull, etc. in there
function SFDCFileUploadComponent(
  {
    pipelineWizardModel,
    callbackFunc,
    fetchAttribute,
    setPipelineWizardModel,
    setPipelineWizardScreen,
    handleClose
  }) {
    const fields = CSVMetadata.fields;
  
    const fileInputRef = useRef();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [validFiles, setValidFiles] = useState([]);
    const [unsupportedFiles, setUnsupportedFiles] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [xmlContent, setXmlContent] = useState("");
    const [csvContent, setCsvContent] = useState([]);
    const {getAccessToken} = useContext(AuthContext);
    const [save, setSave] = useState(false);
    const [isXml, setIsXml] = useState(false);

  useEffect(() => {
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
    setIsXml(false);
    setXmlContent("");
    setCsvContent([]);
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
    // const validTypes = ['csv'];
    if(file.type === "text/xml") {
      setIsXml(true);
    }
    const validSize = 500000; // 500KB
    if (file.size > validSize) {
      return false;
    }
    // if (validTypes.indexOf(file.type) === -1) {
    //     return false;
    // }

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
    return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
  };

  const removeFile = (name) => {
    setError(false);
    setXmlContent("");
    setCsvContent([]);
    setSelectedFiles([]);
    setErrorMessage('');
    setIsXml(false);
    setUnsupportedFiles([]);
  };

  const validateXMLObj = (obj) => {
    setSave(true);
    setXmlContent(obj);
    console.log(obj);
    setSave(false);
  };

  const validateCSVObj = (obj) => {
    setSave(true);

    let csvKeys = obj.length > 0 ? Object.keys(obj[0]) : [];
    let csvobj = obj.length > 0 ? obj : [];
    let validationKeys = ["componentType", "committedFile"];

    let validKeys = validationKeys.every((val) => csvKeys.includes(val));
   
    if (!validKeys) {
      // setError("Invalid CSV Provided!");
      let files = selectedFiles;
      files[0]['invalid'] = true;
      setUnsupportedFiles(files);
      setErrorMessage('Invalid CSV Provided!');
      setSave(false);
      return;
    }
    let isValidOpserations = csvobj.every((val) => val.operation === "added" || val.operation === "modified" || val.operation === "deleted" );
    if(!isValidOpserations) {
       let files = selectedFiles;
       files[0]['invalid'] = true;
       setUnsupportedFiles(files);
       setErrorMessage('Invalid Operations Provided!');
       setSave(false);
       return;
    }
    setCsvContent(obj);
    setSave(false);
  };


  const validateFiles = async () => {
    // read the csv file and send string to node
    const file = validFiles[0];
    const reader = new FileReader();
    reader.onload = async (evt) => {
      /* Parse data */
      const dataString = evt.target.result;
      console.log(dataString);
      if(isXml) {
        validateXMLObj(dataString);
        return;
      }
      let processedObj = csvStringToObj(dataString);
      // console.log(processedObj);
      if (processedObj) {
        validateCSVObj(processedObj);
      }

    };
    reader.readAsBinaryString(file);
  };

  const getXMLView = () => {
    if (xmlContent && xmlContent.length > 0) {
      return (
        <>
          <div style={{height: "300px", maxHeight: "500px", width: "800px", overflowY: "auto", margin: "auto"}}>
            <SyntaxHighlighter language="xml" style={docco}>
              {xmlContent}
            </SyntaxHighlighter>
          </div>
          <SaveButtonContainer>
            <SfdcPipelineWizardSubmitComponentTypesButton
              pipelineWizardModel={pipelineWizardModel}
              setPipelineWizardScreen={setPipelineWizardScreen}
            />
            <CancelButton className={"ml-2"} showUnsavedChangesMessage={false} cancelFunction={handleClose} size={"sm"} />
          </SaveButtonContainer>
        </>
      );
    }
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "components")),
      getTableTextColumn(getField(fields, "componentType")),
      getLimitedTableTextColumn(getField(fields, "committedFile"), 20),
    ],
    [fields]
  );

  const getCSVView = () => {
    if (csvContent && csvContent.length > 0) {
      return (
        <>
          <table>
            <tr key={"header"}>
              {Object.keys(csvContent[0]).map((key, i) => (
                <th key={i}>{key}</th>
              ))}
            </tr>
            {csvContent.map((item) => (
              <tr key={item.id}>
                {Object.values(item).map((val, i) => (
                  <td key={i}>{val}</td>
                ))}
              </tr>
            ))}
          </table>
        </>
      // <CustomTable
      //   className={"no-table-border"}
      //   columns={columns}
      //   data={csvContent}
      // />
      );
    }
  };

  // this needs to be called once confirmation is done
  const saveData = async () => {
    try {
      let postBody = {
        recordId: pipelineWizardModel.getData("recordId"),
        updateAttribute: pipelineWizardModel.getData("isProfiles") === true ? "profilesList" : "selectedFileList",
        typeOfSelection: fetchAttribute,
        dataType: pipelineWizardModel.getData("fromGitTasks") === true ? "sync-sfdc-repo" : "sfdc-packageXml",
        // data: matchedItems, // TODO: the final obj should be added here
      };
      //  TODO: this needs to be changed so dont call this yet
      const result = await sfdcPipelineActions.setListToPipelineStorage(postBody, getAccessToken);
      // console.log(result);

      setError(false);
      // make a callback function
      // console.log("GOTO Next View");
      await callbackFunc();
    } catch (err) {
      console.error("Error setting selected Data: ", err.message);
      setErrorMessage("Error setting selected Data: ", err);
      setSave(false);
    }
  };

  const getFileUploadBody = () => {
    if (xmlContent.length === 0 && csvContent.length === 0) {
      return (
        <div className="drop-container"
             onDragOver={dragOver}
             onDragEnter={dragEnter}
             onDragLeave={dragLeave}
             onDrop={fileDrop}
             onClick={fileInputClicked}
        >
          <div className="drop-message">
            <div className="upload-icon"><i className="fa fa-upload" aria-hidden="true"></i></div>
            Drop files here or click to select file
          </div>
          <input
            ref={fileInputRef}
            className="file-input"
            disabled={save}
            type="file"
            accept=".csv,.xml"
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
        <div className="file-display-container">
          {validFiles.map((data, i) =>
              <div className="file-status-bar" key={i}>
                <div>
                  <div className="file-type-logo" />
                  <div className="file-type">{fileType(data.name)}</div>
                  <span className={`file-name ${data.invalid ? 'file-error' : ''}`}>{data.name}</span>
                  <span className="file-size">({fileSize(data.size)})</span>
                  {data.invalid && <span className='file-error-message'>({errorMessage})</span>}
                </div>
                <div className="file-remove" onClick={() => removeFile(data.name)}>
                  <i className="fa fa-trash" aria-hidden="true" />
                </div>
              </div>
            )}
        </div>
      );
    }
  };

  const getValidateButton = () => {
    if (unsupportedFiles.length === 0 && validFiles.length && xmlContent.length === 0 && csvContent.length === 0) {
      return (
        <Button variant="primary" onClick={() => validateFiles()}>Process File</Button>
      );
    }
  };

  const getDeployTypeSelection = () => {
    return (
      <Row className="my-3">
        <SfdcPipelineWizardUploadComponentTypesRadioInput
          pipelineWizardModel={pipelineWizardModel}
          setPipelineWizardModel={setPipelineWizardModel}
        />
      </Row>
    );
  };
  
  const getBody = () => {
    if (pipelineWizardModel.getData("recordId") && pipelineWizardModel.getData("recordId").length > 0) {
      return (
        <Container>
          <div className="d-flex flex-column align-items-center my-4">
            {getDeployTypeSelection()}
            {getFileUploadBody()}
            {getFilesBody()}
            {getValidateButton()}
          </div>
          {getXMLView()}
          {getCSVView()}
        </Container>
      );
    }
  };

  return (
    <div>
      <div className="page-description px-3 py-2">Upload components as a csv file or Upload an XML to use for
        deployment.
      </div>
      {error &&
      <div className="mt-3">
        <ErrorDialog error={error}/>
      </div>
      }
      {getBody()}
    </div>
  );
}

SFDCFileUploadComponent.propTypes = {
  callbackFunc: PropTypes.func,
  fetchAttribute: PropTypes.string,
  pullComponentsFunction: PropTypes.func,
  setFiles: PropTypes.func,
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  setPipelineWizardScreen : PropTypes.func,
  handleClose : PropTypes.func,
};

export default SFDCFileUploadComponent;

