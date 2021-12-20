import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import StandaloneMultiSelectInput from "components/common/inputs/multi_select/StandaloneMultiSelectInput";

const OctopusStandaloneEnvironmentsMultiSelectInput = ({ dataObject, value,  disabled, setDataFunction }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [octopusEnvironments, setOctopusEnvironments] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    setOctopusEnvironments(dataObject && dataObject.getData("environmentList") ? dataObject.getData("environmentList") : []);
    setIsLoading(false);
  }, [dataObject.getData("environmentList")]);

  return (    
    <StandaloneMultiSelectInput      
      selectOptions={octopusEnvironments}
      valueField={"id"}
      textField={"name"}
      busy={isLoading}
      value={value}
      placeholderText="Select Environments"
      disabled={disabled}
      setDataFunction={(data) => setDataFunction(data)}
    />
  );
};

OctopusStandaloneEnvironmentsMultiSelectInput.propTypes = {
  dataObject: PropTypes.object,
  value: PropTypes.array,
  disabled: PropTypes.bool,
  setDataFunction: PropTypes.func,
};

export default OctopusStandaloneEnvironmentsMultiSelectInput;
