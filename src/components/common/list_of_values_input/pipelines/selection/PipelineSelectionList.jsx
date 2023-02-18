import React, {useCallback, useState} from "react";
import PropTypes from "prop-types";
import {faArrowRight, faCompassDrafting, faPlusCircle, faSearch, faUsers} from "@fortawesome/pro-light-svg-icons";
import {Button, InputGroup, Row} from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";
import Col from "react-bootstrap/Col";
import {PipelineSelectionCard} from "components/common/list_of_values_input/pipelines/selection/PipelineSelectionCard";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {sortByName} from "components/common/list_of_values_input/pipelines/selection/SelectedPipelineList";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import useGetAllPipelines from "hooks/workflow/pipelines/useGetAllPipelines";
import InfoText from "components/common/inputs/info_text/InfoText";
import InputTitleBar from "components/common/inputs/info_text/InputTitleBar";

export default function PipelineSelectionList(
  {
    model,
    setModel,
    fieldName,
    currentData,
    disabled,
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

  const getFilteredPipelines = useCallback(() => {
    const output = [];

    pipelines.forEach((pipeline) => {
      const foundPipeline = currentData.find((pipelineId) => pipelineId === pipeline?._id);

      if (!foundPipeline) {
        output.push(pipeline);
      }
    });

    if (hasStringValue(searchText)) {
      const lowercaseSearchText = searchText.toLowerCase();
      return output.filter((pipeline) => {
        return pipeline.name.toLowerCase().includes(lowercaseSearchText) || pipeline.owner_name.toLowerCase().includes(lowercaseSearchText);
      });
    }

    return [...sortByName(output)];
  }, [pipelines, currentData, searchText]);

  const filteredPipelines = getFilteredPipelines();

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
    return (
      <Row>
        <Col lg={12} xl={4} className={"my-2"}>
          <Button
            className={"w-100"}
            size={"sm"}
            variant={"success"}
            onClick={addAllPipelines}
          >
            <div className={"d-flex justify-content-between no-wrap-inline"}>
              <div>
                <IconBase icon={faPlusCircle}/>
              </div>
              <div className={"mx-2"}>
                Add All
              </div>
              <div>
                <span className={"badge badge-secondary"}>{filteredPipelines.length}</span>
              </div>
            </div>
          </Button>
        </Col>
        <Col lg={12} xl={4} className={"my-2"}>
          <Button
            className={"w-100"}
            disabled={selectedPipelines.length === 0}
            size={"sm"}
            variant={"outline-primary"}
            onClick={() => addSelectedPipelines()}
          >
            <div className={"d-flex justify-content-between no-wrap-inline"}>
              <div>
                <IconBase icon={faArrowRight} fixedWidth/>
              </div>
              <div className={"mx-1"}>
                Add Selected
              </div>
              <div>
                <span className={"badge badge-secondary"}>
                  {selectedPipelines.length}
                </span>
              </div>
            </div>
          </Button>
        </Col>
        <Col lg={12} xl={4} className={"my-2"}>
          <Button
            className={"w-100"}
            size={"sm"}
            variant={"outline-success"}
            onClick={addAllShownPipelines}
          >
            <div className={"d-flex justify-content-between no-wrap-inline"}>
              <div>
                <IconBase icon={faPlusCircle}/>
              </div>
              <div className={"mx-1"}>
                Add Shown
              </div>
              <div>
                <span className={"badge badge-secondary"}>
                  {filteredPipelines.length}
                </span>
              </div>
            </div>
          </Button>
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
    <div className={"mr-2"}>
      {getButtons()}
      {getBody()}

      {/*<InfoText*/}
      {/*  model={model}*/}
      {/*  fieldName={fieldName}*/}
      {/*  field={field}*/}
      {/*  errorMessage={errorMessage}*/}
      {/*/>*/}
    </div>
  );
}

PipelineSelectionList.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  currentData: PropTypes.array,
  disabled: PropTypes.bool,
};
