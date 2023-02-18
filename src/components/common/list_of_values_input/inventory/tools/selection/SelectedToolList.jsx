import React, {useCallback, useState} from "react";
import PropTypes from "prop-types";
import {faCompassDrafting} from "@fortawesome/pro-light-svg-icons";
import {hasStringValue} from "components/common/helpers/string-helpers";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import InputTitleBar from "components/common/inputs/info_text/InputTitleBar";
import RemoveAllButtonBase from "temp-library-components/button/remove/RemoveAllButtonBase";
import RemoveSelectedButtonBase from "temp-library-components/button/remove/RemoveSelectedButtonBase";
import RemoveShownButtonBase from "temp-library-components/button/remove/RemoveShownButtonBase";
import useGetRegistryTools from "hooks/tools/useGetRegistryTools";
import {sortByName} from "components/common/list_of_values_input/pipelines/selection/SelectedPipelineList";
import {ToolSelectionCard} from "components/common/list_of_values_input/inventory/tools/selection/ToolSelectionCard";

export default function SelectedToolList(
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
    registryTools,
  } = useGetRegistryTools(
    ["name", "owner"],
    undefined,
    10000,
    false,
  );
  const [selectedTools, setSelectedTools] = useState([]);
  const [searchText, setSearchText] = useState("");
  const field = model?.getFieldById(fieldName);

  const getFilteredTools = useCallback(() => {
    const output = [];

    currentData.forEach((toolId) => {
      const foundTool = registryTools.find((tool) => tool._id === toolId);

      if (foundTool) {
        output.push(foundTool);
      } else {
        output.push({
          name: "Tool Not Found",
          owner_name: "Unknown User",
          _id: toolId,
        });
      }
    });

    if (hasStringValue(searchText)) {
      const lowercaseSearchText = searchText.toLowerCase();
      return output.filter((tool) => {
        return tool.name.toLowerCase().includes(lowercaseSearchText) || tool.owner_name.toLowerCase().includes(lowercaseSearchText);
      });
    }

    return [...sortByName(output)];
  }, [registryTools, currentData, searchText]);

  const filteredTools = getFilteredTools();

  const removeAllTools = () => {
    model?.setDefaultValue(fieldName);
    setModel({...model});
    setSearchText("");
  };

  const removeAllFilteredTools = () => {
    const shownTools = getFilteredTools();
    const output = currentData.filter((toolId) => {
      return shownTools.find((shownTool) => shownTool._id === toolId) == null;
    });

    model?.setData(fieldName, output);
    setModel({...model});
    setSelectedTools([]);
    setSearchText("");
  };

  const removeSelectedTools = () => {
    const output = currentData.filter((toolId) => {
      return selectedTools.find((selectedTool) => selectedTool._id === toolId) == null;
    });

    model?.setData(fieldName, output);
    setModel({...model});
    setSelectedTools([]);
    setSearchText("");
  };

  const getToolCards = () => {
    if (isLoading === true) {
      return (
        <CenterLoadingIndicator
          type={"Tools"}
          minHeight={"370px"}
        />
      );
    }

    if (filteredTools.length === 0) {
      return (
        <div className={"membership-list"}>
          <div className={"h-100 m-auto text-center"}>
            <span>No Tools Found</span>
          </div>
        </div>
      );
    }

    return (
      <div className={"membership-list"}>
        {filteredTools.map((tool, index) => {
          return (
            <div key={tool?._id} className={index % 2 === 0 ? "even-row-background-color" : "odd-row-background-color"}>
              <ToolSelectionCard
                selectedTools={selectedTools}
                setSelectedTools={setSelectedTools}
                tool={tool}
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
          onClickFunction={removeAllTools}
          itemCount={currentData.length}
          buttonSize={"sm"}
          buttonClassName={"w-100"}
          className={"my-2"}
          disabled={isLoading}
        />
        <RemoveSelectedButtonBase
          onClickFunction={removeSelectedTools}
          itemCount={selectedTools.length}
          buttonSize={"sm"}
          buttonClassName={"w-100"}
          className={"my-2"}
          disabled={isLoading}
        />
        <RemoveShownButtonBase
          onClickFunction={removeAllFilteredTools}
          itemCount={filteredTools.length}
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
              {filteredTools.length} {filteredTools.length !== 1 ? "Tools" : "Tool"}
            </div>
          </div>
          <div
            style={{
              overflowX: "auto",
            }}
          >
            {getToolCards()}
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

SelectedToolList.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  setModel: PropTypes.func,
  currentData: PropTypes.array,
  disabled: PropTypes.bool,
  customTitle: PropTypes.string,
  className: PropTypes.string,
};
