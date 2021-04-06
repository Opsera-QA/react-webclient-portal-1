import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateTimeField from "components/common/fields/date/DateTimeField";
import GenericItemField from "components/common/fields/multiple_items/GenericItemField";
import LinkField from "components/common/fields/link/LinkField";

function BitbucketRejectedMergeRequestsSummaryPanel({ chartModel, setActiveTab }) {
  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={chartModel} fieldName={"AuthorName"} />
        </Col>
        <Col lg={6}>
          <GenericItemField dataObject={chartModel} fieldName={"AssigneeName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={chartModel} fieldName={"MergeRequestTitle"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={chartModel} fieldName={"BranchName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={chartModel} fieldName={"ProjectName"} />
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={chartModel} fieldName={"RejectedReason"} />
        </Col>
        <Col lg={6}>
          <DateTimeField dataObject={chartModel} fieldName={"mrCompletionTimeTimeStamp"} />
        </Col>
        <Col lg={12}>
          <LinkField openInNewWindow={true} showClipboardButton={true} model={chartModel} fieldName={"repositoryUrl"}/>
        </Col>
        <Col lg={12}>
          <LinkField openInNewWindow={true} showClipboardButton={true} model={chartModel} fieldName={"mergeRequestUrl"}/>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

BitbucketRejectedMergeRequestsSummaryPanel.propTypes = {
  chartModel: PropTypes.object,
  setActiveTab: PropTypes.func,
};

export default BitbucketRejectedMergeRequestsSummaryPanel;
