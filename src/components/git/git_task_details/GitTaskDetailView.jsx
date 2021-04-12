import React, {useState, useEffect, useContext, useRef} from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import GitTaskDetailPanel from "./GitTaskDetailPanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import Model from "core/data_model/model";
import {AuthContext} from "contexts/AuthContext";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import axios from "axios";
import gitTasksActions from "components/git/git-task-actions";
import gitTasksMetadata from "components/git/git-tasks-metadata";
import workflowAuthorizedActions
  from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";

function GitTaskDetailView() {
  const location = useLocation();
  const { id } = useParams();
  const { getAccessToken, getAccessRoleData } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [gitTasksData, setGitTasksData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [canDelete, setCanDelete] = useState(false);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getGitTaskData(cancelSource);
    }
    catch (error) {
      if (isMounted.current === true && !error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
    finally {
      if (isMounted.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getGitTaskData = async (cancelSource = cancelTokenSource) => {
    const response = await gitTasksActions.getGitTaskByIdV2(getAccessToken, cancelSource, id);
    const gitTask = response?.data?.data[0];

    if (isMounted.current === true && gitTask != null) {
      setGitTasksData(new Model(gitTask, gitTasksMetadata, false));
      const accessRoleData = await getAccessRoleData();
      setCanDelete(workflowAuthorizedActions.gitItems(accessRoleData, "delete-task", gitTask.owner, gitTask.roles));
    }
  };

  const deleteGitTask = async () => {
    return await gitTasksActions.deleteGitTaskV2(getAccessToken, cancelTokenSource, gitTasksData);
  };

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/git"} />
        </div>
        <div>
          {canDelete && <ActionBarDeleteButton2 relocationPath={"/git/"} handleDelete={deleteGitTask} dataObject={gitTasksData} />}
        </div>
      </ActionBarContainer>
    );
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"gitTasksDetailView"}
      metadata={gitTasksMetadata}
      dataObject={gitTasksData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={<GitTaskDetailPanel gitTasksData={gitTasksData} isLoading={isLoading} setGitTasksData={setGitTasksData} loadData={getGitTaskData} runTask={location?.state?.runTask} />}
    />
  );
}

export default GitTaskDetailView;