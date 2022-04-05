
[//]: # (#### Frequently Asked Questions)


###### This page provides help with our most frequently asked questions. To view questions, expand a topic below. For more information, visit  [**Opsera's Help Documentation**](https://opsera.atlassian.net/wiki/spaces/OE/overview) . Have a question? Contact  [**Opsera Support**](https://opsera.atlassian.net/servicedesk/customer/portal/2).

____
<details>
<summary>
<b>PIPELINE - GENERAL FAQS</b>

</summary>

<details>
<summary>Can I publish the pipelines into a catalog?</summary>

>Yes, you can create a pipeline with the respective stages and go to the pipeline summary tab and select "publish" to publish the pipeline to your organization's private catalog of pipeline templates.
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
  <summary>Do we have to configure pipelines/steps everytime before running them? </summary>

>Not required, once the pipeline is set up, users do not have to update or reconfigure the pipelines unless there is a change in the branch
</details>

<details>
<summary>Can we configure steps to run in parallel?</summary>

>Yes, users can add parallel step within a pipeline and trigger up to 5 pipeline at a time.
</details>

<details>
<summary>Can I invoke a pipeline through a pipeline? </summary>

>Yes, Users can add parallel or child pipeline step and trigger another pipeline through a pipeline.
</details>

<details>
  <summary>What happens to webhook, when I delete my pipeline?</summary>

>Webhook registered within pipeline will be deleted and users has to manually go to SCM and delete the registered webhook.
</details>

<details>
<summary>Can I multiselect Pipeline and delete or apply access rule to multiple pipelines?</summary>

>No, This functionality is part of the roadmap and will be implemented as part of Q3 2022.
</details>

<details>
<summary>I have pipelines in other tools (Bamboo, Jenkins), is there easy way to import those pipelines to opsera? </summary>

>No, Opsera is no code platform where Pipelines are constructed using drag and drop option.
</details>

<details>
<summary>Can pipelines be versioned?</summary>

>Yes, you can copy the YAML files into your SCM. We are working on providing an option to sync the configuration directly into your repo (Roadmap item).
</details>

<details>
<summary>Do I have to write groovy script in jenkins to build the pipelines?</summary>

>No, Opsera is no code orchestration platform where Pipelines are constructed using drag and drop option.
</details>
</details>

*Expand to view frequently asked questions relating to general pipeline usages.*

----

<details>
<summary>
<b>PIPELINE - TROUBLESHOOTING AND LOGS FAQS</b>

</summary>

<details>
<summary>How can I troubleshoot a failing pipeline before contacting Opsera Support?</summary>

>Check for the pipeline summary logs and if you see any logs that says authentication error then go to tool registry by clicking 3 dots in the pipeline and test the connection of the tool to Opsera. If the connection is success open a ticket with Opsera [**Opsera Support**](https://opsera.atlassian.net/servicedesk/customer/portal/2). If the connection fails in Tool Registry, contact the admin and seek support to change the password, secret or token.
</details>

<details>
<summary>Where can I go to for guidance, when I have trouble setting up a Step/Pipeline?</summary>

>[**Opsera Help Documentation**](https://opsera.atlassian.net/wiki/spaces/OE/overview)
</details>

<details>
<summary>My pipeline is stuck. What should I do next?</summary>

>Look at the pipeline summary logs, if the logs are streaming then wait for the pipeline to complete, If there is no log activity for last 55 mins , Reset the pipeline with reset option on top the screen and re run the pipeline.
</details>

<details>
<summary>What should I do when my pipeline in Opsera is keep running for more than an hour?</summary>

>Look at the pipeline summary logs, if the logs are streaming then wait for the pipeline to complete, If there is no log activity for last 55 mins , Reset the pipeline with reset option on top the screen and re run the pipeline
</details>

<details>
<summary>How do I recover deleted pipelines?</summary>

>Deleted pipeline cannot be retrieved but users can make a copy of the pipeline and keep it in catalog for back up
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

>Yes, Users can download the pipeline logs under build blueprint section. Click the PDF icon on right side top of the logs
</details>

</details>

*Expand to view frequently asked questions relating to troubleshooting Opsera pipelines and pipeline logging.*

----
<details>
<summary>
<b>PIPELINE - TRIGGERING A PIPELINE FAQS</b>

</summary>

<details>
<summary>What are the different ways I can trigger a pipeline in Opsera? </summary>

>Pipelines can be triggered via Schedule pipeline in Pipeline summary view, via CLI, Post commit hook(PCH) and Start pipeline button in Pipeline workflow.
</details>


<details>
  <summary>Is it possible to run a pipeline at a scheduled time?</summary>

>Yes, Please set up schedule in pipeline Summary view under scheduler
</details>


<details>
  <summary>Is it possible to chain pipelines? Can the end of 1 pipeline trigger another one?</summary>

>Yes, Users can add parallel or child pipeline step and trigger another pipeline through a pipeline
</details>

</details>


*Expand to view frequently asked questions relating to triggering and configuring an Opsera pipeline.*

----
<details>
<summary>
<b>PIPELINE - SUPPORTED STEPS AND PIPELINE NOTIFICATIONS FAQS</b>

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
  <summary>Can we get notified in Slack/MS Teams when a pipeline fails?</summary>

>Yes, Slack, MS teams can be configured via Tool registry and users can get notifications on completion, all activity or during failure. Email notification is available as well.
</details>


<details>
  <summary>I want my own approval gate for Sonar. Can I set it up in Opsera?  </summary>

>Yes, Approval gate can be added between any stage within pipeline. For more information on setting up Approval Gate step, visit the [**Approval Gate Setup Help Documentation**](https://opsera.atlassian.net/l/c/1Xde12e1).
</details>


<details>
  <summary>I need to send slack notification for all pipeline triggers. Is there a global notification setting or is there way to setup notification on a group of pipelines</summary>

>No, This functionality is not available and do not have plans to launch this feature in 2022.
</details>

</details>


*Expand to view frequently asked questions relating to Opsera pipeline supported steps and pipeline step configuration including pipeline notification and approval gates.*

----

<details>
<summary>
<b>TOOL REGISTRY - TROUBLESHOOTING AND CONFIGURATION FAQS</b>

</summary>

<details>
<summary>What will happen if Opsera does not provide support for a tool? </summary>

>Any tool that is spinned up via Opsera and any tool integrated via tool registry will be supported via Opsera. You can also bring your own tools into Opsera platform by integrating them into Tool Registry. If you cannot find a tool that you are looking for, you can contact support for additional help.
</details>


<details>
  <summary>How do I recover deleted tool registry?</summary>

>Deleted entries cannot be retrieved
</details>


<details>
  <summary>Accidentally Deleted Tool? is there way to restore it? </summary>

>Please open a support request. We will check the tool status and restore the tool from last successful backup. Any changes after the last successful backup will not be available after the restore.
</details>


<details>
  <summary>How do I see all pipelines that are using my tools in tool registry?   </summary>

>From Tool Registry, choose a tool and navigate to the Usage tab to identify the list of pipelines using the tool . Users can go to reporting and search for pipelines and look for tools being used within a pipeline.
</details>


<details>
  <summary>How do I check the tool connectivity in the tool registry?</summary>

>Once you provide the required credentials or keys, you can use "test connectivity" button in the tool registry to verify connection.
</details>

</details>


*Expand to view frequently asked questions relating to Tool Registry configuration, troubleshooting*

----

<details>
<summary>
<b>INSIGHTS - FAQS</b>

</summary>

<details>
<summary>Is there a way I can measure Deployment Frequency and other DORA metrics through Opsera? </summary>

>Yes, Opsera offers 100+ KPI's including DORA and other industry standard KPI's (NIST, DoD metrics). Users can build their dashboards using Opsera market place across Planning, Pipeline, Security, Quality and Operations
</details>


<details>
  <summary>Do we get Developer and Source Code metrics as a part of Insights ? </summary>

>Yes, We offer Developer productivity and source code metrics across Github, Gitlab and Bitbucket.
</details>


<details>
  <summary>What are the KPIs that you offer, that will be best for the leadership? </summary>

>Users can build leadership dashboard across planning, security, quality and operations using our marketplace KPI's
</details>

</details>


*Expand to view frequently asked questions relating to Opsera Insights*

----

<details>
<summary>
<b>USER AND ORGANIZATION CAPABILITIES FAQS</b>

</summary>

<details>
<summary>Will everyone else in the company have access to my pipelines? </summary>

>No, you can leverage Opsera RBAC and groups and control the access at the tool level and pipeline level.  Pipeline owners can create user group and set up RBAC for pipeline and define the pipeline access to each groups or by users. Site Administrator rules supersede RBAC rules and can access anything.
</details>


<details>
  <summary>How can I restrict user access to some functionalities? </summary>

>Users has to set up user groups under Organization and add members. Once the groups are created, apply those groups in RBAC within pipeline or tool registry
</details>


<details>
  <summary>Can I audit user activity? </summary>

>Yes, User activity can be pulled via Opsera API access. Admins can create a token under profile and using the token users can pull the audit details around user activity and can be pushed to tools like splunk or tableau. View [**OPSERA API PLATFORM**](https://opsera.atlassian.net/wiki/spaces/OE/pages/1461878875/Opsera+API+Platform) for more documentation.
</details>
<details>
  <summary>Can I create a custom pipeline template for my organization?</summary>

>Opsera offers drag and drop pipelines where users can build the stages of the pipeline in minutes without the need of code or glue script and pipeline can be published in the catlog for other users to reuse it.
</details>
<details>
  <summary>Can I access/edit/run a pipeline created by my colleague?</summary>

>Yes, If you have RBAC access as admin users will be able to edit and Manager access to run, Guest users will not be able to edit or run the pipeline
</details>

</details>


*Expand to view frequently asked questions relating to user and organization access including admin capabilities.*

----

<details>
<summary>
<b>VAULT FAQS</b>

</summary>

<details>
<summary>When I connect my tool, will my credentials be safe?</summary>

>Yes, we create a dedicated vault for your tenancy today. Any credentials, token, secrets, parameters stored in tool registry is stored in encrypted mode within your vault under your tenancy.
</details>


<details>
  <summary>Will Opsera read/have access to the entire source code repository?</summary>

>No. Any credentials, token, secrets, parameters stored in tool registry is stored in encrypted mode within dedicated vault and we will only make call to the repository when the pipeline is triggered. All connection to your repo will be via secure connection and Opsera will access only via programmatic API way.
</details>


<details>
  <summary>I have my own Vault. Can I configure/integrate that with Opsera? </summary>

> Yes, If you have Hashicorp vault, users can bring their own Hashicorp vault and manage pipeline orchestration integration, For AWS and Azure Vault, contact Support 
</details>

</details>


*Expand to view frequently asked questions relating to Opsera's Vault.*

----