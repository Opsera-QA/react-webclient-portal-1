import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";
import {AuthContext} from "../../../../../contexts/AuthContext";
import toolTypeActions from "../../../../admin/tools/tool-management-actions";
import SelectInputBase from "../../../inputs/SelectInputBase";

function ToolTypeSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [toolTypes, setToolTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true)
      await loadTools();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadTools = async () => {
    let response = await toolTypeActions.getToolTypes(getAccessToken, false);

    if (response?.data != null) {
      setToolTypes(response.data);
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={toolTypes}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      // placeholderText={placeholderText}
      disabled={disabled || isLoading}
    />
  );
}

ToolTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string
};

ToolTypeSelectInput.defaultProps = {
  valueField: "identifier",
  textField: "name"
};

export default ToolTypeSelectInput;