import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";
import FileSelectButton from "components/common/buttons/data/FileSelectButton";
import DeleteIcon from "components/common/icons/delete/DeleteIcon";
import StandaloneDatePickerInput from "components/common/inputs/date/StandaloneDateTimeInput";
import { hasStringValue } from "components/common/helpers/string-helpers";

function FileReaderInputBase({ fieldName, model, setModel, setDataFunction, clearDataFunction, acceptType, disabled, isLoading }) {
  const [field] = useState(model?.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef();

  const validateAndSetData = async (newFile, fileName) => {
    if (setDataFunction) {
      setDataFunction(fieldName, newFile, fileName);
    }
    else {
      const newModel = {...model};
      newModel.setData(fieldName, newFile);
      newModel.setData("fileName", fileName);
      setModel({...newModel});
    }
  };

  const clearValue = () => {
    if (!setDataFunction && !clearDataFunction) {
      resetStoredFileContents();
    }
    else if (clearDataFunction) {
      clearDataFunction();
    }
  };

  const resetStoredFileContents = () => {
    let newDataObject = {...model};
    newDataObject.setData(fieldName, "");
    newDataObject.setData("fileName", "");
    setModel({...newDataObject});
  };

  const validateFileSize = (file) => {
    const validSize = 500000; // 500KB
    return file?.size <= validSize;
  };

  const handleFile = () => {
    const files = fileInputRef?.current?.files;
    setErrorMessage("");

    if (files == null || files?.length === 0) {
      clearValue();
    }

    const file = files[0];

    if (file != null && validateFileSize(file)) {
      const reader = new FileReader();
      reader.onload = async (evt) => {
        const parsedFile = evt.target.result;
        console.log(file);

        if (parsedFile) {
          await validateAndSetData(parsedFile, file?.name);
        }
      };
      reader.readAsBinaryString(file);
    } else {
      clearValue();
      setErrorMessage('File size not permitted');
    }
  };

  const getFileText = () => {
    const fileName = model?.getData("fileName");
    if (fileName !== "" && model?.isChanged("fileName")) {
      return (
        <div className={"ml-3 my-auto d-flex text-muted"}>
          <span>Selected {field?.label}: <b className={"ml-1"}>{fileName}</b></span>
          <DeleteIcon className={"ml-2"} handleDeleteClick={clearValue} />
        </div>
      );
    }

    if (fileName !== "") {
      return (
        <div className={"ml-3 my-auto d-flex text-muted"}>
          <span>Saved {field?.label}: <b className={"ml-1"}>{fileName}</b></span>
          <DeleteIcon className={"ml-2"} handleDeleteClick={clearValue} />
        </div>
      );
    }

    return (<span className={"ml-3 my-auto text-muted"}>No {field?.label} Selected</span>);
  };

  const handleFileSelectionClick = () => {
    fileInputRef?.current?.click();
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer fieldName={fieldName}>
      <InputLabel
        field={field}
        model={model}
        hasError={hasStringValue(errorMessage) === true}
      />
      <div className={"d-flex"}>
        <FileSelectButton
          type={field?.label}
          handleClick={handleFileSelectionClick}
          isLoading={isLoading}
          disabled={disabled}
        />
        <input
          type={"file"}
          style={{display: 'none'}}
          ref={fileInputRef}
          disabled={disabled}
          onChange={(event) => handleFile(event)}
          accept={acceptType}
          onClick={ e => e.target.value = null}
        />
        {getFileText()}
      </div>
      <InfoText
        model={model}
        fieldName={fieldName}
        field={field}
        errorMessage={errorMessage}
      />
    </InputContainer>
  );
}

FileReaderInputBase.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  acceptType: PropTypes.string,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  isLoading: PropTypes.bool,
  clearDataFunction: PropTypes.func,
};

export default FileReaderInputBase;