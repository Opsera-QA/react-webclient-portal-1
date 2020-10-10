import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {faUserEdit, faUserTimes} from "@fortawesome/pro-light-svg-icons";
import Popover from "react-bootstrap/Popover";
import {Col, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/pro-solid-svg-icons";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {AuthContext} from "../../../../../contexts/AuthContext";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";
import ActionBarPopoverButton from "../../buttons/ActionBarPopoverButton";
import DropdownList from "react-widgets/lib/DropdownList";
import accountsActions from "../../../../admin/accounts/accounts-actions";
import pipelineActions from "../../../../workflow/pipeline-actions";
import PopoverContainer from "../../../tooltip/PopoverContainer";

function ActionBarTransferPipelineButton({ pipeline, loadPipeline }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext  = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  const [newUserId, setNewUserId] = useState(undefined);
  const [transferringPipeline, setTransferringPipeline] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getUsers();
    }
    catch (error) {
      toastContext.showErrorDialog(error,"Could not load users");
    }
    finally {
      setIsLoading(false);
    }
  }

  const getUsers = async () => {
    let response = await accountsActions.getOrganizationAccountMembers(pipeline.account, getAccessToken);
    setUserList(response.data);
  };

  const changePipelineOwner = async () => {
    try {
      setTransferringPipeline(true);
      await pipelineActions.transferPipeline(pipeline._id, newUserId, getAccessToken);
      toastContext.showUpdateSuccessResultDialog("Pipeline Owner");
      await loadPipeline();
      document.body.click();
    }
    catch (error) {
      toastContext.showUpdateFailureResultDialog("Pipeline Owner", error);
    }
    finally {
      setTransferringPipeline(false);
    }
  }

  const popoverContent = (
      <div>
        <div className="pb-2">
          <DropdownList
            data={userList}
            valueField="_id"
            value={userList[userList.findIndex(x => x._id === pipeline.owner)]}
            busy={isLoading}
            disabled={isLoading}
            textField={data => data != null ? `${data["firstName"]} ${data["lastName"]} (${data["email"]})` : ``}
            filter='contains'
            // groupBy={tool => capitalizeFirstLetter(tool.tool_type_identifier, "-", "No Tool Type Identifier")}
            onChange={data => setNewUserId(data._id)}
          />
        </div>
        <div className="d-flex justify-content-between">
          <div className="w-50 mr-1">
            <Button type="primary" size="sm" disabled={transferringPipeline} onClick={() => changePipelineOwner()}
                    className="w-100">
              <span className="pr-3"><FontAwesomeIcon icon={faUserEdit} fixedWidth className="mr-2"/>Transfer</span>
            </Button>
          </div>
          <div className="w-50 ml-1">
            <Button type="primary" size="sm" onClick={() => document.body.click()} className="w-100">
              <span><FontAwesomeIcon icon={faUserTimes} fixedWidth className="mr-2"/>Cancel</span>
            </Button>
          </div>
        </div>
      </div>
    );

  return (
    <PopoverContainer
      className={"pipeline-owner-popover"}
      isLoading={isLoading}
      title={"Transfer Pipeline"}
      content={popoverContent}>
      <div>
        <ActionBarPopoverButton disabled={isLoading} icon={faUserEdit} popoverText={`Transfer Pipeline to new Owner`} />
      </div>
    </PopoverContainer>
  );
}

ActionBarTransferPipelineButton.propTypes = {
  pipeline: PropTypes.object,
  loadPipeline: PropTypes.func
};

export default ActionBarTransferPipelineButton;