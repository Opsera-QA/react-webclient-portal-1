import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../../api/apiService";
import { Row, Col } from "react-bootstrap";
import ErrorDialog from "../../../../common/status_notifications/error";
import InfoDialog from "../../../../common/status_notifications/info";
import PipelineWorkflow from "./pipelineWorkflow";
import PipelineWorkflowEditor from "./pipelineWorkflowItemEditor";
import "../../../workflows.css";

function PipelineWorkflowView({ id }) {
  const [error, setErrors] = useState();
  const [data, setData] = useState({});
  const [editItem, setEditItem] = useState(false);

  /* Role based Access Controls */
  const { getAccessToken, getUserRecord, setAccessRoles } = useContext(AuthContext);
  const [customerAccessRules, setCustomerAccessRules] = useState({});



  useEffect(() => {
    console.log("refreshing root");
    initComponent();
  }, []);

  const initComponent = async () => {
    const userRecord = await getUserRecord(); //RBAC Logic
    const rules = await setAccessRoles(userRecord);
    setCustomerAccessRules(rules); //set rules

    await fetchData();
  }

  async function fetchData() {
    const accessToken = await getAccessToken();
    const apiUrl = `/pipelines/${id}`;
    try {
      const pipeline = await axiosApiService(accessToken).get(apiUrl);
      setData(pipeline && pipeline.data[0]);
    } catch (err) {
      console.log(err.message);
      setErrors(err.message);
    }
  }

  const fetchPlan = async (param) => {
    setEditItem(false);
    await fetchData();
    if (param) {
      setEditItem(param);
    }
  };

  const closeEditorPanel = () => {
    setEditItem(false);
  };

  if (error) {
    return (<ErrorDialog error={error}/>);
  } else {
    return (
      <>

        <div className="mt-1 workflow-view">
          {typeof (data) !== "undefined" ?
            <Row>
              <Col>
                <PipelineWorkflow pipeline={data} editItemId={editItem.step_id} fetchPlan={fetchPlan} customerAccessRules={customerAccessRules}/></Col>
              <Col md="auto">&nbsp;</Col>

              {editItem ?
                <Col xs lg="4" className="workflow-editor-panel p-3">
                  <PipelineWorkflowEditor editItem={editItem} pipeline={data} closeEditorPanel={closeEditorPanel}
                                          fetchPlan={fetchPlan}/></Col> : null}
            </Row> : null}

          {data.length === 0 &&
            <InfoDialog message="No Pipeline details found.  Please ensure you have access to view the requested pipeline."/>}

        </div>
      </>
    );
  }
}


PipelineWorkflowView.propTypes = {
  id: PropTypes.string,
};

export default PipelineWorkflowView;