import React, { useEffect } from "react";
import PropTypes from "prop-types";
import SelectionIconCardBase from "components/common/card_containers/SelectionIconCardBase";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useComponentStateReference from "hooks/useComponentStateReference";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import OverlayWizardButtonContainerBase from "../../../../../temp-library-components/button/overlay/OverlayWizardButtonContainerBase";
import { platformImageConstants } from "../../../../../temp-library-components/image/platformImage.constants";
import { ImageBase } from "@opsera/react-vanity-set";
import SelectionCardColumn from "../../../../../temp-library-components/cards/SelectionCardColumn";
import {
  platformPipelineTemplateCatalogActions
} from "../../../catalog/platform/platformPipelineTemplateCatalog.actions";
import {
  pipelineTemplateIdentifierConstants
} from "../../../../admin/pipeline_templates/pipelineTemplateIdentifier.constants";
import {buttonLabelHelper} from "../../../../../temp-library-components/helpers/label/button/buttonLabel.helper";
import {isMongoDbId} from "../../../../common/helpers/mongo/mongoDb.helpers";
import {pipelineHelper} from "../../../pipeline.helper";
import {useHistory} from "react-router-dom";

export const TOOL_CREATION_OPTIONS = {
  SFDC: "sfdc",
  SDLC: "sdlc",
  BLANK: "blank",
};

export const TOOL_CREATION_OPTION_LABELS = {
  SFDC: "SFDC Pipeline Templates",
  SDLC: "SDLC Pipeline Templates",
  BLANK: "Blank Pipeline Template",
};

function TemplateTypeSelectInput({
  className,
  setupMode,
  setSetupMode,
  setCurrentScreen,
  setButtonContainer,
  backButtonFunction,
}) {
  const {
    themeConstants,
  } = useComponentStateReference();

  useEffect(() => {
    if (setButtonContainer && setCurrentScreen) {
      setButtonContainer(
        <OverlayWizardButtonContainerBase
          backButtonFunction={backButtonFunction}
        />,
      );
    }
  }, []);

  const setDataFunction = (newValue) => {
    setSetupMode(newValue);
    setCurrentScreen("template_select");
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
            "Select a template category or start from scratch with a blank Opsera pipeline template."
          }
        />
      </CenteredContentWrapper>

      <Row
        className={"py-5 px-2"}
        noGutters={true}
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <SelectionCardColumn>
          <SelectionIconCardBase
            selectedOption={setupMode}
            tooltip={"Select from a set from SFDC Based pipeline templates"}
            option={TOOL_CREATION_OPTIONS.SFDC}
            onClickFunction={setDataFunction}
            highlightedBorderColor={
              themeConstants.COLOR_PALETTE.OPSERA_HEADER_PURPLE
            }
            titleBar={
              <div className={"p-2"}>
                <IconTitleBar
                  className={""}
                  title={TOOL_CREATION_OPTION_LABELS.SFDC}
                  titleClassName={"mx-auto"}
                  icon={
                    <ImageBase
                      height={platformImageConstants.getRecommendedCardPlatformImageHeight(
                        platformImageConstants.PLATFORM_IMAGE_LINKS
                          .SALESFORCE_GENERAL,
                      )}
                      imageSource={
                        platformImageConstants.PLATFORM_IMAGE_LINKS
                          .SALESFORCE_GENERAL
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
            tooltip={"Select from a set from SDLC Based pipeline templates"}
            option={TOOL_CREATION_OPTIONS.SDLC}
            onClickFunction={setDataFunction}
            highlightedBorderColor={
              themeConstants.COLOR_PALETTE.OPSERA_HEADER_PURPLE
            }
            titleBar={
              <div className={"p-2"}>
                <IconTitleBar
                  className={""}
                  title={TOOL_CREATION_OPTION_LABELS.SDLC}
                  titleClassName={"mx-auto mt-auto"}
                  icon={
                    <ImageBase
                      height={platformImageConstants.getRecommendedCardPlatformImageHeight(
                        platformImageConstants.PLATFORM_IMAGE_LINKS
                          .SOFTWARE_DEVELOPMENT_GENERAL,
                      )}
                      imageSource={
                        platformImageConstants.PLATFORM_IMAGE_LINKS
                          .SOFTWARE_DEVELOPMENT_GENERAL
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
            tooltip={"Start from scratch with a blank Opsera Pipeline Template"}
            option={TOOL_CREATION_OPTIONS.BLANK}
            onClickFunction={() => setCurrentScreen("blank_pipeline")}
            highlightedBorderColor={
              themeConstants.COLOR_PALETTE.OPSERA_HEADER_PURPLE
            }
            titleBar={
              <div className={"p-2"}>
                <IconTitleBar
                  className={""}
                  title={TOOL_CREATION_OPTION_LABELS.BLANK}
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
  );
}

TemplateTypeSelectInput.propTypes = {
  className: PropTypes.string,
  setupMode: PropTypes.string,
  setSetupMode: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  setButtonContainer: PropTypes.func,
  backButtonFunction: PropTypes.func,
};

export default TemplateTypeSelectInput;
