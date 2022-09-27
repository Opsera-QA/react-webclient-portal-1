import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ToolClassificationSelectInput from "components/common/list_of_values_input/inventory/ToolClassificationSelectInput";
import RegistryToolIdentifierSelectInput from "components/inventory/tools/tool_details/input/RegistryToolIdentifierSelectInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import TagManager from "components/common/inputs/tags/TagManager";
import RoleAccessInput from "components/common/inputs/roles/RoleAccessInput";
import VanityEditorPanelContainer from "components/common/panels/detail_panel_container/VanityEditorPanelContainer";
import useComponentStateReference from "hooks/useComponentStateReference";

function ToolEditorPanel({ toolData, handleClose }) {
  const [toolDataDto, setToolDataDto] = useState(undefined);
  const {
    isSaasUser,
  } = useComponentStateReference();

  useEffect(() => {
    setToolDataDto(toolData);
  }, [toolData]);

  const getRoleInput = () => {
    if (toolDataDto?.isNew() && isSaasUser === false) {
      return (
        <Col xs={12} className={"mb-4"}>
          <RoleAccessInput dataObject={toolDataDto} setDataObject={setToolDataDto} fieldName={"roles"}/>
        </Col>
      );
    }
  };

  const getCostCenterInput = () => {
    if (toolDataDto?.isNew() === false) {
      return (
        <Col lg={6}>
          <TextInputBase setDataObject={setToolDataDto} dataObject={toolDataDto} fieldName={"costCenter"} />
        </Col>
      );
    }
  };

  if (toolDataDto == null) {
    return null;
  }

  return (
    <VanityEditorPanelContainer
      model={toolDataDto}
      setModel={setToolDataDto}
      showBooleanToggle={true}
      handleClose={handleClose}
      className={"mx-3 mb-2"}
    >
      <Row>
        <Col lg={6}>
          <TextInputBase setDataObject={setToolDataDto} dataObject={toolDataDto} fieldName={"name"}/>
        </Col>
        <Col lg={6}>
          <RegistryToolIdentifierSelectInput
            dataObject={toolDataDto}
            setDataObject={setToolDataDto}
          />
        </Col>
        <Col lg={6}>
          <ToolClassificationSelectInput setDataObject={setToolDataDto} dataObject={toolDataDto}/>
        </Col>
        {getCostCenterInput()}
        <Col lg={6}>
          <TagManager type={"tool"} setDataObject={setToolDataDto} dataObject={toolDataDto}/>
        </Col>
        <Col lg={12} className="mb-2">
          <TextInputBase setDataObject={setToolDataDto} dataObject={toolDataDto} fieldName={"description"}/>
        </Col>
        {getRoleInput()}
      </Row>
    </VanityEditorPanelContainer>
  );
}

ToolEditorPanel.propTypes = {
  toolData: PropTypes.object,
  setToolData: PropTypes.func,
  handleClose: PropTypes.func
};

export default ToolEditorPanel;
