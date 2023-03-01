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
import useGetRegistryTools from "hooks/tools/useGetRegistryTools";
import {sortByName} from "components/common/list_of_values_input/pipelines/selection/SelectedPipelineList";
import {ToolSelectionCard} from "components/common/list_of_values_input/inventory/tools/selection/ToolSelectionCard";

export default function ToolSelectionList(
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
  const [selectedTools, setSelectedTools] = useState([]);
  const [searchText, setSearchText] = useState("");
  const {
    isLoading,
    error,
    registryTools,
    toolFilterModel,
    loadData,
  } = useGetRegistryTools(
    ["name", "owner"],
    undefined,
    10000,
    false,
  );

  const getUnselectedTools = () => {
    const output = [];

    registryTools.forEach((tool) => {
      const foundTool = currentData.find((toolId) => toolId === tool?._id);

      if (!foundTool) {
        output.push(tool);
      }
    });

    return output;
  };

  const getFilteredTools = useCallback(() => {
    const output = getUnselectedTools();

    if (hasStringValue(searchText)) {
      const lowercaseSearchText = searchText.toLowerCase();
      return output.filter((tool) => {
        return tool.name.toLowerCase().includes(lowercaseSearchText) || tool.owner_name.toLowerCase().includes(lowercaseSearchText);
      });
    }

    return [...sortByName(output)];
  }, [registryTools, currentData, searchText]);

  const filteredTools = getFilteredTools();
  const unselectedToolCount = getUnselectedTools()?.length;

  const addAllTools = () => {
    const output = DataParsingHelper.parseArray(currentData, []);
    registryTools.forEach((tool) => {
      if (output.includes(tool._id) !== true) {
        output.push(tool._id);
      }
    });

    model?.setData(fieldName, output);
    setModel({...model});
    setSearchText("");
  };

  const addAllShownTools = () => {
    const output = DataParsingHelper.parseArray(currentData, []);
    filteredTools.forEach((tool) => {
      if (output.includes(tool._id) !== true) {
        output.push(tool._id);
      }
    });

    model?.setData(fieldName, output);
    setModel({...model});
    setSearchText("");
  };

  const addSelectedTools = () => {
    const output = DataParsingHelper.parseArray(currentData, []);
    selectedTools.forEach((tool) => {
      if (output.includes(tool._id) !== true) {
        output.push(tool._id);
      }
    });

    model?.setData(fieldName, output);
    setModel({...model});
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
        <div className={"list-group membership-list"}>
          <div className="h-100 m-auto text-center">
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
                // TODO: Enable when vertical tab container is added
                // stacked={true}
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
            onClickFunction={addAllTools}
            itemCount={unselectedToolCount}
            buttonSize={"sm"}
            buttonClassName={"w-100"}
            className={"my-2"}
            disabled={isLoading}
          />
          <AddSelectedButtonBase
            onClickFunction={addSelectedTools}
            itemCount={selectedTools.length}
            buttonSize={"sm"}
            buttonClassName={"w-100"}
            className={"my-2"}
            disabled={isLoading}
          />
          <AddShownButtonBase
            onClickFunction={addAllShownTools}
            itemCount={filteredTools.length}
            buttonSize={"sm"}
            buttonClassName={"w-100"}
            className={"my-2"}
            disabled={isLoading}
          />
      </div>
    );
  };

  const handleLoadData = (newFilterModel) => {
    setSelectedTools([]);
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
              {filteredTools.length} {filteredTools.length !== 1 ? "Tools" : "Tool"}
            </div>
          </div>
          <div className={"d-flex"}>
            {/*<div*/}
            {/*  style={{*/}
            {/*    borderRight: "1px solid #E6E5E3",*/}
            {/*    minWidth: "250px",*/}
            {/*    width: "250px",*/}
            {/*    maxWidth: "250px",*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <ToolVerticalTabContainer*/}
            {/*    isLoading={isLoading}*/}
            {/*    toolFilterModel={toolFilterModel}*/}
            {/*    loadData={handleLoadData}*/}
            {/*  />*/}
            {/*</div>*/}
            <div
              className={"w-100"}
              style={{
                overflowX: "auto",
              }}
            >
              {getToolCards()}
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

ToolSelectionList.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  currentData: PropTypes.array,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  customTitle: PropTypes.string,
};
