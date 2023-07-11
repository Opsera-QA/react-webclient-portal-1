import React, { useContext, useEffect, useRef, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import pipelineStepNotificationActions from "components/workflow/plan/step/notifications/pipelineStepNotification.actions";
import { DialogToastContext } from "contexts/DialogToastContext";
import _ from "lodash";
import useComponentStateReference from "hooks/useComponentStateReference";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";

function ServiceNowServiceOfferingsSelectInput({
  valueField,
  textField,
  fieldName,
  dataObject,
  setDataObject,
  disabled,
  serviceNowToolId,
}) {
  const [field] = useState(dataObject?.getFieldById(fieldName));
  const [isLoading, setIsLoading] = useState(false);
  // const [toggleSelected, setToggleSelected] = useState(false);
  const [serviceOfferings, setServiceOfferings] = useState([]);
  const {
    cancelTokenSource,
    isMounted,
    getAccessToken,
    toastContext,
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
    setServiceOfferings([]);
    if (serviceNowToolId !== "" && serviceNowToolId != null) {
      loadServiceOfferings("").catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [serviceNowToolId]);

  const loadServiceOfferings = async (searchTerm) => {
    // if (searchTerm) {
    try {
      setIsLoading(true);
      // setToggleSelected(true);
      const response = await pipelineStepNotificationActions.getServiceNowServiceOfferingsByNameV2(
        serviceNowToolId,
        searchTerm,
        getAccessToken,
        cancelTokenSource
      );

      const results = response.data.message.result;

      if (
        Array.isArray(results)
      ) {
        setServiceOfferings(results);
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
      return "Loading Service Offerings";
    }

    if (serviceNowToolId === "") {
      return "A ServiceNow Tool must be selected before selecting a Service Offering";
    }

    if (!isLoading && serviceNowToolId !== "" && serviceOfferings.length === 0) {
      return "Start typing to load Service Offerings";
    }

    if (!isLoading && serviceNowToolId !== "" && serviceOfferings.length === 0) {
      return "No Service Offerings found for selected ServiceNow account.";
    }

    if (!isLoading && serviceNowToolId !== "" && serviceOfferings.length !== 0) {
      return "Select Service Offerings";
    }
  };

  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={serviceOfferings}
      setDataFunction={validateAndSetData}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      placeholderText={getPlaceholderText()}
      disabled={disabled || serviceNowToolId === "" || !serviceNowToolId}
      onChange={(newValue) => validateAndSetData(field.id, newValue)}
      loadDataFunction={loadServiceOfferings}
      supportSearchLookup={true}
    />
  );
}

ServiceNowServiceOfferingsSelectInput.propTypes = {
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

ServiceNowServiceOfferingsSelectInput.defaultProps = {
  textField: "name",
  valueField: "_id",
};

export default ServiceNowServiceOfferingsSelectInput;
