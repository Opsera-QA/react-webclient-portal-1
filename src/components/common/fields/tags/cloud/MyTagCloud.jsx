import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle, faTag} from "@fortawesome/pro-light-svg-icons";
import {AuthContext} from "contexts/AuthContext";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import axios from "axios";
import TagsCloudBase from "components/common/fields/tags/cloud/TagsCloudBase";
import Model from "core/data_model/model";
import tagMetadata from "components/settings/tags/tag.metadata";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import TagUsagePanel from "components/settings/tags/tags_detail_view/TagUsagePanel";
import {DialogToastContext} from "contexts/DialogToastContext";
import {capitalizeFirstLetter, getSingularOrPluralString} from "components/common/helpers/string-helpers";
import LoadingIcon from "components/common/icons/LoadingIcon";
import TagSubscriptionManager from "components/user/user_settings/subscriptions/TagSubscriptionManager";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import TagSubscriptionIcon from "components/common/icons/subscription/TagSubscriptionIcon";

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
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadSubscribedTags(cancelSource);
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

  const loadSubscribedTags = async (cancelSource = cancelTokenSource) => {
    const response = await adminTagsActions.getSubscribedTags(getAccessToken, cancelSource);
    let tags = response?.data?.data;

    if (isMounted?.current === true && tags != null) {
      setTags(tags.sort((tag1, tag2) => (tag1.total_usage_count < tag2.total_usage_count) ? 1 : -1));
    }
  };

  const clearOverlayPanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getActionBar = (tagModel) => {
    if (tagModel != null) {
      return (
        <ActionBarContainer>
          <div />
          <TagSubscriptionIcon tagModel={tagModel} />
        </ActionBarContainer>
      );
    }
  };

  const showTagUsage = (tag) => {
    const tagModel = new Model(tag, tagMetadata, false);

    toastContext.showOverlayPanel(
      <CenterOverlayContainer
        showPanel={true}
        objectType={tagMetadata?.type}
        loadData={loadData}
        closePanel={clearOverlayPanel}
        titleText={`[${capitalizeFirstLetter(tag?.type)}: ${capitalizeFirstLetter(tag?.value)}] Tag Usage`}
        titleIcon={faTag}
        actionBar={getActionBar(tagModel)}
      >
        <TagUsagePanel tagData={tagModel} closePanel={clearOverlayPanel} />
      </CenterOverlayContainer>
    );
  };

  const getTooltip = (tagWithUsage) => {
    const tag = tagWithUsage?.tag;
    const pipelineCount = tagWithUsage?.pipeline_usage_count;
    const toolCount = tagWithUsage?.tool_usage_count;
    const dashboardCount = tagWithUsage?.dashboard_usage_count;

    return (
      <div>
        <div>
          <span>
            Tag [{capitalizeFirstLetter(tag?.type)}: {capitalizeFirstLetter(tag?.value)}] is applied on
            <div><strong>{pipelineCount}</strong> {getSingularOrPluralString(pipelineCount, "Pipeline", "Pipelines")}</div>
            <div><strong>{toolCount}</strong> {getSingularOrPluralString(toolCount, "Tool", "Tools")}</div>
            <div><strong>{dashboardCount}</strong> {getSingularOrPluralString(dashboardCount, "Dashboard", "Dashboards")}</div>
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
      return (<div><LoadingIcon isLoading={isLoading} className={"mr-2 my-auto"} />Loading subscriptions</div>);
    }

    if (Array.isArray(tags) && tags.length > 0) {
      return (
        <div>
          <div className={"mb-3"}>You are currently subscribed to <strong>{tags.length}</strong> tags.</div>
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
      <div className="mb-1 item-field">
        {getBody()}
        {!isLoading && <Button variant="outline-secondary" size="sm" onClick={() => {showTagSubscriptionManager();}}>
          <FontAwesomeIcon icon={faTag} fixedWidth className="mr-1"/> Tag Subscriptions</Button> }
      </div>
    </div>
  );
}

MyTagCloud.propTypes = {
  className: PropTypes.string,
  showNoSubscriptionsMessage: PropTypes.bool
};

export default MyTagCloud;