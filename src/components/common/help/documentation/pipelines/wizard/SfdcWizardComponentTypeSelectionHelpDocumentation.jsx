import React from "react";
import HelpDocumentationContainer from "components/common/help/HelpDocumentationContainer";
import PropTypes from "prop-types";

function SfdcWizardComponentTypeSelectionHelpDocumentation({closeHelpPanel}) {
  return (
    <HelpDocumentationContainer
      helpTopic={"SalesForce Pipeline Run: Component Type Selection"}
      closeHelpPanel={closeHelpPanel}
      confluenceLink={`https://docs.opsera.io/salesforce/salesforce-wizard-run`}
    >
      <div>Set the following parameters and select <b>Proceed with Selected Components</b>. This will generate a list of
        files matching the parameters.
      </div>
      <ul>
        <li><b>Component Types</b> - This is a list of Salesforce Metadata component types supported within Opsera.
          Select which components will be included in this pipeline run. Once the components have been selected, view
          them in the <b>Selected Component Types</b> table. To deselect, click on the component in this table.
        </li>
        <li><b>Date Range</b> - Only files with components modified between the provided date and range will be included
          in the pipeline run.
        </li>
        <li><b>Namespace Prefix</b> - NamespacePrefix is what identifies a managed package. Every component added to a
          managed package has the namespace prefixed to the component API name. Provide the NamespacePrefix to retrieve
          components that are part of managed package.
        </li>
        <li><b>Included Component Types</b> -
          <ul>
            <li><b>All</b> - Includes both Managed and Custom Component Types.</li>
            <li><b>Managed</b> - Managed Components include a Namespace Prefix. They include a collection of components
              that are posted as a unit on AppExchange.
            </li>
            <li><b>Custom</b> Custom or Unmanaged Components do not include a Namespace Prefix. Custom packages are
              typically used to distribute open-source projects or application templates to provide developers with the
              basic building blocks for an application. The custom components can be edited in the organization they are
              installed in.
            </li>
          </ul>
        </li>
        <li><b>Include Dependencies</b> - By default, all CustomObject dependencies are included while selecting components from the Git side.
          By disabling this toggle, dependencies will be excluded unless explicitly selected.
        </li>
      </ul>
    </HelpDocumentationContainer>
  );
}

SfdcWizardComponentTypeSelectionHelpDocumentation.propTypes = {
  closeHelpPanel: PropTypes.func
};

export default React.memo(SfdcWizardComponentTypeSelectionHelpDocumentation);