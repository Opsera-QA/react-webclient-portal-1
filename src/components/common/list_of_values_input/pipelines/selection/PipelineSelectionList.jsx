import React, {useCallback, useState} from "react";
import PropTypes from "prop-types";
import {faArrowRight, faCompassDrafting, faPlusCircle, faUsers} from "@fortawesome/pro-light-svg-icons";
import {Button, Row} from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";
import Col from "react-bootstrap/Col";
import {PipelineSelectionCard} from "components/common/list_of_values_input/pipelines/selection/PipelineSelectionCard";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {sortByName} from "components/common/list_of_values_input/pipelines/selection/SelectedPipelineList";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import useGetAllPipelines from "hooks/workflow/pipelines/useGetAllPipelines";

export default function PipelineSelectionList(
  {
    model,
    setModel,
    fieldName,
  }) {
  const [selectedPipelines, setSelectedPipelines] = useState([]);
  const currentData = DataParsingHelper.parseArray(model?.getData(fieldName), []);
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

    pipelines.forEach((pipelineId) => {
      const foundPipeline = currentData.find((pipeline) => pipeline._id === pipelineId);

      if (!foundPipeline) {
        output.push(foundPipeline);
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
    setSearchText("");
  };

  const addSelectedToMembers = () => {
    const output = DataParsingHelper.parseArray(currentData, []);
    selectedPipelines.forEach((pipeline) => {
      if (output.includes(pipeline._id) !== true) {
        output.push(pipeline._id);
      }
    });
    setSearchText("");
  };

  const getPipelineCards = () => {
    if (selectedPipelines.length === 0) {
      return (
        <div className="h-100 m-auto text-center">
          <span>No Records Found</span>
        </div>
      );
    }

    return (
      <ul className="list-group membership-list">
        {selectedPipelines.map((pipeline, index) => {
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
            onClick={() => addSelectedToMembers()}
          >
            <div className={"d-flex justify-content-between no-wrap-inline"}>
              <div>
                <IconBase icon={faArrowRight} fixedWidth/>
              </div>
              <div className={"mx-2"}>
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
              <div className={"mx-2"}>
                Add Shown
              </div>
              <div>
                <span className={"badge badge-secondary"}>
                  {selectedPipelines.length}
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
      <div className="content-card-1 content-container">
        <div className="p-2 d-flex content-block-header members-title justify-content-between">
          <div className={"my-auto"}><IconBase icon={faCompassDrafting} className={"mr-2"} />Selected Pipelines</div>
          <div className={"my-auto"}>{filteredPipelines.length} {filteredPipelines.length !== 1 ? "pipelines" : "pipeline"}</div>
        </div>
        {getPipelineCards()}
        {/*<div className="px-3 mt-2">*/}
        {/*  <ClientSideBottomPaginator*/}
        {/*    items={filteredPipelines}*/}
        {/*    setShownItems={setShownPipelines}*/}
        {/*    paginationStyle={"stacked"}*/}
        {/*    pageSize={50}*/}
        {/*  />*/}
        {/*</div>*/}
      </div>
    );
  };

  if (pipelines == null) {
    return <></>;
  }

  return (
    <div className={"mr-2"}>
      {getButtons()}
      <div className={"content-card-1 content-container"}>
        <div className={"p-2 d-flex content-block-header justify-content-between"}>
          <div className={"my-auto"}><IconBase icon={faUsers} className={"mr-2"}/>Not Members</div>
          <div className={"my-auto"}>{pipelines.length} {pipelines.length !== 1 ? "users" : "user"}</div>
        </div>
        {getBody()}
        {/*<div className="px-3 mt-2">*/}
        {/*  <ClientSideBottomPaginator*/}
        {/*    items={filteredPipelines}*/}
        {/*    setShownItems={setSelectedPipelines}*/}
        {/*    paginationStyle={"stacked"}*/}
        {/*    pageSize={50}*/}
        {/*  />*/}
        {/*</div>*/}
      </div>
    </div>
  );
}

PipelineSelectionList.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
};
