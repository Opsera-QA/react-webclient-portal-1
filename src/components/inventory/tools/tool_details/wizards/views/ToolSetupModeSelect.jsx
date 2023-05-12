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
import {EXTERNAL_LINKS} from "components/header/legacy/HeaderNavBar";

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
          <div className={"mb-1 mx-3"}>
            <InfoMessageFieldBase
              showInformationLabel={false}
              message={"* Advanced Settings is the classic create view"}
            />
          </div>
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
    <div
      className={className}
      style={{ position: "relative" }}
    >
      <CenteredContentWrapper minHeight={"20px"}>
        <H5FieldSubHeader
          className={"mb-3 mx-3"}
          subheaderText={
            "Pick between the new Opsera Tool Creation Wizard or the legacy advanced settings view to setup your tool."
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
            style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <SelectionCardColumn
          >
            <SelectionIconCardBase
              selectedOption={setupMode}
              tooltip={
                "Use the Opsera Tool Creation Wizard to set up your tool and test its connection."
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
                    title={TOOL_CREATION_OPTION_LABELS.WIZARD}
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
          <SelectionCardColumn
          >
            <SelectionIconCardBase
              selectedOption={setupMode}
              tooltip={
                "Use the Advanced tool creation workflow to register your tool's details with Opsera."
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
                    title={TOOL_CREATION_OPTION_LABELS.ADVANCED}
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

ToolSetupModeSelect.propTypes = {
  className: PropTypes.string,
  setupMode: PropTypes.string,
  setSetupMode: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  setButtonContainer: PropTypes.func,
  backButtonFunction: PropTypes.func,
};

export default ToolSetupModeSelect;
