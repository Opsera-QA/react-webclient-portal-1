import React, { useState, useEffect, useContext, useMemo } from "react";
import TagsSummaryPanel from "./TagsSummaryPanel";
import TagDetailPanel from "./TagDetailPanel";
import { Link, useParams } from "react-router-dom";
import adminTagsActions from "../admin-tags-actions";
import { AuthContext } from "../../../../contexts/AuthContext";
import ErrorDialog from "../../../common/status_notifications/error";
import BreadcrumbTrail from "../../../common/navigation/breadcrumbTrail";
import Model from "../../../../core/data_model/model";
import tagEditorMetadata from "../tags-form-fields";
import {faTags} from "@fortawesome/free-solid-svg-icons";
import DetailViewContainer from "../../../common/panels/detail_view_container/DetailViewContainer";
import {DialogToastContext} from "../../../../contexts/DialogToastContext";

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
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getTag = async (tagId) => {
      const response = await adminTagsActions.get(tagId, getAccessToken);
      setTagData(new Model(response.data, tagEditorMetadata, false));
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };

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