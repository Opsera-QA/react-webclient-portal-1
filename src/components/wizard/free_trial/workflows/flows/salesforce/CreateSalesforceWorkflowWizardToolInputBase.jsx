import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import toolsActions from "components/inventory/tools/tools-actions";
import {hasStringValue} from "components/common/helpers/string-helpers";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import InputContainer from "components/common/inputs/InputContainer";
import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";
import InputLabelBase from "components/common/inputs/InputLabelBase";

export default function CreateSalesforceWorkflowWizardToolInputBase(
  {
    toolIdentifier,
    visible,
    model,
    setModel,
    disabled,
    className,
    fields,
    textField,
    valueField,
    toolId,
    setToolId,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const [tools, setTools] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setTools([]);
    setError(undefined);

    if (hasStringValue(toolIdentifier) === true) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          setError(error);
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [toolIdentifier]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadTools(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        setError(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadTools = async (cancelSource = cancelTokenSource) => {
    const response = await toolsActions.getRoleLimitedToolsByIdentifier(getAccessToken, cancelSource, toolIdentifier, fields);
    const newTools = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(newTools)) {
      const filteredTools = newTools?.filter((tool) => {return tool.configuration != null && Object.entries(tool.configuration).length > 0; });
      // const filteredTools = newTools?.filter((tool) => {
      //   const toolConfiguration = tool?.configuration;
      //   const model = model?.getNewInstance(toolConfiguration, false);
      //
      //   if (model?.isValid() !== true) {
      //     console.log("tool invalid: " + JSON.stringify(tool?.configuration));
      //     return false;
        // }
        //
        // return tool.configuration != null && Object.entries(tool.configuration).length > 0;
      // });
      setTools([...filteredTools]);
    }
  };

  const getPlaceholderText = () => {
    if (isLoading === true) {
      return "Searching for Registered Accounts";
    }

    if (!Array.isArray(tools) || tools.length === 0) {
      return "There are no Accounts registered. Please create a new Account";
    }

    return "Create a new Account or Select a Registered One";
  };

  const setDataFunction = (selectedOption) => {
    const newModel = model?.getNewInstance(selectedOption?.configuration, false);
    setToolId(selectedOption?._id);
    setModel({...newModel});
  };

  return (
    <InputContainer>
      <InputLabelBase
        className={"mb-2"}
        label={"Account"}
      />
      <StandaloneSelectInput
        className={className}
        value={toolId}
        setDataFunction={setDataFunction}
        selectOptions={tools}
        busy={isLoading}
        valueField={valueField}
        textField={textField}
        visible={visible}
        error={error}
        placeholderText={getPlaceholderText()}
        disabled={disabled || isLoading}
      />
    </InputContainer>
  );
}

CreateSalesforceWorkflowWizardToolInputBase.propTypes = {
  toolIdentifier: PropTypes.string,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  configurationRequired: PropTypes.bool,
  clearDataFunction: PropTypes.func,
  className: PropTypes.string,
  fields: PropTypes.array,
  textField: PropTypes.any,
  valueField: PropTypes.string,
  filterDataFunction: PropTypes.func,
  toolId: PropTypes.string,
  setToolId: PropTypes.func,
};

CreateSalesforceWorkflowWizardToolInputBase.defaultProps = {
  textField: "name",
  valueField: "_id",
};