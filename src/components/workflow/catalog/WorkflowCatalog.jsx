import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import WorkflowCatalogItem from "./WorkflowCatalogItem";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import pipelineActions from "components/workflow/pipeline-actions";
import InformationDialog from "components/common/status_notifications/info";
import LoadingDialog from "components/common/status_notifications/loading";
import ModalActivityLogsDialog from "components/common/modal/modalActivityLogs";
import FreeTrialPipelineWizard from "components/workflow/wizards/deploy/freetrialPipelineWizard";
import Model from "core/data_model/model";
import catalogFilterMetadata from "components/workflow/catalog/catalog-filter-metadata";
import TagFilter from "components/common/filters/tags/TagFilter";
import PipelineTypeFilter from "components/common/filters/admin/templates/PipelineTypeFilter";
import CardView from "components/common/card/CardView";
import FilterContainer from "components/common/table/FilterContainer";
import {faOctagon, faTools} from "@fortawesome/pro-light-svg-icons";

function WorkflowCatalog() {
  const contextType = useContext(AuthContext);
  const { setAccessRoles, getAccessToken, getUserRecord } = contextType;
  const toastContext = useContext(DialogToastContext);
  const [workflowTemplates, setWorkflowTemplates] = useState([]);
  const [inUseIds, setInUseIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pipelineId, setPipelineId] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [showFreeTrialModal, setShowFreeTrialModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});
  const [accessRoleData, setAccessRoleData] = useState(null);
  const [catalogFilterDto, setCatalogFilterDto] = useState(new Model({ ...catalogFilterMetadata.newObjectFields }, catalogFilterMetadata, false));

  const callbackFunction = (item) => {
    setModalMessage(item);
    setShowModal(true);
  };

  useEffect(() => {
    setShowFreeTrialModal(false); // for testing its true - edit this to false while pushing
    setPipelineId(""); // for testing its set a value - set this to empty while pushing
    setTemplateId("");
    setShowModal(false);
    loadData();
  }, []);


  const loadData = async (newCatalogFilterDto = catalogFilterDto) => {
    try {
      setLoading(true);
      await loadRoles();
      await loadWorkflowTemplates(newCatalogFilterDto);
      await loadInUseIds();
    } catch (error) {
      toastContext.showSystemErrorBanner(error);
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadRoles = async () => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);
    setAccessRoleData(userRoleAccess);
  };

  const loadWorkflowTemplates = async (newCatalogFilterDto = catalogFilterDto) => {
    const response = await pipelineActions.getWorkflowTemplates(newCatalogFilterDto, getAccessToken);

    if (response?.data) {
      setWorkflowTemplates(response.data);
      let newFilterDto = newCatalogFilterDto;
      newFilterDto.setData("totalCount", response.data.length);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setCatalogFilterDto({ ...newFilterDto });
    }
  };

  const loadInUseIds = async () => {
    const response = await pipelineActions.getInUseTemplates(getAccessToken);

    if (response?.data) {
      setInUseIds(response.data);
    }
  };

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

  const handleClose = async () => {
    setShowFreeTrialModal(false);
    await pipelineActions.delete(pipelineId, getAccessToken);
    setPipelineId("");
    setTemplateId("");
  };

  // TODO: Make workflowCardView
  const getWorkflowItems = () => {
    if (loading) {
      return (<LoadingDialog size="md" message="Loading pipeline template catalog"/>);
    }

    if (Array.isArray(workflowTemplates) && workflowTemplates.length > 0) {
      return (
        <Row className="p-1">
          {workflowTemplates.map((item, idx) => (
            <Col xl={6} md={12} key={idx} className={"p-1"}>
              <WorkflowCatalogItem
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

    return (<InformationDialog message="No Catalog Items Found"/>);
  };

  const getDropdownFilters = () => {
    return (
      <>
        <TagFilter filterDto={catalogFilterDto} setFilterDto={setCatalogFilterDto} className={"mb-2"} />
        <PipelineTypeFilter filterDto={catalogFilterDto} setFilterDto={setCatalogFilterDto}/>
      </>
    );
  };

  const getWorkflowCardView = () => {
    return (
      <CardView
        isLoading={loading}
        loadData={loadData}
        setPaginationDto={setCatalogFilterDto}
        paginationDto={catalogFilterDto}
        cards={getWorkflowItems()}
      />
    );
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

  return (
    <div className="px-2 pb-2">
      <FilterContainer
        loadData={loadData}
        filterDto={catalogFilterDto}
        setFilterDto={setCatalogFilterDto}
        supportSearch={true}
        isLoading={loading}
        body={getWorkflowCardView()}
        dropdownFilters={getDropdownFilters()}
        titleIcon={faOctagon}
        title={"Pipeline Templates"}
      />
      <ModalActivityLogsDialog
        header="Template Details" size="lg" jsonData={modalMessage} show={showModal}
        setParentVisibility={setShowModal}
      />
      {getFreeTrialModal()}
    </div>
  );
}

WorkflowCatalog.propTypes = {
  data: PropTypes.array,
};

export default WorkflowCatalog;
