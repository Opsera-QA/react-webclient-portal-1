import React, {useState, useEffect, useContext, useRef} from "react";
import { useParams } from "react-router-dom";
import Model from "core/data_model/model";
import templateActions from "components/admin/template_editor/template-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import templateEditorMetadata from "components/admin/template_editor/pipelineTemplate.metadata";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ActionBarShowJsonButton from "components/common/actions/buttons/ActionBarShowJsonButton";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import TemplateDetailPanel from "components/admin/template_editor/template_detail_view/TemplateDetailPanel";
import axios from "axios";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";

function TemplateDetailView() {
  const {templateId} = useParams();
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const [templateData, setTemplateData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

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
      await getRoles(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true && !error?.error?.message?.includes(404)) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (templateId != null && userRoleAccess?.OpseraAdministrator === true) {
        await getTemplate(cancelSource);
      }
    }
  };

  const getTemplate = async (cancelSource = cancelTokenSource) => {
    const response = await templateActions.getTemplateByIdV2(getAccessToken, cancelSource, templateId);
    // TODO: remove grabbing first when it only sends object instead of array
    if (isMounted?.current === true && response?.data?.length > 0) {
      setTemplateData(new Model(response.data[0], templateEditorMetadata, false));
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
            && <ActionBarDeleteButton2 relocationPath={"/admin/templates"} dataObject={templateData} handleDelete={deleteTemplate}/>}
        </div>
      </ActionBarContainer>
    );
  };

  const deleteTemplate = () => {
    return templateActions.deleteTemplateV2(getAccessToken, cancelTokenSource, templateData);
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"templateDetailView"}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.OPSERA_ADMINISTRATORS}
      dataObject={templateData}
      isLoading={isLoading}
      metadata={templateEditorMetadata}
      actionBar={getActionBar()}
      detailPanel={<TemplateDetailPanel setTemplateData={setTemplateData} templateData={templateData} />}
    />
  );
}

export default TemplateDetailView;