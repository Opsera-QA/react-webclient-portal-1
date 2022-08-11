import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import LazyLoadMultiSelectInputBase from "components/common/inputs/select/LazyLoadMultiSelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import pipelineStepNotificationActions from "components/workflow/plan/step/notifications/pipelineStepNotification.actions";
import { DialogToastContext } from "contexts/DialogToastContext";

function ServiceNowAssignmentGroupSelectInput({
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
  const [groups, setGroups] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

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
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setGroups([]);
    // if (serviceNowToolId !== "" && serviceNowToolId != null) {
    //   loadGroups(serviceNowToolId, source).catch((error) => {
    //     if (isMounted?.current === true) {
    //       throw error;
    //     }
    //   });
    // }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [serviceNowToolId]);

  const loadGroups = async (searchTerm) => {
    if (searchTerm && searchTerm.length >= 3) {
      try {
        setIsLoading(true);
        // setToggleSelected(true);
        const response = await pipelineStepNotificationActions.getServiceNowGroupsByName(
          serviceNowToolId,
          searchTerm,
          getAccessToken,
          cancelTokenSource
        );

        if (
          response?.data !== null &&
          response?.data?.message?.result !== null &&
          Array.isArray(response.data.message.result)
        ) {
          setGroups(response.data.message.result);
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
    }
  };

  const getPlaceholderText = () => {
    if (isLoading) {
      return "Loading Assignment Groups";
    }

    if (serviceNowToolId === "") {
      return "A ServiceNow Tool must be selected before selecting a Assignment Group";
    }

    if (!isLoading && serviceNowToolId !== "" && groups.length === 0) {
      return "Start typing to load Assignment Groups";
    }

    if (!isLoading && serviceNowToolId !== "" && groups.length === 0) {
      return "No Assignment Groups found for selected ServiceNow account.";
    }

    if (!isLoading && serviceNowToolId !== "" && groups.length !== 0) {
      return "Select Assignment Groups";
    }
  };

  return (
    <LazyLoadMultiSelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={groups}
      setDataFunction={validateAndSetData}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      placeholderText={getPlaceholderText()}
      // onToggleFunction={loadBusinessServices}
      disabled={disabled || serviceNowToolId === "" || !serviceNowToolId}
      onChange={(newValue) => validateAndSetData(field.id, newValue)}
      onSearchFunction={(searchTerm) => loadGroups(searchTerm)}
      useToggle={false}
    />
  );
}

ServiceNowAssignmentGroupSelectInput.propTypes = {
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

ServiceNowAssignmentGroupSelectInput.defaultProps = {
  textField: "name",
  valueField: "_id",
};

export default ServiceNowAssignmentGroupSelectInput;
