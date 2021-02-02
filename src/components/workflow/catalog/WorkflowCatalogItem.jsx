import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch, faHexagon, faSpinner } from "@fortawesome/pro-light-svg-icons";
import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { axiosApiService } from "../../../api/apiService";
import { AuthContext } from "../../../contexts/AuthContext";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";

const WorkflowCatalogItem = ({ item, parentCallback, openFreeTrialWizard, accessRoleData, activeTemplates }) => {
  const contextType = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  let history = useHistory();


  useEffect(() => {
    setDisabled(false)

    if (item.readOnly) {
      setDisabled(true);
      return;
    }

    if (item.singleUse === true) {
      if (activeTemplates.includes(item._id.toString())) {
        setDisabled(true);
        return;
      }
    }


  }, [JSON.stringify(item)]);


  const handleDetailsClick = param => e => {
    e.preventDefault();
    parentCallback(param);
  };

  const handleAddClick = param => async e => {
    e.preventDefault();
    await postData(param._id);
  };

  async function postData(templateId) {
    setLoading(true);
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = `/pipelines/deploy/${templateId}`;
    const params = {};
    try {
      const result = await axiosApiService(accessToken).post(apiUrl, params);
      let newPipelineId = result.data !== undefined ? result.data._id : false;
      if (newPipelineId) {
        // check if its a free trial and then proceed
        // if (!item.tags.some(el => el.value === "freetrial")) {
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

  return (
    <>
      <Card style={{ height: "100%", opacity: item.readOnly ? ".5" : "1" }}>
        <Card.Title className="pb-0">
          <div className="d-flex catalog-card-title p-2">
            <div>
              {item.name}
            </div>
            <div className="ml-auto mr-1 text-muted small upper-case-first d-none d-md-block">
              <FontAwesomeIcon icon={faHexagon} size="lg"/>
            </div>
          </div>
        </Card.Title>
        <Card.Body className="pt-0 pb-2">
          <Row className="catalog-card-text">
            <Col lg={12}>
              <Card.Text className="mb-2">{item.description}</Card.Text>
            </Col>
          </Row>
          <Row>

            {disabled &&
            <Col>
              { item.readOnly &&
              <div className="info-text">Not available for use at this time.</div>
              }
              { item.singleUse &&
              <div className="info-text">Already in use as a pipeline.</div>
              }
            </Col>}

            {!disabled &&
            <Col>
              <TooltipWrapper innerText={"Create a new pipeline from this template"}>
                <Button variant="success" size="sm" className="mr-2 mt-2"
                        onClick={handleAddClick(item)}>
                  {loading ?
                    <><FontAwesomeIcon icon={faSpinner} spin fixedWidth/> Working</> :
                    <><FontAwesomeIcon icon={faPlus} fixedWidth/> Create Pipeline</>
                  }
                </Button>

              </TooltipWrapper>

              {accessRoleData.OpseraAdministrator &&
              <Button variant="outline-secondary" size="sm" className="mr-2 mt-2" onClick={handleDetailsClick(item)}>
                <FontAwesomeIcon icon={faSearch} className="mr-1"/>Details</Button>
              }
            </Col>
            }


            <Col>
              <div className="text-right">
                <div><small><span className="text-muted mr-2 pb-1">Updated:</span><span
                  className="">{item.updatedAt && format(new Date(item.updatedAt), "yyyy-MM-dd', 'hh:mm a")}</span></small>
                </div>
                <div><small><span className="text-muted mr-2 pb-1">Created:</span><span
                  className="">{item.updatedAt && format(new Date(item.createdAt), "yyyy-MM-dd', 'hh:mm a")}</span></small>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer/>
      </Card>
    </>
  );
};

WorkflowCatalogItem.propTypes = {
  item: PropTypes.object,
  parentCallback: PropTypes.func,
  openFreeTrialWizard: PropTypes.func,
  accessRoleData: PropTypes.object,
  activeTemplates: PropTypes.array,
};

export default WorkflowCatalogItem;