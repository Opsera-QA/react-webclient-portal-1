import React, { useState, useEffect, useContext, useMemo } from "react";
import TagsSummaryPanel from "./TagsSummaryPanel";
import PropTypes from "prop-types";
import TagDetailPanel from "./TagDetailPanel";
import { Link, useParams } from "react-router-dom";
import adminTagsActions from "../admin-tags-actions";
import { AuthContext } from "../../../../contexts/AuthContext";
import ErrorDialog from "../../../common/status_notifications/error";

function TagDetailView() {
  const { getUserRecord, getAccessToken, setAccessRoles } = useContext(AuthContext);
  const [accessRoleData, setAccessRoleData] = useState({});
  const [tagData, setTagData] = useState(undefined);
  const { id } = useParams();
  const [canDelete, setCanDelete] = useState(false);
  const [error, setError] = useState(false); //if any errors on API call or anything else need to be shown to use, this is used

  useEffect(() => {
    getTag(id);
    getRoles();
  }, []);

  const getTag = async (tagId) => {
    const response = await adminTagsActions.get(tagId, getAccessToken);
    setTagData(response.data.length > 0 ? response.data[0] : null);
  };

  const getRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
    }
  };


  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ backgroundColor: "#fafafb" }}>
          <li className="breadcrumb-item">
            <Link to="/admin">Admin</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/admin/tags">Tag Management</Link>
          </li>
          <li className="breadcrumb-item active">Tags</li>
        </ol>
      </nav>

      {/*TODO: Add isLoading pinwheel*/}
      {tagData &&
      <div className="content-container content-card-1 max-content-width ml-2">
        <div className="pt-2 pl-2 content-block-header"><h5>Tag Details [{tagData && tagData.key}]</h5></div>
        {error &&
        <div className="absolute-center-content"><ErrorDialog align="center" error={error.message}></ErrorDialog></div>}
        <div>
          <div>
            <div>
              <TagsSummaryPanel tagData={tagData}/>
            </div>
            <div>
              <TagDetailPanel
                setTagData={setTagData}
                tagData={tagData}
                canDelete={canDelete}/>
            </div>
          </div>
        </div>
        <div className="content-block-footer" />
      </div>
      }
    </>
  );
}

export default TagDetailView;