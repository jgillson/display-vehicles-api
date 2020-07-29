import React, {Component} from 'react';
import Vehicles from './components/vehicles'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {connectionId: undefined, policies: [], showText: false};
        this.openTrellis = this.openTrellis.bind(this);
        this.handleFetchPolicies = this.handleFetchPolicies.bind(this);
    }

    componentDidMount() {
        this.openTrellis()
    }

    openTrellis() {
        const self = this;
        const handler = window.TrellisConnect.configure({
            client_id: 'CHALLENGE',
            onSuccess: function (connectionId, metadata) {
                self.setState({connectionId: connectionId, showText: true})
            }
        });
        document.getElementById('openTrellisButton').onclick = handler.open;
    }

    handleFetchPolicies = async () => {
        const self = this;
        const headers = {
            'Accept': 'application/json',
            'X-API-Client-Id': 'CHALLENGE',
            'X-API-Secret-Key': 'CHALLENGESECRET'
        };
        await fetch("https://api.trellisconnect.com/trellis/connect/1.2.0/account/" + self.state.connectionId + "/policies", {
            method: 'GET',
            headers: headers
        })
            .then(res => (res.ok ? res : Promise.reject(res)))
            .then(function (res) {
                return res.json();
            })
            .then(function (body) {
                self.setState({policies: body.policies})
                console.log(body.policies)
            })
    }

    render() {
        return (
            <div>
                <div>
                    <center><h1>Lookup VIN Information</h1></center>
                </div>
                <div>
                    <center>
                        <button id="openTrellisButton" onClick={this.openTrellis}>
                            Open Trellis
                        </button>
                    </center>
                    <br/>
                </div>
                {(() => {
                    if (this.state.connectionId) {
                        return <div>
                            <center>
                                {this.state.showText ? "Successfully authenticated to Trellis Connect!" : ""}
                            </center>
                            <br/>
                            <center>
                                <button onClick={() => {
                                    this.handleFetchPolicies();
                                    this.setState({showText: false})
                                }}>
                                    Display Vehicles
                                </button>
                                <Vehicles policies={this.state.policies}/>
                            </center>
                        </div>
                    }
                })()}
            </div>
        );
    }
}

export default App;
