import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import {getTableDurationTextColumn, getTableTextColumn} from "../../../../../common/table/table-column-helpers";
import { getField } from "../../../../../common/metadata/metadata-helpers";
import { gitlabLeadTimeMetadata } from "./gitlabLeadTime.metadata";
import CustomTable from "../../../../../common/table/CustomTable";

function GitlabLeadTimeInsightsModal({ visible, onHide, data }) {
  const fields = gitlabLeadTimeMetadata.commitFields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "authorName")),
      getTableTextColumn(getField(fields, "branch")),
      getTableTextColumn(getField(fields, "commitTimeStamp")),
      getTableTextColumn(getField(fields, "commitTitle")),
      getTableDurationTextColumn(getField(fields, "leadTime")),
      getTableTextColumn(getField(fields, "repositoryUrl")),
      getTableTextColumn(getField(fields, "stepId")),
    ],
    [],
  );
  return (
    <>
      <Modal
        size="lg"
        show={visible}
        onHide={() => onHide()}
        className="tag-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Commits</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/*TODO Move this to separate component using static data pagination options*/}
          <CustomTable
            nextGeneration={true}
            columns={columns}
            data={data}
          />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

GitlabLeadTimeInsightsModal.propTypes = {
  visible: PropTypes.bool,
  onHide: PropTypes.func,
  onClick: PropTypes.func,
  data: PropTypes.array,
  setData: PropTypes.func,
};

export default GitlabLeadTimeInsightsModal;
