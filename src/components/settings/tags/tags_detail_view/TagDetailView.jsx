import React, { useState, useEffect, useContext } from "react";
import TagDetailPanel from "./TagDetailPanel";
import { useParams } from "react-router-dom";
import adminTagsActions from "../admin-tags-actions";
import { AuthContext } from "../../../../contexts/AuthContext";
import Model from "../../../../core/data_model/model";
import tagEditorMetadata from "../tags-form-fields";
import {faTags} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import DetailScreenContainer from "../../../common/panels/detail_view_container/DetailScreenContainer";
import ActionBarContainer from "../../../common/actions/ActionBarContainer";
import ActionBarBackButton from "../../../common/actions/buttons/ActionBarBackButton";
import ActionBarToggleButton from "../../../common/actions/buttons/ActionBarToggleButton";

function TagDetailView() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const [tagData, setTagData] = useState(undefined);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRoles();
      await getTag(id);
    }
    catch (error) {
      if (!error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const getTag = async (tagId) => {
    const response = await adminTagsActions.get(tagId, getAccessToken);

    if (response != null && response.data != null) {
      setTagData(new Model(response.data, tagEditorMetadata, false));
    }
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };

  const getActionBar = () => {
    if (tagData != null) {
      return (
        <ActionBarContainer>
          <div>
            <ActionBarBackButton path={"/settings/tags"} />
          </div>
          <div>
            <ActionBarToggleButton handleActiveToggle={handleActiveToggle} status={tagData.getData("active")} />
          </div>
        </ActionBarContainer>
      );
    }
  };

  const handleActiveToggle = async () => {
    try {
      let newTagData = {...tagData};
      newTagData.setData("active", !newTagData.getData("active"));
      let response = await adminTagsActions.update({...newTagData}, getAccessToken);
      let updatedDto = new Model(response.data, tagData.metaData, false);
      setTagData(updatedDto);
      toastContext.showUpdateSuccessResultDialog(newTagData.getType());
    } catch (error) {
      toastContext.showLoadingErrorDialog(error.message);
      console.error(error.message);
    }
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"tagDetailView"}
      title={tagData != null ? `Tag Details [${tagData["type"]}]` : undefined}
      managementViewLink={"/settings/tags"}
      managementTitle={"Tag Management"}
      managementViewIcon={faTags}
      type={"Tag"}
      titleIcon={faTags}
      dataObject={tagData}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={<TagDetailPanel setTagData={setTagData} tagData={tagData} />}
    />
  );
}

export default TagDetailView;