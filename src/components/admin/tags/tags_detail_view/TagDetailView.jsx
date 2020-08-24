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
  const [error, setErrors] = useState(false);

  useEffect(() => {
    getTag(id);
    getRoles();
  }, []);

  const getTag = async (tagId) => {
    try {
      const response = await adminTagsActions.get(tagId, getAccessToken);
      setTagData(response.data);
    } catch (e) {
      setErrors(e)
    }
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

      {error && <ErrorDialog error={error} align={"top"} setError={setErrors}/>}

      {tagData &&
      <div className="content-container content-card-1 max-content-width ml-2">
        <div className="pt-2 pl-2 content-block-header"><h5>Tag Details [{tagData && tagData.type}]</h5></div>

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