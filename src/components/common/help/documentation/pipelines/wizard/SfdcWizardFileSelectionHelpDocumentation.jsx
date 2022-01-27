import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function SfdcWizardFileSelectionHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer
      helpTopic={"SalesForce Pipeline Run: File Selection"}
      closeHelpPanel={closeHelpPanel}
      confluenceLink={`https://opsera.atlassian.net/l/c/XbSETC14`}
    >
      <div><b>Note: </b> Salesforce limits retrieval or deployment of upto <b>10,000</b> files at once.</div>
      <div><b>Rule Filters</b> allow you to select which components will be included or excluded in this pipeline
        run. The rule order is not important. Once Include and Exclude Rules have been set, select <b>Proceed with
          Selected Files</b> to view the final list.
      </div>
      <div>
        <div>
          <div className={"mt-3"}><b>Include Rules</b> specify what components are included in pipeline run.</div>
          <ul>
            <li>If the only selection is a Component in Component Filter, results will include all files of that
              Component type.
            </li>
            <li>If Field and Value is specified in an Include rule, results will only include Components with
              corresponding Field and Value.
            </li>
            <li>If you specify field and assign values when writing an include rule, it includes only those that
              match those values.
            </li>
            <li>These rules are not exclusive. If it matches any include rule, it will be included in the initial
              data list.
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div className={"mt-3"}><b>Exclude Rules</b> rules specify which components are excluded from results
          following the initial results generated from Include rules or the entire data set.
        </div>
        <ul>
          <li>If the only selection is Component Filter, results will exclude all files of that Component type.</li>
          <li>If Field and Value is specified in an Exclude rule, results will exclude all Components with
            corresponding Field and Value.
          </li>
          <li>These rules are not exclusive. If it matches any include rule, it will be included in the initial data
            list.
          </li>
        </ul>
      </div>

      <div>
        <div className={"mt-3"}><b>Overview</b></div>
        <div className={"ml-3"}>
          <div>If <b>Include Rules</b> are selected:</div>
          <div className={"ml-2"}>
            <div>The initial results are generated based on the specified <b>Include Rules</b></div>
            <div>This list is then filtered by any preceding <b>Exclude Rules</b> (if specified). <b>Exclude
              Rules</b> take precedence over any <b>Include Rule</b>.
            </div>
          </div>
          <div>If <b>Exclude Rules</b> are not selected:</div>
          <div className={"ml-2"}>
            <div>If any <b>Exclude Rules</b> specified, the entire data set will be filtered by <b>Exclude Rules</b>.
            </div>
            <div>If no <b>Exclude Rules</b> specified, the entire data set will be included in results.</div>
          </div>
        </div>
      </div>
    </HelpDocumentationContainer>
  );
}

SfdcWizardFileSelectionHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func
};

export default React.memo(SfdcWizardFileSelectionHelpDocumentation);