import React, { PureComponent } from 'react'
import { Table } from "react-bootstrap"
import ErrorDialog from "../common/error";
import LoadingDialog from "../common/loading";
import Moment from "react-moment";
import { AuthContext } from "../../contexts/AuthContext";  //REact Context API Code for User Authentication
import { ApiService } from "../../api/apiService";

export default class RegisteredUsers extends PureComponent {
    static contextType = AuthContext;
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
            fetching: true,
            error: null,
            messages: null
        };
    }

    componentDidMount() {
        this.getApiData();
    }

    async getApiData() {
        const { getAccessToken } = this.context;
        const accessToken = await getAccessToken();
        const apiCall = new ApiService("/users/get-users", {}, accessToken);
        let currentComponent = this;
        apiCall.get()
            .then(function (response) {
                // console.log(response.data)
                currentComponent.setState({
                    data: response.data,
                    error: null,
                    fetching: false
                });
            })
            .catch(function (error) {
                currentComponent.setState({
                    error: error,
                    fetching: false
                });
            });
    }

    render() {
        const { data, error, fetching } = this.state;
        console.log(data)
        return (
            <>
                <h3 style={{ padding: "20px" }}>Registered Users</h3>

                {error ? <ErrorDialog error={error} /> : null}
                {fetching && <LoadingDialog />}

                <Table responsive>
                    {/* <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Organization</th>
                            <th>Division</th>
                            <th>Domain</th>
                            <th>Created</th>
                        </tr>
                    </thead> */}
                    <tbody>
                        {data.map(val => (
                            <>
                                <br></br>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Organization</th>
                                    <th>Division</th>
                                    <th>Domain</th>
                                    <th>Created</th>
                                </tr>
                                <tr>
                                    <td>{val.firstName}</td>
                                    <td>{val.lastName}</td>
                                    <td>{val.email}</td>
                                    <td>{val.organizationName}</td>
                                    <td>{val.division}</td>
                                    <td>{val.domain}</td>
                                    <td><Moment format="MM/DD/YYYY" date={val.createdAt} /></td>
                                </tr>
                                {val.tools.length > 0 && (
                                    <>
                                        <tr>
                                            <th>Tool Name</th>
                                            <th>Status</th>
                                            <th>Tool ID</th>

                                        </tr>
                                        {val.tools.map(tool => (
                                            <tr>
                                                <td>{tool.name}</td>
                                                <td>{tool.toolStatus}</td>
                                                <td>{tool._id}</td>
                                            </tr>
                                        ))}
                                    </>
                                )}
                                <br></br>
                            </>
                        ))}
                    </tbody>
                </Table>
            </>
        )
    }
}
