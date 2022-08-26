import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import gitlabTotalCommitsByProjectMetadata from "./gitlab-total-commits-by-project-metadata";
import CustomTable from "../../../../../common/table/CustomTable";
import {getTableTextColumn} from "../../../../../common/table/table-column-helpers";
import {getField} from "../../../../../common/metadata/metadata-helpers";
import {DialogToastContext} from "../../../../../../contexts/DialogToastContext";
import FullScreenCenterOverlayContainer
  from "../../../../../common/overlays/center/FullScreenCenterOverlayContainer";
import FilterContainer from "../../../../../common/table/FilterContainer";

function GitlabTotalCommitsByProjectActionableOverlay({ metrics}) {
  const toastContext = useContext(DialogToastContext);

  const noDataMessage = "No data available";

  const fields = gitlabTotalCommitsByProjectMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "_id")),
      getTableTextColumn(getField(fields, "commits")),
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
        title={'Total Commits By Project'}
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
      titleText={`Gitlab Total Commits By Project`}
      showToasts={true}
    >
      <div className={"p-3"}>
        {getBody()}
      </div>
    </FullScreenCenterOverlayContainer>
  );
}

GitlabTotalCommitsByProjectActionableOverlay.propTypes = {
  metrics: PropTypes.array,
};

export default GitlabTotalCommitsByProjectActionableOverlay;