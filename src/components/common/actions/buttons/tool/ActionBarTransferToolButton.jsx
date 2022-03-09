import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faShareAlt} from "@fortawesome/pro-light-svg-icons";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import ActionBarPopoverButton from "components/common/actions/buttons/ActionBarPopoverButton";
import toolsActions from "components/inventory/tools/tools-actions";
import LdapUserSelectInput from "components/common/list_of_values_input/users/LdapUserSelectInput";
import CancelButton from "components/common/buttons/CancelButton";
import axios from "axios";
import TransferOwnershipButton from "components/common/buttons/transfer/TransferOwnershipButton";
import {Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

function ActionBarTransferToolButton({ toolModel, loadTool, className }) {
  const { getAccessToken, isSassUser } = useContext(AuthContext);
  const toastContext  = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [toolCopy, setToolCopy] = useState(undefined);
  const [isTransferringOwnership, setIsTransferringOwnership] = useState(false);
  const [canTransferTool, setCanTransferTool] = useState(false);
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
  }, [toolModel]);

  const loadData = async () => {
    try {
      setIsLoading(true);

      if (toolModel?.canPerformAction("update_tool_owner") === true) {
        setToolCopy(toolModel?.clone());
        setCanTransferTool(true);
      }
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

  const transferToolOwnership = async () => {
    try {
      setIsTransferringOwnership(true);
      await toolsActions.updateToolV2(getAccessToken, cancelTokenSource, toolCopy);
      toastContext.showUpdateSuccessResultDialog("Tool Owner");
      document.body.click();
      await loadTool();
    }
    catch (error) {
      toastContext.showUpdateFailureResultDialog("Tool Owner", error);
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
            model={toolCopy}
            setModel={setToolCopy}
            showClearValueButton={false}
          />
        </div>
        <Row className="justify-content-between">
          <Col xs={6} className={"pr-1"}>
            <TransferOwnershipButton
              disabled={toolCopy?.isChanged("owner") !== true}
              isTransferringOwnership={isTransferringOwnership}
              transferOwnershipFunction={transferToolOwnership}
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

  if (isSassUser() !== false || toolCopy == null || canTransferTool !== true) {
    return null;
  }

  return (
    <TooltipWrapper
      className={"owner-popover"}
      isLoading={isLoading}
      title={"Transfer Tool"}
      innerText={getPopoverContent()}
      placement={"top"}
      trigger={"click"}
    >
      <div className={className}>
        <ActionBarPopoverButton
          disabled={isLoading}
          icon={faShareAlt}
          popoverText={`Transfer Tool to new Owner`}
        />
      </div>
    </TooltipWrapper>
  );
}

ActionBarTransferToolButton.propTypes = {
  toolModel: PropTypes.object,
  loadTool: PropTypes.func,
  className: PropTypes.string
};

export default ActionBarTransferToolButton;