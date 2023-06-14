import React, { useContext } from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";


function AIToolsHelpDocumentation() {
    const toastContext = useContext(DialogToastContext);

    const closePanel = () => {
        toastContext.clearOverlayPanel();
    };

    const getHelpDocumentation = () => {
        return (
            <div>View new developments powered by the Opsera AI Engine.
                <div className={"mt-2"}>
                    <ul style={{listStyleType: "none"}}>
                        <li><b>Opsera Conversational AI</b> - View data about your Devops Environment in a conversational manner by sending messages to the Opsera ML Engine.</li>
                    </ul>
                </div>
            </div>

        );
    };

    return (
        <HelpOverlayBase
            closePanel={closePanel}
            showPanel={true}
            helpTopic={"AI Tools"}
            helpDocumentation={getHelpDocumentation()}
        >
        </HelpOverlayBase>
    );
}


export default React.memo(AIToolsHelpDocumentation);