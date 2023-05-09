import React, { useRef, useState, useEffect, useMemo, useContext } from "react";
import PropTypes from "prop-types";
import ErrorDialog from "components/common/status_notifications/error";
import { csvStringToObj } from "components/common/helpers/string-helpers";
import "components/workflow/wizards/sfdc_pipeline_wizard/csv_file_upload/fileupload.css";
import { Button } from "react-bootstrap";
import ExternalPageLink from "components/common/links/ExternalPageLink";
import _ from "lodash";
import { DialogToastContext } from "../../../../../../../../contexts/DialogToastContext";
import { AuthContext } from "../../../../../../../../contexts/AuthContext";
import useAxiosCancelToken from "../../../../../../../../hooks/useAxiosCancelToken";
import { getNodeDataMigrationFileAxiosInstance } from "../../../../../../../../api/nodeDataMigrationFileApi.service";
import { ProgressBarBase } from "@opsera/react-vanity-set";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import { parseError } from "../../../../../../../common/helpers/error-helpers";
import InlineErrorText from "../../../../../../../common/status_notifications/inline/InlineErrorText";

function CustomSettingFileUploadComponent({
  wizardModel,
  setWizardModel,
  isUploaded,
  setIsUploaded,
}) {
  const { getAccessToken } = useContext(AuthContext);
  const { cancelTokenSource } = useAxiosCancelToken();
  const fileInputRef = useRef();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [validFiles, setValidFiles] = useState([]);
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  useEffect(() => {
    resetStoredFileContents();
    let filteredArr = selectedFiles.reduce((acc, current) => {
      const x = acc.find((item) => item.name === current.name);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    setValidFiles([...filteredArr]);
  }, [selectedFiles]);

  const resetStoredFileContents = () => {
    let newDataObject = { ...wizardModel };
    setUploadPercentage(0);
    newDataObject.setData("csvFileContent", []);
    setCsvData([]);
    setWizardModel({ ...newDataObject });
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
    setErrorMessage("");
    setUnsupportedFiles([]);

    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        setSelectedFiles([files[i]]);
      } else {
        files[i]["invalid"] = true;
        setSelectedFiles([files[i]]);

        setErrorMessage("File size not permitted");
        setUnsupportedFiles([files[i]]);
      }
    }
  };

  const validateFile = (file) => {
    const validSize = 10000000; //10MB
    console.log(file.size);
    if (file.size < 1 || file.size > validSize) {
      return false;
    }

    return true;
  };

  const fileSize = (size) => {
    if (size === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const fileType = (fileName) => {
    return (
      fileName
        .substring(fileName.lastIndexOf(".") + 1, fileName.length)
        .toUpperCase() || fileName
    );
  };

  const removeFile = () => {
    setError(false);
    setIsUploaded(false);
    resetStoredFileContents();
    setSelectedFiles([]);
    setErrorMessage("");
    setUnsupportedFiles([]);

    let newDataObject = { ...wizardModel };
    setWizardModel({ ...newDataObject });
  };

  const uploadFile = async () => {
    // read the csv file and send string to node
    const file = validFiles[0];
    const reader = new FileReader();
    reader.onload = async (evt) => {
      /* Parse data */
      const dataString = evt.target.result;
      const rows = dataString.split("\n");
      const csvHeaders = rows[0].split(",");
      let processedObj = csvStringToObj(dataString);
      // console.log(processedObj);
      if (processedObj && csvHeaders.length > 0) {
        try {
          setIsUploading(true);
          let newDataObject = { ...wizardModel };
          newDataObject.setData("csvFields", csvHeaders);
          newDataObject.setData("csvFileContent", processedObj);
          setCsvData(_.cloneDeep(processedObj));
          setWizardModel({ ...newDataObject });

          // TODO : Make a call to upload file

          const formData = new FormData();
          formData.append("file", file);
          formData.append("taskId", wizardModel?.getData("taskId"));
          formData.append("runCount", wizardModel?.getData("runCount"));
          formData.append(
            "selectedCustomObj",
            wizardModel?.getData("selectedCustomSetting")?.componentName,
          );

          const customHeaders = {
            contentType: "multipart/form-data",
          };
          const accessToken = await getAccessToken();
          const uploadResponse = await getNodeDataMigrationFileAxiosInstance(
            accessToken,
            undefined,
            customHeaders,
          ).post("/tasks/custom-setting-migration-task/uploadfile", formData, {
            onUploadProgress: (p) => {
              const percentageCompleted = Math.round(
                (p.loaded * 100) / p.total,
              );
              setUploadPercentage(percentageCompleted);
              // console.log("percentage completed ", percentageCompleted);
            },
          });
          if(uploadResponse?.status === 200) {
            setIsUploaded(true);
          }
        } catch (e) {
          const parsedError = parseError(e);
          setError(true);
          setErrorMessage(parsedError);
        } finally {
          setIsUploading(false);
        }
      }
    };
    reader.readAsBinaryString(file);
  };

  const getTable = () => {
    return <>{JSON.stringify(csvData, null, 4)}</>;
  };

  const getCsvView = () => {
    if (
      wizardModel.getData("csvFileContent") &&
      wizardModel.getData("csvFileContent").length > 0
    ) {
      return (
        <>
          <div>
            {/*<FilterContainer*/}
            {/*  title={"CSV File Content"}*/}
            {/*  titleIcon={faSalesforce}*/}
            {/*  body={getTable()}*/}
            {/*  showBorder={false}*/}
            {/*/>*/}
            <ProgressBarBase
              className={"mt-3"}
              completionPercentage={uploadPercentage}
              variant={error ? "danger" : "success"}
              isInProgress={isUploading}
              label={`${DataParsingHelper.parseInteger(uploadPercentage)}%`}
            />
            {error ? (
              <>
                <InlineErrorText error={errorMessage} />
              </>
            ) : null}
          </div>
        </>
      );
    }
  };

  const getFileUploadBody = () => {
    if (wizardModel?.getData("csvFileContent")?.length === 0) {
      return (
        <div
          className="drop-container"
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={fileDrop}
          onClick={fileInputClicked}
        >
          <div className="drop-message">
            <div className="upload-icon">
              <i
                className="fa fa-upload"
                aria-hidden="true"
              />
            </div>
            Drop files here or click to select file
          </div>
          <input
            ref={fileInputRef}
            className="file-input"
            disabled={isUploading}
            type="file"
            accept=".csv"
            onChange={filesSelected}
            onClick={(e) => (e.target.value = null)}
          />
        </div>
      );
    }
  };
  const getFilesBody = () => {
    if (Array.isArray(validFiles) && validFiles.length > 0) {
      return (
        <div>
          {validFiles.map((data, i) => (
            <div
              className="d-flex my-2"
              key={i}
            >
              <div className={"badge badge-opsera mr-2 d-flex"}>
                <div className={"h-100 file-type-badge"}>
                  {fileType(data?.name)}
                </div>
              </div>
              <div className={`file-name ${data.invalid ? "file-error" : ""}`}>
                {data.name}
              </div>
              <div className="file-size ml-2">({fileSize(data.size)})</div>
              {data.invalid && (
                <span className="file-error-message">({errorMessage})</span>
              )}
              <div
                className="ml-3 danger-red pointer fa fa-trash my-auto"
                onClick={() => removeFile()}
              />
            </div>
          ))}
        </div>
      );
    }
  };

  const getValidateButton = () => {
    if (
      unsupportedFiles?.length === 0 &&
      validFiles?.length &&
      wizardModel?.getData("csvFileContent")?.length === 0
    ) {
      return (
        <Button
          variant="primary"
          className={"mt-3"}
          onClick={() => uploadFile()}
        >
          Upload File
        </Button>
      );
    }
  };

  const getBody = () => {
    if (
      wizardModel?.getData("recordId") &&
      wizardModel?.getData("recordId").length > 0
    ) {
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
          <ErrorDialog error={error} />
        </div>
      );
    }
  };

  const getHelpText = () => {
    return (
      <div className="my-2">
        <div>The file must match these requirements:</div>
        <div>1. The maximum number of components supported is 10,000</div>
        <div>
          2. Upload file can be of .csv extension only (single file is allowed){" "}
        </div>
        <div>3. The maximum file size supported is 10MB</div>
      </div>
    );
  };

  return (
    <div>
      <div className="my-2">
        Select components using a CSV file to use for deployment.
      </div>
      <div>
        <ExternalPageLink
          linkText={
            "Please click here to view detailed Help Documentation for the File Upload process."
          }
          link={`https://opsera.atlassian.net/l/c/6eQ9BMAw`}
        />
      </div>
      {getHelpText()}
      {getErrorDialog()}
      <div className={"file-display-container"}>{getBody()}</div>
    </div>
  );
}

CustomSettingFileUploadComponent.propTypes = {
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
  isUploaded: PropTypes.bool,
  setIsUploaded: PropTypes.func,
};

export default CustomSettingFileUploadComponent;
