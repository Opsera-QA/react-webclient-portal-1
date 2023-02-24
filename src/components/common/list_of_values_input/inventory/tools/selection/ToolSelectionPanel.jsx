import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import DetailPanelContainer from "components/common/panels/detail_panel_container/DetailPanelContainer";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import ToolSelectionList from "components/common/list_of_values_input/inventory/tools/selection/ToolSelectionList";
import SelectedToolList from "components/common/list_of_values_input/inventory/tools/selection/SelectedToolList";

export default function ToolSelectionPanel(
  {
    model,
    setModel,
    fieldName,
    selectionListTitle,
    selectedListTitle,
  }) {
  const currentData = DataParsingHelper.parseArray(model?.getData(fieldName), []);

  return (
    <DetailPanelContainer>
      <Row>
        <Col lg={12} xl={6} className={"my-2"}>
          <ToolSelectionList
            model={model}
            setModel={setModel}
            fieldName={fieldName}
            currentData={currentData}
            customTitle={selectionListTitle}
          />
        </Col>
        <Col lg={12} xl={6} className={"my-2"}>
          <SelectedToolList
            model={model}
            setModel={setModel}
            fieldName={fieldName}
            currentData={currentData}
            customTitle={selectedListTitle}
          />
        </Col>
      </Row>
    </DetailPanelContainer>
  );
}

ToolSelectionPanel.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  selectionListTitle: PropTypes.string,
  selectedListTitle: PropTypes.string,
};
