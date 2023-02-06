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
import modelHelpers from "components/common/model/modelHelpers";
import {
  publishPipelineMetadata
} from "components/workflow/pipelines/summary/action_bar/buttons/publish/publishPipeline.metadata";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import TextAreaInputBase from "components/common/inputs/text/text_area/TextAreaInputBase";

export default function PublishCustomerPipelineOverlay(
  {
    pipelineModel,
  }) {
  const [publishPipelineModel, setPublishPipelineModel] = useState(undefined);
  const {
    userData,
  } = useComponentStateReference();

  useEffect(() => {
    if (pipelineModel) {
      const data = {
        _id: pipelineModel?.getMongoDbId(),
        name: pipelineModel?.getData("name"),
        roles: pipelineModel?.getData("roles"),
        description: pipelineModel?.getData("description"),
      };

      setPublishPipelineModel({...modelHelpers.parseObjectIntoModel(data, publishPipelineMetadata)});
      console.log("publishPipelineMetadata: " + JSON.stringify(publishPipelineMetadata));
    }
  }, [pipelineModel]);

  const {
    toastContext,
  } = useComponentStateReference();

  const closePanelFunction = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (publishPipelineModel == null || PipelineRoleHelper.canPublishPipelineToCatalog(userData, pipelineModel?.getCurrentData()) !== true) {
    return null;
  }

  return (
    <CenterOverlayContainer
      showPanel={true}
      titleText={`Publish Pipeline to Private Catalog`}
      showToasts={true}
      showCloseButton={false}
      titleIcon={faShareAll}
      closePanel={closePanelFunction}
    >
      <div className={"p-3"}>
        <H5FieldSubHeader
          subheaderText={"Are you sure you would like to publish this Pipeline to your private catalog?"}
          className={"mb-2"}
        />
        <div className={"mb-1"}>
          {`Please specify a Pipeline Name, any notes you would like the Pipeline to have, and the Access Rule restrictions for viewing this Pipeline in your Organization's private catalog. By default, it copies these fields from the original Pipeline.`}
        </div>
        <Row>
          <Col xs={12}>
            <TextInputBase
              fieldName={"name"}
              dataObject={publishPipelineModel}
              setDataObject={setPublishPipelineModel}
            />
          </Col>
          <Col xs={12}>
            <RoleAccessInput
              model={publishPipelineModel}
              setModel={setPublishPipelineModel}
            />
          </Col>
          <Col xs={12}>
            <TextAreaInputBase
              fieldName={"description"}
              model={publishPipelineModel}
              setModel={setPublishPipelineModel}
            />
          </Col>
        </Row>
        <ButtonContainerBase className={"pt-3"}>
          <CancelButton
            cancelFunction={closePanelFunction}
            size={"md"}
            className={"ml-3"}
          />
          <PublishPipelineToPrivateCatalogButton
            publishPipelineModel={publishPipelineModel}
            className={"ml-3"}
          />
        </ButtonContainerBase>
      </div>
    </CenterOverlayContainer>
  );
}

PublishCustomerPipelineOverlay.propTypes = {
  pipelineModel: PropTypes.object,
};