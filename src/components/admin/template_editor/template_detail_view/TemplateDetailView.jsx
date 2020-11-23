import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import LoadingDialog from "../../../common/status_notifications/loading";
import AccessDeniedDialog from "../../../common/status_notifications/accessDeniedInfo";
import Model from "../../../../core/data_model/model";
import templateEditorMetadata from "../template-form-fields";
import templateActions from "../template-actions";
import TemplateDetailPanel from "./TemplateDetailPanel";
import {faStream} from "@fortawesome/free-solid-svg-icons";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import DetailScreenContainer from "../../../common/panels/detail_view_container/DetailScreenContainer";
import ActionBarBackButton from "../../../common/actions/buttons/ActionBarBackButton";
import ActionBarShowJsonButton from "../../../common/actions/buttons/ActionBarShowJsonButton";
import ActionBarDeleteButton2 from "../../../common/actions/buttons/ActionBarDeleteButton2";
import ActionBarContainer from "../../../common/actions/ActionBarContainer";

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
    if (response.data != null && response.data.length > 0) {
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
          {accessRoleData.OpseraAdministrator === true
            && <span className={"mr-2"}><ActionBarDeleteButton2 relocationPath={"/admin/templates"} dataObject={templateData} handleDelete={deletePipeline}/></span>}
          {/*<ActionBarStatus status={templateData.getData("status")}/>*/}
        </div>
      </ActionBarContainer>
    );
  };

  const deletePipeline = () => {
    return templateActions.deleteTemplate(templateData, getAccessToken);
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  if (accessRoleData.OpseraAdministrator === false) {
    return (<AccessDeniedDialog roleData={accessRoleData} />);
  }

  return (
    <DetailScreenContainer
      breadcrumbDestination={"templateDetailView"}
      title={templateData != null ? `Template Details [${templateData.getData("name")}]` : undefined}
      managementViewLink={"/admin/templates"}
      type={"Pipeline Template"}
      managementTitle={"Template Management"}
      titleIcon={faStream}
      dataObject={templateData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={<TemplateDetailPanel setTemplateData={setTemplateData} templateData={templateData} />}
    />
  );
}

export default TemplateDetailView;