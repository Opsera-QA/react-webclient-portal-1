import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";

function FileReaderInput({ fieldName, dataObject, setDataObject, setDataFunction, acceptType, disabled }) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef();

  const validateAndSetData = async (event) => {
    let newDataObject = dataObject;
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files);
    }
    setErrorMessage(newDataObject.getFieldError(fieldName));
  };

  const resetStoredFileContents = () => {
    let newDataObject = {...dataObject};
    newDataObject.setData(fieldName, "");
    setDataObject({...newDataObject});
  };

  const validateFileSize = (file) => {
    const validSize = 500000; // 500KB
    if (file.size > validSize) {
      return false;
    }
    return true;
  };

  const handleFiles = (files) => {
    setErrorMessage(false);
    resetStoredFileContents();
    setErrorMessage('');
    let newDataObject = {...dataObject};
    for (let i = 0; i < files.length; i++) {
        console.log(files[i]);
        if(validateFileSize(files[i])) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = async (evt) => {
            /* Parse data */
            const dataString = evt.target.result;
            console.log(dataString);
            newDataObject.setData(fieldName, dataString);
            };
            reader.readAsBinaryString(file);
        
            setDataObject({...newDataObject});
        } else {
            setErrorMessage('File size not permitted');
        }
        
    }
  };

  return (
    <InputContainer>
      <InputLabel field={field} />
      <input
        type={"file"}
        ref={fileInputRef}
        disabled={disabled}
        value={dataObject.getData(fieldName)}
        onChange={(event) => validateAndSetData(event)}
        accept={acceptType}
        onClick={ e => e.target.value = null}
      />
      <InfoText field={field} errorMessage={errorMessage}/>
    </InputContainer>
  );
}

FileReaderInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  acceptType: PropTypes.string,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  inputPopover: PropTypes.object,
  disabled: PropTypes.bool
};

export default FileReaderInput;