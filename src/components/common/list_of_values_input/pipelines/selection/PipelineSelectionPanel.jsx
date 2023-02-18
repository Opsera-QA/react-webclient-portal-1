import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import DetailPanelContainer from "components/common/panels/detail_panel_container/DetailPanelContainer";
import WarningMessageFieldBase from "components/common/fields/text/message/WarningMessageFieldBase";
import PipelineSelectionList from "components/common/list_of_values_input/pipelines/selection/PipelineSelectionList";
import SelectedPipelineList from "components/common/list_of_values_input/pipelines/selection/SelectedPipelineList";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function PipelineSelectionPanel(
  {
    model, 
    setModel,
    fieldName,
  }) {
  const currentData = DataParsingHelper.parseArray(model?.getData(fieldName), []);

  return (
    <DetailPanelContainer>
      <Row>
        <Col lg={12}>
          <WarningMessageFieldBase
            className={"mt-2 mb-1"}
            message={"Please Note: You can only select Pipelines you have access to view"}
          />
        </Col>
      </Row>
      <Row className={"mx-0"}>
        <Col xs={12} sm={6}>
          <PipelineSelectionList
            model={model}
            setModel={setModel}
            fieldName={fieldName}
            currentData={currentData}
          />
        </Col>
        <Col xs={12} sm={6}>
          <SelectedPipelineList
            model={model}
            setModel={setModel}
            fieldName={fieldName}
            currentData={currentData}
          />
        </Col>
      </Row>
    </DetailPanelContainer>
  );
}

PipelineSelectionPanel.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
};
