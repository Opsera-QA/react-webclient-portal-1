import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import toolsActions from "components/inventory/tools/tools-actions";
import {hasStringValue} from "components/common/helpers/string-helpers";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import InputContainer from "components/common/inputs/InputContainer";
import ClearDataIcon from "../../../../../common/icons/field/ClearDataIcon";

export default function CreateSalesforceWorkflowWizardSelectToolInputBase(
  {
    toolIdentifier,
    visible,
    model,
    setModel,
    disabled,
    className,
    textField,
    valueField,
    toolId,
    setToolId,
    setCurrentToolCount,
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
    const response = await toolsActions.getToolsOwnedByUser(
      getAccessToken,
      cancelSource,
      toolIdentifier,
    );
    const newTools = response?.data?.data;
    const toolCount = response?.data?.count;

    if (isMounted?.current === true && Array.isArray(newTools)) {
      if (setCurrentToolCount && typeof toolCount === "number"){
        setCurrentToolCount(toolCount);
      }

      const filteredTools = newTools?.filter((tool) => {
        return tool.configuration != null && Object.entries(tool.configuration).length > 0;
      });
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

  const getInputLabel = () => {
    return(
        <div className={"mb-2"}>
          <div className="d-flex justify-content-between">
            <div>{"Account"}</div>
            <div className={"d-flex"}>
              <ClearDataIcon
                  clearValueFunction={clearDataFunction}
                  className={"ml-2"}
              />
            </div>
          </div>
        </div>
    );
  };

  const setDataFunction = (selectedOption) => {
    const newModel = model?.getNewInstance(selectedOption?.configuration, false);
    setToolId(selectedOption?._id);
    setModel({...newModel});
  };

  const clearDataFunction = (selectedOption) => {
    const newModel = model?.getNewInstance(selectedOption?.configuration, false);
    setToolId("");
    setModel({...newModel});
  };

  return (
    <InputContainer>
      {getInputLabel()}
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

CreateSalesforceWorkflowWizardSelectToolInputBase.propTypes = {
  toolIdentifier: PropTypes.string,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  configurationRequired: PropTypes.bool,
  clearDataFunction: PropTypes.func,
  className: PropTypes.string,
  textField: PropTypes.any,
  valueField: PropTypes.string,
  filterDataFunction: PropTypes.func,
  toolId: PropTypes.string,
  setToolId: PropTypes.func,
  setCurrentToolCount: PropTypes.func,
};

CreateSalesforceWorkflowWizardSelectToolInputBase.defaultProps = {
  textField: "name",
  valueField: "_id",
};