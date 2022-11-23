import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import { faPlus, faSearch, faHexagon } from "@fortawesome/pro-light-svg-icons";
import { format } from "date-fns";
import React, {useEffect, useState} from "react";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import FreeTrialPipelineWizard from "components/workflow/wizards/deploy/freetrialPipelineWizard";
import pipelineActions from "components/workflow/pipeline-actions";
import ModalActivityLogsDialog from "components/common/modal/modalActivityLogs";
import IconBase from "components/common/icons/IconBase";
import LoadingIcon from "components/common/icons/LoadingIcon";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import {pipelineCatalogHelper} from "components/workflow/catalog/pipelineCatalog.helper";
import {pipelineHelper} from "components/workflow/pipeline.helper";

const PipelineTemplateCatalogItem = ({ template, accessRoleData, activeTemplates }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [showFreeTrialModal, setShowFreeTrialModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [tempPipelineId, setTempPipelineId] = useState("");
  const {
    cancelTokenSource,
    isMounted,
    getAccessToken,
    isOpseraAdministrator,
  } = useComponentStateReference();

  useEffect(() => {
    // if (isOpseraAdministrator !== true && (template.readOnly || (template.singleUse === true && activeTemplates.includes(template?._id?.toString())))) {
      if (template.readOnly || (template.singleUse === true && activeTemplates.includes(template?._id?.toString()))) {
      setDisabled(true);
    }
  }, [template, activeTemplates]);

  const showPipelineDetails = () => {
    history.push(pipelineCatalogHelper.getDetailViewLink(template?._id));
    setShowModal(true);
  };

  const deployTemplate = async () => {
    try {
      setLoading(true);
      const result = await pipelineActions.deployTemplateV2(getAccessToken, cancelTokenSource, template?._id);
      const newPipelineId = result?.data?._id;

      if (isMongoDbId(newPipelineId) === true) {
        history.push(pipelineHelper.getDetailViewLink(newPipelineId));
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setLoading(false);
      }
    }
  };

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
      <Col className="col-6 d-flex flex-nowrap">
       <TooltipWrapper innerText={"Create a new Pipeline from this template"}>
        <Button variant="success" size="sm" className="mr-2 mt-2 text-nowrap" style={{minWidth: "128px", maxHeight: "34px"}} onClick={() => deployTemplate()}>            {loading ?
            <><LoadingIcon className={"mr-1"}/>Working</> :
            <><IconBase icon={faPlus} className={"d-xl-none mr-1"} />Create Pipeline </>
          }
        </Button>
      </TooltipWrapper>

      {accessRoleData.OpseraAdministrator &&
        <Button variant="outline-secondary" size="sm" className="mr-1 mt-2" style={{minWidth: "128px", maxHeight: "34px"}} onClick={() => showPipelineDetails()}>
          <IconBase icon={faSearch} className={"d-xl-none mr-1"}/>
             Details
        </Button>
      } 
      </Col>
    );
  };

  const getBody = () => {
    if (disabled) {
      return getDisabledBody();
    }

    return getEnabledBody();
  };

  const handleClose = async () => {
    setShowFreeTrialModal(false);
    await pipelineActions.deletePipelineV2(getAccessToken, cancelTokenSource, tempPipelineId?._id);
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
  };

  return (
    <>
      <Card style={{ height: "100%", opacity: template.readOnly ? ".5" : "1" }}>
        <Card.Title className="pb-0">
          <div className="d-flex catalog-card-title p-2">
            <div>
              {template.name}
            </div>
            <div className="ml-auto mr-1 text-muted small upper-case-first d-flex">
              <IconBase icon={faHexagon} size={"lg"}/>
            </div>
          </div>
        </Card.Title>
        <Card.Body className="pt-0 pb-2">
          <Row className="catalog-card-text">
            <Col lg={12}>
              <Card.Text className="mb-2">{template.description}</Card.Text>
            </Col>
          </Row>
          <Row className="d-flex">
            {getBody()}
            <Col className="col-6 pr-1">
              <div className="text-right">
                <div><small><span className="text-muted mr-1 pb-1">Updated:</span><span
                  className="text-nowrap">{template.updatedAt && format(new Date(template.updatedAt), "yyyy-MM-dd', 'hh:mm a")}</span></small>
                </div>
                <div><small><span className="text-muted mr-1 pb-1">Created:</span><span
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