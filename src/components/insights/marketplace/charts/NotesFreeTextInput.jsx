import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form } from "react-bootstrap";
import {kpiNotesFilterMetadata} from "components/insights/marketplace/charts/kpi-configuration-metadata";

function FreeNotesTextInput({ dataObject, setDataObject }) {
  const [notesConfigurationData, setNotesConfigurationData] = useState(dataObject);

  return (
    <Row className={"mx-0"}>
      <Col lg={6}>
          <Form.Control maxLength="300" as="textarea" type="text" placeholder=""
                        value= {notesConfigurationData.data.value}
                        onChange={e => {setNotesConfigurationData({...notesConfigurationData, data : e.target.value});
                        dataObject.data.value = notesConfigurationData.data;}}
        />
      </Col>
    </Row>
  );
}

FreeNotesTextInput.propTypes = {
  analyticsDataEntryModel: PropTypes.object,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
};

export default FreeNotesTextInput;