import React from "react";
import PropTypes from "prop-types";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import CancelButton from "components/common/buttons/CancelButton";
import MergeSyncTaskWizardCreateNewRecordButton
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/initialization_screen/MergeSyncTaskWizardCreateNewRecordButton";
import BooleanToggleInput from "../../../../../../../common/inputs/boolean/BooleanToggleInput";
import { Row, Col } from "react-bootstrap";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import OpseraInfinityLogo from "components/logo/OpseraInfinityLogo";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import SalesforcePackageVersionSelectionInput
  from "../../../../../../../workflow/wizards/sfdc_pipeline_wizard/xml_viewer/xml/SalesforcePackageVersionSelectionInput";

const MergeSyncTaskWizardInitializationScreen = ({
  wizardModel,
  setWizardModel,
  setCurrentScreen,
  handleClose,
  mergeSyncType,
}) => {
  const getBody = () => {
    if (wizardModel == null) {
      return (
        <CenterLoadingIndicator
          minHeight={"500px"}
          message={`Initializing ${mergeSyncType} Merge Sync Wizard`}
        />
      );
    }

    console.log(wizardModel.getPersistData());
    console.log(wizardModel?.getData("sfdcToolId"));
    return (
      <div>
        <div className={"m-3"}>
          <div className={"mb-4"}>
            <CenteredContentWrapper>
              <div className={"mx-auto"}>
                <OpseraInfinityLogo/>
              </div>
            </CenteredContentWrapper>
            <CenteredContentWrapper>
              <div className={"mx-auto mt-3"}>
                <H5FieldSubHeader
                  subheaderText={`${mergeSyncType} Merge Sync: Initialization`}
                />
                <div className={"focusText"}>
                  {`Would you like to start a new ${mergeSyncType} Merge Sync Task Wizard Instance?`}
                </div>
              </div>
            </CenteredContentWrapper>
          </div>
        </div>
        {wizardModel?.getData("taskType") === "SFDC_GIT_COMPARE_SYNC" &&
          <>
            {wizardModel.getData("sfdcToolId") &&
              <SalesforcePackageVersionSelectionInput
                pipelineWizardModel={wizardModel}
                setPipelineWizardModel={setWizardModel}
                fieldName={"apiVersion"}
              />
            }
            <Row className="mx-0 mt-3 d-flex">
              <div className="ml-auto d-flex">
                <Col>
                  <BooleanToggleInput
                    fieldName={"isProfiles"}
                    dataObject={wizardModel}
                    setDataObject={setWizardModel}
                  />
                </Col>

              </div>
            </Row>
          </>
        }
        <SaveButtonContainer>
          <MergeSyncTaskWizardCreateNewRecordButton
            wizardModel={wizardModel}
            setWizardModel={setWizardModel}
            setCurrentScreen={setCurrentScreen}
            className={"mr-2"}
          />
          <CancelButton
            showUnsavedChangesMessage={false}
            cancelFunction={handleClose}
            size={"sm"}
          />
        </SaveButtonContainer>
      </div>
    );
  };

  const getMainView = () => {
    return (
      <div>
        <div className={"my-3"}>{getBody()}</div>
      </div>
    );
  };

  return (
    <div>
      {getMainView()}
    </div>
  );
};

MergeSyncTaskWizardInitializationScreen.propTypes = {
  mergeSyncType: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  handleClose: PropTypes.func,
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
};

export default MergeSyncTaskWizardInitializationScreen;
