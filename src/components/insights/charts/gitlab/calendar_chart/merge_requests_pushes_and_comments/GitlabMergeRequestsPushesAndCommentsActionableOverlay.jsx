import React, { useContext, useMemo} from "react";
import PropTypes from "prop-types";
import gitlabMergeRequestsPushesAndCommentsMetadata from "./gitlab-merge-requests-pushes-and-comments-metadata";
import CustomTable from "../../../../../common/table/CustomTable";
import {getTableTextColumn} from "../../../../../common/table/table-column-helpers";
import {getField} from "../../../../../common/metadata/metadata-helpers";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";
import FullScreenCenterOverlayContainer
  from "../../../../../common/overlays/center/FullScreenCenterOverlayContainer";
import FilterContainer from "../../../../../common/table/FilterContainer";

function GitlabMergeRequestsPushesAndCommentsActionableOverlay({ metrics}) {
  const toastContext = useContext(DialogToastContext);

  const noDataMessage = "No data available";

  const fields = gitlabMergeRequestsPushesAndCommentsMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "day")),
      getTableTextColumn(getField(fields, "value")),
    ],
    []
  );

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearInfoOverlayPanel();
  };


  const getBody = () => {
    return (
      <FilterContainer
        title={'Merge Requests, Pushes and Comments'}
        body={getTable()}
        metadata={metrics}
      />
    );
  };

  const getTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={metrics}
        noDataMessage={noDataMessage}
      />
    );
  };

  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      showPanel={true}
      titleText={`Gitlab Merge Requests, Pushes and Comments`}
      showToasts={true}
    >
      <div className={"p-3"}>
        {getBody()}
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

GitlabMergeRequestsPushesAndCommentsActionableOverlay.propTypes = {
  metrics: PropTypes.array,
};

export default GitlabMergeRequestsPushesAndCommentsActionableOverlay;