import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import toolManagementActions from "components/admin/tools/tool-management-actions";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function ToolIdentifierSelectInput({ fieldName, dataObject, setDataFunction, setDataObject, disabled, textField, valueField, toolRegistryFilter}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [toolTypes, setToolTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
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
    let response = await toolManagementActions.getToolIdentifiers(getAccessToken, toolRegistryFilter);

    if (response?.data != null) {
      setToolTypes(response?.data);
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      selectOptions={toolTypes}
      groupBy={"tool_type_identifier"}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      // placeholderText={placeholderText}
      disabled={disabled || isLoading}
    />
  );
}

ToolIdentifierSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  toolRegistryFilter: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string
};

ToolIdentifierSelectInput.defaultProps = {
  valueField: "identifier",
  textField: "name"
};

export default ToolIdentifierSelectInput;