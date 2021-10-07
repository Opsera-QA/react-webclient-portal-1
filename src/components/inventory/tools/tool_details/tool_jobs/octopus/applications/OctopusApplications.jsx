import React, { useState } from "react";
import OctopusApplicationsTable from "./OctopusApplicationsTable";
import ExistingOctopusApplicationModal from "./OctopusApplicationModal";

import PropTypes from "prop-types";
import octopusApplicationsMetadata from "../octopus-environment-metadata";
import Model from "core/data_model/model";

function OctopusApplications({ toolData, loadData, isLoading }) {
  const [octopusApplicationData, setOctopusApplicationData] = useState(undefined);
  const [showCreateOctopusApplicationModal, setShowCreateOctopusApplicationModal] = useState(false);
  const [applcationID, setApplicationID] = useState(undefined);

  const selectedJobRow = (rowData) => {
    let newDataObject = toolData.getData("actions")[rowData.index];
    setApplicationID(newDataObject._id);
    setOctopusApplicationData(
      new Model(toolData.getData("actions")[rowData.index].configuration, octopusApplicationsMetadata, false)
    );
    setShowCreateOctopusApplicationModal(true);
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
      {octopusApplicationData != null ? (
        <ExistingOctopusApplicationModal
          type={octopusApplicationData.getData("type")}
          toolData={toolData}
          loadData={loadData}
          setShowModal={setShowCreateOctopusApplicationModal}
          octopusApplicationDataObj={octopusApplicationData}
          showModal={showCreateOctopusApplicationModal}
          appID={applcationID}
        />
      ) : (
        ""
      )}
    </>
  );
}

OctopusApplications.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};
export default OctopusApplications;
