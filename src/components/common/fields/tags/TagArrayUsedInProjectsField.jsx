import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import {AuthContext} from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import TagsUsedInProjectsTable from "components/reports/tags/projects/TagsUsedInProjectsTable";
import axios from "axios";
import IconBase from "components/common/icons/IconBase";


function TagArrayUsedInProjectsField({ orgTags, tags }) {
  const { getAccessToken } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
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
  }, [orgTags, tags]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadProjects(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadProjects = async (cancelSource = cancelTokenSource) => {
    if (Array.isArray(tags) && Array.isArray(orgTags) && (tags.length > 0 || orgTags.length > 0)) {

      const allTags = [...tags];

      // grab only the tags from each to combine into tags
      orgTags.forEach(({ tags }) => {
        allTags.push(...tags);
      });

      const response = await adminTagsActions.getAllProjectsWithTags(getAccessToken, cancelSource, allTags);

      if (response?.data != null) {
        setProjects(response?.data?.data);
      }
    }
  };

  if (isLoading) {
    return <LoadingDialog message={"Loading Projects"} size={"sm"} />;
  }

  if (!isLoading && (tags == null || (tags.length === 0 && orgTags.length === 0))) {
    return null;
  }

  if (!isLoading && (projects == null || projects.length === 0)) {
    return (
      <div className="form-text text-muted ml-3">
        <div>
          <span><IconBase icon={faExclamationCircle} className={"text-muted mr-1"}/>
          This tag combination is not currently used in any project</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="form-text text-muted mb-2  ml-2">
        <span>This tag combination is used in {projects.length} projects</span>
      </div>
      <TagsUsedInProjectsTable data={projects} loadData={loadData} isLoading={isLoading} isMounted={isMounted}/>
    </div>
  );
}

TagArrayUsedInProjectsField.propTypes = {
  orgTags: PropTypes.array,
  tags: PropTypes.array,
  showTable: PropTypes.bool
};

export default TagArrayUsedInProjectsField;