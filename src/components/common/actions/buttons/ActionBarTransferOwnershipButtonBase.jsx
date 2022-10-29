import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { faShareAlt } from "@fortawesome/pro-light-svg-icons";
import useComponentStateReference from "hooks/useComponentStateReference";
import { DialogToastContext } from "contexts/DialogToastContext";
import LdapUserSelectInput from "components/common/list_of_values_input/users/LdapUserSelectInput";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import TransferOwnershipButton from "components/common/buttons/transfer/TransferOwnershipButton";
import CancelButton from "components/common/buttons/CancelButton";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import ActionBarPopoverButton from "components/common/actions/buttons/ActionBarPopoverButton";
import { buttonLabelHelper } from "temp-library-components/helpers/label/button/buttonLabel.helper";
import TransferOwnershipModel from "components/common/model/transfer_ownership/transferOwnership.model";

export default function ActionBarTransferOwnershipButtonBase(
  {
    model,
    setModel,
    ownerId,
    className,
    visible,
  }) {
  const toastContext  = useContext(DialogToastContext);
  const [transferOwnershipModel, setTransferOwnershipModel] = useState(undefined);
  const [transferState, setTransferState] = useState(buttonLabelHelper.BUTTON_STATES.READY);
  const {
    isSassUser,
  } = useComponentStateReference();

  useEffect(() => {
    if (ownerId) {
      const data = {
        owner: ownerId,
      };
      setTransferOwnershipModel({...new TransferOwnershipModel(data)});
    }
  }, [ownerId]);

  // TODO: Move inside transfer ownership button
  const handleOwnershipTransfer = async () => {
    try {
      setTransferState(buttonLabelHelper.BUTTON_STATES.BUSY);
      await model?.transferOwnership(transferOwnershipModel?.getData("owner"));
      toastContext.showFormSuccessToast(`Successfully transferred ${model?.getType()} to new Owner`);
      setTransferState(buttonLabelHelper.BUTTON_STATES.SUCCESS);
      setModel({...model});
      document.body.click();
    } catch (error) {
      toastContext.showFormErrorToast(error, `Error transferring ${model?.getType()} to new Owner`);
      setTransferState(buttonLabelHelper.BUTTON_STATES.ERROR);
    }
  };

  const getPopoverContent = () => {
    return (
      <div>
        <div className="pb-2">
          <LdapUserSelectInput
            fieldName={"owner"}
            model={transferOwnershipModel}
            setModel={setTransferOwnershipModel}
            showClearValueButton={false}
          />
        </div>
        <Row className="justify-content-between">
          <Col xs={6} className={"pr-1"}>
            <TransferOwnershipButton
              disabled={model?.getOriginalValue("owner") === transferOwnershipModel?.getData("owner")}
              isTransferringOwnership={transferState === buttonLabelHelper.BUTTON_STATES.BUSY}
              transferOwnershipFunction={handleOwnershipTransfer}
            />
          </Col>
          <Col xs={6} className={"pl-1"}>
            <CancelButton
              size={"sm"}
              className={"w-100"}
              cancelFunction={() => document.body.click()}
              isLoading={transferState === buttonLabelHelper.BUTTON_STATES.BUSY}
            />
          </Col>
        </Row>
      </div>
    );
  };

  if (
    isSassUser !== false
    || model == null
    || model?.canTransferOwnership() !== true
    || visible === false
  ) {
    return null;
  }

  return (
    <TooltipWrapper
      className={"owner-popover"}
      title={`Transfer ${model?.getType()} to new Owner`}
      innerText={getPopoverContent()}
      placement={"left"}
      trigger={"click"}
    >
      <div className={className}>
        <ActionBarPopoverButton
          icon={faShareAlt}
          popoverText={`Transfer ${model?.getType()} to new Owner`}
        />
      </div>
    </TooltipWrapper>
  );
}

ActionBarTransferOwnershipButtonBase.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  ownerId: PropTypes.string,
  className: PropTypes.string,
  visible: PropTypes.func,
};