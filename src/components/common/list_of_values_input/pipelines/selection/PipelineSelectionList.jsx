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

export default function PipelineSelectionList(
  {
    model,
    setModel,
    fieldName,
    currentData,
    disabled,
    className,
  }) {
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
    if (filteredPipelines.length === 0) {
      return (
        <ul className="list-group membership-list">
          <div className="h-100 m-auto text-center">
            <span>No Pipelines Found</span>
          </div>
        </ul>
      );
    }

    return (
      <ul className="list-group membership-list">
        {filteredPipelines.map((pipeline, index) => {
          return (
            <div key={pipeline?._id} className={index % 2 === 0 ? "even-row" : "odd-row"}>
              <PipelineSelectionCard
                selectedPipelines={selectedPipelines}
                setSelectedPipelines={setSelectedPipelines}
                pipeline={pipeline}
              />
            </div>
          );
        })}
      </ul>
    );
  };

  const getButtons = () => {
    if (disabled === true) {
      return null;
    }

    return (
      <Row className={"my-2"}>
        <Col lg={12} xl={4}>
          <AddAllButtonBase
            onClickFunction={addAllPipelines}
            itemCount={unselectedPipelineCount}
            buttonSize={"sm"}
            buttonClassName={"w-100"}
            disabled={isLoading}
          />
        </Col>
        <Col lg={12} xl={4}>
          <AddSelectedButtonBase
            onClickFunction={addSelectedPipelines}
            itemCount={selectedPipelines.length}
            buttonSize={"sm"}
            buttonClassName={"w-100"}
            disabled={isLoading}
          />
        </Col>
        <Col lg={12} xl={4}>
          <AddShownButtonBase
            onClickFunction={addAllShownPipelines}
            itemCount={filteredPipelines.length}
            buttonSize={"sm"}
            buttonClassName={"w-100"}
            disabled={isLoading}
          />
        </Col>
      </Row>
    );
  };

  const getBody = () => {
    if (isLoading === true) {
      return (
        <CenterLoadingIndicator
          type={"Pipelines"}
        />
      );
    }

    return (
      <div className="content-container">
        <InputTitleBar
          disabled={disabled}
          icon={faCompassDrafting}
          isLoading={isLoading}
          customTitle={"Pipelines"}
          setSearchTerm={setSearchText}
          searchTerm={searchText}
          showSearchBar={true}
        />

        <div className={"px-2 py-1 d-flex justify-content-between"}>
          <div className={"my-auto"}>

          </div>
          <div className={"my-auto"}>
            {filteredPipelines.length} {filteredPipelines.length !== 1 ? "Pipelines" : "Pipeline"}
          </div>
        </div>
        {getPipelineCards()}
      </div>
    );
  };

  if (pipelines == null) {
    return <></>;
  }

  return (
    <div className={className}>
      {getButtons()}
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
};
