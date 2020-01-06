import React from "react"
import {RMContext} from "./RMContext"
import ReleaseManagementOtherServices, {
  Confirmation,
} from "./ReleaseManagementOtherServices"
import { Form } from 'react-bootstrap';

const githubci = {
  category: "Release Management",
  service: "GitlabCI",
  fields: [
    {
      name: "Gitlab URL",
      key: "gitlab_url",
      msg: "Enter the Gitlab URL shown on your Gitlab Interface",
    },
    {
      name: "Gitlab Token",
      key: "gitlab_token",
      msg: "Enter the Gitlab Runner Token shown on your Gitlab Interface",
    },
    {
      name: "Gitlab Runner Name",
      key: "runner_name",
      msg: "Provide a Runner name you configure in your Gitlab YML file",
    },
  ],
}
const jenkinsPipelineNode = {
  category: "Release Management",
  service: "Jenkins Pipeline",
  fields: [
    {
      name: "Jenkins Password",
      key: "jenkins_password",
      msg: "Enter a password to login to Jenkins.",
      password: true,
      required: true,
    },
    {
      name: "Remote IP",
      key: "remote_ip",
      msg: "Optional Field. Enter your Remote IP",
    },
    {
      name: "Shared Libraries URL",
      key: "shared_libraries_url",
      msg: "Optional Field. Enter your Shared Libraries URL",
    },
    {
      name: "Docker Image Name",
      key: "docker_image_name",
      msg: "Optional Field. Enter your Docker Image Name",
    },
    {
      name: "Git repository URL",
      key: "gitrepo",
      msg: "Mandatory Field. Enter your Git Repository URL",
    },
    // {
    //   name: "Remote IP for Deploy",
    //   key: "remote_ip",
    //   msg: "Enter a remote url to deploy your application",
    // },
    // {
    //   name: "PORT",
    //   key: "PORT",
    //   msg: "Enter a valid PORT number",
    //   required: true,
    // },
    // {
    //   name: "Application Code Base",
    //   key: "baseLanguage",
    //   type: "checkbox",
    //   values: ["NodeJS", "Java"],
    // },
  ],
}

// const jenkinsPipelineJava = {
//   category: "Release Management",
//   service: "Jenkins Pipeline Java",
//   fields: [
//     {
//       name: "Jenkins Password",
//       key: "jenkins_password",
//       msg: "Enter a password to login to Jenkins.",
//       password: true,
//       required: true,
//     },
//     {
//       name: "Remote IP",
//       key: "remote_ip",
//       msg: "Optional Field. Enter your Remote IP",
//     },
//     {
//       name: "Shared Libraries URL",
//       key: "shared_libraries_url",
//       msg: "Optional Field. Enter your Shared Libraries URL",
//     },
//     {
//       name: "Docker Image Name",
//       key: "docker_image_name",
//       msg: "Optional Field. Enter your Docker Image Name",
//     },
//     {
//       name: "Git repository URL",
//       key: "gitrepo",
//       msg: "Mandatory Field. Enter your Git Repository URL",
//     },
//     // {
//     //   name: "Remote IP for Deploy",
//     //   key: "remote_ip",
//     //   msg: "Enter a remote url to deploy your application",
//     // },
//     {
//       name: "PORT",
//       key: "PORT",
//       msg: "Enter a valid PORT number",
//       required: true,
//     },
//     // {
//     //   name: "Application Code Base",
//     //   key: "baseLanguage",
//     //   type: "checkbox",
//     //   values: ["NodeJS", "Java"],
//     // },
//   ],
// }

class ReleaseManagementServices extends React.PureComponent {
  static contextType = RMContext
  state = {}
  render() {
    const {serviceClick, saving} = this.context

    return (
      <Form className="ReleaseManagementServices" loading={saving}>
        <h3>Services</h3>
        <div className="ReleaseManagementServices__init-services">
          <div style={{display: "flex"}}>
            <div
              className="newApp__service-logo"
              onClick={() => serviceClick(jenkinsPipelineNode)}
            >
              <img src={require("../platform/imgs/jenkins.png")} />
              <span className="newApp__service-title">Jenkins Pipeline</span>
            </div>

            {/* <div
              className="newApp__service-logo"
              onClick={() => serviceClick(jenkinsPipelineJava)}
            >
              <img src={require("../NewApp/imgs/jenkins.png")} />
              <span className="newApp__service-title">
                Jenkins Pipeline Java
              </span>
            </div> */}

            <div
              className="newApp__service-logo"
              onClick={() => serviceClick(githubci)}
            >
              <img src={require("../api_connector/imgs/gitlab.png")} />
              <span className="newApp__service-title">Gitlab CI</span>
            </div>
          </div>
        </div>
        {this.context.initServicesValid === true && this.context.qtShow && (
          <div className="ReleaseManagementServices__qt">
            <span>
              Do you want to configure more DevOps tools for your application?{" "}
            </span>
            <span
              className="ReleaseManagementServices__qt--yes"
              onClick={this.context.handleYesClick}
            >{`  Yes  `}</span>
            {` / `}
            <span
              className="ReleaseManagementServices__qt--no"
              onClick={this.context.handleNoClick}
            >{` No `}</span>
          </div>
        )}
        {this.context.initServicesValid === true &&
          this.context.otherServicesShow === true && (
            <ReleaseManagementOtherServices />
          )}
        {this.context.otherServicesShow !== null && <Confirmation />}
      </Form>
    )
  }
}

export default ReleaseManagementServices
