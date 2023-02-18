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
import InputTitleBar from "components/common/inputs/info_text/InputTitleBar";

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

export default function SelectedPipelineList(
  {
    model,
    fieldName,
    setModel,
    currentData,
    disabled,
    title,
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
  const field = model?.getFieldById(fieldName);

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

    model?.setData(fieldName, output);
    setModel({...model});
    setSelectedPipelines([]);
    setSearchText("");
  };

  const removeSelectedPipelines = () => {
    const output = currentData.filter((pipelineId) => {
      return selectedPipelines.find((selectedPipeline) => selectedPipeline._id === pipelineId) == null;
    });

    model?.setData(fieldName, output);
    setModel({...model});
    setSelectedPipelines([]);
    setSearchText("");
  };

  const getPipelineCards = () => {
    if (isLoading === true) {
      return (
        <CenterLoadingIndicator
          type={"Pipelines"}
        />
      );
    }

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
                disabled={disabled}
              />
            </div>
          );
        })}
      </ul>
    );
  };

  const getButtons = () => {
    if (isLoading === true || disabled === true) {
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
              <div className={"mx-1"}>
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
              <div className={"mx-1"}>
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

  const getBody = () => {
    return (
      <div className="content-container">
        <InputTitleBar
          disabled={disabled}
          icon={faCompassDrafting}
          isLoading={isLoading}
          field={field}
          customTitle={title}
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
    <div className={"ml-2"}>
      {getButtons()}
      {getBody()}
    </div>
  );
}

SelectedPipelineList.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  setModel: PropTypes.func,
  currentData: PropTypes.array,
  disabled: PropTypes.bool,
  title: PropTypes.string,
};

SelectedPipelineList.defaultProps = {

};
