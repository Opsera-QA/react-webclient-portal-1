import React, {useCallback, useState} from "react";
import PropTypes from "prop-types";
import {faCompassDrafting, faSearch} from "@fortawesome/pro-light-svg-icons";
import {Button, InputGroup, Row} from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";
import Col from "react-bootstrap/Col";
import useGetAllPipelines from "hooks/workflow/pipelines/useGetAllPipelines";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {PipelineSelectionCard} from "components/common/list_of_values_input/pipelines/selection/PipelineSelectionCard";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import {sortByName} from "components/common/list_of_values_input/pipelines/selection/SelectedPipelineList";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
export default function SelectedPipelinesField(
  {
    model,
    fieldName,
  }) {
  const {
    isLoading,
    error,
    pipelines,
  } = useGetAllPipelines(
    ["name", "owner"],
  );
  const [selectedPipelines, setSelectedPipelines] = useState([]);
  const [searchText, setSearchText] = useState("");
  const currentData = DataParsingHelper.parseArray(model?.getData(fieldName), []);

  const getFilteredPipelines = useCallback(() => {
    const output = [];

    currentData.forEach((pipelineId) => {
      const foundPipeline = pipelines.find((pipeline) => pipeline._id === pipelineId);

      if (foundPipeline) {
        output.push(foundPipeline);
      } else {
        output.push({
          name: "Pipeline Not Found",
          owner_name: "Unknown User",
          _id: pipelineId,
        });
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

  const getPipelineCards = () => {
    if (filteredPipelines.length === 0) {
      return (
        <ul className={"list-group membership-list"}>
          <div className={"h-100 m-auto text-center"}>
            <span>No Pipelines Found</span>
          </div>
        </ul>
      );
    }

    return (
      <ul className={"list-group membership-list"}>
        {filteredPipelines.map((pipeline, index) => {
          return (
            <div key={pipeline?._id} className={index % 2 === 0 ? "even-row" : "odd-row"}>
              <PipelineSelectionCard
                selectedPipelines={selectedPipelines}
                setSelectedPipelines={setSelectedPipelines}
                pipeline={pipeline}
                disabled={true}
              />
            </div>
          );
        })}
      </ul>
    );
  };

  const getSearchBar = () => {
    return (
      <Row>
        <Col xs={12}>
          <InputGroup className={"flex-nowrap my-2"}>
            <InputGroup.Prepend>
              <Button
                disabled={isLoading}
              >
                <IconBase
                  isLoading={isLoading}
                  icon={faSearch}
                />
              </Button>
            </InputGroup.Prepend>
            <input
              placeholder={"Search by Name or Email"}
              value={searchText}
              className={"form-control"}
              onChange={event => setSearchText(event.target.value)}
            />
          </InputGroup>
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
      </div>
    );
  };

  if (pipelines == null) {
    return <></>;
  }

  return (
    <div>
      {getSearchBar()}
      {getBody()}
    </div>
  );
}

SelectedPipelinesField.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
};
