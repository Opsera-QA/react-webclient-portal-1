import React, { useState } from "react";
import OctopusApplicationsTable from "./OctopusApplicationsTable";
import ExistingOctopusApplicationModal from "./OctopusApplicationModal";
import PropTypes from "prop-types";
import octopusApplicationsMetadata from "../octopus-environment-metadata";
import Model from "core/data_model/model";

// TODO: Pass in applications
function OctopusToolApplicationsPanel({ toolData, loadData, isLoading }) {
  const [octopusApplicationData, setOctopusApplicationData] = useState(undefined);
  const [showCreateOctopusApplicationModal, setShowCreateOctopusApplicationModal] = useState(false);
  const [applicationId, setApplicationId] = useState(undefined);

  const selectedJobRow = (rowData) => {
    const currentApplications = toolData?.getData("actions");
    const applicationIndex = rowData?.index;

    if (Array.isArray(currentApplications) && currentApplications.length > 0 && typeof applicationIndex === "number") {
      const application = currentApplications[applicationIndex];
      const newApplicationModel =  new Model(application, octopusApplicationsMetadata, false);
      setApplicationId(application?._id);
      setOctopusApplicationData({...newApplicationModel});
      setShowCreateOctopusApplicationModal(true);
    }
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
          applications={toolData?.getData("actions")}
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
