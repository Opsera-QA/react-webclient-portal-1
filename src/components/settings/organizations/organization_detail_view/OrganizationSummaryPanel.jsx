import React from "react";
import {Row, Col} from "react-bootstrap";
import PropTypes from "prop-types";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import TagField from "components/common/fields/multiple_items/TagField";
import LeaderField from "components/common/fields/object/settings/organizations/LeaderField";

function OrganizationSummaryPanel({ organizationData, setActiveTab }) {
  if (organizationData == null) {
    return <></>;
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      <Row className={"mx-0 mb-2"}>
        <Col lg={6}>
          <TextFieldBase dataObject={organizationData} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={organizationData} fieldName={"_id"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={organizationData} fieldName={"owner_name"}/>
        </Col>
        <Col lg={6}>
          <LeaderField dataObject={organizationData} fieldName={"leader"}/>
        </Col>
        <Col lg={12}>
          <TagField dataObject={organizationData} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

OrganizationSummaryPanel.propTypes = {
  organizationData: PropTypes.object,
  setActiveTab: PropTypes.func,
};

export default OrganizationSummaryPanel;
