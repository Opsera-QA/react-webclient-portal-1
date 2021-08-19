import React, {useState, useContext, useEffect, useRef} from "react";
import {Form, Button} from "react-bootstrap";
import {AuthContext} from "contexts/AuthContext";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import LoadingDialog from "components/common/status_notifications/loading";
import {faCheck} from "@fortawesome/pro-light-svg-icons";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import IconBase from "components/common/icons/IconBase";
import {commonItems, CSVtoArray, differentItems} from "components/common/helpers/array-helpers";
import axios from "axios";

// TODO: This needs to be refactored. I mostly just separated it from SfdcPipelineWizardUnitTestSelector
function SfdcPipelineWizardManualTestClassSelector({ unitTestRecordId, selectedStep, pipelineWizardModel, selectedUnitTestClasses, unitTestClassesList, getUnitTestList, isLoading }) {
  const {getAccessToken} = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [manuallyEnteringTestClasses, setManuallyEnteringTestClasses] = useState(false);
  const [unusedTestClassesList, setUnusedTestClassesList] = useState([]);
  const [enteredUnitTestClassesList, setEnteredUnitTestClassesList] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setEnteredUnitTestClassesList(selectedUnitTestClasses?.toString() || "");

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [selectedUnitTestClasses]);

  // TODO: This needs to be rewritten
  const saveManuallyEnteredTestClasses = async() => {
    setIsSaving(true);
    console.log("in save selected classes");
    if(!selectedStep || !selectedStep._id) {
      toastContext.showLoadingErrorDialog("Please Select a Unit Test Step");
    }
    // let selectedList = selectedUnitTestClassesList.map(obj => obj.value)
    try {
      // convert csv to array and compare with our list
      let inputItems = CSVtoArray(enteredUnitTestClassesList);
      if(inputItems === null){
        toastContext.showLoadingErrorDialog("Please enter a valid input");
        return;
      }
      let inputCommonItems = commonItems(inputItems,unitTestClassesList);
      let diffItems = differentItems(inputItems,unitTestClassesList);

      console.log(inputCommonItems.length);
      console.log(diffItems);
      if(diffItems && diffItems.length > 0 )
        setUnusedTestClassesList(diffItems);

      const postBody = {
        recordId: unitTestRecordId,
        sfdcToolId: selectedStep?.tool?.configuration?.sfdcToolId,
        pipelineId: pipelineWizardModel.getData("pipelineId"),
        stepId: selectedStep?._id,
        dataType: "sfdc-unitTesting",
        data: inputCommonItems
      };

      console.log("postBody: " + JSON.stringify(postBody));
      const saveResponse = await sfdcPipelineActions.setListToPipelineStorage(postBody, getAccessToken);

      console.log("saveResponse: " + JSON.stringify(saveResponse));
      // TODO: add a success toast here
      toastContext.showUpdateSuccessResultDialog("Test Classes");
      // fetch back the new results
      await getUnitTestList();

    } catch (error) {
      console.error("Error getting API Data: ", error);
      toastContext.showLoadingErrorDialog(error);
      setIsSaving(false);
    } finally {
      setIsSaving(false);
    }
  };

  const getSkippedItemList = () => {
    if (Array.isArray(unusedTestClassesList) && unitTestClassesList.length > 0) {
      return (
        <div>
          <div className="text-muted">Note: These items are skipped as they don&apos;t match the Unit test
            list.
          </div>
          <div className="invalid-feedback" style={{fontSize: "100%"}}>
            <div className="scroller">
              <div className="d-flex flex-wrap">
                {unusedTestClassesList.map((item, idx) => (
                  <div key={idx} className="p-2 w-40">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const getManualTestClassSelectionInput = () => {
    if (manuallyEnteringTestClasses) {
      return (
        <div>
          <div className="form-group m-2">
            {/* <label className="mr-2 text-muted"><span>Enter Unit test classes:</span></label> */}
            <textarea
              disabled={isLoading}
              value={enteredUnitTestClassesList}
              onChange={event => setEnteredUnitTestClassesList(event.target.value)}
              className="form-control"
              rows={5}
            />

            <small className="text-muted form-text">
              <div>Accepts comma separated values, please save the changes before going to next view</div>
            </small>
            {getSkippedItemList()}
          </div>
          <div className="m-2">
            <Button
              variant="success"
              size="sm"
              onClick={() => saveManuallyEnteredTestClasses()}
              disabled={isSaving || isLoading}
            >
              <IconBase isLoading={isSaving} icon={faCheck} className={"mr-1"}/>
              Save Test Classes
            </Button>
          </div>
        </div>
      );
    }
  };

  if (isLoading) {
    return (<LoadingDialog/>);
  }

  //TODO: Should this be a multiselect?
  return (
    <div>
        <Form.Check
          className="ml-2"
          type="switch"
          id="inputFLag"
          checked={manuallyEnteringTestClasses}
          label="Manually Enter Test Classes?"
          onChange={(e) => {
            setManuallyEnteringTestClasses(e.target.checked);
          }}
        />
        {getManualTestClassSelectionInput()}
    </div>
  );
}


SfdcPipelineWizardManualTestClassSelector.propTypes = {
  unitTestRecordId: PropTypes.string,
  selectedStep: PropTypes.object,
  pipelineWizardModel: PropTypes.object,
  selectedUnitTestClasses: PropTypes.array,
  unitTestClassesList: PropTypes.array,
  getUnitTestList: PropTypes.func,
  isLoading: PropTypes.bool
};

export default SfdcPipelineWizardManualTestClassSelector;
