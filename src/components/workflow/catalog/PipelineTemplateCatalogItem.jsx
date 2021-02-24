import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch, faHexagon, faSpinner } from "@fortawesome/pro-light-svg-icons";
import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import {AuthContext} from "contexts/AuthContext";
import {axiosApiService} from "api/apiService";
import FreeTrialPipelineWizard from "components/workflow/wizards/deploy/freetrialPipelineWizard";
import pipelineActions from "components/workflow/pipeline-actions";
import ModalActivityLogsDialog from "components/common/modal/modalActivityLogs";

const PipelineTemplateCatalogItem = ({ template, accessRoleData, activeTemplates }) => {
  const { getAccessToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showFreeTrialModal, setShowFreeTrialModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tempPipelineId, setTempPipelineId] = useState("");
  let history = useHistory();

  useEffect(() => {
    if (template.readOnly || (template.singleUse === true && activeTemplates.includes(template?._id?.toString()))) {
      setDisabled(true);
    }
  }, [template, activeTemplates]);

  const showPipelineDetails = () => e => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleAddClick = param => async e => {
    e.preventDefault();
    await postData(param._id);
  };

  // TODO: Wire up CancelToken
  async function postData(templateId) {
    setLoading(true);
    const accessToken = await getAccessToken();
    const apiUrl = `/pipelines/deploy/${templateId}`;
    const params = {};
    try {
      const result = await axiosApiService(accessToken).post(apiUrl, params);
      let newPipelineId = result.data !== undefined ? result.data._id : false;
      if (newPipelineId) {
        // check if its a free trial and then proceed
        // if (!template.tags.some(el => el.value === "freetrial")) {
          history.push(`/workflow/details/${newPipelineId}/summary`);
        // }
        // openFreeTrialWizard(newPipelineId, templateId, "freetrial");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  const getDisabledBody = () => {
    if (template?.readOnly) {
      return (
        <Col>
          <div className="info-text">Not available for use at this time.</div>
        </Col>
      );
    }

    if (template?.singleUse) {
      return (
        <Col>
          <div className="info-text">Already in use as a pipeline.</div>
        </Col>
      );
    }
  };

  const getEnabledBody = () => {
    return (
      <Col>
        <TooltipWrapper innerText={"Create a new template from this template"}>
          <Button variant="success" size="sm" className="mr-2 mt-2" onClick={handleAddClick(template)}>
            {loading ?
              <><FontAwesomeIcon icon={faSpinner} spin fixedWidth/> Working</> :
              <><FontAwesomeIcon icon={faPlus} fixedWidth/> Create Pipeline</>
            }
          </Button>

        </TooltipWrapper>

        {accessRoleData.OpseraAdministrator &&
        <Button variant="outline-secondary" size="sm" className="mr-2 mt-2" onClick={showPipelineDetails(template)}>
          <FontAwesomeIcon icon={faSearch} className="mr-1"/>Details</Button>
        }
      </Col>
    );
  };

  const getBody = () => {
    if (disabled) {
      return getDisabledBody();
    }

    return getEnabledBody()
  };

  // TODO: Wire up cancel token
  const handleClose = async () => {
    setShowFreeTrialModal(false);
    await pipelineActions.delete(tempPipelineId?._id, getAccessToken);
    setTempPipelineId("");
  };


  const getFreeTrialModal = () => {
    if (showFreeTrialModal) {
      return (
        <FreeTrialPipelineWizard
          pipelineId={tempPipelineId}
          templateId={template?._id}
          pipelineOrientation={""}
          autoRun={false}
          handleClose={handleClose}
        />
      );
    }
  }

  const openFreeTrialWizard = (pipelineId, templateType) => {
    if (!pipelineId) {
      setShowFreeTrialModal(false);
      return;
    }

    setTempPipelineId(pipelineId);
    setShowFreeTrialModal(true);
  };

  return (
    <>
      <Card style={{ height: "100%", opacity: template.readOnly ? ".5" : "1" }}>
        <Card.Title className="pb-0">
          <div className="d-flex catalog-card-title p-2">
            <div>
              {template.name}
            </div>
            <div className="ml-auto mr-1 text-muted small upper-case-first d-none d-md-block">
              <FontAwesomeIcon icon={faHexagon} size="lg"/>
            </div>
          </div>
        </Card.Title>
        <Card.Body className="pt-0 pb-2">
          <Row className="catalog-card-text">
            <Col lg={12}>
              <Card.Text className="mb-2">{template.description}</Card.Text>
            </Col>
          </Row>
          <Row>
            {getBody()}
            <Col>
              <div className="text-right">
                <div><small><span className="text-muted mr-2 pb-1">Updated:</span><span
                  className="">{template.updatedAt && format(new Date(template.updatedAt), "yyyy-MM-dd', 'hh:mm a")}</span></small>
                </div>
                <div><small><span className="text-muted mr-2 pb-1">Created:</span><span
                  className="">{template.updatedAt && format(new Date(template.createdAt), "yyyy-MM-dd', 'hh:mm a")}</span></small>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer/>
      </Card>
      {getFreeTrialModal()}
      <ModalActivityLogsDialog header="Template Details" size="lg" jsonData={template} show={showModal} setParentVisibility={setShowModal} />
    </>
  );
};

PipelineTemplateCatalogItem.propTypes = {
  template: PropTypes.object,
  parentCallback: PropTypes.func,
  openFreeTrialWizard: PropTypes.func,
  accessRoleData: PropTypes.object,
  activeTemplates: PropTypes.array,
};

export default PipelineTemplateCatalogItem;