import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle, faTag} from "@fortawesome/pro-light-svg-icons";
import {AuthContext} from "contexts/AuthContext";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import axios from "axios";
import TagsCloudBase from "components/common/fields/tags/cloud/TagsCloudBase";
import Model from "core/data_model/model";
import tagEditorMetadata from "components/settings/tags/tags-metadata";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import TagUsagePanel from "components/settings/tags/tags_detail_view/TagUsagePanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import {getSingularOrPluralString} from "components/common/helpers/string-helpers";
import LoadingIcon from "components/common/icons/LoadingIcon";
import TagSubscriptionManager from "components/user/user_settings/subscriptions/TagSubscriptionManager";

function MyTagCloud({className, showNoSubscriptionsMessage}) {
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
      await loadSubscribedTags();
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

  const loadSubscribedTags = async () => {
    const response = await adminTagsActions.getSubscribedTags( getAccessToken, cancelTokenSource);
    let tags = response?.data?.data;

    if (isMounted?.current === true && tags != null) {
      setTags(tags.sort((tag1, tag2) => (tag1.total_usage_count < tag2.total_usage_count) ? 1 : -1));
    }
  };

  const clearOverlayPanel = () => {
    toastContext.clearOverlayPanel();
  };

  const showTagUsage = (tag) => {
    const tagModel = new Model(tag, tagEditorMetadata, false);

    toastContext.showOverlayPanel(
      <CenterOverlayContainer
        showPanel={true}
        objectType={tagEditorMetadata?.type}
        loadData={loadData}
        closePanel={clearOverlayPanel}
        titleText={`[${tag?.type}: ${tag?.value}] Tag Usage`}
        titleIcon={faTag}
      >
        <TagUsagePanel tagData={tagModel} closePanel={clearOverlayPanel} />
      </CenterOverlayContainer>
    );
  };

  const getTooltip = (tagWithUsage) => {
    const tag = tagWithUsage?.tag;
    const pipelineCount = tagWithUsage?.pipeline_usage_count;
    const toolCount = tagWithUsage?.tool_usage_count;

    return (
      <div>
        <div>
          <span>
            Tag [{tag?.type}: {tag?.value}] is applied on
            <div><strong>{pipelineCount}</strong> {getSingularOrPluralString(pipelineCount, "Pipeline", "Pipelines")}</div>
            <div><strong>{toolCount}</strong> {getSingularOrPluralString(toolCount, "Tool", "Tools")}</div>
          </span>
        </div>
        <div>Click to view usage details</div>
      </div>
    );
  };

  const showTagSubscriptionManager = () => {
    toastContext.showOverlayPanel(<TagSubscriptionManager loadData={loadData} isMounted={isMounted} />);
  };

  const getBody = () => {
    if (isLoading) {
      return (<div><LoadingIcon isLoading={isLoading} />Loading Tag Subscriptions</div>);
    }

    if (Array.isArray(tags) && tags.length > 0) {
      return (
        <div>
          <span>You are currently subscribed to <strong>{tags.length}</strong> tags.</span>
          <TagsCloudBase tagsWithUsage={tags} onTagClick={showTagUsage} getTooltip={getTooltip} />
        </div>);
    }

    if (showNoSubscriptionsMessage) {
      return(
        <span>
          <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
          You are not currently subscribed to any tags
        </span>
      );
    }
  };

  return (
    <div className={className}>
      <div className="mb-2 item-field">
        {getBody()}
        {!isLoading && <div className={"m-1 badge badge-light filter-badge pointer"} onClick={() => {showTagSubscriptionManager()}}>Manage Tag Subscriptions</div>}
      </div>
    </div>
  );
}

MyTagCloud.propTypes = {
  className: PropTypes.string,
  showNoSubscriptionsMessage: PropTypes.bool
};

export default MyTagCloud;