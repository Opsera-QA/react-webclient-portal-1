
<details>
<summary>

##### Pipeline General FAQs
</summary>

<details>
<summary>Can I publish the pipelines to a catalog?</summary>  

>If a Site Admin grants a user permission to publish pipelines through **Policy Management** and they have RBAC access, they can publish a pipeline to their organization's **Shared Templates**. Navigate to the pipeline summary tab of the pipeline with the respective stages and select "publish". [**Policy Management Help**](https://docs.opsera.io/role-based-access-pipelines-and-tool-registry/set-policies-for-user)
</details>

<details>
<summary>I deleted a tool in Tool Registry. What happens to the pipelines using that tool?</summary>  
  
>Pipelines will fail without the Tool Registry.
</details>

<details>
<summary>Can I migrate my Github Yaml pipelines to Opsera pipelines?</summary>  
  
>Opsera offers drag and drop pipelines where users can build the stages of the pipeline in minutes without the need of YAML and pipeline can be published in the catalog for other users to reuse it.
</details>

<details>
  <summary>Do I have to configure pipelines steps each time before I run them? </summary>  
  
>This is not required. Once the pipeline is set up, users do not have to update or reconfigure the pipelines unless there is a change in the branch.
</details>


<details>
<summary>Can I invoke a pipeline through a pipeline? </summary>

>Yes. Opsera supports orchestrating multiple "child pipelines" within a **Parallel Processor** step. This allows users to include up to 5 pipeline executions inside a single step.A single The **Child Pipeline** step supports single pipeline association with a parent pipeline. [**Parent-Child Pipelines Help**](https://docs.opsera.io/create-and-manage-pipelines/parent-child-pipelines)
</details>

<details>
  <summary>What happens to webhook when I delete my pipeline?</summary>

>The webhook registered within the pipeline will be deleted and user will have to delete the registered webhook manually in respective SCM. 
</details>

<details>
<summary>Can I multiselect Pipeline and delete or apply access rule to multiple pipelines?</summary>

>No, This functionality is part of the roadmap and will be implemented as part of Q3 2022.
</details>

<details>
<summary>I have pipelines in other tools (Bamboo, Jenkins), is there an easy way to import those pipelines to Opsera? </summary>

>No, Opsera is no code platform where Pipelines are constructed using drag and drop option.
</details>

<details>
<summary>Can pipelines be versioned?</summary>

>Yes, you can copy the YAML files into your SCM. We are working on providing an option to sync the configuration directly into your repo (Roadmap item).
</details>

<details>
<summary>Do I have to write groovy script in jenkins to build the pipelines?</summary>

>No, Opsera is a no code orchestration platform where Pipelines are constructed using drag and drop option.
</details>
</details>


----

<details>
<summary>

##### Pipeline Troubleshooting and Logs FAQs

</summary>

<details>
<summary>How can I troubleshoot a failing pipeline before contacting Opsera Support?</summary>

>First check the Pipeline Summary logs for any authentication errors, then go to tool registry by clicking 3 dots in the pipeline to test the connection of the tool to Opsera. If the connection is successful, open a ticket with Opsera [**Opsera Support**](https://opsera.atlassian.net/servicedesk/customer/portal/2). If the connection fails in Tool Registry, contact the admin and seek support to change the password, secret or token.
</details>

<details>
<summary>Where can I go to for guidance, when I have trouble setting up a Step/Pipeline?</summary>

>[**Opsera Help Documentation**](https://docs.opsera.io/)
</details>

<details>
<summary>My pipeline is stuck. What should I do next?</summary>

>Look at the pipeline summary logs. If the logs are streaming then wait for the pipeline to complete. If there is no log activity for last 55 mins , reset the pipeline with reset option on top the screen and re trigger the pipeline.
</details>

<details>
<summary>What should I do when my pipeline in Opsera has been running for more than an hour?</summary>

>Look at the pipeline summary logs. If the logs are still streaming, wait for the pipeline to complete. If there is no log activity for last 55 mins , reset the pipeline with reset option on top of the screen and re trigger the pipeline.
</details>

<details>
<summary>How do I recover deleted pipelines?</summary>

>Deleted pipeline cannot be retrieved but users can make a copy of the pipeline and keep it in catalog for back up.
</details>

<details>
<summary>How do I view full logs of my completed pipeline? </summary>

>Go to Pipelines --> Pipeline -->  Summary --> Log summary --> Select the pipeline run #
</details>

<details>
<summary>Is there way to see pipeline update history? </summary>

>This feature is part of the roadmap and we are planning to implement this part of Q3 2022 roadmap.
</details>

<details>
<summary>Can the pipeline logs be downloaded?</summary>

>Yes, users can download the pipeline logs under build Blueprint section. Click the PDF icon on the top right side of the logs.
</details>

</details>

----
<details>
<summary>

##### Pipeline Triggering FAQs

</summary>

<details>
<summary>What are the different ways I can trigger a pipeline in Opsera? </summary>

>Pipelines can be triggered via Schedule pipeline in Pipeline summary view, via CLI, via webhook event when configured in **Start of Workflow** and Start pipeline button in Pipeline workflow.
</details>


<details>
  <summary>Is it possible to run a pipeline at a scheduled time?</summary>

>Yes. Set up Pipeline Schedule Task in pipeline Summary view under **Schedule**. They can be scheduled to trigger once, daily, weekly or monthly.
</details>


<details>
  <summary>Is it possible to chain pipelines? Can the end of 1 pipeline trigger another one?</summary>

>Yes, user can do so using Parallel Processor or Child Pipeline step.
</details>

</details>



----
<details>
<summary>

##### Pipeline Step and Notification FAQs

</summary>

<details>
<summary>What kind of Deployments does Opsera support? </summary>

>We support Custom scripts, Gitops, native cloud deployments for Azure and AWS, ArgoCD, Octopus based deployments
</details>


<details>
  <summary>What is Command Line step used for? </summary>

>Command line step can be used to write custom scripts for various use cases like build, deploy, code scan, terraform etc.
</details>


<details>
  <summary>Can I get notified in Slack/MS Teams when a pipeline fails?</summary>

>Yes. Email, Jira, Microsoft Teams, Slack and Google Chat can be configured via Tool Registry for users to receive notifications upon completion, all activity or failure. [**Pipeline Notifications Help**](https://docs.opsera.io/notifications/pipeline-notifications#configure-pipeline-notifications) 
</details>


<details>
  <summary>I want my own approval gate for Sonar. Can I set it up in Opsera?  </summary>

>Yes, Approval gate can be added between any stage within pipeline. For more information on setting up Approval Gate step, visit the [**Approval Gate Setup Help**](https://docs.opsera.io/approval-gate).
</details>


<details>
  <summary>I need to send Slack notification for all pipeline triggers. Is there a global notification setting or is there way to setup notification on a group of pipelines</summary>

>No, This functionality is not available and do not have plans to launch this feature in 2022.
</details>

</details>



----

##### Related Articles


[**Approval Gate Setup**](https://docs.opsera.io/approval-gate)  
[**Configure Single Pipeline for Multiple Webhook**](https://docs.opsera.io/webhook-integration/how-to-configure-a-pipeline-for-multiple-webhook-events)   
[**Building a Declarative Pipeline**](https://docs.opsera.io/create-and-manage-pipelines)  
[**Pipeline Notifications**](https://docs.opsera.io/notifications/pipeline-notifications#configure-pipeline-notifications)

[**Policy Management**](https://docs.opsera.io/role-based-access-pipelines-and-tool-registry/set-policies-for-user)

[**Parent-Child Pipelines**](https://docs.opsera.io/create-and-manage-pipelines/parent-child-pipelines)


