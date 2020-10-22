import React, { useState, useEffect, useContext } from "react";
import TagsSummaryPanel from "./TagsSummaryPanel";
import TagDetailPanel from "./TagDetailPanel";
import { useParams } from "react-router-dom";
import adminTagsActions from "../admin-tags-actions";
import { AuthContext } from "../../../../contexts/AuthContext";
import Model from "../../../../core/data_model/model";
import tagEditorMetadata from "../tags-form-fields";
import {faTags} from "@fortawesome/free-solid-svg-icons";
import DetailViewContainer from "../../../common/panels/detail_view_container/DetailViewContainer";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";
import DataNotFoundContainer from "../../../common/panels/detail_view_container/DataNotFoundContainer";
import DataNotFoundDialog from "../../../common/status_notifications/data_not_found/DataNotFoundDialog";

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
      if (!error.error.message.includes(404)) {
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

  if (!isLoading && tagData == null) {
    return (
      <DataNotFoundContainer type={"Tag"} breadcrumbDestination={"tagDetailView"}>
        <DataNotFoundDialog type={"Tag"} managementViewIcon={faTags} managementViewTitle={"Tag Management"} managementViewLink={"/settings/tags"} />
      </DataNotFoundContainer>
    )
  }


  return (
    <DetailViewContainer
      breadcrumbDestination={"tagDetailView"}
      title={tagData != null ? `Tag Details [${tagData["type"]}]` : undefined}
      titleIcon={faTags}
      isLoading={isLoading}
      summaryPanel={<TagsSummaryPanel tagData={tagData} setTagData={setTagData} />}
      detailPanel={<TagDetailPanel setTagData={setTagData} tagData={tagData} />}
    />
  );
}

export default TagDetailView;