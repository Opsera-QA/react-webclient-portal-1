import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import toolManagementActions from "components/admin/tools/tool-management-actions";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";

function ToolIdentifierMultiSelectInput({ fieldName, dataObject, setDataFunction, setDataObject, disabled, textField, valueField, toolRegistryFilter}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [toolIdentifiers, setToolIdentifiers] = useState([]);
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
      setToolIdentifiers(response?.data);
    }
  };

  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      selectOptions={toolIdentifiers}
      groupBy={"tool_type_identifier"}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      // placeholderText={placeholderText}
      disabled={disabled || isLoading}
    />
  );
}

ToolIdentifierMultiSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  toolRegistryFilter: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string
};

ToolIdentifierMultiSelectInput.defaultProps = {
  valueField: "identifier",
  textField: "name"
};

export default ToolIdentifierMultiSelectInput;