import React, { useEffect } from "react";
import PropTypes from "prop-types";
import SelectionIconCardBase from "components/common/card_containers/SelectionIconCardBase";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useComponentStateReference from "hooks/useComponentStateReference";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import IconBase from "../../../../../common/icons/IconBase";
import { faGear, faWandMagicSparkles } from "@fortawesome/pro-light-svg-icons";
import RoleAccessInput from "../../../../../common/inputs/roles/RoleAccessInput";
import TextInputBase from "../../../../../common/inputs/text/TextInputBase";
import VanityEditorPanelContainer from "../../../../../common/panels/detail_panel_container/VanityEditorPanelContainer";
import RegistryToolIdentifierSelectInput from "../../input/RegistryToolIdentifierSelectInput";
import ToolClassificationSelectInput from "../../../../../common/list_of_values_input/inventory/ToolClassificationSelectInput";
import TagManager from "../../../../../common/inputs/tags/TagManager";
import OverlayWizardButtonContainerBase from "../../../../../../temp-library-components/button/overlay/OverlayWizardButtonContainerBase";

function ToolBasicInfo({
  toolData,
  setToolData,
  setupMode,
  setCurrentScreen,
  setButtonContainer,
}) {
  const { isSaasUser } = useComponentStateReference();

  useEffect(() => {
    if (setButtonContainer && setCurrentScreen) {
      setButtonContainer(
        <OverlayWizardButtonContainerBase
          backButtonFunction={() => {
            toolData?.setData("tool_identifier", "");
            setToolData({ ...toolData });
            setCurrentScreen("tool_identifier_select");
          }}
        />,
      );
    }
  }, []);

  useEffect(() => {
    if (toolData?.getMongoDbId()?.length > 0) {
      if (setButtonContainer && setCurrentScreen) {
        setButtonContainer(<OverlayWizardButtonContainerBase />);
      }
      setCurrentScreen("connection_info");
    }
  }, [toolData?.getMongoDbId()]);

  const getRoleInput = () => {
    if (toolData?.isNew() && isSaasUser === false) {
      return (
        <Col
          xs={12}
          className={"mb-4"}
        >
          <RoleAccessInput
            model={toolData}
            setModel={setToolData}
          />
        </Col>
      );
    }
  };

  const getCostCenterInput = () => {
    if (toolData?.isNew() === false) {
      return (
        <Col lg={6}>
          <TextInputBase
            setDataObject={setToolData}
            dataObject={toolData}
            fieldName={"costCenter"}
          />
        </Col>
      );
    }
  };

  if (toolData == null) {
    return null;
  }

  return (
    <VanityEditorPanelContainer
      model={toolData}
      setModel={setToolData}
      showBooleanToggle={true}
      // handleClose={handleClose}
      className={"mx-3 mb-2"}
      viewDetailsUponCreate={false}
    >
      <Row>
        <Col lg={6}>
          <TextInputBase
            setDataObject={setToolData}
            dataObject={toolData}
            fieldName={"name"}
          />
        </Col>
        <Col lg={6}>
          <RegistryToolIdentifierSelectInput
            dataObject={toolData}
            setDataObject={setToolData}
          />
        </Col>
        <Col lg={6}>
          <ToolClassificationSelectInput
            setDataObject={setToolData}
            dataObject={toolData}
          />
        </Col>
        {getCostCenterInput()}
        <Col lg={6}>
          <TagManager
            type={"tool"}
            setDataObject={setToolData}
            dataObject={toolData}
          />
        </Col>
        <Col
          lg={12}
          className="mb-2"
        >
          <TextInputBase
            setDataObject={setToolData}
            dataObject={toolData}
            fieldName={"description"}
          />
        </Col>
        {getRoleInput()}
        {toolData?.getMongoDbId()}
      </Row>
    </VanityEditorPanelContainer>
  );
}

ToolBasicInfo.propTypes = {
  toolData: PropTypes.object,
  setToolData: PropTypes.func,
  setupMode: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  setButtonContainer: PropTypes.func,
};

export default ToolBasicInfo;
