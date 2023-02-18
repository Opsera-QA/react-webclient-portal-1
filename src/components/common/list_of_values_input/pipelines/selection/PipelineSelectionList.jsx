import React, {useCallback, useState} from "react";
import PropTypes from "prop-types";
import {faCompassDrafting} from "@fortawesome/pro-light-svg-icons";
import {Row, Col} from "react-bootstrap";
import {PipelineSelectionCard} from "components/common/list_of_values_input/pipelines/selection/PipelineSelectionCard";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {sortByName} from "components/common/list_of_values_input/pipelines/selection/SelectedPipelineList";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import useGetAllPipelines from "hooks/workflow/pipelines/useGetAllPipelines";
import InputTitleBar from "components/common/inputs/info_text/InputTitleBar";
import AddAllButtonBase from "temp-library-components/button/add/AddAllButtonBase";
import AddSelectedButtonBase from "temp-library-components/button/add/AddSelectedButtonBase";
import AddShownButtonBase from "temp-library-components/button/add/AddShownButtonBase";
import PipelineVerticalTabContainer from "components/workflow/pipelines/PipelineVerticalTabContainer";

export default function PipelineSelectionList(
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
  const [selectedPipelines, setSelectedPipelines] = useState([]);
  const [searchText, setSearchText] = useState("");
  const {
    isLoading,
    error,
    pipelines,
    pipelineFilterModel,
    setPipelineFilterModel,
    loadData,
  } = useGetAllPipelines(
    ["name", "owner"],
  );

  const getUnselectedPipelines = () => {
    const output = [];

    pipelines.forEach((pipeline) => {
      const foundPipeline = currentData.find((pipelineId) => pipelineId === pipeline?._id);

      if (!foundPipeline) {
        output.push(pipeline);
      }
    });

    return output;
  };

  const getFilteredPipelines = useCallback(() => {
    const output = getUnselectedPipelines();

    if (hasStringValue(searchText)) {
      const lowercaseSearchText = searchText.toLowerCase();
      return output.filter((pipeline) => {
        return pipeline.name.toLowerCase().includes(lowercaseSearchText) || pipeline.owner_name.toLowerCase().includes(lowercaseSearchText);
      });
    }

    return [...sortByName(output)];
  }, [pipelines, currentData, searchText]);

  const filteredPipelines = getFilteredPipelines();
  const unselectedPipelineCount = getUnselectedPipelines()?.length;

  const addAllPipelines = () => {
    const output = DataParsingHelper.parseArray(currentData, []);
    pipelines.forEach((pipeline) => {
      if (output.includes(pipeline._id) !== true) {
        output.push(pipeline._id);
      }
    });

    model?.setData(fieldName, output);
    setModel({...model});
    setSearchText("");
  };

  const addAllShownPipelines = () => {
    const output = DataParsingHelper.parseArray(currentData, []);
    filteredPipelines.forEach((pipeline) => {
      if (output.includes(pipeline._id) !== true) {
        output.push(pipeline._id);
      }
    });

    model?.setData(fieldName, output);
    setModel({...model});
    setSearchText("");
  };

  const addSelectedPipelines = () => {
    const output = DataParsingHelper.parseArray(currentData, []);
    selectedPipelines.forEach((pipeline) => {
      if (output.includes(pipeline._id) !== true) {
        output.push(pipeline._id);
      }
    });

    model?.setData(fieldName, output);
    setModel({...model});
    setSearchText("");
  };

  const getPipelineCards = () => {
    if (isLoading === true) {
      return (
        <CenterLoadingIndicator
          type={"Pipelines"}
          minHeight={"370px"}
        />
      );
    }

    if (filteredPipelines.length === 0) {
      return (
        <div className={"list-group membership-list"}>
          <div className="h-100 m-auto text-center">
            <span>No Pipelines Found</span>
          </div>
        </div>
      );
    }

    return (
      <div className={"membership-list"}>
        {filteredPipelines.map((pipeline, index) => {
          return (
            <div key={pipeline?._id} className={index % 2 === 0 ? "even-row-background-color" : "odd-row-background-color"}>
              <PipelineSelectionCard
                selectedPipelines={selectedPipelines}
                setSelectedPipelines={setSelectedPipelines}
                pipeline={pipeline}
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
            onClickFunction={addAllPipelines}
            itemCount={unselectedPipelineCount}
            buttonSize={"sm"}
            buttonClassName={"w-100"}
            className={"my-2"}
            disabled={isLoading}
          />
          <AddSelectedButtonBase
            onClickFunction={addSelectedPipelines}
            itemCount={selectedPipelines.length}
            buttonSize={"sm"}
            buttonClassName={"w-100"}
            className={"my-2"}
            disabled={isLoading}
          />
          <AddShownButtonBase
            onClickFunction={addAllShownPipelines}
            itemCount={filteredPipelines.length}
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
              {filteredPipelines.length} {filteredPipelines.length !== 1 ? "Pipelines" : "Pipeline"}
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
              <PipelineVerticalTabContainer
                isLoading={isLoading}
                pipelineFilterModel={pipelineFilterModel}
                loadData={loadData}
              />
            </div>
            <div
              className={"w-100"}
              style={{
                overflowX: "auto",
              }}
            >
              {getPipelineCards()}
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

PipelineSelectionList.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  currentData: PropTypes.array,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  customTitle: PropTypes.string,
};
