import React from 'react';
import PropTypes from 'prop-types';
import SelectInputBase from 'components/common/inputs/select/SelectInputBase';


const OctopusProjectTypeSelectInput = ({ fieldName, dataObject, setDataObject, disabled, textField, valueField }) => {

    const PROJECT_TYPES = [
        {
            id: "CUSTOM",
            name: "Custom"
        },
        {
            id: "OPSERA_MANAGED",
            name: "Opsera Managed"
        }
    ];

    const setDataFunction = (fieldName, selectedOption) => {
        let newDataObject = {...dataObject};
        newDataObject.setData(fieldName, selectedOption.id);
        setDataObject({...newDataObject});
    };

    return (
        <div>
            <SelectInputBase 
                fieldName={fieldName}
                dataObject={dataObject}
                setDataObject={setDataObject}
                selectOptions={PROJECT_TYPES}                
                valueField={valueField}
                textField={textField}                
                disabled={disabled}
                setDataFunction={setDataFunction}
            />
        </div>
    );
};

OctopusProjectTypeSelectInput.propTypes = {
    fieldName: PropTypes.string,
    dataObject: PropTypes.object,
    setDataObject: PropTypes.func,
    disabled: PropTypes.bool,
    textField: PropTypes.string,
    valueField: PropTypes.string,
};

OctopusProjectTypeSelectInput.defaultProps = {
    valueField: "id",
    textField: "name"
};

export default OctopusProjectTypeSelectInput;
