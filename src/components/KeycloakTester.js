import React from "react";
import AdminFunc from "./admin";
import PublicAction from "./PublicAction";
import AdminWPathParams from "./adminWPathParams";
import {connect} from "react-redux";

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
                <AdminFunc token={kc.token}/>
                <br/>
                <AdminWPathParams token={kc.token}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    kc: state.keycloak,
    refresh: state.refresh
});

export default connect(mapStateToProps, null)(KeycloakTester)