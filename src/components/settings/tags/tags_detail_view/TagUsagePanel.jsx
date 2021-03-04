import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import DetailPanelContainer from "components/common/panels/detail_panel_container/DetailPanelContainer";
import SingleTagUsedInPipelinesField from "components/common/fields/tags/SingleTagUsedInPipelinesField";
import SingleTagUsedInToolsField from "components/common/fields/tags/SingleTagUsedInToolsField";

function TagUsagePanel({ tagData, closePanel }) {
  if (tagData == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <DetailPanelContainer>
      <SingleTagUsedInToolsField tag={tagData?.getPersistData()} closePanel={closePanel} />
      <SingleTagUsedInPipelinesField tag={tagData?.getPersistData()} closePanel={closePanel} />
    </DetailPanelContainer>
  );
}

TagUsagePanel.propTypes = {
  tagData: PropTypes.object,
  closePanel: PropTypes.func
};

export default TagUsagePanel;
