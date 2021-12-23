import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const INFORMATICA_REGION_TYPES = [
  {
    name: "North America",
    value: "dm-us"
  },
  {
    name: "Europe",
    value: "dm-em"
  },
  {
    name: "Asia Pacific",
    value: "dm-ap"
  }
];

const InformaticaRegionSelectInput = ({dataObject, setDataObject, fieldName, disabled}) => {
  
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("regions", selectedOption.value);
    setDataObject({...newDataObject});
  };

  const clearDataFunction = (fieldName) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("regions", "");
    setDataObject({...newDataObject});
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      selectOptions={INFORMATICA_REGION_TYPES}      
      valueField="value"
      textField="name"
      placeholderText={"Select Region"}
      disabled={disabled}
    />
  );
};

InformaticaRegionSelectInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,    
  disabled: PropTypes.bool,  
};

InformaticaRegionSelectInput.defaultProps = {
  disabled: false
};

export default InformaticaRegionSelectInput;