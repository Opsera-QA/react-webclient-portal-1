import React, {useEffect} from "react";
import PropTypes from "prop-types";
import SelectionIconCardBase from "components/common/card_containers/SelectionIconCardBase";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useComponentStateReference from "hooks/useComponentStateReference";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import IconBase from "../../../../../common/icons/IconBase";
import {faGear, faQuestionCircle, faWandMagicSparkles} from "@fortawesome/pro-light-svg-icons";
import OpseraInfinityLogo from "../../../../../logo/OpseraInfinityLogo";
import OverlayWizardButtonContainerBase
  from "../../../../../../temp-library-components/button/overlay/OverlayWizardButtonContainerBase";
import {platformImageConstants} from "../../../../../../temp-library-components/image/platformImage.constants";
import {ImageBase} from "@opsera/react-vanity-set";
import SelectionCardColumn from "../../../../../../temp-library-components/cards/SelectionCardColumn";
import InfoMessageFieldBase from "components/common/fields/text/message/InfoMessageFieldBase";
import ExternalPageLink from "components/common/links/ExternalPageLink";
import {EXTERNAL_LINKS} from "assets/links/externalLinks";
import ToolCreationFlowSelectionCardBase
  from "../../../../../../temp-library-components/cards/tools/ToolCreationFlowSelectionCardBase";
import WorkflowOptionCardBase from "../../../../../wizard/portal/workflows/flows/WorkflowOptionCardBase";
import {WORKFLOW_OPTION_TYPES} from "../../../../../wizard/portal/workflows/flows/WorkflowOptionCardBase";

export const TOOL_CREATION_OPTIONS = {
  WIZARD: "wizard",
  ADVANCED: "advanced",
};

export const TOOL_CREATION_OPTION_LABELS = {
  WIZARD: "Tool Creation Wizard",
  ADVANCED: "Advanced Settings*",
};

function ToolSetupModeSelect(
  {
    className,
    setupMode,
    setSetupMode,
    setCurrentScreen,
    setButtonContainer,
    backButtonFunction,
  }) {
  const { themeConstants } = useComponentStateReference();

  useEffect(() => {
    if (setButtonContainer && setCurrentScreen) {
      setButtonContainer(
        <>
          <OverlayWizardButtonContainerBase
            backButtonFunction={backButtonFunction}
          />
        </>
      );
    }
  }, []);

  const setDataFunction = (newValue) => {
    setSetupMode(newValue);
    setCurrentScreen("tool_identifier_select");
  };

  return (
    <div className={"m-4"}>
        <H5FieldSubHeader
          className={"mb-3 mx-3"}
          subheaderText={
            "Pick between the new Opsera Tool Creation Wizard or the legacy advanced settings view to setup your tool."
          }
        />
        <Row>
          <Col md={6}>
          <ToolCreationFlowSelectionCardBase
            option={TOOL_CREATION_OPTIONS.WIZARD}
            setDataFunction={setDataFunction}
            setupMode={setupMode}
            icon={
              <IconTitleBar
                icon={
                  <ImageBase
                    height={96}
                    imageSource={
                      platformImageConstants.PLATFORM_IMAGE_LINKS
                        .WIZARD_GENERAL
                    }
                  />
                }
                title={TOOL_CREATION_OPTION_LABELS.WIZARD}
                titleClassName={"mx-auto"}
                subTitleClassName={"mx-auto"}
              />
            }
            description={
            "Classic tool wizard"
          }
            workflowOptionType={WORKFLOW_OPTION_TYPES.TOOL}
          />
          </Col>
          <Col md={6}>
            <ToolCreationFlowSelectionCardBase
              option={TOOL_CREATION_OPTIONS.WIZARD}
              setDataFunction={setDataFunction}
              setupMode={setupMode}
              icon={
                <IconTitleBar
                  icon={
                    <ImageBase
                      height={96}
                      imageSource={
                        platformImageConstants.PLATFORM_IMAGE_LINKS
                          .ADVANCED_OPTION
                      }
                    />
                  }
                  title={TOOL_CREATION_OPTION_LABELS.ADVANCED}
                  titleClassName={"mx-auto"}
                  subTitleClassName={"mx-auto"}
                />
              }
              description={
                "ADVANCED tool wizard"
              }
              workflowOptionType={WORKFLOW_OPTION_TYPES.TOOL}
            />
          </Col>
        </Row>
    </div>
  );
}

ToolSetupModeSelect.propTypes = {
  className: PropTypes.string,
  setupMode: PropTypes.string,
  setSetupMode: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  setButtonContainer: PropTypes.func,
  backButtonFunction: PropTypes.func,
};

export default ToolSetupModeSelect;
