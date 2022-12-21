import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { OverlayTrigger, Popover } from "react-bootstrap";
import {
  getMaturityColorClass,
  getMaturityScoreText,
} from "../../charts-helpers";

function DoraJiraGitlabRolledUpColumnDataBlock({
  overlayData,
  maturityScoreText,
}) {
  const maturityScore = getMaturityScoreText(maturityScoreText);
  const maturityColor = getMaturityColorClass(maturityScoreText);
  const getOrgData = (overlayData) => {
    return overlayData?.map((data, i) => (
      <Col
        key={i}
        xs={12}
      >
        <OverlayTrigger
          rootClose
          placement="top"
          overlay={
            <Popover
              id="popover-basic"
              style={{ maxWidth: "500px" }}
            >
              <Popover.Content>
                <div className="text-muted mb-2">
                  Deployment Frequency:{" "}
                  {data?.deploymentFrequencyMaturityScoreText}
                </div>
                <div className="text-muted mb-2">
                  Lead Time For Changes:{" "}
                  {data?.leadTimeForChangesMaturityScoreText}
                </div>
                <div className="text-muted mb-2">
                  Change Failure Rate:{" "}
                  {data?.changeFailureRateMaturityScoreText}
                </div>
                <div className="text-muted mb-2">
                  Mean Time To Resolution:{" "}
                  {data?.meanTimeToResolutionMaturityScoreText}
                </div>
              </Popover.Content>
            </Popover>
          }
        >
          <div className={"maturity-rolled-up-text"}>{data.name}</div>
        </OverlayTrigger>
      </Col>
    ));
  };

  return (
    <div>
      <Row
        className={`ml-3 mr-5 p-2 d-flex maturity-top-border ${maturityColor}`}
      >
        <div
          className={
            "d-flex pr-1 dark-gray-text-primary metric-block-content-text font-inter-light-500"
          }
        >
          {maturityScore}
        </div>
      </Row>
      <Row
        className={`ml-3 w-100 h-100 text-center maturity-rolled-up-border ${maturityColor}`}
      >
        <div style={{ minHeight: "400px" }}>{getOrgData(overlayData)}</div>
      </Row>
    </div>
  );
}

DoraJiraGitlabRolledUpColumnDataBlock.propTypes = {
  overlayData: PropTypes.any,
  maturityScoreText: PropTypes.string,
};

export default DoraJiraGitlabRolledUpColumnDataBlock;
