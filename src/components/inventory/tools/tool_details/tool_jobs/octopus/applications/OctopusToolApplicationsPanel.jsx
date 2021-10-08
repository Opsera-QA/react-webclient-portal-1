import React, { useState } from "react";
import OctopusApplicationsTable from "./OctopusApplicationsTable";
import ExistingOctopusApplicationModal from "./OctopusApplicationModal";
import PropTypes from "prop-types";
import octopusApplicationsMetadata from "../octopus-environment-metadata";
import Model from "core/data_model/model";

function OctopusToolApplicationsPanel({ toolData, loadData, isLoading }) {
  const [octopusApplicationData, setOctopusApplicationData] = useState(undefined);
  const [showCreateOctopusApplicationModal, setShowCreateOctopusApplicationModal] = useState(false);
  const [applicationId, setApplicationID] = useState(undefined);

  const selectedJobRow = (rowData) => {
    let newDataObject = toolData.getData("actions")[rowData.index];
    setApplicationID(newDataObject._id);
    setOctopusApplicationData(
      new Model(toolData.getData("actions")[rowData.index].configuration, octopusApplicationsMetadata, false)
    );
    setShowCreateOctopusApplicationModal(true);
  };

  // TODO: Convert to overlay
  const getApplicationModel = () => {
    if (octopusApplicationData != null) {
      return (
        <ExistingOctopusApplicationModal
          type={octopusApplicationData.getData("type")}
          toolData={toolData}
          loadData={loadData}
          setShowModal={setShowCreateOctopusApplicationModal}
          octopusApplicationDataObj={octopusApplicationData}
          showModal={showCreateOctopusApplicationModal}
          appID={applicationId}
        />
      );
    }
  };

  return (
    <>
      <div>
        <OctopusApplicationsTable
          isLoading={isLoading}
          toolData={toolData}
          loadData={loadData}
          selectedRow={(rowData) => selectedJobRow(rowData)}
          octopusApplicationData={octopusApplicationData}
        />
      </div>
      {getApplicationModel()}
    </>
  );
}

OctopusToolApplicationsPanel.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};
export default OctopusToolApplicationsPanel;
