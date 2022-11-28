import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {faShareAll} from "@fortawesome/pro-light-svg-icons";
import useComponentStateReference from "hooks/useComponentStateReference";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CancelButton from "components/common/buttons/CancelButton";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import RoleAccessInput from "components/common/inputs/roles/RoleAccessInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import PublishPipelineToPrivateCatalogButton
  from "components/workflow/pipelines/summary/action_bar/buttons/publish/PublishPipelineToPrivateCatalogButton";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";

export default function PublishCustomerPipelineOverlay(
  {
    pipelineModel,
  }) {
  const [pipelineModelCopy, setPipelineModelCopy] = useState(undefined);
  const {
    userData,
  } = useComponentStateReference();

  useEffect(() => {
    if (pipelineModel) {
      setPipelineModelCopy({...pipelineModel.clone()});
    }
  }, [pipelineModel]);

  const {
    toastContext,
  } = useComponentStateReference();

  const closePanelFunction = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getButtonContainer = () => {
    return (
      <ButtonContainerBase className={"bg-white"}>
        <div className={"m-3 d-flex"}>
          <CancelButton
            cancelFunction={closePanelFunction}
            size={"md"}
            className={"mr-2"}
          />
          <PublishPipelineToPrivateCatalogButton
            pipelineId={pipelineModelCopy?.getMongoDbId()}
            roles={pipelineModelCopy?.getData("roles")}
          />
        </div>
      </ButtonContainerBase>
    );
  };

  if (PipelineRoleHelper.canPublishPipelineToCatalog(userData, pipelineModel?.getCurrentData()) !== true) {
    return null;
  }

  return (
    <CenterOverlayContainer
      showPanel={true}
      titleText={`Publish Pipeline to Private Catalog`}
      showToasts={true}
      titleIcon={faShareAll}
      closePanel={closePanelFunction}
      buttonContainer={getButtonContainer()}
    >
      <div className={"p-3"}>
        <H5FieldSubHeader
          subheaderText={"Are you sure you would like to publish this Pipeline to your private catalog?"}
          className={"mb-2"}
        />
        <div className={"my-3"}>
          {`Please specify the access rule restrictions for viewing this Pipeline in your organization's private catalog. By default, it copies the access rules applied to the Pipeline.`}
        </div>
        <Row>
          <Col xs={12}>
            <RoleAccessInput
              model={pipelineModelCopy}
              setModel={setPipelineModelCopy}
            />
          </Col>
        </Row>
      </div>
    </CenterOverlayContainer>
  );
}

PublishCustomerPipelineOverlay.propTypes = {
  pipelineModel: PropTypes.object,
};