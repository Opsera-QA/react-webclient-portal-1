import React from 'react';
import PropTypes from 'prop-types';
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function OctopusProtocolInput ({fieldName, dataObject, setDataObject}) {

    const protocolArray = [
        {
            "name": "HTTP",
            "value": "http"
        },
        {
            "name": "HTTPS",
            "value": "https"
        }
    ];

    const handleProtocolSelection = (fieldName, selectedOption) => {
        let newDataObject = dataObject;
        newDataObject.setData(fieldName, selectedOption.value);
        selectedOption.value === 'http' ? newDataObject.setData("port", "80") : newDataObject.setData("port", "443");
        setDataObject({ ...newDataObject });
    };

    const clearProtocolSelection = () => {
        let newDataObject = dataObject;
        newDataObject.setData(fieldName, "");
        newDataObject.setData("port", "");
        setDataObject({ ...newDataObject });
    };

    return (        
        <SelectInputBase     
            fieldName={fieldName}
            setDataFunction={handleProtocolSelection}
            clearDataFunction={clearProtocolSelection}
            dataObject={dataObject}
            setDataObject={setDataObject}
            selectOptions={protocolArray}
            valueField="value"
            textField="name"
        />
    );
}

OctopusProtocolInput.propTypes = {
    fieldName: PropTypes.string,
    dataObject: PropTypes.object,
    setDataObject: PropTypes.func
};

export default OctopusProtocolInput;
