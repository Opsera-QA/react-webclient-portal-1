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

export const TOOL_CREATION_OPTIONS = {
  WIZARD: "wizard",
  ADVANCED: "advanced",
};

export const TASKS_CREATION_OPTION_LABELS = {
  WIZARD: "Tasks Creation Wizard",
  ADVANCED: "Advanced Settings",
};

function TasksSetupModeSelect({
  className,
  setupMode,
  setSetupMode,
  setCurrentScreen,
  setButtonContainer,
  REGISTRY_WIZARD_SCREENS,
    backButtonFunction
}) {
  const { themeConstants } = useComponentStateReference();

  useEffect(() => {
    if (setButtonContainer && setCurrentScreen) {
      setButtonContainer(<OverlayWizardButtonContainerBase backButtonFunction={backButtonFunction}/>);
    }
  }, []);

  const setDataFunction = (newValue) => {
    setSetupMode(newValue);
    if (newValue === TOOL_CREATION_OPTIONS.WIZARD) {
      setSetupMode("wizard");
      setCurrentScreen("task_select");
    } else {
      setSetupMode("advanced");
      setCurrentScreen("task_config");
    }
  };

  return (
    <div
      className={className}
      style={{ position: "relative" }}
    >
      <CenteredContentWrapper minHeight={"20px"}>
        <H5FieldSubHeader
          className={"mb-3 mx-3"}
          subheaderText={
            "Pick between the new Opsera Task Creation Wizard or the legacy advanced settings view to setup your tasks."
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
            <SelectionIconCardBase
              selectedOption={setupMode}
              tooltip={
                "Use the Opsera Task Creation Wizard to set up your task."
              }
              option={TOOL_CREATION_OPTIONS.WIZARD}
              onClickFunction={setDataFunction}
              highlightedBorderColor={
                themeConstants.COLOR_PALETTE.OPSERA_HEADER_PURPLE
              }
              titleBar={
                <div className={"p-2"}>
                  <IconTitleBar
                    className={""}
                    title={TASKS_CREATION_OPTION_LABELS.WIZARD}
                    titleClassName={"mx-auto"}
                    icon={
                      <ImageBase
                        height={"96px"}
                        imageSource={
                          platformImageConstants.PLATFORM_IMAGE_LINKS
                            .WIZARD_GENERAL
                        }
                      />
                    }
                  />
                </div>
              }
            />
          </SelectionCardColumn>
          <SelectionCardColumn>
            <SelectionIconCardBase
              selectedOption={setupMode}
              tooltip={
                "Use the legacy advanced tasks creation workflow to create tasks with Opsera."
              }
              option={TOOL_CREATION_OPTIONS.ADVANCED}
              onClickFunction={setDataFunction}
              highlightedBorderColor={
                themeConstants.COLOR_PALETTE.OPSERA_HEADER_PURPLE
              }
              titleBar={
                <div className={"p-2"}>
                  <IconTitleBar
                    className={""}
                    title={TASKS_CREATION_OPTION_LABELS.ADVANCED}
                    titleClassName={"mx-auto mt-auto"}
                    icon={
                      <ImageBase
                        height={"96px"}
                        imageSource={
                          platformImageConstants.PLATFORM_IMAGE_LINKS
                            .ADVANCED_OPTION
                        }
                      />
                    }
                  />
                </div>
              }
            />
          </SelectionCardColumn>
        </Row>
      </div>
    </div>
  );
}

TasksSetupModeSelect.propTypes = {
  className: PropTypes.string,
  setupMode: PropTypes.string,
  setSetupMode: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  setButtonContainer: PropTypes.func,
  REGISTRY_WIZARD_SCREENS: PropTypes.object,
  backButtonFunction: PropTypes.func
};

export default TasksSetupModeSelect;
