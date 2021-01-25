import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import ActivityField from "components/common/fields/boolean/ActivityField";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import ConfigurationField from "components/common/fields/multiple_items/ConfigurationField";
import NameValueTable from "components/common/table/nameValueTable";

function TagsSummaryPanel({ tagData, setActiveTab }) {
  const parseNameValueArray = (nameValueArray) => {
    let parsedValues = [];

    if (nameValueArray != null) {
      for (const key of Object.keys(nameValueArray)) {
        if (key != null) {
          parsedValues.push({ name: key, value: nameValueArray[key] });
        }
      }
    }

    return parsedValues;
  };

  if (tagData == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
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
        {/*<Col lg={12}>*/}
        {/*  <ConfigurationField dataObject={tagData} fieldName={"configuration"} />*/}
        {/*</Col>*/}
      </Row>
      <Row>
        <Col>
          <div className="mt-3">
            <NameValueTable label="Configuration"
                            data={parseNameValueArray(tagData.configuration)}
                            noDataMessage="No configurations are assigned to this tag."/>
          </div>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

TagsSummaryPanel.propTypes = {
  tagData: PropTypes.object,
  setActiveTab: PropTypes.func
};


export default TagsSummaryPanel;
