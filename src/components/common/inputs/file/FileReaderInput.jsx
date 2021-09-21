import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";

function FileReaderInput({ fieldName, dataObject, setDataObject, setDataFunction, acceptType, disabled }) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef();

  const validateAndSetData = async () => {
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files);
    }
  };

  const resetStoredFileContents = () => {
    let newDataObject = {...dataObject};
    newDataObject.setData(fieldName, "");
    newDataObject.setData("fileName", "");
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
        if(validateFileSize(files[i])) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = async (evt) => {
            const dataString = evt.target.result;
            // console.log(dataString);
            if(dataString){
                newDataObject.setData(fieldName, dataString);
                newDataObject.setData("fileName", files[i].name);
                setDataObject({...newDataObject});
            }
        };
            reader.readAsBinaryString(file);
        } else {
            resetStoredFileContents();
            setErrorMessage('File size not permitted');
        }
        
    }
  };

  return (
    <InputContainer>
      <InputLabel field={field} /> {!fileInputRef?.current?.files && <div className="mb-2">Saved File: <b>{dataObject.getData("fileName")}</b></div>}
      <input
        type={"file"}
        ref={fileInputRef}
        disabled={disabled}
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