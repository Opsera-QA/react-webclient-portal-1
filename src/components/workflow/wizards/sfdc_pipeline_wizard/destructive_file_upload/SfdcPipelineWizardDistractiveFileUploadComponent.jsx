import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './disfileupload.css';
import {Button} from 'react-bootstrap';
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

const SfdcPipelineWizardDistractiveFileUploadComponent = ({pipelineWizardModel, setPipelineWizardModel, setPipelineWizardScreen, handleClose }) => {
    const fileInputRef = useRef();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [validFiles, setValidFiles] = useState([]);
    const [unsupportedFiles, setUnsupportedFiles] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [save, setSave] = useState(false);
    const [desxml,setDesxml] = useState([]);

    useEffect(()=>{
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
    },[selectedFiles]);

  const resetStoredFileContents=()=>{
      let newDataObject = {...pipelineWizardModel};
      newDataObject.setData("destructiveXml","");
      newDataObject.setData("isXml",false);
      newDataObject.setData("modifiedFilesOrigin",(pipelineWizardModel.getData('isOrgToOrg') || pipelineWizardModel.getData("fromGitTasks")) ? "sfdc" : "git");
      setDesxml([]);
      setPipelineWizardModel({...newDataObject});
  };
    
    const filesSelected = () => {
      if (fileInputRef.current.files.length) {
        handleFiles(fileInputRef.current.files);
      }
    };

    const fileInputClicked = () => {
      fileInputRef.current.click();
    };


    // handling the file which is selected/uploaded
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

    // checking and validating the file
    const validateFile = (file) => {
       let newDataObject = {...pipelineWizardModel};
        newDataObject.setData("destructiveXml", file?.type === "text/xml");
        setPipelineWizardModel({...newDataObject});
      const validSize = 500000; // 500KB
      if (file.size > validSize) {
        return false;
      }
  
      return true;
    };
  
    // comparing the file size and validating it
    const fileSize = (size) => {
      if (size === 0) {
        return '0 Bytes';
      }
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(size) / Math.log(k));
      return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    //verifing the file type 
    const fileType = (fileName) => {
      return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length).toUpperCase() || fileName;
    };

    // Deleting the file selected file
    const removeFile = () => {
      setError(false);
      resetStoredFileContents();
      setSelectedFiles([]);
      setErrorMessage('');
      setUnsupportedFiles([]);
  
      let newDataObject = {...pipelineWizardModel};
      newDataObject.setData("isXml", false);
      setPipelineWizardModel({...newDataObject});
    };

    const validateXMLObj = (obj) => {
      setSave(true);
      setDesxml([]);
      let newDataObject = {...pipelineWizardModel};
      newDataObject.setData("destructiveXml", obj);
      newDataObject.setData("isXml", true);
      setPipelineWizardModel({...newDataObject});
      setSave(false);
    }; 
// have to work on both validatexmlObj and remove files
    
  const validateFiles = async () => {
    // read the xml file and send string to node
    const file = validFiles[0];
    const reader = new FileReader();
    reader.onload = async (evt) => {
      /* Parse data */
      const dataString = evt.target.result;
      if(file?.type === "text/xml") {
        validateXMLObj(dataString);
        return;
      }
    };
    reader.readAsBinaryString(file);
  };

  const getXMLView = () => {
    if (pipelineWizardModel.getData("destructiveXml") && pipelineWizardModel.getData("destructiveXml").length > 0 ){
      return (
        <>
          <PackageXmlFieldBase fieldName={"destructiveXml"} model={pipelineWizardModel}/>
          {buttonContainer()}
        </>
      );
    }
  };

  const buttonContainer = () => {
    return (
      <SaveButtonContainer>
       <SfdcPipelineWizardSubmitFileTypeButton
          pipelineWizardModel={pipelineWizardModel}
          setPipelineWizardScreen={setPipelineWizardScreen}
          destructiveXml={pipelineWizardModel?.getData("destructiveXml")}
        />
        <CancelButton className={"ml-2"} showUnsavedChangesMessage={false} cancelFunction={handleClose} size={"sm"} />
      </SaveButtonContainer>
    );
  };


  const getFileUploadBody = () => {
    if(pipelineWizardModel.getData("destructiveXml").length === 0 ){
      return (
        <div className="destructive-container"
          onClick={fileInputClicked}
          >
            <div className="destructive-message">
              Upload<br />Destructive <br /> Package XML
            </div>
            <input
              ref={fileInputRef}
              className="file-input"
              disabled={save}
              type="file"
              accept=".xml"
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


  const getDependenciesToggle = () => {
    if (pipelineWizardModel?.getData("isOrgToOrg") === false) {
      return (
        <SfdcPipelineWizardIncludeDependenciesToggle
          pipelineWizardModel={pipelineWizardModel}
          setPipelineWizardModel={setPipelineWizardModel}
        />
      );
    }
  };
  
  const getTranslationsToggle = () => {
    if (pipelineWizardModel?.getData("isProfiles") === true) {
      return (
        <SfdcPipelineWizardTranslationToggleInput
            pipelineWizardModel={pipelineWizardModel}
            setPipelineWizardModel={setPipelineWizardModel}
          />
      );
    }
  };

  const getValidateButton = () => {
    if (unsupportedFiles.length === 0 && validFiles.length && pipelineWizardModel.getData("destructiveXml").length === 0) {
      return (
        <Button variant="primary" className={"mt-3"} onClick={() => validateFiles()}>Process File</Button>
      );
    }
  };
  return (
    <div>
          <div>
            {getFileUploadBody()}
            {getFilesBody()}
            {getValidateButton()}
          </div>
            {getDependenciesToggle()}
            {getTranslationsToggle()}
            {getXMLView()}
    </div>
  );
};

SfdcPipelineWizardDistractiveFileUploadComponent.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  setPipelineWizardScreen : PropTypes.func,
  handleClose : PropTypes.func,
  };
export default SfdcPipelineWizardDistractiveFileUploadComponent;