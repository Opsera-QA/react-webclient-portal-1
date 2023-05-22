import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import { Col, Row } from "react-bootstrap";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import H4FieldSubHeader from "components/common/fields/subheader/H4FieldSubHeader";
import ProvarReportDownloadButton from "./ProvarReportDownloadButton";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";

function ProvarReportSummaryOverview({ provarResultsModel, pipeline }) {
  const { userData } = useComponentStateReference();

  if (provarResultsModel == null) {
    return (
      <LoadingDialog
        message={"Loading Execution Overview"}
        size={"sm"}
      />
    );
  }

  const isDownloadAllowed = () => {
    if (!provarResultsModel?.getData("hasDowloadableReport")) return false;
    const expiry = new Date(provarResultsModel?.getData("expirationTime"));
    const currentDate = new Date();
    if (currentDate > expiry) {
      return false;
    }
    return PipelineRoleHelper.canStartPipeline(userData, pipeline);
  };

  return (
    <Row className={"my-3"}>
      <Col lg={12}>
        <Row>
          <Col lg={8}>
            <H4FieldSubHeader subheaderText={"Execution Overview"} />
          </Col>
          <Col lg={4}>
            <ProvarReportDownloadButton
              pipelineId={provarResultsModel?.getData("pipelineId")}
              stepId={provarResultsModel?.getData("stepId")}
              runCount={provarResultsModel?.getData("runCount")}
              expiryDate={provarResultsModel?.getData("expirationTime")}
              visible={isDownloadAllowed()}
            />
          </Col>
        </Row>
      </Col>
      <Col lg={6}>
        <TextFieldBase
          dataObject={provarResultsModel}
          fieldName={"name"}
        />
      </Col>
      <Col lg={6}>
        <TextFieldBase
          dataObject={provarResultsModel}
          fieldName={"time"}
        />
      </Col>
      <Col lg={6}>
        <TextFieldBase
          dataObject={provarResultsModel}
          fieldName={"tests"}
        />
      </Col>
      <Col lg={6}>
        <TextFieldBase
          dataObject={provarResultsModel}
          fieldName={"failures"}
        />
      </Col>
      <Col lg={6}>
        <TextFieldBase
          dataObject={provarResultsModel}
          fieldName={"skipped"}
        />
      </Col>
    </Row>
  );
}

ProvarReportSummaryOverview.propTypes = {
  provarResultsModel: PropTypes.object,
  pipeline: PropTypes.object,
};

export default ProvarReportSummaryOverview;