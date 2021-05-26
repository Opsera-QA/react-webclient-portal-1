import React, {useContext} from "react";
import PropTypes from "prop-types";
import toolsActions from "components/inventory/tools/tools-actions";
import {AuthContext} from "contexts/AuthContext";
import VaultInlineInputBase from "./VaultInlineInputBase";

function VaultSummaryPageInputField({fieldName, dataObject, setDataObject, disabled, visible}) {
  const { getAccessToken } = useContext(AuthContext);

  const saveData = async () => {
    let newDataObject = {...dataObject};
    const response = await toolsActions.updateTool(newDataObject, getAccessToken);
    setDataObject({...newDataObject});
    return response;
  };

  if (dataObject == null) {
    return null;
  }

  return (
    <VaultInlineInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      disabled={disabled}
      saveData={saveData}
      visible={visible}
    />
  );
}

VaultSummaryPageInputField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
};

VaultSummaryPageInputField.defaultProps = {
  fieldName: "vault"
};

export default VaultSummaryPageInputField;