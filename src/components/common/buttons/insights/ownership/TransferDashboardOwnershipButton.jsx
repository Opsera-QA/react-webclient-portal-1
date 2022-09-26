import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {faShareAlt} from "@fortawesome/pro-light-svg-icons";
import LdapUserSelectInput from "components/common/list_of_values_input/users/LdapUserSelectInput";
import CancelButton from "components/common/buttons/CancelButton";
import TransferOwnershipButton from "components/common/buttons/transfer/TransferOwnershipButton";
import {Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import OverlayIconBase from "components/common/icons/OverlayIconBase";
import useComponentStateReference from "hooks/useComponentStateReference";

function TransferDashboardOwnershipButton({ dashboardModel, className }) {
  const [dashboardModelCopy, setDashboardModelCopy] = useState(undefined);
  const [isTransferringOwnership, setIsTransferringOwnership] = useState(false);
  const {
    isMounted,
    cancelTokenSource,
    toastContext,
    isSaasUser,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    if (dashboardModel) {
      setDashboardModelCopy(dashboardModel);
    }
  }, [dashboardModel]);

  const transferDashboardOwnership = async () => {
    try {
      setIsTransferringOwnership(true);
      await dashboardsActions.transferOwnershipToNewUserV2(
        getAccessToken,
        cancelTokenSource,
        dashboardModelCopy?.getMongoDbId(),
        dashboardModel?.getData("owner")
        );
      toastContext.showUpdateSuccessResultDialog("Dashboard Owner");
      document.body.click();
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showUpdateFailureResultDialog("Dashboard Owner", error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsTransferringOwnership(false);
      }
    }
  };

  const getPopoverContent = () => {
    return (
      <div>
        <div className="pb-2">
          <LdapUserSelectInput
            fieldName={"owner"}
            model={dashboardModelCopy}
            setModel={setDashboardModelCopy}
            showClearValueButton={false}
          />
        </div>
        <Row className="justify-content-between">
          <Col xs={6} className={"pr-1"}>
            <TransferOwnershipButton
              disabled={dashboardModelCopy?.isChanged("owner") !== true}
              isTransferringOwnership={isTransferringOwnership}
              transferOwnershipFunction={transferDashboardOwnership}
            />
          </Col>
          <Col xs={6} className={"pl-1"}>
            <CancelButton
              size={"sm"}
              className={"w-100"}
              cancelFunction={() => document.body.click()}
              isLoading={isTransferringOwnership}
            />
          </Col>
        </Row>
      </div>
    );
  };

  if (
    isSaasUser !== false ||
    dashboardModelCopy == null ||
    dashboardModel?.canTransferDashboardOwnershipToNewUser() !== true
  ) {
    return null;
  }

  return (
    <TooltipWrapper
      className={"owner-popover"}
      title={"Transfer Dashboard"}
      innerText={getPopoverContent()}
      placement={"bottom"}
      trigger={"click"}
    >
      <div className={className}>
        <OverlayIconBase
          icon={faShareAlt}
          className={"pointer"}
          overlayBody={`Transfer Dashboard to new Owner`}
        />
      </div>
    </TooltipWrapper>
  );
}

TransferDashboardOwnershipButton.propTypes = {
  dashboardModel: PropTypes.object,
  className: PropTypes.string
};

export default TransferDashboardOwnershipButton;