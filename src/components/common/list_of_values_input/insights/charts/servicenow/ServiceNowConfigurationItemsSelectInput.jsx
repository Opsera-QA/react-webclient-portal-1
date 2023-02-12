import React, { useContext, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import pipelineStepNotificationActions from "components/workflow/plan/step/notifications/pipelineStepNotification.actions";
import { DialogToastContext } from "contexts/DialogToastContext";
import _ from "lodash";
import useComponentStateReference from "hooks/useComponentStateReference";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";

function ServiceNowConfigurationItemsSelectInput({
  valueField,
  textField,
  fieldName,
  dataObject,
  setDataObject,
  disabled,
  serviceNowToolId,
}) {
  const toastContext = useContext(DialogToastContext);
  const [field] = useState(dataObject?.getFieldById(fieldName));
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  // const [toggleSelected, setToggleSelected] = useState(false);
  const [configurationItems, setConfigurationItems] = useState([]);
  const {
    isMounted,
    cancelTokenSource,
  } = useComponentStateReference();

  const validateAndSetData = (fieldName, valueArray) => {
    let newDataObject = dataObject;
    let parsedValues = parseValues(valueArray);
    newDataObject.setData(fieldName, parsedValues);
    setDataObject({ ...newDataObject });
  };

  const parseValues = (valueArray) => {
    if (valueField == null) {
      return valueArray;
    }

    let parsedValues = [];

    if (valueArray != null && valueArray.length > 0) {
      valueArray.map((value) => {
        if (typeof value === "string") {
          parsedValues.push(value);
        } else {
          const obj = {
            sys_id: value["sys_id"],
            name: value["name"],
          };

          parsedValues.push(obj);
        }
      });
    }

    return parsedValues;
  };

  useEffect(() => {
    setConfigurationItems([]);
    if (serviceNowToolId !== "" && serviceNowToolId != null) {
      loadConfigurationItems("", serviceNowToolId).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [serviceNowToolId]);

  const loadConfigurationItems = async (searchTerm) => {
    // if (searchTerm) {
      try {
        setIsLoading(true);
        // setToggleSelected(true);
        const response = await pipelineStepNotificationActions.getServiceNowConfigurationItemsByNameV2(
          serviceNowToolId,
          searchTerm,
          getAccessToken,
          cancelTokenSource
        );

        const results = response.data.message.result;

        if (
          Array.isArray(results)
        ) {
          setConfigurationItems(response.data.message.result);
        }
      } catch (error) {
        if (isMounted?.current === true) {
          toastContext.showErrorDialog(
            "Tool information is missing or unavailable! Please ensure the required credentials are registered and up to date in Tool Registry."
          );
        }
        console.error(error);
      } finally {
        if (isMounted?.current === true) {
          setIsLoading(false);
        }
      }
    // }
  };

  const getPlaceholderText = () => {
    if (isLoading) {
      return "Loading Configuration Items";
    }

    if (serviceNowToolId === "") {
      return "A ServiceNow Tool must be selected before selecting a Configuration Item";
    }

    if (!isLoading && serviceNowToolId !== "" && configurationItems.length === 0) {
      return "Start typing to load Configuration Items";
    }

    if (!isLoading && serviceNowToolId !== "" && configurationItems.length === 0) {
      return "No Configuration Items found for selected ServiceNow account.";
    }

    if (!isLoading && serviceNowToolId !== "" && configurationItems.length !== 0) {
      return "Select Configuration Items";
    }
  };

  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={configurationItems}
      setDataFunction={validateAndSetData}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      placeholderText={getPlaceholderText()}
      disabled={disabled || serviceNowToolId === "" || !serviceNowToolId}
      onChange={(newValue) => validateAndSetData(field.id, newValue)}
      supportSearchLookup={true}
      loadDataFunction={loadConfigurationItems}
    />
  );
}

ServiceNowConfigurationItemsSelectInput.propTypes = {
  fieldName: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  placeholderText: PropTypes.string,
  serviceNowToolId: PropTypes.string,
};

ServiceNowConfigurationItemsSelectInput.defaultProps = {
  textField: "name",
  valueField: "_id",
};

export default ServiceNowConfigurationItemsSelectInput;
