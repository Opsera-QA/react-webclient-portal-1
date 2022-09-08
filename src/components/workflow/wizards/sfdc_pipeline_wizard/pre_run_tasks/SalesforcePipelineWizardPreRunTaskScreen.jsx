import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { salesforcePipelineHelper } from "components/workflow/wizards/sfdc_pipeline_wizard/salesforcePipeline.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import jenkinsPipelineStepConfigurationMetadata
  from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/jenkins/jenkinsPipelineStepConfigurationMetadata";
import modelHelpers from "components/common/model/modelHelpers";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import Row from "react-bootstrap/Row";
import SalesforcePipelineWizardBitbucketWorkspaceSelectInput
  from "components/workflow/wizards/sfdc_pipeline_wizard/pre_run_tasks/inputs/SalesforcePipelineWizardBitbucketWorkspaceSelectInput";
import Col from "react-bootstrap/Col";
import SalesforcePipelineWizardRepositorySelectInput
  from "components/workflow/wizards/sfdc_pipeline_wizard/pre_run_tasks/inputs/SalesforcePipelineWizardRepositorySelectInput";
import SalesforcePipelineWizardBranchSelectInput
  from "components/workflow/wizards/sfdc_pipeline_wizard/pre_run_tasks/inputs/SalesforcePipelineWizardBranchSelectInput";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import SalesforcePipelineWizardConfirmRepositorySettingsButton
  from "components/workflow/wizards/sfdc_pipeline_wizard/pre_run_tasks/SalesforcePipelineWizardConfirmRepositorySettingsButton";
import InlineErrorText from "components/common/status_notifications/inline/InlineErrorText";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import OpseraInfinityLogo from "../../../../logo/OpseraInfinityLogo";
import OpseraInfinityLogoLarge from "../../../../logo/OpseraInfinityLogoLarge";

export default function SalesforcePipelineWizardPreRunTaskScreen(
  {
    pipeline,
    setPipeline,
    setCurrentScreen,
    className,
  }) {
  const [repositoryInformationModel, setRepositoryInformationModel] = useState(undefined);
  const { toastContext } = useComponentStateReference();

  useEffect(() => {
    if (pipeline) {
      try {
        const createPipelineStep = salesforcePipelineHelper.getSalesforceCreatePackageStepFromPipeline(pipeline);
        setRepositoryInformationModel({...modelHelpers.parseObjectIntoModel(createPipelineStep?.tool?.configuration, jenkinsPipelineStepConfigurationMetadata)});
      }
      catch (error) {
        toastContext.showInlineErrorMessage(error, "Error initializing Salesforce Pipeline run:");
      }
    }
  }, [pipeline]);

  if (pipeline == null || repositoryInformationModel == null) {
    return null;
  }

  if (
    !isMongoDbId(repositoryInformationModel.getData("sfdcToolId")) ||
    !isMongoDbId(repositoryInformationModel.getData("gitToolId"))
  ) {
    return (
      <div className={className}>
        <InlineErrorText
          prependMessage={
            "Pipeline was not configured properly, Please delete this pipeline and create a new one."
          }
          error={"No credentials were added."}
        />
      </div>
    );
  }

  const welcomeText = () => {
      return(
          <div className={"my-3"}>
              <div className={"d-flex"}>
                  <div className={"mx-auto"}>
                      <OpseraInfinityLogo />
                  </div>
              </div>
              <div className={"d-flex"}>
                  <div className={"mx-auto mt-3"}>
                      <span className={"focusText"}>Welcome to the Start Pipeline Wizard.  Complete the these steps in order to start your pipeline.</span>
                  </div>
              </div>
          </div>
      );
  };

  return (
    <div className={className}>
      <H5FieldSubHeader
        subheaderText={"Salesforce Pipeline Run: Pre Run Tasks"}
      />
        {welcomeText()}
      <div>Please select the repository and branch you wish to use during for this Salesforce workflow</div>
      <Row>
        {/*<Col xs={12}>*/}
        {/*  <SalesforcePipelineWizardBitbucketWorkspaceSelectInput*/}
        {/*    pipeline={pipeline}*/}
        {/*    setPipeline={setPipeline}*/}
        {/*    model={repositoryInformationModel}*/}
        {/*    setModel={setRepositoryInformationModel}*/}
        {/*    gitToolId={repositoryInformationModel?.getData("gitToolId")}*/}
        {/*    service={repositoryInformationModel?.getData("service")}*/}
        {/*  />*/}
        {/*</Col>*/}
        <Col xs={12}>
          <SalesforcePipelineWizardRepositorySelectInput
            pipeline={pipeline}
            setPipeline={setPipeline}
            model={repositoryInformationModel}
            setModel={setRepositoryInformationModel}
          />
        </Col>
        <Col xs={12}>
          <SalesforcePipelineWizardBranchSelectInput
            pipeline={pipeline}
            setPipeline={setPipeline}
            model={repositoryInformationModel}
            setModel={setRepositoryInformationModel}
          />
        </Col>
      </Row>
      <ButtonContainerBase>
        <SalesforcePipelineWizardConfirmRepositorySettingsButton
          pipeline={pipeline}
          setCurrentScreen={setCurrentScreen}
        />
      </ButtonContainerBase>
    </div>
  );
}

SalesforcePipelineWizardPreRunTaskScreen.propTypes = {
  pipeline: PropTypes.object,
  setPipeline: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  className: PropTypes.string,
};