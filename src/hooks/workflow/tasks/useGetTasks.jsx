import { useEffect, useState } from "react";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import useTaskActions from "hooks/workflow/tasks/useTaskActions";
import TaskFilterModel from "components/tasks/task.filter.model";

export default function useGetTasks(
  fields,
  active,
  setUrlParameters = false,
  pageSize,
  handleErrorFunction,
) {
  const [tasks, setTasks] = useState([]);
  const [taskFilterModel, setTaskFilterModel] = useState(new TaskFilterModel(undefined, undefined, undefined, setUrlParameters));
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
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
