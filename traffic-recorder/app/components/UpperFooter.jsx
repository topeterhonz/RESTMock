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
					var isDisabled = this.state.calls.length === 0;
					var count = isDisabled?"":this.state.calls.length+" requests";
					var disabled = isDisabled? "disabled":"";
					var deleteStyle = isDisabled? "disabled btn btn-default" : "btn btn-primary";
								return (
												<footer className="toolbar toolbar-footer">
																<div className="half-div">
																				<div className="toolbar-actions">
																								<button className={deleteStyle} disabled={disabled}>
																												Delete {count}
																								</button>
																				</div>
																</div>
																<div className="half-div">
																</div>
												</footer>
								);
				}
}

export default Footer;
