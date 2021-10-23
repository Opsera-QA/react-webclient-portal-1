import React, { useEffect, useState } from "react";
import { faBracketsCurly, faInfoCircle, faSync, faTimes, faHandshake} from "@fortawesome/pro-light-svg-icons";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import PropTypes from "prop-types";
import awsLambdaStepFormMetadata from "./awsLambda-stepForm-metadata";
import modelHelpers from "components/common/model/modelHelpers";
import MultiTaskSelectInputBase from "./inputs/MultiTaskSelectInput";
import AwsLambdaActionSelectInput from "./inputs/ActionTypeSelectInput";
import AwsToolSelectInput from "./inputs/AwsToolSelectInput";
import RoleRestrictedAwsAccountToolSelectInput
  from "components/common/list_of_values_input/tools/aws/tool/RoleRestrictedAwsAccountToolSelectInput";

function AwsLambdaDeployStepConfiguration({ stepTool, closeEditorPanel, parentCallback, plan, stepId, pipelineId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [lambdaModel, setLambdaModel] = useState(undefined);
  const [threshold, setThreshold] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    setThreshold(stepTool?.threshold);
    let ecsServiceConfigurationData = modelHelpers.getPipelineStepConfigurationModel(
      stepTool,
      awsLambdaStepFormMetadata
    );
    setLambdaModel(ecsServiceConfigurationData);
    setIsLoading(false);
  };

  const callbackFunction = async () => {
    const item = {
      configuration: lambdaModel.getPersistData(),
      threshold: {
        type: threshold?.type,
        value: threshold?.value,
      },
    };
    parentCallback(item);
  };

  if (isLoading || lambdaModel == null) {
    return <DetailPanelLoadingDialog />;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={lambdaModel}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <AwsLambdaActionSelectInput
        dataObject={lambdaModel}
        setDataObject={setLambdaModel}
      />
      <RoleRestrictedAwsAccountToolSelectInput
        model={lambdaModel}
        setModel={setLambdaModel}
        fieldName={"toolConfigId"}
      />
      <MultiTaskSelectInputBase
        titleIcon={faBracketsCurly}
        dataObject={lambdaModel}
        setDataObject={setLambdaModel}
        fieldName={"lambdaTasks"}
        allowIncompleteItems={true}
        type={"Lambda Function"}
        regexValidationRequired={false}
        titleText={"Lambda Function <-> S3 Push Mapping"}
        plan={plan}
        stepIdParent={stepId}
      />
    </PipelineStepEditorPanelContainer>
  );
}

AwsLambdaDeployStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  closeEditorPanel: PropTypes.func,
  parentCallback: PropTypes.func,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  pipelineId: PropTypes.string,
};

export default AwsLambdaDeployStepConfiguration;
