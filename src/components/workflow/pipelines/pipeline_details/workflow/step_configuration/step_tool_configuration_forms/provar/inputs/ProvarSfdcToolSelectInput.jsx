import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import RoleRestrictedToolByIdentifierInputBase from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";

function ProvarSfdcToolSelectInput({ model, setModel, disabled, fieldName }) {
  const setDataFunction = () => {
    let newDataObject = { ...model };
    newDataObject.setData("useSfdcOrg", !model.getData("useSfdcOrg"));
    newDataObject.setDefaultValue("sfdcToolId");
    setModel({ ...newDataObject });
  };

  const getSfdcToolInput = () => {
    if (model.getData("useSfdcOrg") === true) {
      return (
        <RoleRestrictedToolByIdentifierInputBase
          toolIdentifier={"sfdc-configurator"}
          toolFriendlyName={"Salesforce Credentials"}
          fieldName={"sfdcToolId"}
          model={model}
          setModel={setModel}
        />
      );
    }
  };

  return (
    <>
      <BooleanToggleInput
        setDataObject={setModel}
        dataObject={model}
        setDataFunction={setDataFunction}
        fieldName={"useSfdcOrg"}
        disabled={disabled}
      />
      {getSfdcToolInput()}
    </>
  );
}

ProvarSfdcToolSelectInput.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};


ProvarSfdcToolSelectInput.defaultProps = {
  disabled: false
};

export default ProvarSfdcToolSelectInput;
