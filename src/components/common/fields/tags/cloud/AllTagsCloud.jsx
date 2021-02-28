import React, {useContext, useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import adminTagsActions from "components/settings/tags/admin-tags-actions";
import axios from "axios";
import Model from "core/data_model/model";
import tagEditorMetadata from "components/settings/tags/tags-metadata";
import CreateCenterPanel from "components/common/overlays/center/CreateCenterPanel";
import TagUsagePanel from "components/settings/tags/tags_detail_view/TagUsagePanel";
import TagsCloudBase from "components/common/fields/tags/cloud/TagsCloudBase";
import {getSingularOrPluralString} from "components/common/helpers/string-helpers";

function AllTagsCloud() {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [tags, setTags] = useState([]);
  const [subscribedTagIds, setSubscribedTagIds] = useState([]);
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

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true)
      await loadTags(cancelSource);
      await loadSubscribedTagIds(cancelSource);
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

  const loadTags = async (cancelSource = cancelTokenSource) => {
    const response = await adminTagsActions.getAllTagsV2(getAccessToken, cancelSource, undefined, true);

    let tags = response?.data?.data;

    if (isMounted?.current === true && tags != null) {
      setTags(tags.sort((tag1, tag2) => (tag1.total_usage_count < tag2.total_usage_count) ? 1 : -1));
    }
  };

  const loadSubscribedTagIds = async (cancelSource = cancelTokenSource) => {
    const response = await adminTagsActions.getSubscribedTagIds(getAccessToken, cancelSource);

    let subscribedIds = response?.data?.data;

    if (isMounted?.current === true && subscribedIds != null) {
      setSubscribedTagIds(subscribedIds.map((id) => {return id.object_id}));
    }
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

  const getTooltip = (tagWithUsage) => {
    const tag = tagWithUsage?.tag;
    const pipelineCount = tagWithUsage?.pipeline_usage_count;
    const toolCount = tagWithUsage?.tool_usage_count;
    const subscribeMessage = subscribedTagIds.includes(tag._id) ? "Click to Unsubscribe" : "Click to Subscribe";

    return (
      <div>
        <div>
          <span>
            Tag [{tag?.type}: {tag?.value}] is applied on
            <div><strong>{pipelineCount}</strong> {getSingularOrPluralString(pipelineCount, "Pipeline", "Pipelines")}</div>
            <div><strong>{toolCount}</strong> {getSingularOrPluralString(toolCount, "Tool", "Tools")}</div>
          </span>
        </div>
        <div>{subscribeMessage}</div>
      </div>
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
      <TagsCloudBase tagsWithUsage={tags} onTagClick={showTagUsage} getTooltip={getTooltip} subscribedTagIds={subscribedTagIds} />
    </div>
  );
}

AllTagsCloud.propTypes = {
  // dataObject: PropTypes.object,
};

export default AllTagsCloud;