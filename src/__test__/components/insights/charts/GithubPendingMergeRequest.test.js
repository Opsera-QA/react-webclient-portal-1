import {configure, shallow,render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from 'enzyme-to-json';
import GithubPendingMergeRequests
    from "../../../../components/insights/charts/github/table/pending_merge_requests/GithubPendingMergeRequests";
import {AuthContext} from "../../../../contexts/AuthContext";
configure({adapter: new Adapter()});

it('renders and verifies the GithubPendingMergeRequests Component snapshot', () => {
    // eslint-disable-next-line react/react-in-jsx-scope
    // const wrapper = render(<GithubPendingMergeRequests/>);
    const TestComponent = () => (
        <AuthContext.Provider value="test">
            <GithubPendingMergeRequests/>
        </AuthContext.Provider>
    );
    const wrapper = render(<TestComponent />);
    expect(toJson(wrapper)).toMatchSnapshot();
});