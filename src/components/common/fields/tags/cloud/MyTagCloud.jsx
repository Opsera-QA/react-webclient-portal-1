import React, {useContext, useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import {AuthContext} from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import axios from "axios";
import TagsCloudBase from "components/common/fields/tags/cloud/TagsCloudBase";
import Model from "core/data_model/model";
import tagEditorMetadata from "components/settings/tags/tags-metadata";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import TagUsagePanel from "components/settings/tags/tags_detail_view/TagUsagePanel";
import {DialogToastContext} from "contexts/DialogToastContext";

function MyTagCloud() {
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

  const clearOverlayPanel = () => {
    toastContext.clearOverlayPanel();
  };

  const showTagUsage = (tag) => {
    const tagModel = new Model(tag, tagEditorMetadata, false);

    toastContext.showOverlayPanel(
      <CenterOverlayContainer showPanel={true} objectType={tagEditorMetadata?.type} loadData={loadData} closePanel={clearOverlayPanel}>
        <TagUsagePanel tagData={tagModel} />
      </CenterOverlayContainer>
    );
  };

  const loadTags = async () => {
    const response = await adminTagsActions.getSubscribedTags( getAccessToken, cancelTokenSource);

    if (isMounted?.current === true && response?.data != null) {
      setTags(response?.data?.data);
    }
  };

  if (isLoading) {
    return <LoadingDialog message={"Loading Tag Subscriptions"} size={"sm"} />;
  }

  if (!isLoading && (tags == null || tags.length === 0)) {
    return (
      <div className="form-text text-muted ml-3">
        <div>
          <span><FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
          You are not currently subscribed to any tags</span>
        </div>
      </div>
    )
  }

  return (<TagsCloudBase tags={tags} onTagClick={showTagUsage} />);
}

MyTagCloud.propTypes = {};

export default MyTagCloud;