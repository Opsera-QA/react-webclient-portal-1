import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Model from "core/data_model/model";
import templateActions from "components/admin/template_editor/template-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import templateEditorMetadata from "components/admin/template_editor/template-metadata";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ActionBarShowJsonButton from "components/common/actions/buttons/ActionBarShowJsonButton";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import TemplateDetailPanel from "components/admin/template_editor/template_detail_view/TemplateDetailPanel";

function TemplateDetailView() {
  const {templateId} = useParams();
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const [templateData, setTemplateData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles();
    }
    catch (error) {
      if (!error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const getTemplate = async (templateId) => {
    const response = await templateActions.getTemplateById(templateId, getAccessToken);
    // TODO: remove grabbing first when it only sends object instead of array
    if (response?.data?.length > 0) {
      setTemplateData(new Model(response.data[0], templateEditorMetadata, false));
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (userRoleAccess.OpseraAdministrator === true) {
        await getTemplate(templateId);
      }
    }
  };

  const getActionBar = () => {
    if (templateData == null) {
      return <></>;
    }

    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={"/admin/templates"} />
        </div>
        <div>
          <ActionBarShowJsonButton dataObject={templateData} />
          {accessRoleData?.OpseraAdministrator === true
            && <ActionBarDeleteButton2 relocationPath={"/admin/templates"} dataObject={templateData} handleDelete={deletePipeline}/>}
        </div>
      </ActionBarContainer>
    );
  };

  const deletePipeline = () => {
    return templateActions.deleteTemplate(templateData, getAccessToken);
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"templateDetailView"}
      accessDenied={!accessRoleData?.OpseraAdministrator}
      dataObject={templateData}
      isLoading={isLoading}
      metadata={templateEditorMetadata}
      actionBar={getActionBar()}
      detailPanel={<TemplateDetailPanel setTemplateData={setTemplateData} templateData={templateData} />}
    />
  );
}

export default TemplateDetailView;