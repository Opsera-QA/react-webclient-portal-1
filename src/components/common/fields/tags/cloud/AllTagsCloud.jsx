import React, {useContext, useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle, faTag} from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import axios from "axios";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import Model from "core/data_model/model";
import tagEditorMetadata from "components/settings/tags/tags-metadata";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import TagUsagePanel from "components/settings/tags/tags_detail_view/TagUsagePanel";

function AllTagsCloud() {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [tags, setTags] = useState([]);
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

  const loadData = async () => {
    try {
      setIsLoading(true)
      await loadTags();
    }
    catch (error) {
      if (isMounted.current === true) {
        console.error(error);
      }
    }
    finally {
      if (isMounted.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadTags = async () => {
    const response = await adminTagsActions.getAllTagsV2(getAccessToken, cancelTokenSource);

    if (isMounted?.current === true && response?.data != null) {
      setTags(response?.data?.data);
    }
  };

  const getTagCloud = () => {
    return (
      <Row className="item-field">
        {tags.map((tag) => {
          return (
            <span key={tag?._id} className="mx-1 mb-1 badge badge-light tag-badge pointer" onClick={() => {showTagUsage(tag)}}>
              <FontAwesomeIcon icon={faTag} fixedWidth className="mr-1"/>{`${capitalizeFirstLetter(tag?.type)}: ${tag?.value}`}
            </span>
          );
        })}
      </Row>
    );
  };

  const clearOverlayPanel = () => {
    toastContext.clearOverlayPanel();
  };

  const showTagUsage = (tag) => {
    const tagModel = new Model(tag, tagEditorMetadata, false);

    toastContext.showOverlayPanel(
      <CreateCenterPanel showPanel={true} objectType={tagEditorMetadata?.type} loadData={loadData} closePanel={clearOverlayPanel}>
        <TagUsagePanel tagData={tagModel} />
      </CreateCenterPanel>
    );
  };

  if (isLoading) {
    return <LoadingDialog message={"Loading Tags"} size={"sm"} />;
  }

  if (!isLoading && (tags == null || tags.length === 0)) {
    return (
      <div className="form-text text-muted ml-3">
        <div>
          <span><FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
          No Tags Found</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      {getTagCloud()}
    </div>
  );
}

AllTagsCloud.propTypes = {
  // dataObject: PropTypes.object,
};

export default AllTagsCloud;