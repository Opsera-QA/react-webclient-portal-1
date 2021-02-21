import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import DetailPanelContainer from "components/common/panels/detail_panel_container/DetailPanelContainer";

function TagUsagePanel({ tagData }) {
  if (tagData == null) {
    return <LoadingDialog size="sm" />;
  }

  return (
    <DetailPanelContainer>
      {/*TODO: flush out tag usage after getting route from Divyesha. Should use same pipeline summary cards*/}
    </DetailPanelContainer>
  );
}

TagUsagePanel.propTypes = {
  tagData: PropTypes.object,
};

export default TagUsagePanel;
