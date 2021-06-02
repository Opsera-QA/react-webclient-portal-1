import React from 'react';
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import PropTypes from 'prop-types';

const PLATFORM_OPTIONS = [
    { value: "", label: "Select One", isDisabled: "yes" },
    { value: ".NET on Windows Server", label: ".NET on Windows Server" },
    { value: "Go", label: "Go" },
    { value: "Java SE", label: "Java SE" },
    { value: "Multicontainer Docker", label: "Multiple Container Docker" },
    { value: "Node.js", label: "Node.js" },
    { value: "PHP", label: "PHP" },
    { value: "Preconfigured Docker", label: "Pre-configured Docker" },
    { value: "Python", label: "Python" },
    { value: "Ruby", label: "Ruby" },
    { value: "Single Container Docker", label: "Single Container Docker" },
    { value: "Tomcat", label: "Tomcat" }
  ];

function EBSPlatformOptionsInput({dataObject, setDataObject, disabled}) {
    const setPlatformOptions = (fieldName, selectedOption) => {
        let newDataObject = {...dataObject};
        newDataObject.setData("platform", selectedOption.value);
        setDataObject({...newDataObject});
      };
    const clearDataFunction = () => {
        let newDataObject = {...dataObject};
        newDataObject.setData("platform", "");
        setDataObject({...newDataObject});
      };
    return (
        <SelectInputBase
            setDataFunction={setPlatformOptions}
            setDataObject={setDataObject}
            valueField="value"
            textField="label"
            dataObject={dataObject}
            clearDataFunction={clearDataFunction}
            filter={"contains"}
            selectOptions={PLATFORM_OPTIONS ? PLATFORM_OPTIONS : []}
            fieldName={"platform"}
            disabled={disabled}
        />     
    );
}

EBSPlatformOptionsInput.propTypes = {
    dataObject: PropTypes.object,
    setDataObject: PropTypes.func,
    disabled: PropTypes.bool,
};

export default EBSPlatformOptionsInput;

