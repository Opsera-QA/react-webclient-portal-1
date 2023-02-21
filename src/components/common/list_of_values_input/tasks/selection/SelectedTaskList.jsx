import React, {useCallback, useState} from "react";
import PropTypes from "prop-types";
import {faCompassDrafting} from "@fortawesome/pro-light-svg-icons";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {TaskSelectionCard} from "components/common/list_of_values_input/tasks/selection/TaskSelectionCard";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import InputTitleBar from "components/common/inputs/info_text/InputTitleBar";
import RemoveAllButtonBase from "temp-library-components/button/remove/RemoveAllButtonBase";
import RemoveSelectedButtonBase from "temp-library-components/button/remove/RemoveSelectedButtonBase";
import RemoveShownButtonBase from "temp-library-components/button/remove/RemoveShownButtonBase";
import useGetTasks from "hooks/workflow/tasks/useGetTasks";
import {sortByName} from "components/common/list_of_values_input/pipelines/selection/SelectedPipelineList";

export default function SelectedTaskList(
  {
    model,
    fieldName,
    setModel,
    currentData,
    disabled,
    customTitle,
    className,
  }) {
  const {
    isLoading,
    error,
    tasks,
  } = useGetTasks(
    ["name", "owner"],
    undefined,
    false,
    10000,
  );
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const field = model?.getFieldById(fieldName);

  const getFilteredTasks = useCallback(() => {
    const output = [];

    currentData.forEach((taskId) => {
      const foundTask = tasks.find((task) => task._id === taskId);

      if (foundTask) {
        output.push(foundTask);
      } else {
        output.push({
          name: "Task Not Found",
          owner_name: "Unknown User",
          _id: taskId,
        });
      }
    });

    if (hasStringValue(searchText)) {
      const lowercaseSearchText = searchText.toLowerCase();
      return output.filter((task) => {
        return task.name.toLowerCase().includes(lowercaseSearchText) || task.owner_name.toLowerCase().includes(lowercaseSearchText);
      });
    }

    return [...sortByName(output)];
  }, [tasks, currentData, searchText]);

  const filteredTasks = getFilteredTasks();

  const removeAllTasks = () => {
    model?.setDefaultValue(fieldName);
    setModel({...model});
    setSearchText("");
  };

  const removeAllFilteredTasks = () => {
    const shownTasks = getFilteredTasks();
    const output = currentData.filter((taskId) => {
      return shownTasks.find((shownTask) => shownTask._id === taskId) == null;
    });

    model?.setData(fieldName, output);
    setModel({...model});
    setSelectedTasks([]);
    setSearchText("");
  };

  const removeSelectedTasks = () => {
    const output = currentData.filter((taskId) => {
      return selectedTasks.find((selectedTask) => selectedTask._id === taskId) == null;
    });

    model?.setData(fieldName, output);
    setModel({...model});
    setSelectedTasks([]);
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
        <div className={"membership-list"}>
          <div className={"h-100 m-auto text-center"}>
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
                disabled={disabled}
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
        <RemoveAllButtonBase
          onClickFunction={removeAllTasks}
          itemCount={currentData.length}
          buttonSize={"sm"}
          buttonClassName={"w-100"}
          className={"my-2"}
          disabled={isLoading}
        />
        <RemoveSelectedButtonBase
          onClickFunction={removeSelectedTasks}
          itemCount={selectedTasks.length}
          buttonSize={"sm"}
          buttonClassName={"w-100"}
          className={"my-2"}
          disabled={isLoading}
        />
        <RemoveShownButtonBase
          onClickFunction={removeAllFilteredTasks}
          itemCount={filteredTasks.length}
          buttonSize={"sm"}
          buttonClassName={"w-100"}
          className={"my-2"}
          disabled={isLoading}
        />
      </div>
    );
  };

  const getBody = () => {
    return (
      <div>
        <InputTitleBar
          disabled={disabled}
          icon={faCompassDrafting}
          isLoading={isLoading}
          field={field}
          customTitle={customTitle}
          setSearchTerm={setSearchText}
          searchTerm={searchText}
          showSearchBar={true}
        />
        <div
          className={"content-container"}
          style={{
            overflowX: "auto",
          }}
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
          <div
            style={{
              overflowX: "auto",
            }}
          >
            {getTaskCards()}
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

SelectedTaskList.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  setModel: PropTypes.func,
  currentData: PropTypes.array,
  disabled: PropTypes.bool,
  customTitle: PropTypes.string,
  className: PropTypes.string,
};
