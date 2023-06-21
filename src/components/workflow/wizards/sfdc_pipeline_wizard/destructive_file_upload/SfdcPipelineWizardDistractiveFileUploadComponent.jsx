import React, { useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import ErrorDialog from "components/common/status_notifications/error";
import {csvStringToObj} from "components/common/helpers/string-helpers";
import './disfileupload.css';
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

const SfdcPipelineWizardDistractiveFileUploadComponent = ({pipelineWizardModel, setPipelineWizardModel, setPipelineWizardScreen, handleClose }) => {
    const fields = PipelineWizardFileUploadMetadata.fields;
    const fileInputRef = useRef();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [validFiles, setValidFiles] = useState([]);
    const [unsupportedFiles, setUnsupportedFiles] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [save, setSave] = useState(false);


    useEffect(()=>{
      let filteredArr = selectedFiles.reduce((acc, current) => {
        const x = acc.find(item => item.name === current.name);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      setValidFiles([...filteredArr]);
    },[selectedFiles])


    const fileInputClicked = () => {
      fileInputRef.current.click();
    };
    const filesSelected = () => {
      if (fileInputRef.current.files.length) {
        handleFiles(fileInputRef.current.files);
      }
    };

    const handleFiles = (files) => {
      setError(false);
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
      const validSize = 500000; // 500KB
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
      setSelectedFiles([]);
      setErrorMessage('');
      setUnsupportedFiles([]);
  
      let newDataObject = {...pipelineWizardModel};
      newDataObject.setData("isXml", false);
      setPipelineWizardModel({...newDataObject});
    };

    const validateXMLObj = (obj) => {
      setSave(true);
      let newDataObject = {...pipelineWizardModel};
      newDataObject.setData("xmlFileContent", obj);
      newDataObject.setData("csvFileContent", []);
      newDataObject.setData("isXml", true);
      newDataObject.setData("isCsv", false);
      setPipelineWizardModel({...newDataObject});
      setSave(false);
    };

    
  const validateFiles = async () => {
    // read the csv file and send string to node
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
      return (
        <>
          <PackageXmlFieldBase fieldName={"xmlFileContent"} model={pipelineWizardModel}/>
          {buttonContainer()}
        </>
      );
  };

  const buttonContainer = () => {
    return (
      <SaveButtonContainer>
        <SfdcPipelineWizardSubmitFileTypeButton
          pipelineWizardModel={pipelineWizardModel}
          setPipelineWizardScreen={setPipelineWizardScreen}
          isXml={pipelineWizardModel?.getData("isXml")}
        />
        <CancelButton className={"ml-2"} showUnsavedChangesMessage={false} cancelFunction={handleClose} size={"sm"} />
      </SaveButtonContainer>
    );
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "commitAction")),
      getTableTextColumn(getField(fields, "componentType")),
      getTableTextColumn(getField(fields, "componentName")),
    ],
    [fields]
  );
  const getTable = () => {
    return (
      <VanityTable
        tableHeight={"250px"}
        columns={columns}
        data={csvData}
      />
    );
  };
  const getFileUploadBody = () => {
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
    if (unsupportedFiles.length === 0 && validFiles.length>=0) {
      return (
        <Button variant="primary" className={"mt-3"} onClick={() => validateFiles()}>Process File</Button>
      );
    }
  };

  console.log("hurray selected",selectedFiles)
  console.log("valid",validFiles);
  return (
    <div>
          {getFileUploadBody()}
          { getFilesBody() }
          <div>
            {getXMLView()}
            {getValidateButton()}
          </div>
    </div>
  )
}

SfdcPipelineWizardDistractiveFileUploadComponent.propTypes = {
    pipelineWizardModel: PropTypes.object,
    setPipelineWizardModel: PropTypes.func,
    setPipelineWizardScreen : PropTypes.func,
    handleClose : PropTypes.func,
  };
export default SfdcPipelineWizardDistractiveFileUploadComponent