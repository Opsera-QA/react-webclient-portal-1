import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import gitlabTimeTakenToCompleteMergeRequestReviewMetadata from "./gitlab-time-taken-to-complete-merge-request-review-metadata";
import CustomTable from "../../../../../common/table/CustomTable";
import {getTableTextColumn, getTableDateTimeColumn, getExternalLinkIconColumnDefinition} from "../../../../../common/table/table-column-helpers";
import {getField} from "../../../../../common/metadata/metadata-helpers";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";
import FullScreenCenterOverlayContainer
from "../../../../../common/overlays/center/FullScreenCenterOverlayContainer";
import FilterContainer from "../../../../../common/table/FilterContainer";

function GitlabTimeTakenToCompleteMergeRequestReviewActionableOverlay({ metrics}) {
  const toastContext = useContext(DialogToastContext);

  const noDataMessage = "No data available";

  const fields = gitlabTimeTakenToCompleteMergeRequestReviewMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "AuthorName")),
      getTableTextColumn(getField(fields, "AssigneeName")),
      getTableTextColumn(getField(fields, "MergeRequestTitle")),
      getTableTextColumn(getField(fields, "MergeRequestTimeTaken")),
      getTableDateTimeColumn(getField(fields, "mrCompletionTimeTimeStamp")),
      getExternalLinkIconColumnDefinition(getField(fields, "repositoryUrl"), 'View'),
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
        title={'Time Taken To Complete Merge Request Review'}
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
      titleText={`Gitlab Time Taken To Complete Merge Request Review`}
      showToasts={true}
    >
      <div className={"p-3"}>
        {getBody()}
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

GitlabTimeTakenToCompleteMergeRequestReviewActionableOverlay.propTypes = {
  metrics: PropTypes.array,
};

export default GitlabTimeTakenToCompleteMergeRequestReviewActionableOverlay;