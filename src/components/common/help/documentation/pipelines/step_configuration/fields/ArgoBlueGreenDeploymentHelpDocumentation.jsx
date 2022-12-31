import React, { useContext } from "react";
import { DialogToastContext } from "contexts/DialogToastContext";
import HelpOverlayBase from "components/common/overlays/center/help/HelpOverlayBase";

function ArgoBlueGreenDeploymentHelpDocumentation() {
  const toastContext = useContext(DialogToastContext);

  const closePanel = () => {
    toastContext.clearOverlayPanel();
  };

  const getHelpDocumentation = () => {
    return (
      <div>
        <p>Argo CD BlueGreen helps users to run multiple versions of services at a time and enables customers to make zero downtime deployments. This toggle can be enabled to identify this deployment as a Blue Green Deployment.</p>
        <p>An Approval Gate step can be created after this deployment step, to promote or deny the changes to the other environments. The changes can be promoted or denied by approving or rejecting it in the Approval Gate notification.</p>
        <h6>Important Points for Blue Green Deployment:</h6>
        <ul>
          <li>
            <p>As part of doing BlueGreen deployment in the Kubernetes cluster through Argo CD, the Argo rollouts plugin must be installed. The plugins can be installed while creating a cluster using Opsera Tool Registry, by enabling the Argo Rollouts for Blue Green Deployment Toggle button.</p>
          </li>
          <li>
            <p>If using your own Argo CD, then it can be <b><a href="https://argoproj.github.io/argo-rollouts/installation/" target="_blank" rel="noreferrer">installed manually</a></b>.</p>
          </li>
          <li>
            <p>Also, the deployment YAML should contain the Argo specs based on <b><a href="https://argoproj.github.io/argo-rollouts/features/bluegreen/" target="_blank" rel="noreferrer">Blue Green Deployment</a></b> or <b><a href="https://argoproj.github.io/argo-rollouts/features/canary/" target="_blank" rel="noreferrer">Canary Deployment</a></b> and the kind of the deployment should also be updated as Rollout.</p>
          </li>
          <li>
            <p>Need to promote the new environment to active manually if the autoPromotionEnabled: boolean attribute was set to false. When the attribute is set to true, the Approval Gate step can be used to promote the changes.</p>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <HelpOverlayBase
      closePanel={closePanel}
      showPanel={true}
      helpDocumentation={getHelpDocumentation()}
      helpTopic={"Argo Blue Green Deployment"}
    />
  );
}
export default React.memo(ArgoBlueGreenDeploymentHelpDocumentation);
