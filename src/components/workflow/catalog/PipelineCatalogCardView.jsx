import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import {Col} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import CardView from "components/common/card/CardView";
import PipelineCatalogItem from "components/workflow/catalog/PipelineCatalogItem";
import FreeTrialPipelineWizard from "components/workflow/wizards/deploy/freetrialPipelineWizard";
import pipelineActions from "components/workflow/pipeline-actions";
import ModalActivityLogsDialog from "components/common/modal/modalActivityLogs";
import {AuthContext} from "contexts/AuthContext";

function PipelineCatalogCardView({ data, catalogFilterModel, setCatalogFilterModel, loadData, isLoading, accessRoleData, inUseIds }) {
  const { setAccessRoles, getAccessToken, getUserRecord } = useContext(AuthContext);
  const [pipelineId, setPipelineId] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [showFreeTrialModal, setShowFreeTrialModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(undefined);

  const callbackFunction = (item) => {
    setModalMessage(item);
    setShowModal(true);
  };

  // TODO: Wire up cancel token
  const handleClose = async () => {
    setShowFreeTrialModal(false);
    await pipelineActions.delete(pipelineId, getAccessToken);
    setPipelineId("");
    setTemplateId("");
  };

  const getFreeTrialModal = () => {
    if (showFreeTrialModal) {
      return (
        <FreeTrialPipelineWizard
          pipelineId={pipelineId}
          templateId={templateId}
          pipelineOrientation={""}
          autoRun={false}
          handleClose={handleClose}
        />
      );
    }
  }

  const openFreeTrialWizard = (pipelineId, templateId, templateType) => {
    if (!pipelineId) {
      setTemplateId("");
      setShowFreeTrialModal(false);
      return;
    }
    setPipelineId(pipelineId);
    setTemplateId(templateId);
    setShowFreeTrialModal(true);
  };

  const getCards = () => {
    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }


    return (
      <Row className="p-1">
        {data.map((item, idx) => (
          <Col lg={6} xs={12} key={idx} className={"p-1"}>
            <PipelineCatalogItem
              item={item}
              parentCallback={callbackFunction}
              openFreeTrialWizard={openFreeTrialWizard}
              accessRoleData={accessRoleData}
              activeTemplates={inUseIds}
            />
          </Col>))}
      </Row>
    );
  }

  return (
    <>
      <CardView
        isLoading={isLoading}
        loadData={loadData}
        setPaginationDto={setCatalogFilterModel}
        paginationDto={catalogFilterModel}
        cards={getCards()}
        noDataMessage={"No Catalog Items Found"}
      />
      {getFreeTrialModal()}
      <ModalActivityLogsDialog header="Template Details" size="lg" jsonData={modalMessage} show={showModal} setParentVisibility={setShowModal} />
    </>
  );
}

PipelineCatalogCardView.propTypes = {
  data: PropTypes.array,
  catalogFilterModel: PropTypes.object,
  setCatalogFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  accessRoleData: PropTypes.object,
  inUseIds: PropTypes.array
};

export default PipelineCatalogCardView;