import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch, faHexagon } from "@fortawesome/pro-light-svg-icons";
import { format } from "date-fns";
import React, { useContext, useState } from "react";
import { axiosApiService } from "../../../api/apiService";
import { AuthContext } from "../../../contexts/AuthContext";

const WorkflowCatalogItem = ({ item, parentCallback, openFreeTrialWizard }) => {
  const contextType = useContext(AuthContext);
  const [error, setErrors] = useState();
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  const handleDetailsClick = param => e => {
    e.preventDefault();
    parentCallback(param);
  };

  const handleAddClick = param => e => {
    console.log("Adding: ", param);
    e.preventDefault();
    postData(param._id);
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
      
        if(!item.tags.some(el=> el.value === "freetrial") ) {
          history.push(`/workflow/details/${newPipelineId}/summary`);
        }
        openFreeTrialWizard(newPipelineId,templateId,"freetrial")
      }
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
      setErrors(err.message);
    }
  }

  return (
    <>
      <Card style={{ height: "100%" }}>
        <Card.Title className="pb-0">
          <div className="d-flex catalog-card-title p-2">
            <div>
              {item.name}
            </div>
            <div className="ml-auto mr-1 text-muted small upper-case-first d-none d-md-block">
              <FontAwesomeIcon icon={faHexagon}  size="lg"/>
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
            <Col>
              <Button variant="primary" size="sm" className="mr-2 mt-2" onClick={handleAddClick(item)}>
                <FontAwesomeIcon icon={faPlus} className="mr-1"/> Add</Button>
              <Button variant="outline-secondary" size="sm" className="mr-2 mt-2" onClick={handleDetailsClick(item)}>
                <FontAwesomeIcon icon={faSearch} className="mr-1"/>Details</Button>
            </Col>
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
};

export default WorkflowCatalogItem;