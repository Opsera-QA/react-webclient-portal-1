import React, { useState } from "react";
import ArgoApplicationsTable from "./ArgoApplicationsTable";
import ExistingArgoApplicationModal from "./ArgoApplicationModal";

import PropTypes from "prop-types";
import "components/inventory/tools/tools.css";
import argoApplicationsMetadata from "../argo-application-metadata";
import Model from "core/data_model/model";

function ArgoApplications({ toolData, loadData, isLoading }) {
  const [argoApplicationData, setArgoApplicationData] = useState(undefined);
  const [showCreateArgoApplicationModal, setShowCreateArgoApplicationModal] = useState(false);
  const [applcationID, setApplicationID] = useState(undefined);

  const selectedJobRow = (rowData) => {
    let newDataObject = toolData.getData("actions")[rowData.index];
    setApplicationID(newDataObject._id);
    setArgoApplicationData(
      new Model(toolData.getData("actions")[rowData.index].configuration, argoApplicationsMetadata, false)
    );
    setShowCreateArgoApplicationModal(true);
  };

  return (
    <>
      <div>
        <ArgoApplicationsTable
          isLoading={isLoading}
          toolData={toolData}
          loadData={loadData}
          selectedRow={(rowData) => selectedJobRow(rowData)}
          argoApplicationData={argoApplicationData}
        />
      </div>
      {argoApplicationData != null ? (
        <ExistingArgoApplicationModal
          toolData={toolData}
          loadData={loadData}
          setShowModal={setShowCreateArgoApplicationModal}
          argoApplicationDataObj={argoApplicationData}
          showModal={showCreateArgoApplicationModal}
          appID={applcationID}
        />
      ) : (
        ""
      )}
    </>
  );
}

ArgoApplications.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};
export default ArgoApplications;
