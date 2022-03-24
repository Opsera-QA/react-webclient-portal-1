import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import RoleRestrictedToolByIdentifierInputBase
from "components/common/list_of_values_input/tools/RoleRestrictedToolByIdentifierInputBase";
import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";


function FlywayToolSelectInput({ fieldName, model, setModel, disabled }) {
    const setDataFunction = (fieldName, selectedOption) => {
        let newModel = {...model};
        newModel.setData(fieldName, selectedOption?._id);
        newModel.setData("dbType", selectedOption?.configuration?.buildType);
        setModel({...newModel});
    };
    const clearDataFunction = (fieldName, selectedOption) => {
        let newModel = {...model};
        newModel.setData(fieldName, "");
        newModel.setData("dbType", "");
        setModel({...newModel});
    };
    
  return (
    <RoleRestrictedToolByIdentifierInputBase
        toolIdentifier={toolIdentifierConstants.TOOL_IDENTIFIERS.FLYWAY_DATABASE_MIGRATOR}
        toolFriendlyName={"Flyway Database Migrator"}
        fieldName={fieldName}
        model={model}
        setModel={setModel}
        placeholderText={"Select a Tool"}
        setDataFunction={setDataFunction}
        clearDataFunction={clearDataFunction}
    />
  );
}

FlywayToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

export default FlywayToolSelectInput;