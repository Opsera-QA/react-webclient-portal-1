import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";

// TODO: Implement
function GitScraperReposSummaryPanel({ gitScraperReposData } ) {

  if (gitScraperReposData == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <div className="scroll-y pt-3 px-3 hide-x-overflow">
      <div className="mb-3 flat-top-content-block p-3 detail-view-summary">
        <Row>
          <Col lg={6}>
            <TextFieldBase dataObject={gitScraperReposData} fieldName={""} />
          </Col>
        </Row>
      </div>
    </div>
  );
}

GitScraperReposSummaryPanel.propTypes = {
  gitScraperReposData: PropTypes.object,
};


export default GitScraperReposSummaryPanel;
