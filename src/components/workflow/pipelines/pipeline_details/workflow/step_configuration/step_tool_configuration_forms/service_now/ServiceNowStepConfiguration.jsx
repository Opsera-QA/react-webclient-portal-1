import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { faEnvelope } from "@fortawesome/pro-light-svg-icons";
import { AuthContext } from "contexts/AuthContext";
import modelHelpers from "components/common/model/modelHelpers";
import ServiceNowPipelineStepThresholdMetadata from "./serviceNow-step-threshold-metadata";
import ServiceNowPipelineStepConfigurationMetadata from "./serviceNow-step-configuration-metadata";
import PipelineStepEditorPanelContainer from "components/common/panels/detail_panel_container/PipelineStepEditorPanelContainer";
import IconBase from "components/common/icons/IconBase";
import ServiceNowTypeSelectInput from "./inputs/ServiceNowTypeSelectInput";
import ServiceNowToolSelectInput from "./inputs/ServiceNowToolSelectInput";
import ServiceNowChangeRequestSelectInput from "./inputs/ServiceNowChangeRequestSelectInput";
import ServiceNowAssignmentGroupSelectInput from "./inputs/ServiceNowAssignmentGroupSelectInput";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import { hasStringValue } from "components/common/helpers/string-helpers";
import ServiceNowExistingChangeRequestToggleInput from "./inputs/ServiceNowExistingChangeRequestToggleInput";

function ServiceNowStepConfiguration({ stepTool, parentCallback, closeEditorPanel }) {
  const contextType = useContext(AuthContext);
  const [thresholdData, setThresholdData] = useState(undefined);
  const [serviceNowDataModel, setServiceNowDataModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setThresholdData({...modelHelpers.getPipelineStepConfigurationThresholdModel(stepTool, ServiceNowPipelineStepThresholdMetadata)});
    setServiceNowDataModel({...modelHelpers.getPipelineStepConfigurationModel(stepTool, ServiceNowPipelineStepConfigurationMetadata)});
    setIsLoading(false);
  }, []);

  const callbackFunction = async () => {

    // TODO: When threshold is enabled, improve this logic
    const threshold = thresholdData.getPersistData();
    if (threshold.approved === true) {
      const {getUserRecord} = contextType;
      const userInfoResponse = await getUserRecord();
      threshold.user = userInfoResponse._id;
      threshold.email = userInfoResponse.email;
      threshold.approved_on = new Date();
    } else {
      threshold.user = null;
      threshold.email = null;
      threshold.approved_on = null;
    }

    const item = {
      configuration: serviceNowDataModel.getPersistData(),
      threshold: {
        type: "user-approval",
        value: threshold,
      },
    };

    return await parentCallback(item);
  };

  const getDynamicFields = () => {
    if (serviceNowDataModel?.getData("existingChangeRequest") === true) {
      return (
        <ServiceNowChangeRequestSelectInput 
          model={serviceNowDataModel}
          setModel={setServiceNowDataModel}
          toolConfigId={serviceNowDataModel?.getData("serviceNowToolId")}
          disabled={!hasStringValue(serviceNowDataModel?.getData("serviceNowToolId"))}
        />
      );
    }

    return (
      <>
        <ServiceNowAssignmentGroupSelectInput 
          model={serviceNowDataModel}
          setModel={setServiceNowDataModel}
          toolConfigId={serviceNowDataModel?.getData("serviceNowToolId")}
          disabled={!hasStringValue(serviceNowDataModel?.getData("serviceNowToolId"))}
        />
        <TextAreaInput
          fieldName={"changeRequestDescription"}
          dataObject={serviceNowDataModel}
          setDataObject={setServiceNowDataModel}          
        />
      </>
    );
  };

  if (serviceNowDataModel == null) {
    return <></>;
  }

  return (
    <PipelineStepEditorPanelContainer
      handleClose={closeEditorPanel}
      recordDto={serviceNowDataModel}
      persistRecord={callbackFunction}
      isLoading={isLoading}
    >
      <div>A Service Now Step in an Opsera Pipeline will halt the running pipeline and notify the configured
        user in order to allow the pipeline to proceed. Approval notification follows the rules defined for overall step notification. <b>Only Site Administrators and the pipeline&apos;s assigned Owner, Administrator and Manager roles (assigned via Access Rules) are permitted to perform this action</b>.
        <div className="my-3">Use the notification icon (<IconBase icon={faEnvelope}/>) to enable the various channels to use.</div>
      </div>
      <ServiceNowToolSelectInput 
        model={serviceNowDataModel}
        setModel={setServiceNowDataModel}
      />
      <ServiceNowTypeSelectInput
        fieldName={"type"}
        model={serviceNowDataModel}
        setModel={setServiceNowDataModel}
      />
      <ServiceNowExistingChangeRequestToggleInput
        fieldName={"existingChangeRequest"}
        model={serviceNowDataModel}
        setModel={setServiceNowDataModel}
      />
      {getDynamicFields()}
    </PipelineStepEditorPanelContainer>
  );
}

ServiceNowStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  parentCallback: PropTypes.func,
  closeEditorPanel: PropTypes.func
};

export default ServiceNowStepConfiguration;
