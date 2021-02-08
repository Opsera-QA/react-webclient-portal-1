import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserEdit, faPeopleArrows} from "@fortawesome/pro-light-svg-icons";
import Button from "react-bootstrap/Button";
import DropdownList from "react-widgets/lib/DropdownList";
import CancelButton from "components/common/buttons/CancelButton";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import pipelineActions from "components/workflow/pipeline-actions";
import ActionBarPopoverButton from "components/common/actions/buttons/ActionBarPopoverButton";
import PopoverContainer from "components/common/tooltip/PopoverContainer";

function ActionBarTransferPipelineButton({ pipeline, loadPipeline }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext  = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState(undefined);
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

    if (pipeline.owner != null) {
      setUser(response.data.find(x => x._id === pipeline.owner));
    }
    setUserList(response.data);
  };

  const changePipelineOwner = async () => {
    try {
      setTransferringPipeline(true);
      await pipelineActions.transferPipeline(pipeline._id, user._id, getAccessToken);
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
            value={user}
            busy={isLoading}
            disabled={isLoading}
            textField={data => data != null ? `${data["firstName"]} ${data["lastName"]} (${data["email"]})` : ``}
            filter='contains'
            onChange={(data) => setUser(data)}
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
            <CancelButton size={"sm"} className={"w-100"} cancelFunction={() => document.body.click()} />
          </div>
        </div>
      </div>
    );

  return (
    <PopoverContainer
      className={"owner-popover"}
      isLoading={isLoading}
      title={"Transfer Pipeline"}
      content={popoverContent}>
      <div>
        <ActionBarPopoverButton disabled={isLoading} icon={faPeopleArrows} popoverText={`Transfer Pipeline to new Owner`} />
      </div>
    </PopoverContainer>
  );
}

ActionBarTransferPipelineButton.propTypes = {
  pipeline: PropTypes.object,
  loadPipeline: PropTypes.func
};

export default ActionBarTransferPipelineButton;