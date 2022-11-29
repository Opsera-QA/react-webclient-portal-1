import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateFieldBase from "components/common/fields/date/DateFieldBase";
import LoadingDialog from "components/common/status_notifications/loading";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import TagField from "components/common/fields/multiple_items/tags/TagField";
import PipelineTemplateRoleAccessInput
  from "components/admin/pipeline_templates/details/inputs/PipelineTemplateRoleAccessInput";
import useComponentStateReference from "hooks/useComponentStateReference";
import SmartIdField from "components/common/fields/text/id/SmartIdField";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CreateCustomerPipelineButton from "components/workflow/catalog/private/deploy/CreateCustomerPipelineButton";
import SsoUserField from "components/common/list_of_values_input/users/sso/user/SsoUserField";
import CustomerPipelineTemplateRoleHelper
  from "@opsera/know-your-role/roles/pipelines/templates/customer/customerPipelineTemplateRole.helper";
import PrimaryPipelineTypeField
  from "components/common/list_of_values_input/admin/pipeline_templates/PrimaryPipelineTypeField";

function CustomerPipelineTemplateSummaryPanel(
  {
    pipelineTemplateModel,
    setPipelineTemplateModel,
    setActiveTab,
  }) {
  const {
    userData,
  } = useComponentStateReference();

  if (pipelineTemplateModel == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <SummaryPanelContainer setActiveTab={
      CustomerPipelineTemplateRoleHelper.canUpdateCustomerPipelineTemplate(
        userData,
        pipelineTemplateModel?.getOriginalData()
      ) === true ? setActiveTab : undefined
    }
    >
      <Row className={"mt-2"}>
        <Col lg={6}>
          <TextFieldBase
            dataObject={pipelineTemplateModel}
            fieldName={"name"}
            showDetailLinkClipboardIcon={false}
          />
        </Col>
        <Col lg={6}>
          <SsoUserField
            model={pipelineTemplateModel}
            fieldName={"owner"}
          />
        </Col>
        <Col lg={6}>
          <SmartIdField
            model={pipelineTemplateModel}
          />
        </Col>
        <Col lg={6}>
          <PrimaryPipelineTypeField
            model={pipelineTemplateModel}
            fieldName={"type"}
          />
        </Col>
        <Col lg={6}>
          <DateFieldBase
            dataObject={pipelineTemplateModel}
            fieldName={"createdAt"}
          />
        </Col>
        <Col lg={6}>
          <DateFieldBase
            dataObject={pipelineTemplateModel}
            fieldName={"updatedAt"}
          />
        </Col>
        <Col lg={12}>
          <TextFieldBase dataObject={pipelineTemplateModel} fieldName={"description"}/>
        </Col>
        <Col lg={12}>
          <PipelineTemplateRoleAccessInput
            dataObject={pipelineTemplateModel}
            setDataObject={setPipelineTemplateModel}
          />
        </Col>
        <Col lg={12}>
          <TagField
            dataObject={pipelineTemplateModel}
            fieldName={"tags"}
          />
        </Col>
        <Col lg={12}>
          <ButtonContainerBase>
            <CreateCustomerPipelineButton
              customerPipelineTemplateModel={pipelineTemplateModel}
            />
          </ButtonContainerBase>
        </Col>
      </Row>
    </SummaryPanelContainer>
  );
}

CustomerPipelineTemplateSummaryPanel.propTypes = {
  pipelineTemplateModel: PropTypes.object,
  setPipelineTemplateModel: PropTypes.func,
  setActiveTab: PropTypes.func,
};


export default CustomerPipelineTemplateSummaryPanel;
