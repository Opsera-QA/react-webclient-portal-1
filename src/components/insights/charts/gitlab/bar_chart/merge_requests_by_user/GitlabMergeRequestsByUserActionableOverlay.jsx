import React, { useContext, useMemo} from "react";
import PropTypes from "prop-types";
import gitlabMergeRequestsByUserMetadata from "./gitlab-merge-requests-by-user-metadata";
import CustomTable from "../../../../../common/table/CustomTable";
import {getTableTextColumn} from "../../../../../common/table/table-column-helpers";
import {getField} from "../../../../../common/metadata/metadata-helpers";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";
import FullScreenCenterOverlayContainer
  from "../../../../../common/overlays/center/FullScreenCenterOverlayContainer";
import FilterContainer from "../../../../../common/table/FilterContainer";

function GitlabMergeRequestsByUserActionableOverlay({ metrics}) {
  const toastContext = useContext(DialogToastContext);

  const noDataMessage = "No data available";

  const fields = gitlabMergeRequestsByUserMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "_id")),
      getTableTextColumn(getField(fields, "Merge Requests")),
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
        title={'Merge Requests By User'}
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
      titleText={`Gitlab Merge Requests By User`}
      showToasts={true}
    >
      <div className={"p-3"}>
        {getBody()}
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

GitlabMergeRequestsByUserActionableOverlay.propTypes = {
  metrics: PropTypes.array,
};

export default GitlabMergeRequestsByUserActionableOverlay;