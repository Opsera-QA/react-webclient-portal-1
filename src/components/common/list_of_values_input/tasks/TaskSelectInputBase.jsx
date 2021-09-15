import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import taskActions from "components/tasks/task.actions";
import {AuthContext} from "contexts/AuthContext";

function TaskSelectInputBase(
  {
    fieldName,
    dataObject,
    setDataObject,
    setDataFunction,
    disabled,
    textField,
    valueField,
    type,
    fields,
    placeholderText,
  }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (!disabled) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      await loadTasks(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadTasks = async (cancelSource = cancelTokenSource) => {
    try {
      const response = await taskActions.getLovTasksListV2(getAccessToken, cancelSource, type, fields);
      const taskList = response?.data?.data;
      if (isMounted.current === true && taskList) {
        setTasks(taskList);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("There was an error pulling Tasks. Please check the browser logs for more details");
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      textField={textField}
      valueField={valueField}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={tasks}
      setDataFunction={setDataFunction}
      busy={isLoading}
      placeholderText={placeholderText}
      disabled={disabled}
      errorMessage={errorMessage}
    />
  );
}

TaskSelectInputBase.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  setDataFunction: PropTypes.func,
  type: PropTypes.string,
  fields: PropTypes.array,
  placeholderText: PropTypes.func,
};

TaskSelectInputBase.defaultProps = {
  textField: "name",
  valueField: "_id"
};

export default TaskSelectInputBase;
