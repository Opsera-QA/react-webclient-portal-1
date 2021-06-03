import React, {useRef, useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
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
import LoadingDialog from "components/common/status_notifications/loading";

// TODO: This needs to be completely refactored
function CSVFileUploadComponent(
  {
    recordId,
    updateAttribute,
    callbackFunc,
    fetchAttribute,
    setFiles,
    gitTaskData,
    pullComponentsFunction
  }) {

  const fileInputRef = useRef();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [validFiles, setValidFiles] = useState([]);
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [matchedItems, setMatchedItems] = useState([]);
  const [rejectedItems, setRejectedItems] = useState([]);
  const [allComponentTypes, setAllComponentTypes] = useState([]);
  const [loadingAllFiles, setLoadingAllFiles] = useState([]);
  const {getAccessToken} = useContext(AuthContext);
  const [save, setSave] = useState(false);

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

  useEffect(() => {
    setAllComponentTypes([]);
    getComponents().then((error) => {
      throw error;
    });
  }, []);

  const getComponents = async() => {
    if (pullComponentsFunction) {
      setLoadingAllFiles(true);
      const componentTypeList = await pullComponentsFunction(true);

      console.log(componentTypeList?.length);
      // console.log("componentTypeList: " + JSON.stringify(componentTypeList));
      if (Array.isArray(componentTypeList) && componentTypeList.length > 0) {
        setAllComponentTypes(componentTypeList);
      }

      setLoadingAllFiles(false);
    }
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
    setSelectedFiles([]);
    setFiles([]);
    setMatchedItems([]);
    setRejectedItems([]);
    setErrorMessage('');
    setUnsupportedFiles([]);

    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        setSelectedFiles([files[i]]);
        setFiles([files[i]]);

      } else {
        files[i]['invalid'] = true;
        setSelectedFiles([files[i]]);
        setFiles([files[i]]);

        setErrorMessage('File size not permitted');
        setUnsupportedFiles([files[i]]);
      }
    }
  };

  const validateFile = (file) => {
    // const validTypes = ['csv'];
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
    setSelectedFiles([]);
    setFiles([]);
    setMatchedItems([]);
    setRejectedItems([]);
    setErrorMessage('');
    setUnsupportedFiles([]);

    const index = validFiles.findIndex(e => e.name === name);
    const index2 = selectedFiles.findIndex(e => e.name === name);
    const index3 = unsupportedFiles.findIndex(e => e.name === name);
    validFiles.splice(index, 1);
    selectedFiles.splice(index2, 1);
    setValidFiles([...validFiles]);
    setSelectedFiles([...selectedFiles]);
    setFiles([...selectedFiles]);
    if (index3 !== -1) {
      unsupportedFiles.splice(index3, 1);
      setUnsupportedFiles([...unsupportedFiles]);
    }
  };

  const validateObj = (obj) => {
    setSave(true);

    let csvKeys = obj.length > 0 ? Object.keys(obj[0]) : [];
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
    let matched = allComponentTypes.filter(o => obj.some(({
                                                        componentType,
                                                        committedFile
                                                      }) => o.componentType === componentType && o.committedFile === committedFile));
    // console.log(matched); 
    setMatchedItems(matched);
    // TODO: create logic to get unmatched files and display it
    let skipped = obj.filter(o => !matched.some(({
                                                   componentType,
                                                   committedFile
                                                 }) => o.componentType === componentType && o.committedFile === committedFile));
    // console.log(skipped);
    setRejectedItems(skipped);
    setSave(false);
  };

  const validateFiles = async () => {
    // read the csv file and send string to node
    const file = validFiles[0];
    const reader = new FileReader();
    reader.onload = async (evt) => {
      /* Parse data */
      const csvDataString = evt.target.result;
      let processedObj = csvStringToObj(csvDataString);
      // console.log(processedObj);
      if (processedObj) {
        validateObj(processedObj);
      }

    };
    reader.readAsBinaryString(file);
  };

  // this needs to be called once confirmation is done
  const saveData = async () => {
    try {
      let typeOfSelection;
      let postBody = {
        "recordId": recordId,
        "updateAttribute": updateAttribute,
        "typeOfSelection": fetchAttribute,
        "dataType": gitTaskData ? "sync-sfdc-repo" : "sfdc-packageXml",
        "data": matchedItems, // TODO: the final obj should be added here
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

  if (loadingAllFiles) {
    return <LoadingDialog size={"md"} message={"Loading All Modified Files"} />;
  }

  return (
    <>
      <div className="page-description px-3 py-2">Select the components or upload components as a csv file to use for
        deployment.
      </div>
      {error &&
      <div className="mt-3">
        <ErrorDialog error={error}/>
      </div>
      }
      {recordId && recordId.length > 0 &&
      <Container>
        <div className="d-flex flex-column align-items-center my-4">
          {/* {unsupportedFiles.length > 0 && <p>Please remove unsupported file.</p> } */}
          {matchedItems.length === 0 && rejectedItems.length === 0 ? (
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
                accept=".csv"
                onChange={filesSelected}
              />
            </div>
          ) : null}
          <div className="file-display-container">
            {
              validFiles.map((data, i) =>
                <div className="file-status-bar" key={i}>
                  <div>
                    <div className="file-type-logo"></div>
                    <div className="file-type">{fileType(data.name)}</div>
                    <span className={`file-name ${data.invalid ? 'file-error' : ''}`}>{data.name}</span>
                    <span className="file-size">({fileSize(data.size)})</span> {data.invalid &&
                  <span className='file-error-message'>({errorMessage})</span>}
                  </div>
                  <div className="file-remove" onClick={() => removeFile(data.name)}><i className="fa fa-trash"
                                                                                        aria-hidden="true"></i></div>
                </div>
              )
            }
          </div>
          {unsupportedFiles.length === 0 && validFiles.length && matchedItems.length === 0 && rejectedItems.length === 0 ?
            <Button variant="primary" onClick={() => validateFiles()}>Validate File</Button> : ''}
          {matchedItems.length > 0 || rejectedItems.length > 0 ? (
            <>
              <Row>
                <Col xs={6}>
                  <SelectedObjPanel selectedItems={matchedItems} />
                </Col>
                <Col xs={6}>
                  <RejectedObjPanel rejectedItems={rejectedItems} />
                </Col>
              </Row>
              {/* <Row className="my-2"><small><span className="text-muted mr-2 pb-1"></span></small></Row> */}
              <Row className="my-2">
                <Button
                  variant="success"
                  size="sm"
                  className="mr-2"
                  disabled={save || matchedItems.length < 1}
                  onClick={() => {
                    setSave(true);
                    saveData();
                  }}
                >
                  {save ? (
                    <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>
                  ) : (
                    <FontAwesomeIcon icon={faStepForward} fixedWidth className="mr-1"/>
                  )}
                  Proceed with selected components
                </Button>
              </Row>
            </>
          ) : null}
        </div>
      </Container>
      }
    </>
  );
}

CSVFileUploadComponent.propTypes = {
  recordId: PropTypes.string,
  updateAttribute: PropTypes.string,
  callbackFunc: PropTypes.func,
  fetchAttribute: PropTypes.string,
  pullComponentsFunction: PropTypes.func,
  setFiles: PropTypes.func,
  gitTaskData: PropTypes.object
};

export default CSVFileUploadComponent;

