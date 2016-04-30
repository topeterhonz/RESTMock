import React from "react";
var JavaFormatter = require("../utils/JavaFormatter.js");
const ipcRenderer = window.require('electron').ipcRenderer;
var Highlight = require('react-highlight');
var remote = window.require('electron').remote;

class Footer extends React.Component {

				constructor() {
								super();
								this.listeners = [];
								this.listeners.push(ipcRenderer.on('selected-calls-list', this.onCallsListReceived.bind(this)));
								ipcRenderer.send('get-selected-calls-list');
								this.state = {
												calls: []
								}
				}

				componentWillUnmount() {
								while (this.listeners.length > 0) {
												ipcRenderer.removeListener(this.listeners.pop());
								}
				}

				onCallsListReceived(event, calls) {
								this.setState({calls: calls});
				}

				render() {
								return (
												<footer className="toolbar toolbar-footer">
																<h1 className="title" style={{
																				marginTop: "5px"
																}}>Java code</h1>
																<form className="bottom-pane">
																				<Highlight className="java code-snippet">
																								{JavaFormatter.formatCalls(this.state.calls)}
																				</Highlight>
																</form>
																<div className="real-footer toolbar-actions">
																				<h1 className="title pull-left">server: <b>{remote.getGlobal('ipAddress')}:3000</b></h1>
																				<button className="btn btn-primary pull-right bottom-pane-buttons">
																								Copy to clipboard
																				</button>
																				<button className="btn btn-default pull-right">
																								Select All
																				</button>
																</div>
												</footer>
								);
				}
}

export default Footer;
