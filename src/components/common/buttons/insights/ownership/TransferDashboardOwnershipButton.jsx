import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faShareAlt} from "@fortawesome/pro-light-svg-icons";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import LdapUserSelectInput from "components/common/list_of_values_input/users/LdapUserSelectInput";
import CancelButton from "components/common/buttons/CancelButton";
import axios from "axios";
import TransferOwnershipButton from "components/common/buttons/transfer/TransferOwnershipButton";
import {Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import dashboardsActions from "components/insights/dashboards/dashboards-actions";
import OverlayIconBase from "components/common/icons/OverlayIconBase";

function TransferDashboardOwnershipButton({ dashboardModel, className }) {
  const { getAccessToken, isSassUser } = useContext(AuthContext);
  const toastContext  = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardModelCopy, setDashboardModelCopy] = useState(undefined);
  const [isTransferringOwnership, setIsTransferringOwnership] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [dashboardModel]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setDashboardModelCopy({...dashboardModel});
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

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
              isLoading={isTransferringOwnership || isLoading}
            />
          </Col>
        </Row>
      </div>
    );
  };

  if (
    isSassUser() !== false ||
    dashboardModelCopy == null ||
    dashboardModel?.canTransferDashboardOwnershipToNewUser() !== true
  ) {
    return null;
  }

  return (
    <TooltipWrapper
      className={"owner-popover"}
      isLoading={isLoading}
      title={"Transfer Dashboard"}
      innerText={getPopoverContent()}
      placement={"bottom"}
      trigger={"click"}
    >
      <div className={className}>
        <OverlayIconBase
          disabled={isLoading}
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