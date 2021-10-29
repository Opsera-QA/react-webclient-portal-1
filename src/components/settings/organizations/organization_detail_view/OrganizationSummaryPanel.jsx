import React from "react";
import {Row, Col} from "react-bootstrap";
import PropTypes from "prop-types";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import TagField from "components/common/fields/multiple_items/tags/TagField";
import LeaderField from "components/common/fields/object/settings/organizations/LeaderField";
import ActivityField from "components/common/fields/boolean/ActivityField";

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
        <Col lg={6}>
          <TagField dataObject={organizationData} />
        </Col>
        <Col lg={6}>
          <ActivityField dataObject={organizationData} fieldName={"active"} />
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
