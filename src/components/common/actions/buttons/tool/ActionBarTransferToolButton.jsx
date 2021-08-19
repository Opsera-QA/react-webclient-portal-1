import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShareAlt} from "@fortawesome/pro-light-svg-icons";
import Button from "react-bootstrap/Button";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import PopoverContainer from "components/common/tooltip/PopoverContainer";
import ActionBarPopoverButton from "components/common/actions/buttons/ActionBarPopoverButton";
import toolsActions from "components/inventory/tools/tools-actions";
import LdapUserSelectInput from "components/common/list_of_values_input/users/LdapUserSelectInput";
import CancelButton from "components/common/buttons/CancelButton";
import Model from "core/data_model/model";

function ActionBarTransferToolButton({ toolData, loadTool, className }) {
  const { getAccessToken, getUserRecord, setAccessRoles } = useContext(AuthContext);
  const toastContext  = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [toolCopy, setToolCopy] = useState(new Model({...toolData.data}, toolData.getMetaData(), false));
  const [transferringOwner, setTransferringOwner] = useState(false);
  const [canTransferTool, setCanTransferTool] = useState(undefined);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const user = await getUserRecord();
      const {ldap} = user;
      const userRoleAccess = await setAccessRoles(user);

      if (userRoleAccess && userRoleAccess?.Type !== "sass-user" && ldap.domain != null)
      {
        setCanTransferTool(true);
      }
    }
    catch (error) {
      console.error("Could not validate credentials.");
    }
    finally {
      setIsLoading(false);
    }
  };

  const changeToolOwner = async () => {
    try {
      setTransferringOwner(true);
      await toolsActions.updateTool(toolCopy, getAccessToken);
      toastContext.showUpdateSuccessResultDialog("Tool Owner");
      await loadTool();
      document.body.click();
    }
    catch (error) {
      toastContext.showUpdateFailureResultDialog("Tool Owner", error);
    }
    finally {
      setTransferringOwner(false);
    }
  };

  const popoverContent = (
      <div>
        <div className="pb-2">
          <LdapUserSelectInput fieldName={"owner"} model={toolCopy} setModel={setToolCopy} showClearValueButton={false} />
        </div>
        <div className="d-flex justify-content-between">
          <div className="w-50 mr-1">
            <Button type="primary" size="sm" disabled={transferringOwner} onClick={() => changeToolOwner()}
                    className="w-100">
              <span className="pr-3"><FontAwesomeIcon icon={faShareAlt} fixedWidth className="mr-2"/>Transfer</span>
            </Button>
          </div>
          <div className="w-50 ml-1">
            <CancelButton size={"sm"} className={"w-100"} cancelFunction={() => document.body.click()} />
          </div>
        </div>
      </div>
    );

  if (canTransferTool == null || canTransferTool !== true) {
    return null;
  }

  return (
    <PopoverContainer
      className={"owner-popover"}
      isLoading={isLoading}
      title={"Transfer Tool"}
      content={popoverContent}>
      <div className={className}>
        <ActionBarPopoverButton disabled={isLoading} icon={faShareAlt} popoverText={`Transfer Tool to new Owner`} />
      </div>
    </PopoverContainer>
  );
}

ActionBarTransferToolButton.propTypes = {
  toolData: PropTypes.object,
  loadTool: PropTypes.func,
  className: PropTypes.string
};

export default ActionBarTransferToolButton;