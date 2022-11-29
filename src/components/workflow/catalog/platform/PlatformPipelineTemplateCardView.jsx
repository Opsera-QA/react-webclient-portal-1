import React from "react";
import PropTypes from "prop-types";
import {Col, Row} from "react-bootstrap";
import CardView from "components/common/card/CardView";
import InlineInformation from "components/common/status_notifications/inline/InlineInformation";
import LoadingDialog from "components/common/status_notifications/loading";
import PlatformPipelineTemplateCard from "components/workflow/catalog/platform/PlatformPipelineTemplateCard";

export default function PlatformPipelineTemplateCardView(
  {
    pipelineTemplates,
    pipelineTemplateFilterModel,
    setPipelineTemplateFilterModel,
    loadData,
    isLoading,
    activeTemplates,
    error,
  }) {
  const getCards = () => {
    if (isLoading) {
      return <LoadingDialog message={"Loading Pipeline Templates"} size={"sm"} />;
    }

    if (!Array.isArray(pipelineTemplates) || pipelineTemplates.length === 0) {
      return (
        <div className={"py-5"}>
          <InlineInformation
            className={"mt-1 mb-3"}
            message={`No Opsera Marketplace Pipeline Templates Found.`}
          />
        </div>
      );
    }

    return (
      <Row>
        {pipelineTemplates.map((template) => {
          return (
            <Col xs={12} xl={6} key={template._id} className={"pb-2"}>
              <PlatformPipelineTemplateCard
                template={template}
                activeTemplates={activeTemplates}
              />
            </Col>
          );
        })}
      </Row>
    );
  };

  return (
    <CardView
      isLoading={isLoading}
      loadData={loadData}
      setPaginationDto={setPipelineTemplateFilterModel}
      paginationDto={pipelineTemplateFilterModel}
      cards={getCards()}
    />
  );
}

PlatformPipelineTemplateCardView.propTypes = {
  pipelineTemplates: PropTypes.array,
  pipelineTemplateFilterModel: PropTypes.object,
  setPipelineTemplateFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  activeTemplates: PropTypes.array,
  error: PropTypes.any,
};