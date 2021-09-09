import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import jfrogStepFormMetadata from "../jfrog-stepForm-metadata";

const repositoryTypes = [
    {value: "REPOPATHPREFIX", label: "Repository Path"},
    {value: "SUBDOMAIN", label: "Sub Domain"},
    {value: "PORTPERREPO", label: "Port per Repository"},
  ];

function JFrogRepositoryTypeSelectInput({ fieldName, dataObject, setDataObject, disabled }) {
  
    const setDataFunction = (fieldName, selectedOption) => {
        console.log(selectedOption.value);
        let newDataObject = dataObject;
        newDataObject.setData("type", selectedOption.value);
        newDataObject.setData("repositoryName", "");
        newDataObject.setMetaDataFields(selectedOption.value === "PORTPERREPO" ? jfrogStepFormMetadata.fieldsAlt : jfrogStepFormMetadata.fields);
        setDataObject({...newDataObject});
    };

    return (
        <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataFunction={setDataFunction}
        setDataObject={setDataObject}
        selectOptions={repositoryTypes}
        valueField="value"
        textField="label"
        disabled={disabled}
        />
  );
}

JFrogRepositoryTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

JFrogRepositoryTypeSelectInput.defaultProps = {
  fieldName: "type",
};

export default JFrogRepositoryTypeSelectInput;