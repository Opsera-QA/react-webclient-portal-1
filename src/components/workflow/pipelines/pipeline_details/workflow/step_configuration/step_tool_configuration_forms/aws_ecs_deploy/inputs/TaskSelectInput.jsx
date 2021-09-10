import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";
import axios from "axios";
import Model from "../../../../../../../../../core/data_model/model";
import gitTasksActions from "../../../../../../../../tasks/git-task-actions";
import gitTasksFilterMetadata from "../../../../../../../../tasks/git-tasks-filter-metadata";

function TaskSelectInput({
  fieldName,
  dataObject,
  setDataObject,
  disabled,
  textField,
  valueField,
  tool_prop,
  pipelineId,
}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select a Service Template");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [gitTasksFilterDto, setGitTasksFilterDto] = useState(new Model({...gitTasksFilterMetadata.newObjectFields}, gitTasksFilterMetadata, false));


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
      await loadTypes(cancelSource);
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

  const loadTypes = async (filterDto = gitTasksFilterDto, cancelSource = cancelTokenSource) => {
    try {
      let newFilterDto = gitTasksFilterDto;
      newFilterDto.setData("type", "ecs_service_creation");
      setGitTasksFilterDto({...newFilterDto});
      const response = await gitTasksActions.getGitTasksListV2(getAccessToken, cancelSource, gitTasksFilterDto);
      const taskList = response?.data?.data;
      if (isMounted.current === true && taskList) {
        setTasks(taskList);
      }
    } catch (error) {
      setPlaceholder("No Service Templates Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
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
      busy={isLoading}
      placeholderText={placeholder}
      disabled={disabled || isLoading || (!isLoading && (tasks == null || tasks.length === 0))}
    />
  );
}

TaskSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string,
  pipelineId: PropTypes.string,
};

TaskSelectInput.defaultProps = {
  fieldName: "ecsServiceTaskId",
  textField: "name",
  valueField: "_id"
};

export default TaskSelectInput;
