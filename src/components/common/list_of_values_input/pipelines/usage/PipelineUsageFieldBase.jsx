import React from "react";
import PropTypes from "prop-types";
import { faDraftingCompass, faExclamationCircle } from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PipelineSummaryCard from "components/workflow/pipelines/pipeline_details/pipeline_activity/PipelineSummaryCard";
import pipelineSummaryMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/pipeline-summary-metadata";
import Model from "core/data_model/model";
import IconBase from "components/common/icons/IconBase";
import FieldContainer from "components/common/fields/FieldContainer";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import InfoContainer from "components/common/containers/InfoContainer";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import { screenContainerHeights } from "components/common/panels/general/screenContainer.heights";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";

export default function PipelineUsageFieldBase(
  {
    pipelines,
    closePanel,
    className,
    isLoading,
    type,
    loadPipelinesFunction,
    minimumHeight,
    maximumHeight,
  }) {
  const getPipelineCards = () => {
    return (
      <Row>
        {pipelines.map((pipeline) => {
          return (
            <Col md={6} key={pipeline._id}>
              <PipelineSummaryCard
                pipelineData={new Model(pipeline, pipelineSummaryMetadata, false)}
                loadPipelineInNewWindow={false}
                closePanelFunction={closePanel}
              />
            </Col>
          );
        })}
      </Row>
    );
  };

  const getBody = () => {
    if (isLoading) {
      return (
        <CenterLoadingIndicator
          type={"Pipelines"}
          customMessage={"Loading Pipeline Usage"}
          minHeight={`calc(${minimumHeight} - 3px)`}
        />
      );
    }

    if (!Array.isArray(pipelines) || pipelines.length === 0) {
      return (
        <CenteredContentWrapper
          minHeight={`calc(${minimumHeight} - 3px)`}
        >
          <h5 className={"text-muted"}>
            <span>
              <IconBase icon={faExclamationCircle} className={"mr-1"} />
              This {type} is not currently in use by any Pipeline
            </span>
          </h5>
        </CenteredContentWrapper>
      );
    }

    return (
      <div className={"m-3"}>
        <H5FieldSubHeader
          subheaderText={`This ${type} is in use by ${pipelines.length} pipeline${pipelines?.length !== 1 ? "s" : ""}`}
        />
        {getPipelineCards()}
      </div>
    );
  };

  return (
    <FieldContainer className={className}>
      <InfoContainer
        loadDataFunction={loadPipelinesFunction}
        isLoading={isLoading}
        titleText={"Pipeline Usage"}
        titleIcon={faDraftingCompass}
        minimumHeight={minimumHeight}
        maximumHeight={maximumHeight}
      >
        {getBody()}
      </InfoContainer>
    </FieldContainer>
  );
}

PipelineUsageFieldBase.propTypes = {
  pipelines: PropTypes.array,
  isLoading: PropTypes.bool,
  type: PropTypes.string,
  closePanel: PropTypes.func,
  className: PropTypes.string,
  loadPipelinesFunction: PropTypes.func,
  minimumHeight: PropTypes.string,
  maximumHeight: PropTypes.string,
};

PipelineUsageFieldBase.defaultProps = {
  minimumHeight: screenContainerHeights.DETAIL_PANEL_CONTENT_INFO_CONTAINER_HEIGHT,
  maximumHeight: screenContainerHeights.DETAIL_PANEL_CONTENT_INFO_CONTAINER_HEIGHT,
};