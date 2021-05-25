import React, { useState, useContext, useEffect } from 'react';
import PropTypes from "prop-types";
import { RenderWorkflowItem } from "components/workflow/approvalModal";
import { Row, Col } from "react-bootstrap";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import filterMetadata from "components/workflow/wizards/sfdc_pipeline_wizard/filter-metadata";
import Model from "core/data_model/model";
import LoadingDialog from "components/common/status_notifications/loading";

const UnitTestClassesTabView = ({pipelineId, stepId, unitTestSteps, fromSFDC, fromDestinationSFDC}) => {    
    const { getAccessToken } = useContext(AuthContext);
    const toastContext = useContext(DialogToastContext);
    const [selectedStep, setSelectedStep] = useState({});
    const [selectedUnitTestClassesList, setSelectedUnitTestClassesList] = useState([]);
    const [unitTestListLoading, setUnitTestListLoading] = useState(false);    
    const [loading, setLoading] = useState(false);
    const [toolFilterDto, setToolFilterDto] = useState(new Model({...filterMetadata.newObjectFields}, filterMetadata, false));

    useEffect(() => {
        if(Object.keys(selectedStep).length > 0){
          setSelectedUnitTestClassesList([]);          
          getUnitTestList();
        }
      }, [selectedStep]);
    
      const getUnitTestList = async (filterDto = toolFilterDto) => {
        setUnitTestListLoading(true);
        try {
           let newFilterDto = filterDto;
           newFilterDto.setData("pageSize", 500);
           setToolFilterDto({...newFilterDto});
           
          const response = await sfdcPipelineActions.getListFromPipelineStorage({"sfdcToolId": selectedStep.tool.configuration.sfdcToolId, "pipelineId": pipelineId, "stepId": selectedStep._id, "dataType": "sfdc-unitTesting" }, filterDto , getAccessToken);
          
          if(!response.data.data || !response.data.paginatedData) {
            toastContext.showLoadingErrorDialog("something went wrong! not a valid object");
          }          
          // get the selected data if the same record is already present in mongo          
          setSelectedUnitTestClassesList( response.data.data.testClasses.filter((ele)=> response.data.paginatedData.selectedTestClasses.includes(ele)));
          
        } catch (error) {
          console.error("Error getting API Data: ", error);
          toastContext.showLoadingErrorDialog(error);
        } finally {
          setUnitTestListLoading(false);
        }
      };

    const handleStepClick = async (step) => {        
        let isSfdc = fromSFDC || fromDestinationSFDC ? true : false;
        await getTestClasses(step, isSfdc);
    };

    const getTestClasses = async(unitStep, isSfdc) => {
    
        setLoading(true);
        // call api to get test classes
        try {
          // const accessToken = await getAccessToken();
          const res = await sfdcPipelineActions.setTestClassesList({
            "sfdcToolId": unitStep.tool.configuration.sfdcToolId, 
            "pipelineId": pipelineId, 
            "stepId": unitStep._id, 
            "stepIdXML": stepId, 
            "isSfdc": isSfdc }, 
            getAccessToken);
          if (res.data.status != 200 ) {
            console.error("Error getting API Data: ", res.data.message);
            // TODO: Add a toast here
            toastContext.showLoadingErrorDialog(res.data.message);
            return;
          }
          setSelectedStep(unitStep);
        } catch (error) {
          console.error("Error getting API Data: ", error);
          toastContext.showLoadingErrorDialog(error);
        } finally {
          setLoading(false);
        }
    };

    return (
        <>
          <div className="flex-container-content mt-4">
            <div className="h5">SalesForce Pipeline Run: Unit Test Classes</div>
            <div className="d-flex m-3 justify-content-center">
                <Row>
                {unitTestSteps && unitTestSteps.map((step, idx) => {
                    return(
                    <Col key={idx}>
                        <div className="p-1" style={{cursor : loading ? "not-allowed" : "pointer"}} onClick={()=> loading ? null : handleStepClick(step)}>
                        <RenderWorkflowItem item={step} isSelected={selectedStep._id === step._id} stateColorClass="" />
                        </div>
                    </Col>
                    );
                })} 
                </Row>         
            </div>
            <div className="mx-4">
                <Row>
                  { loading || unitTestListLoading ? (
                  <LoadingDialog/>
                  ) : ( selectedUnitTestClassesList.map((utc, idx) => {                        
                        return (
                            <Col key={idx} className="col-md-4 mb-2">
                                <div>{utc}</div>
                            </Col>
                        );
                    })) }
                </Row>                
            </div>
          </div>
        </>
    );
};

UnitTestClassesTabView.propTypes = {
    pipelineId: PropTypes.string,
    stepId: PropTypes.string,
    unitTestSteps: PropTypes.array,
    fromSFDC: PropTypes.bool,
    fromDestinationSFDC: PropTypes.bool,    
};

export default UnitTestClassesTabView;