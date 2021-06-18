import React from 'react';
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import WarningDialog from "components/common/status_notifications/WarningDialog";
import ErrorDialog from "components/common/status_notifications/error";
// syntax highlightner
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import xml from "react-syntax-highlighter/dist/esm/languages/hljs/xml";
import docco from "react-syntax-highlighter/dist/esm/styles/hljs/docco";

SyntaxHighlighter.registerLanguage("xml", xml);

const PackageXMLTabView = ({save, loading, xml, destructiveXml, rollBack}) => {    
    
    return (
        <>
          <div className="flex-container-content mt-4">
            <div className="h5">SalesForce Pipeline Run: XML Viewer</div>
            <div className="text-muted mb-2">Please confirm that you want to proceed with this operation.</div>
            {rollBack && <div className="my-3"><WarningDialog warningMessage={"No Files were selected for deployment, Entering Rollback mode."}/></div> }
            {rollBack && destructiveXml.length === 0 && <div className="my-3"><ErrorDialog error={"No Destructive XML found cannot proceed with empty package XML on Rollback mode."}/></div> }
            <div className="px-2"></div>

            {save && <LoadingDialog />}
            
            {loading ? (
                <LoadingDialog size="sm" />
            ) : (
                <>
                <div className="d-flex w-30 pr-2">
                {loading ? (
                <LoadingDialog size="sm" />
                ) : (
                <>
                {xml && (
                    <div className="col-7 mr-1">
                    <div className="h6 opsera-secondary">Package XML</div>
                    <SyntaxHighlighter language="xml" style={docco}>
                        {xml}
                    </SyntaxHighlighter>
                    </div>
                    )}
                </>
                )}
                {loading ? (
                <LoadingDialog size="sm" />
                ) : (
                <>
                {destructiveXml && destructiveXml.length > 0 && (
                    <div className="col-5 mr-1">
                    <div className="h6 opsera-secondary">Destructive Package XML</div>
                    <SyntaxHighlighter language="xml" style={docco}>
                        {destructiveXml}
                    </SyntaxHighlighter>
                    </div>
                    )}
                </>
                )}
                </div>
            </>)}
          </div>
        </>
    );
};

PackageXMLTabView.propTypes = {
  xml: PropTypes.string,
  destructiveXml: PropTypes.string,
  save: PropTypes.bool,
  loading: PropTypes.bool,
  rollBack: PropTypes.bool,
};

export default PackageXMLTabView;