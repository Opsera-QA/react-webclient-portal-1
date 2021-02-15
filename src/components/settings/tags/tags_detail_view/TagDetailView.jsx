import React, {useState, useEffect, useContext, useRef} from "react";
import { useParams } from "react-router-dom";
import {AuthContext} from "contexts/AuthContext";
import Model from "core/data_model/model";
import {DialogToastContext} from "contexts/DialogToastContext";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import tagEditorMetadata from "components/settings/tags/tags-metadata";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import TagDetailPanel from "components/settings/tags/tags_detail_view/TagDetailPanel";
import axios from "axios";
import {meetsRequirements, ROLE_LEVELS} from "components/common/helpers/role-helpers";

function TagDetailView() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const [tagData, setTagData] = useState(undefined);
  const { id } = useParams();
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
    }
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(cancelSource);
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

  const getTag = async (cancelSource = cancelTokenSource) => {
    const response = await adminTagsActions.getTag(getAccessToken, cancelSource, id);

    if (isMounted.current === true && response?.data) {
      setTagData(new Model(response.data, tagEditorMetadata, false));
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (isMounted.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (meetsRequirements(ROLE_LEVELS.POWER_USERS_AND_SASS, userRoleAccess) && id) {
        await getTag(cancelSource);
      }
    }
  };

  const getActionBar = () => {
    if (tagData != null) {
      return (
        <ActionBarContainer>
          <div>
            <ActionBarBackButton path={"/settings/tags"} />
          </div>
        </ActionBarContainer>
      );
    }
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"tagDetailView"}
      title={`Tag Details ${tagData ? `[${tagData.type}]` : null}`}
      metadata={tagEditorMetadata}
      roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
      accessRoleData={accessRoleData}
      dataObject={tagData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={<TagDetailPanel setTagData={setTagData} tagData={tagData} />}
    />
  );
}

export default TagDetailView;