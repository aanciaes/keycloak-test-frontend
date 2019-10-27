import React from "react";
import ProtectedAction from "./ProtectedAction";
import PublicAction from "./PublicAction";
import AdminAction from "./AdminAction";
import {connect} from "react-redux";
import {AdminOptions} from "./AdminOptions";

class KeycloakTester extends React.Component {
    render() {
        const {kc} = this.props;

        return (
            <div className="bookBox row">
                <h1>
                    Welcome {kc.tokenParsed.preferred_username}&nbsp;
                    <button className="btn btn-success" onClick={kc.logout}>Logout</button>
                </h1>
                <br/>
                <h2>Role: {kc.tokenParsed.resource_access["waterdog-backend"].roles[0]}</h2>
                <h3>Github User: {kc.tokenParsed.githubUser.toString()}</h3>
                <p>refreshToken: {kc.refreshToken}</p>
                <p>accessToken: {kc.token}</p>

                <br/>
                <PublicAction token={kc.token}/>
                <br/>
                <ProtectedAction token={kc.token}/>
                <br/>
                <AdminAction token={kc.token}/>

                <div>
                    <h2>Administrator Options</h2>
                    <AdminOptions/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    kc: state.keycloak,
    refresh: state.refresh
});

export default connect(mapStateToProps, null)(KeycloakTester)
