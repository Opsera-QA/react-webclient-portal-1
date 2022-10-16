import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { faShareSquare } from "@fortawesome/pro-light-svg-icons";
import useComponentStateReference from "hooks/useComponentStateReference";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import PublishDashboardToPrivateCatalogButton
  from "components/insights/marketplace/dashboards/templates/private/publish/PublishDashboardToPrivateCatalogButton";
import CancelButton from "components/common/buttons/CancelButton";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import RoleAccessInput from "components/common/inputs/roles/RoleAccessInput";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";

export default function PublishCustomerDashboardOverlay(
  {
    dashboardModel,
  }) {
  const [dashboardModelCopy, setDashboardModelCopy] = useState(undefined);

  useEffect(() => {
    if (dashboardModel) {
      setDashboardModelCopy({...dashboardModel});
    }
  }, [dashboardModel]);

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
          <PublishDashboardToPrivateCatalogButton
            dashboardModel={dashboardModelCopy}
          />
        </div>
      </ButtonContainerBase>
    );
  };

  if (dashboardModelCopy?.canPublishDashboardToPrivateCatalog() !== true) {
    return null;
  }

  return (
    <CenterOverlayContainer
      showPanel={true}
      titleText={`Publish Dashboard to Private Catalog`}
      showToasts={true}
      titleIcon={faShareSquare}
      closePanel={closePanelFunction}
      buttonContainer={getButtonContainer()}
    >
      <div className={"p-3"}>
        <H5FieldSubHeader
          subheaderText={"Are you sure you would like to publish this Dashboard to your private catalog?"}
          className={"mb-2"}
        />
        <div className={"my-3"}>
          {`Please specify the access rule restrictions for viewing this Dashboard in your organization's private catalog. By default, it copies the access rules applied to the Dashboard.`}
        </div>
        <Row>
          <Col xs={12}>
            <RoleAccessInput
              model={dashboardModelCopy}
              setModel={setDashboardModelCopy}
            />
          </Col>
        </Row>
      </div>
    </CenterOverlayContainer>
  );
}

PublishCustomerDashboardOverlay.propTypes = {
  dashboardModel: PropTypes.object,
};