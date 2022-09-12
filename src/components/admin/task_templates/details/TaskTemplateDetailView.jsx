import React, {useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import {DialogToastContext} from "contexts/DialogToastContext";
import templateEditorMetadata from "components/admin/pipeline_templates/pipelineTemplate.metadata";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ActionBarShowJsonButton from "components/common/actions/buttons/ActionBarShowJsonButton";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import TaskTemplateManagementSubNavigationBar
  from "components/admin/task_templates/TaskTemplateManagementSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";
import { taskTemplateActions } from "components/admin/task_templates/taskTemplate.actions";
import { taskTemplateMetadata } from "components/admin/task_templates/taskTemplate.metadata";
import modelHelpers from "components/common/model/modelHelpers";
import TaskTemplateDetailPanel from "components/admin/task_templates/details/TaskTemplateDetailPanel";

export default function TaskTemplateDetailView() {
  const {templateId} = useParams();
  const toastContext = useContext(DialogToastContext);
  const [templateModel, setTemplateModel] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const {
    isMounted,
    cancelTokenSource,
    isOpseraAdministrator,
    accessRoleData,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    if (isOpseraAdministrator === true) {
      loadData().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
  }
  }, [isOpseraAdministrator]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getTemplate();
    }
    catch (error) {
      if (isMounted?.current === true && !error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getTemplate = async () => {
    const response = await taskTemplateActions.getTemplateByIdV2(getAccessToken, cancelTokenSource, templateId);

    const template = response?.data?.data;
    if (isMounted?.current === true && template) {
      setTemplateModel({...modelHelpers.parseObjectIntoModel(template, taskTemplateMetadata)});
    }
  };

  const getActionBar = () => {
    if (templateModel == null) {
      return <></>;
    }

    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/admin/templates/tasks"} />
        </div>
        <div className={"d-flex"}>
          <ActionBarShowJsonButton dataObject={templateModel} />
          <ActionBarDeleteButton2
            relocationPath={"/admin/templates/tasks"}
            dataObject={templateModel}
            handleDelete={deleteTemplate}
          />
        </div>
      </ActionBarContainer>
    );
  };

  const deleteTemplate = async () => {
    return await taskTemplateActions.deleteTemplateV2(
      getAccessToken,
      cancelTokenSource,
      templateModel
    );
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"taskTemplateDetailView"}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      dataObject={templateModel}
      isLoading={isLoading}
      metadata={templateEditorMetadata}
      actionBar={getActionBar()}
      navigationTabContainer={
        <TaskTemplateManagementSubNavigationBar
          activeTab={"taskTemplateViewer"}
        />
      }
      detailPanel={
        <TaskTemplateDetailPanel
          setTemplateModel={setTemplateModel}
          templateModel={templateModel}
        />
      }
    />
  );
}