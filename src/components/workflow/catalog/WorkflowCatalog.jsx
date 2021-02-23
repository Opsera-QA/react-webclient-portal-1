import React, {useContext, useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import WorkflowCatalogItem from "./WorkflowCatalogItem";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import pipelineActions from "components/workflow/pipeline-actions";
import LoadingDialog from "components/common/status_notifications/loading";
import ModalActivityLogsDialog from "components/common/modal/modalActivityLogs";
import FreeTrialPipelineWizard from "components/workflow/wizards/deploy/freetrialPipelineWizard";
import Model from "core/data_model/model";
import catalogFilterMetadata from "components/workflow/catalog/catalog-filter-metadata";
import TagFilter from "components/common/filters/tags/tag/TagFilter";
import CardView from "components/common/card/CardView";
import FilterContainer from "components/common/table/FilterContainer";
import {faOctagon} from "@fortawesome/pro-light-svg-icons";
import InlinePipelineTypeFilter from "components/common/filters/admin/templates/pipeline_type/InlinePipelineTypeFilter";
import axios from "axios";

function WorkflowCatalog() {
  const contextType = useContext(AuthContext);
  const { setAccessRoles, getAccessToken, getUserRecord } = contextType;
  const toastContext = useContext(DialogToastContext);
  const [workflowTemplates, setWorkflowTemplates] = useState([]);
  const [inUseIds, setInUseIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pipelineId, setPipelineId] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [showFreeTrialModal, setShowFreeTrialModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({});
  const [accessRoleData, setAccessRoleData] = useState(null);
  const [catalogFilterModel, setCatalogFilterModel] = useState(new Model({ ...catalogFilterMetadata.newObjectFields }, catalogFilterMetadata, false));
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setShowFreeTrialModal(false); // for testing its true - edit this to false while pushing
    setPipelineId(""); // for testing its set a value - set this to empty while pushing
    setTemplateId("");
    setShowModal(false);
    
    loadData(catalogFilterModel, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    }
  }, []);

  const loadData = async (filterModel = catalogFilterModel, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(filterModel, cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getRoles = async (filterModel = catalogFilterModel, cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);
      await loadWorkflowTemplates(filterModel, cancelSource);
      await loadInUseIds(cancelSource);
    }
  };

  const loadWorkflowTemplates = async (filterModel = catalogFilterModel, cancelSource = cancelTokenSource) => {
    const response = await pipelineActions.getWorkflowTemplatesV2(getAccessToken, cancelSource, filterModel);

    if (isMounted?.current === true && response?.data) {
      setWorkflowTemplates(response.data);
      let newFilterDto = filterModel;
      newFilterDto.setData("totalCount", response.data.length);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setCatalogFilterModel({ ...newFilterDto });
    }
  };

  const loadInUseIds = async (cancelSource = cancelTokenSource) => {
    const response = await pipelineActions.getInUseTemplatesV2(getAccessToken, cancelSource);

    if (isMounted?.current === true && response?.data) {
      setInUseIds(response.data);
    }
  };

  const callbackFunction = (item) => {
    setModalMessage(item);
    setShowModal(true);
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
    if (isLoading) {
      return (<LoadingDialog size="md" message="Loading pipeline template catalog"/>);
    }

    if (Array.isArray(workflowTemplates) && workflowTemplates.length > 0) {
      return (
        <Row className="p-1">
          {workflowTemplates.map((item, idx) => (
            <Col lg={6} xs={12} key={idx} className={"p-1"}>
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
  };

  const getDropdownFilters = () => {
    return (
        <TagFilter filterModel={catalogFilterModel} setFilterDto={setCatalogFilterModel} />
    );
  };

  const getInlineFilters = () => {
    return (
      <InlinePipelineTypeFilter isLoading={isLoading} loadData={loadData} filterModel={catalogFilterModel} setFilterModel={setCatalogFilterModel} className={"mr-2"} />
    );
  }

  const getWorkflowCardView = () => {
    return (
      <CardView
        isLoading={isLoading}
        loadData={loadData}
        setPaginationDto={setCatalogFilterModel}
        paginationDto={catalogFilterModel}
        cards={getWorkflowItems()}
        noDataMessage={"No Catalog Items Found"}
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
        filterDto={catalogFilterModel}
        setFilterDto={setCatalogFilterModel}
        supportSearch={true}
        isLoading={isLoading}
        body={getWorkflowCardView()}
        dropdownFilters={getDropdownFilters()}
        inlineFilters={getInlineFilters()}
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
