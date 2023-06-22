import React, { useEffect } from "react";
import PropTypes from "prop-types";
import SelectionIconCardBase from "components/common/card_containers/SelectionIconCardBase";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useComponentStateReference from "hooks/useComponentStateReference";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import { faGear, faWandMagicSparkles } from "@fortawesome/pro-light-svg-icons";
import IconBase from "../../../common/icons/IconBase";
import OpseraInfinityLogo from "../../../logo/OpseraInfinityLogo";
import OverlayWizardButtonContainerBase from "../../../../temp-library-components/button/overlay/OverlayWizardButtonContainerBase";
import SelectionCardColumn from "../../../../temp-library-components/cards/SelectionCardColumn";
import { platformImageConstants } from "../../../../temp-library-components/image/platformImage.constants";
import { ImageBase } from "@opsera/react-vanity-set";
import TaskCardBase from "../task_cards/TaskCardBase";
import { TASK_TYPE_LABELS, TASK_TYPES} from "../../task.types";
import { WORKFLOW_OPTION_TYPES} from "../task_cards/TaskTypeOptionCardBase";

export const TOOL_CREATION_OPTIONS = {
  WIZARD: "wizard",
  ADVANCED: "advanced",
};

export const TASKS_CREATION_OPTION_LABELS = {
  WIZARD: "Salesforce Tasks",
  ADVANCED: "SDLC Tasks",
};

function TasksSetupModeSelect({
                                className,
                                selectedFlow,
                                setSelectedFlow,
                                setCurrentScreen,
                                setButtonContainer,
                                REGISTRY_WIZARD_SCREENS,
                                backButtonFunction
                              }) {
  const { themeConstants } = useComponentStateReference();

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
      <CenteredContentWrapper>
        <H5FieldSubHeader
          className={"mb-3 mx-3"}
          subheaderText={
            "Pick between the new Opsera Salesforce Task Creation Wizard or the SDLC Tasks Classic View view to setup your tasks."
          }
        />
      </CenteredContentWrapper>
      <div
        className={className}
        style={{ minHeight: "150px" }}
      >
        <Row
          className={"py-3 px-2"}
          noGutters={true}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <SelectionCardColumn>
            <TaskCardBase
              option={TOOL_CREATION_OPTIONS.WIZARD}
              handleFlowSelection={handleFlowSelection}
              selectedFlow={selectedFlow}
              icon={
                <IconTitleBar
                  className={""}
                  icon={
                    <ImageBase
                      height={"96px"}
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
          </SelectionCardColumn>
          <SelectionCardColumn>
            <TaskCardBase
              option={TOOL_CREATION_OPTIONS.ADVANCED}
              handleFlowSelection={handleFlowSelection}
              selectedFlow={selectedFlow}
              icon={
                <IconTitleBar
                  className={""}
                  icon={
                    <ImageBase
                      height={"96px"}
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
          </SelectionCardColumn>
        </Row>
      </div>
    </div>
  );
}

TasksSetupModeSelect.propTypes = {
  className: PropTypes.string,
  selectedFlow: PropTypes.string,
  setSelectedFlow: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  setButtonContainer: PropTypes.func,
  REGISTRY_WIZARD_SCREENS: PropTypes.object,
  backButtonFunction: PropTypes.func
};

export default TasksSetupModeSelect;