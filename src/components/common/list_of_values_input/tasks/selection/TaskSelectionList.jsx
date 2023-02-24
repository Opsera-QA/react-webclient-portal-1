import React, {useCallback, useState} from "react";
import PropTypes from "prop-types";
import {faCompassDrafting} from "@fortawesome/pro-light-svg-icons";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {hasStringValue} from "components/common/helpers/string-helpers";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import InputTitleBar from "components/common/inputs/info_text/InputTitleBar";
import AddAllButtonBase from "temp-library-components/button/add/AddAllButtonBase";
import AddSelectedButtonBase from "temp-library-components/button/add/AddSelectedButtonBase";
import AddShownButtonBase from "temp-library-components/button/add/AddShownButtonBase";
import {TaskSelectionCard} from "components/common/list_of_values_input/tasks/selection/TaskSelectionCard";
import TaskVerticalTabContainer from "components/tasks/TaskVerticalTabContainer";
import useGetTasks from "hooks/workflow/tasks/useGetTasks";
import {sortByName} from "components/common/list_of_values_input/pipelines/selection/SelectedPipelineList";

export default function TaskSelectionList(
  {
    model,
    setModel,
    fieldName,
    currentData,
    disabled,
    className,
    customTitle,
  }) {
  const field = model?.getFieldById(fieldName);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const {
    isLoading,
    error,
    tasks,
    taskFilterModel,
    loadData,
  } = useGetTasks(
    ["name", "owner"],
    undefined,
    false,
    10000,
  );

  const getUnselectedTasks = () => {
    const output = [];

    tasks.forEach((task) => {
      const foundTask = currentData.find((taskId) => taskId === task?._id);

      if (!foundTask) {
        output.push(task);
      }
    });

    return output;
  };

  const getFilteredTasks = useCallback(() => {
    const output = getUnselectedTasks();

    if (hasStringValue(searchText)) {
      const lowercaseSearchText = searchText.toLowerCase();
      return output.filter((task) => {
        return task.name.toLowerCase().includes(lowercaseSearchText) || task.owner_name.toLowerCase().includes(lowercaseSearchText);
      });
    }

    return [...sortByName(output)];
  }, [tasks, currentData, searchText]);

  const filteredTasks = getFilteredTasks();
  const unselectedTaskCount = getUnselectedTasks()?.length;

  const addAllTasks = () => {
    const output = DataParsingHelper.parseArray(currentData, []);
    tasks.forEach((task) => {
      if (output.includes(task._id) !== true) {
        output.push(task._id);
      }
    });

    model?.setData(fieldName, output);
    setModel({...model});
    setSearchText("");
  };

  const addAllShownTasks = () => {
    const output = DataParsingHelper.parseArray(currentData, []);
    filteredTasks.forEach((task) => {
      if (output.includes(task._id) !== true) {
        output.push(task._id);
      }
    });

    model?.setData(fieldName, output);
    setModel({...model});
    setSearchText("");
  };

  const addSelectedTasks = () => {
    const output = DataParsingHelper.parseArray(currentData, []);
    selectedTasks.forEach((task) => {
      if (output.includes(task._id) !== true) {
        output.push(task._id);
      }
    });

    model?.setData(fieldName, output);
    setModel({...model});
    setSearchText("");
  };

  const getTaskCards = () => {
    if (isLoading === true) {
      return (
        <CenterLoadingIndicator
          type={"Tasks"}
          minHeight={"370px"}
        />
      );
    }

    if (filteredTasks.length === 0) {
      return (
        <div className={"list-group membership-list"}>
          <div className="h-100 m-auto text-center">
            <span>No Tasks Found</span>
          </div>
        </div>
      );
    }

    return (
      <div className={"membership-list"}>
        {filteredTasks.map((task, index) => {
          return (
            <div key={task?._id} className={index % 2 === 0 ? "even-row-background-color" : "odd-row-background-color"}>
              <TaskSelectionCard
                selectedTasks={selectedTasks}
                setSelectedTasks={setSelectedTasks}
                task={task}
                stacked={true}
              />
            </div>
          );
        })}
      </div>
    );
  };

  const getButtons = () => {
    if (disabled === true) {
      return null;
    }

    return (
      <div
        style={{
          borderTop: "1px solid #E6E5E3",
        }}
        className={"w-100 p-3"}
      >
          <AddAllButtonBase
            onClickFunction={addAllTasks}
            itemCount={unselectedTaskCount}
            buttonSize={"sm"}
            buttonClassName={"w-100"}
            className={"my-2"}
            disabled={isLoading}
          />
          <AddSelectedButtonBase
            onClickFunction={addSelectedTasks}
            itemCount={selectedTasks.length}
            buttonSize={"sm"}
            buttonClassName={"w-100"}
            className={"my-2"}
            disabled={isLoading}
          />
          <AddShownButtonBase
            onClickFunction={addAllShownTasks}
            itemCount={filteredTasks.length}
            buttonSize={"sm"}
            buttonClassName={"w-100"}
            className={"my-2"}
            disabled={isLoading}
          />
      </div>
    );
  };

  const handleLoadData = (newFilterModel) => {
    setSelectedTasks([]);
    loadData(newFilterModel);
  };

  const getBody = () => {
    return (
      <div>
        <InputTitleBar
          disabled={disabled}
          icon={faCompassDrafting}
          isLoading={isLoading}
          customTitle={customTitle}
          setSearchTerm={setSearchText}
          searchTerm={searchText}
          showSearchBar={true}
          field={field}
        />
        <div
          className={"content-container"}
        >
          <div
            className={"px-2 py-1 d-flex justify-content-between"}
            style={{
              borderBottom: "1px solid #E6E5E3",
            }}
          >
            <div className={"my-auto"}>

            </div>
            <div className={"my-auto"}>
              {filteredTasks.length} {filteredTasks.length !== 1 ? "Tasks" : "Task"}
            </div>
          </div>
          <div className={"d-flex"}>
            <div
              style={{
                borderRight: "1px solid #E6E5E3",
                minWidth: "250px",
                width: "250px",
                maxWidth: "250px",
              }}
            >
              <TaskVerticalTabContainer
                isLoading={isLoading}
                taskFilterModel={taskFilterModel}
                loadData={handleLoadData}
              />
            </div>
            <div
              className={"w-100"}
              style={{
                overflowX: "auto",
              }}
            >
              {getTaskCards()}
            </div>
          </div>
          {getButtons()}
        </div>
      </div>
    );
  };

  return (
    <div className={className}>
      {getBody()}
    </div>
  );
}

TaskSelectionList.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  currentData: PropTypes.array,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  customTitle: PropTypes.string,
};
