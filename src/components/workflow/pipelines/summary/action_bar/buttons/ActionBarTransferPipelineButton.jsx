import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {faShareAlt} from "@fortawesome/pro-light-svg-icons";
import Button from "react-bootstrap/Button";
import CancelButton from "components/common/buttons/CancelButton";
import accountsActions from "components/admin/accounts/accounts-actions";
import pipelineActions from "components/workflow/pipeline-actions";
import ActionBarPopoverButton from "components/common/actions/buttons/ActionBarPopoverButton";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import IconBase from "components/common/icons/IconBase";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";

function ActionBarTransferPipelineButton(
  {
    pipeline,
    loadPipeline,
  }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState(undefined);
  const [transferringPipeline, setTransferringPipeline] = useState(false);
  const {
    toastContext,
    cancelTokenSource,
    isMounted,
    isOpseraAdministrator,
    getAccessToken,
    isSaasUser,
  } = useComponentStateReference();

  useEffect(() => {
    if (isSaasUser !== true)
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    });
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
              <span className="pr-3"><IconBase icon={faShareAlt} className={"mr-2"}/>Transfer</span>
            </Button>
          </div>
          <div className="w-50 ml-1">
            <CancelButton size={"sm"} className={"w-100"} cancelFunction={() => document.body.click()} />
          </div>
        </div>
      </div>
    );

  if (isOpseraAdministrator !== true) {
    return null;
    // return (
      // <ActionBarPopoverButton
      //   className={"ml-3"}
      //   disabled={true}
      //   icon={faShareAlt}
      //   popoverText={`Transferring Pipelines to another Owner is available in the main Opsera offering.`}
      // />
    // );
  }

  if (
    isSaasUser !== false
    || pipeline == null
    || pipeline?.account == null
    || PipelineRoleHelper.canTransferPipelineOwnership(userData, pipeline) !== true) {
    return null;
  }

  return (
    <TooltipWrapper
      className={"owner-popover"}
      isLoading={isLoading}
      title={"Transfer Pipeline"}
      innerText={popoverContent}
      placement={"bottom"}
      trigger={["click"]}
    >
      <div>
        <ActionBarPopoverButton
          className={"ml-3"}
          disabled={isLoading}
          icon={faShareAlt}
          popoverText={`Transfer Pipeline to new Owner`}
        />
      </div>
    </TooltipWrapper>
  );
}

ActionBarTransferPipelineButton.propTypes = {
  pipeline: PropTypes.object,
  loadPipeline: PropTypes.func,
};

export default ActionBarTransferPipelineButton;