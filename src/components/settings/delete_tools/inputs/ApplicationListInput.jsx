import React from 'react';
import PropTypes from 'prop-types';
import PlatformApplicationsListInput from "components/common/list_of_values_input/platform/PlatformApplicationsListInput";

function ApplicationListInput({dataObject, setDataObject, disabled}) {
    const setApplication = (fieldName, selectedOption) => {
        console.log(selectedOption.tools);
        let newDataObject = {...dataObject};
        newDataObject.setData("applicationId", selectedOption._id);
        newDataObject.setData("toolsList", selectedOption.tools);
        setDataObject({...newDataObject});
      };
    const clearApplication = (fieldName) => {
        let newDataObject = {...dataObject};
        newDataObject.setData("applicationId", "");
        newDataObject.setData("toolsList", []);
        setDataObject({...newDataObject});
      };
      
    return (
        <PlatformApplicationsListInput 
            fieldName={"applicationId"}
            requireConfiguration={true}
            dataObject={dataObject}
            setDataObject={setDataObject}
            setDataFunction={setApplication}
            clearDataFunction={clearApplication}
            disabled={disabled}
        />
    );
}

ApplicationListInput.propTypes = {
    dataObject: PropTypes.object,
    setDataObject: PropTypes.func,
    disabled: PropTypes.bool,
};

export default ApplicationListInput;

