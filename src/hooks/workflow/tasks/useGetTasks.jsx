import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import useTaskActions from "hooks/workflow/tasks/useTaskActions";
import TaskFilterModel from "components/tasks/task.filter.model";
import useComponentStateReference from "hooks/useComponentStateReference";
import TaskRoleHelper from "@opsera/know-your-role/roles/tasks/taskRole.helper";

export default function useGetTasks(
  fields,
  setUrlParameters = false,
  pageSize,
  handleErrorFunction,
) {
  const [tasks, setTasks] = useState([]);
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  const [taskFilterModel, setTaskFilterModel] = useState(new TaskFilterModel(setUrlParameters));
  const { userData } = useComponentStateReference();
  const taskActions = useTaskActions();

  useEffect(() => {
    setTasks([]);

    if (pageSize) {
      taskFilterModel.setData("pageSize", pageSize);
    }

    if (loadData) {
      loadData(getTasks, handleErrorFunction).catch(() => {});
    }
  }, []);

  const getTasks = async (
    newFilterModel = taskFilterModel,
  ) => {
    setTasks([]);

    if (TaskRoleHelper.canGetTasks(userData) !== true) {
      return;
    }

    const response = await taskActions.getTasks(
      newFilterModel,
      fields,
    );
    const newTools = DataParsingHelper.parseNestedArray(response, "data.data", []);
    setTasks([...newTools]);
    newFilterModel.updateTotalCount(DataParsingHelper.parseNestedInteger(response, "data.count", 0));
    newFilterModel.updateActiveFilters();
    setTaskFilterModel({...newFilterModel});
  };

  return ({
    tasks: tasks,
    setTasks: setTasks,
    taskFilterModel: taskFilterModel,
    setTaskFilterModel: setTaskFilterModel,
    loadData: async (newFilterModel) => loadData(async () => getTasks(newFilterModel), handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
