import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShareAlt} from "@fortawesome/pro-light-svg-icons";
import Button from "react-bootstrap/Button";
import CancelButton from "components/common/buttons/CancelButton";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import accountsActions from "components/admin/accounts/accounts-actions";
import pipelineActions from "components/workflow/pipeline-actions";
import ActionBarPopoverButton from "components/common/actions/buttons/ActionBarPopoverButton";
import PopoverContainer from "components/common/tooltip/PopoverContainer";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import axios from "axios";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";

function ActionBarTransferPipelineButton(
  {
    pipeline,
    loadPipeline,
    isActionAllowedFunction,
  }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext  = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState(undefined);
  const [transferringPipeline, setTransferringPipeline] = useState(false);
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
        toastContext.showLoadingErrorDialog(error);
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
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
  };

  const getUsers = async () => {
    const response = await accountsActions.getOrganizationAccountMembers(pipeline.account, getAccessToken);
    const users = response?.data;

    if (isMounted?.current === true && Array.isArray(users)) {
      const pipelineOwner = pipeline?.owner;

      if (isMongoDbId(pipelineOwner)) {
        setUser(users?.find(x => x._id === pipeline.owner));
      }

      setUserList([...users]);
    }
  };

  const changePipelineOwner = async () => {
    try {
      setTransferringPipeline(true);
      await pipelineActions.transferPipelineV2(getAccessToken, cancelTokenSource, pipeline?._id, user?._id);
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
  };

  const popoverContent = (
      <div>
        <div className="pb-2">
          <StandaloneSelectInput
            selectOptions={userList}
            valueField="_id"
            value={user}
            busy={isLoading}
            disabled={isLoading}
            textField={data => data != null ? `${data["firstName"]} ${data["lastName"]} (${data["email"]})` : ``}
            setDataFunction={(data) => setUser(data)}
          />
        </div>
        <div className="d-flex justify-content-between">
          <div className="w-50 mr-1">
            <Button type="primary" size="sm" disabled={transferringPipeline} onClick={() => changePipelineOwner()}
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

  if (pipeline == null || pipeline?.account == null || isActionAllowedFunction("transfer_pipeline_btn", pipeline.owner) !== true) {
    return null;
  }

  return (
    <PopoverContainer
      className={"owner-popover"}
      isLoading={isLoading}
      title={"Transfer Pipeline"}
      content={popoverContent}>
      <div>
        <ActionBarPopoverButton
          className={"ml-3"}
          disabled={isLoading}
          icon={faShareAlt}
          popoverText={`Transfer Pipeline to new Owner`}
        />
      </div>
    </PopoverContainer>
  );
}

ActionBarTransferPipelineButton.propTypes = {
  pipeline: PropTypes.object,
  loadPipeline: PropTypes.func,
  isActionAllowedFunction: PropTypes.func,
};

export default ActionBarTransferPipelineButton;