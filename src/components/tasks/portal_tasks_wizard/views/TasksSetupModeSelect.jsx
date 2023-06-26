import React, {useEffect} from "react";
import PropTypes from "prop-types";
import SelectionIconCardBase from "components/common/card_containers/SelectionIconCardBase";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useComponentStateReference from "hooks/useComponentStateReference";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import {faGear, faWandMagicSparkles} from "@fortawesome/pro-light-svg-icons";
import IconBase from "../../../common/icons/IconBase";
import OpseraInfinityLogo from "../../../logo/OpseraInfinityLogo";
import OverlayWizardButtonContainerBase
  from "../../../../temp-library-components/button/overlay/OverlayWizardButtonContainerBase";
import SelectionCardColumn from "../../../../temp-library-components/cards/SelectionCardColumn";
import {platformImageConstants} from "../../../../temp-library-components/image/platformImage.constants";
import {ImageBase} from "@opsera/react-vanity-set";
import TaskCardBase from "../task_cards/TaskCardBase";
import {TASK_TYPE_LABELS, TASK_TYPES} from "../../task.types";
import {WORKFLOW_OPTION_TYPES} from "../task_cards/TaskTypeOptionCardBase";

export const TOOL_CREATION_OPTIONS = {
  WIZARD: "wizard",
  ADVANCED: "advanced",
};

export const TASKS_CREATION_OPTION_LABELS = {
  WIZARD: "Salesforce Tasks",
  ADVANCED: "SDLC Tasks",
};

function TasksSetupModeSelect(
  {
    className,
    selectedFlow,
    setSelectedFlow,
    setCurrentScreen,
    setButtonContainer,
    backButtonFunction
  }) {
  const {themeConstants} = useComponentStateReference();

  useEffect(() => {
    if (setButtonContainer) {
      setButtonContainer(
        <OverlayWizardButtonContainerBase
          backButtonFunction={backButtonFunction}
        />
      );
    }
  }, []);


  const handleFlowSelection = (newFlowOption) => {
    setSelectedFlow(newFlowOption);
    if (newFlowOption === TOOL_CREATION_OPTIONS.WIZARD) {
      setSelectedFlow("wizard");
      setCurrentScreen("task_select");
    } else {
      setSelectedFlow("advanced");
      setCurrentScreen("task_config");
    }
  };

  return (
    <div className={"m-4"}>
        <H5FieldSubHeader
          className={"mb-3 mx-3"}
          subheaderText={
            "Pick between the new Opsera Salesforce Tasks Creation Wizard or the SDLC Tasks Classic view to setup your tasks."
          }
        />
        <Row>
          <Col md={6}>
            <TaskCardBase
              option={TOOL_CREATION_OPTIONS.WIZARD}
              handleFlowSelection={handleFlowSelection}
              selectedFlow={selectedFlow}
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
                  title={TASKS_CREATION_OPTION_LABELS.WIZARD}
                  titleClassName={"mx-auto"}
                  subTitleClassName={"mx-auto"}
                />
              }
              description={
                "New Salesforce task creation wizard"
              }
              workflowOptionType={WORKFLOW_OPTION_TYPES.TASK}
            />
          </Col>
          <Col md={6}>
            <TaskCardBase
              option={TOOL_CREATION_OPTIONS.ADVANCED}
              handleFlowSelection={handleFlowSelection}
              selectedFlow={selectedFlow}
              icon={
                <IconTitleBar
                  className={""}
                  icon={
                    <ImageBase
                      height={96}
                      imageSource={
                        platformImageConstants.PLATFORM_IMAGE_LINKS
                          .ADVANCED_OPTION
                      }
                    />
                  }
                  title={TASKS_CREATION_OPTION_LABELS.ADVANCED}
                  titleClassName={"mx-auto"}
                  subTitleClassName={"mx-auto"}
                />
              }
              description={
                "Classic view"
              }
              workflowOptionType={WORKFLOW_OPTION_TYPES.TASK}
            />
          </Col>
        </Row>
    </div>
  );
}

TasksSetupModeSelect.propTypes = {
  className: PropTypes.string,
  selectedFlow: PropTypes.string,
  setSelectedFlow: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  setButtonContainer: PropTypes.func,
  backButtonFunction: PropTypes.func
};

export default TasksSetupModeSelect;