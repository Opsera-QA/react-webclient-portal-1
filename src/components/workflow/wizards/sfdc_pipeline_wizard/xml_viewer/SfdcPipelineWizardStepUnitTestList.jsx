import React, {useContext, useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import axios from "axios";
import {faSalesforce} from "@fortawesome/free-brands-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import ListFieldBase from "components/common/fields/multiple_items/ListFieldBase";

const SfdcPipelineWizardStepUnitTestList = ({ pipelineWizardModel, unitTestStep }) => {
  const {getAccessToken} = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [unitTestClasses, setUnitTestClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    setUnitTestClasses([]);
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getTestClasses(cancelSource);
    }
    catch (error) {
      console.error(error);
      // setError("Could not initialize SFDC Pipeline Wizard");
    }
    finally {
      setIsLoading(false);
    }
  };

  //TODO: Should this be done in parent component (unit test classes viewer)? Probably
  const getTestClasses = async (cancelSource = cancelTokenSource) => {
    try {
      const res = await sfdcPipelineActions.setTestClassesListV2(getAccessToken, cancelSource, pipelineWizardModel, unitTestStep);

      if (res?.data?.status !== 200) {
        console.error("Error getting API Data: ", res.data.message);
        toastContext.showLoadingErrorDialog(res.data.message);
        return;
      }

      setUnitTestClasses([]);
      await getUnitTestList(cancelSource);
    } catch (error) {
      console.error("Error getting API Data: ", error);
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUnitTestList = async (cancelSource = cancelTokenSource) => {
    try {
      const response = await sfdcPipelineActions.getUnitTestClassesListV2(getAccessToken, cancelSource, pipelineWizardModel, unitTestStep);

      const unitTestClasses = response?.data?.testClasses?.data;
      const selectedTestClasses = response?.data?.selectedTestClasses?.data;

      if(!Array.isArray(unitTestClasses) || !Array.isArray(selectedTestClasses)) {
        toastContext.showInlineErrorMessage("Error getting Unit Test API Data.");
      }

      if (Array.isArray(unitTestClasses) && unitTestClasses.length > 0 && Array.isArray(selectedTestClasses) && selectedTestClasses.length > 0) {
        let parsedArray = [];

        unitTestClasses.forEach((unitTestClass, index) => {
          if (selectedTestClasses.includes(unitTestClass)) {
            parsedArray.push({name: unitTestClass, id: index});
          }
        });

        // get the selected data if the same record is already present in mongo
        setUnitTestClasses( parsedArray);
      }

    } catch (error) {
      console.error("Error getting API Data: ", error);
      toastContext.showInlineErrorMessage(error);
    }
  };

  if (pipelineWizardModel == null) {
    return <LoadingDialog size={"md"} message={"Loading Data"} />;
  }

  return (
    <ListFieldBase
      fieldName={"selectedComponentTypes"}
      selectOptions={unitTestClasses}
      dataObject={pipelineWizardModel}
      showSelectAllButton={true}
      title={`[${unitTestStep?.name}] Unit Test Classes`}
      valueField={"id"}
      textField={"name"}
      isLoading={isLoading}
      icon={faSalesforce}
      disabled={isLoading}
      noDataMessage={"No Unit Test Classes Selected"}
    />
  );
};

SfdcPipelineWizardStepUnitTestList.propTypes = {
  pipelineWizardModel: PropTypes.object,
  unitTestStep: PropTypes.object
};

export default SfdcPipelineWizardStepUnitTestList;
