import React from "react";
const ipcRenderer = window.require('electron').ipcRenderer;
var Highlight = require('react-highlight');
var remote = window.require('electron').remote;

class ResponsePreviewPane extends React.Component {

				constructor() {
								super();
								this.listeners = [];
								this.listeners.push(ipcRenderer.on('request-clicked', this.onRequestClicked.bind(this)));
								this.state = {
												response: ""
								}
				}

				componentWillUnmount() {
								while (this.listeners.length > 0) {
												ipcRenderer.removeListener(this.listeners.pop());
								}
				}

				onRequestClicked(event, resp) {
								this.setState({
												response: JSON.stringify(JSON.parse(resp.body), null, 3)
								});
				}

				render() {
								return (
												<div className="pane">
																<Highlight className="json response-preview">
																				{this.state.response}
																</Highlight>
												</div>
								);
				}
}

export default ResponsePreviewPane;
