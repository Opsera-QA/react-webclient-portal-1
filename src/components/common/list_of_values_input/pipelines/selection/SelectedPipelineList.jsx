import React, {useCallback, useState} from "react";
import PropTypes from "prop-types";
import {faArrowLeft, faCompassDrafting, faMinusCircle, faSearch, faUsers} from "@fortawesome/pro-light-svg-icons";
import {Button, InputGroup, Row} from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";
import Col from "react-bootstrap/Col";
import useGetAllPipelines from "hooks/workflow/pipelines/useGetAllPipelines";
import {hasStringValue} from "components/common/helpers/string-helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {PipelineSelectionCard} from "components/common/list_of_values_input/pipelines/selection/PipelineSelectionCard";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";

export const sortByName = (pipelines) => {
  if (Array.isArray(pipelines) && pipelines.length > 0) {
    let pipelinesCopy = [...pipelines];

    pipelinesCopy?.sort((member1, member2) => {
      const firstLetter1 = hasStringValue(member1?.name) ? member1?.name?.toLowerCase() : null;
      const firstLetter2 = hasStringValue(member2.name) ? member2.name?.toLowerCase() : null;

      if (firstLetter2 == null) {
        return -1;
      }

      if (firstLetter1 == null) {
        return 1;
      }

      if (firstLetter1 === firstLetter2) {
        return 0;
      }

      return firstLetter1 > firstLetter2 ? 1 : -1;
    });

    return pipelinesCopy;
  }

  return [];
};

<<<<<<< Updated upstream

// TODO: This needs to be rewritten
=======
>>>>>>> Stashed changes
function SelectedPipelineList(
  {
    model,
    fieldName,
    setModel,
<<<<<<< Updated upstream
=======
    currentData,
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  const currentData = DataParsingHelper.parseArray(model?.getData(fieldName), []);
  
=======

>>>>>>> Stashed changes
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

  const removeAllPipelines = () => {
    model?.setDefaultValue(fieldName);
    setModel({...model});
    setSearchText("");
  };

  const removeAllFilteredPipelines = () => {
    const shownPipelines = getFilteredPipelines();
    const output = currentData.filter((pipelineId) => {
      return shownPipelines.find((shownPipeline) => shownPipeline._id === pipelineId) == null;
    });

<<<<<<< Updated upstream
    console.log("output: " + JSON.stringify(output));
    model?.setData(fieldName, output);
=======
    model?.setData(fieldName, output);
    setModel({...model});
>>>>>>> Stashed changes
    setSelectedPipelines([]);
    setSearchText("");
  };

  const removeSelectedPipelines = () => {
<<<<<<< Updated upstream
    const currentValue = DataParsingHelper.parseArray(model?.getData(fieldName), []);
    const output = currentValue.filter((pipelineId) => {
      return selectedPipelines.find((selectedPipeline) => selectedPipeline._id === pipelineId) == null;
    });

    console.log("output: " + JSON.stringify(output));
    model?.setData(fieldName, output);
=======
    const output = currentData.filter((pipelineId) => {
      return selectedPipelines.find((selectedPipeline) => selectedPipeline._id === pipelineId) == null;
    });

    model?.setData(fieldName, output);
    setModel({...model});
>>>>>>> Stashed changes
    setSelectedPipelines([]);
    setSearchText("");
  };

  const getPipelineCards = () => {
    if (filteredPipelines.length === 0) {
      return (
<<<<<<< Updated upstream
        <div className="h-100 m-auto text-center">
          <span>No Pipelines Found</span>
        </div>
=======
        <ul className={"list-group membership-list"}>
          <div className={"h-100 m-auto text-center"}>
            <span>No Pipelines Found</span>
          </div>
        </ul>
>>>>>>> Stashed changes
      );
    }

    return (
<<<<<<< Updated upstream
      <ul className="list-group membership-list">
=======
      <ul className={"list-group membership-list"}>
>>>>>>> Stashed changes
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
    if (isLoading === true) {
      return null;
    }

    return (
      <Row>
        <Col lg={12} xl={4} className={"my-2"}>
          <Button
            className={"w-100"}
            size={"sm"}
            variant={"danger"}
            onClick={removeAllPipelines}
          >
            <div className={"d-flex justify-content-between no-wrap-inline"}>
              <div>
                <IconBase icon={faMinusCircle} className={"mr-2"} />
              </div>
              <div className={"mx-2"}>
                Remove All
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
            onClick={removeSelectedPipelines}
          >
            <div className={"d-flex justify-content-between no-wrap-inline"}>
              <div>
                <IconBase icon={faArrowLeft} />
              </div>
<<<<<<< Updated upstream
              <div className={"mx-2"}>
=======
              <div className={"mx-1"}>
>>>>>>> Stashed changes
                Remove Selected
              </div>
              <div>
                <span className="badge badge-secondary">
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
            variant={"outline-danger"}
            onClick={removeAllFilteredPipelines}
          >
            <div className={"d-flex justify-content-between no-wrap-inline"}>
              <div>
                <IconBase icon={faMinusCircle} className={"mr-2"} />
              </div>
<<<<<<< Updated upstream
              <div className={"mx-2"}>
=======
              <div className={"mx-1"}>
>>>>>>> Stashed changes
                Remove Shown
              </div>
              <div>
                <span className={"badge badge-secondary"}>{filteredPipelines.length}</span>
              </div>
            </div>
          </Button>
        </Col>
      </Row>
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
    <div className={"ml-2"}>
      {getSearchBar()}
      {getButtons()}
      {getBody()}
    </div>
  );
}

SelectedPipelineList.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  setModel: PropTypes.func,
<<<<<<< Updated upstream
=======
  currentData: PropTypes.array,
>>>>>>> Stashed changes
};

export default SelectedPipelineList;