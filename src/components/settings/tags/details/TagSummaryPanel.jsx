import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import ActivityField from "components/common/fields/boolean/ActivityField";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import ConfigurationField from "components/common/fields/multiple_items/ConfigurationField";
import TagRoleHelper from "@opsera/know-your-role/roles/settings/tags/tagRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";

function TagSummaryPanel({ tagData, setActiveTab, accessRoleData }) {
  const { userData } = useComponentStateReference();

  if (tagData == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <SummaryPanelContainer
      setActiveTab={TagRoleHelper.canUpdateTags(userData) === true ? setActiveTab : undefined}>
      <Row>
        <Col lg={6}>
          <TextFieldBase dataObject={tagData} fieldName={"_id"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={tagData} fieldName={"account"}/>
        </Col>
        <Col lg={6}>
          <DateFieldBase dataObject={tagData} fieldName={"createdAt"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={tagData} fieldName={"type"}/>
        </Col>
        <Col lg={6}>
          <TextFieldBase dataObject={tagData} fieldName={"value"}/>
        </Col>
        <Col lg={6}>
          <ActivityField dataObject={tagData} fieldName={"active"}/>
        </Col>
        <Col lg={12}>
          <ConfigurationField dataObject={tagData} fieldName={"configuration"} />
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

TagSummaryPanel.propTypes = {
  tagData: PropTypes.object,
  setActiveTab: PropTypes.func,
  accessRoleData: PropTypes.object
};


export default TagSummaryPanel;
