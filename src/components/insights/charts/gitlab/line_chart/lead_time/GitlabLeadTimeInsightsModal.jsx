import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import {getTableDurationTextColumn, getTableTextColumn} from "../../../../../common/table/table-column-helpers";
import { getField } from "../../../../../common/metadata/metadata-helpers";
import { gitlabLeadTimeMetadata } from "./gitlabLeadTime.metadata";
import CustomTable from "../../../../../common/table/CustomTable";

function GitlabLeadTimeInsightsModal({ visible, onHide, data }) {
  const fields = gitlabLeadTimeMetadata.commitFields;

  console.log("data", data);

  data = [{"authorName":"Suriya Prakash",
    "branch": "develop",
    "checkoutSha" :"b41f957297e7ea9bd80348f59ba40a0a734e7f74",
    "commitTimeStamp":"2022-12-22T12:02:56.000Z",
    "commitTitle":"test data 2",
    "leadTime":"1.85",
    "repositoryName":"gitlab-pipelines",
    "repositoryUrl":"https://gitlab.com/gitlab-suriya/gitlab-pipelines",
    "stepId":3513455955}];

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
