var React = require('react');
const ipcRenderer = window.require('electron').ipcRenderer;
var Reflux = require('reflux');
var ReactBSTable = require("react-bootstrap-table");
var BootstrapTable = ReactBSTable.BootstrapTable;
var TableHeaderColumn = ReactBSTable.TableHeaderColumn;
var remote = window.require('electron').remote;

var Arrays = require("../utils/Arrays.js");
var ContentPane = React.createClass({
				selectedRows: [],
				listeners: [],
				updateSelectedRequestsStore() {
								var requests = this.selectedRows.map(function(item) {
												return item.call;
								})
								ipcRenderer.send('requests-selection-change', requests);
				},

				getInitialState() {
								return {requests: [], requestsToDisplay: [], previewingRequestId: -1};
				},

				componentWillMount() {
								this.listeners.push(ipcRenderer.on('requests-list', this.onRequestsListReceived));
								ipcRenderer.send('get-requests-list');
								this.updateSelectedRequestsStore();
				},
				componentWillUnmount() {
								while (this.listeners.length > 0) {
												ipcRenderer.removeListener(this.listeners.pop());
								}
				},
				onRequestsListReceived(event, arg) {
								this.setState({
												requests: arg,
												requestsToDisplay: arg.map(function(item) {
																return {id: item.request.id, method: item.request.method, url: item.request.url, call: item}
												})
								});

				},

				onRowSelect(row, isSelected) {
								if (isSelected) {
												this.selectedRows.push(row);
								} else {
												Arrays.removeAllOcurences(this.selectedRows, row);
								}
								this.updateSelectedRequestsStore();
				},

				onAllSelect(isSelected, currentSelectedAndDisplayData) {
								this.selectedRows = currentSelectedAndDisplayData;
								this.updateSelectedRequestsStore();
				},

				onRowClick(row) {
								this.setState({previewingRequestId: row.id});
								remote.getCurrentWebContents().send("request-clicked", row.call.response);
				},

				render() {

								var selectRowProp = {
												mode: "checkbox",
												bgColor: "#116cd6",
												onSelect: this.onRowSelect,
												onSelectAll: this.onAllSelect,
												className: "row-selected",
												clickToSelect: false
								}

								var options = {
												onRowClick: this.onRowClick
								}

								function formatMethod(cell, row) {
												return '<b>' + cell.toUpperCase() + '</b>';
								}

								function formatUrl(cell, row) {
												if (this.state.previewingRequestId === row.id) {
																return '<b>' + cell + '</b>';
												} else {
																return cell
												}
								}

								function formatButton(cell, row) {
												return '<button class="btn btn-mini btn-primary">Primary</button>';
								}

								return (
												<div className="pane">
																<BootstrapTable data={this.state.requestsToDisplay} striped={true} hover={true} condensed={true} selectRow={selectRowProp} options={options}>
																				<TableHeaderColumn hidden={true} width="50" dataField="id" isKey={true} dataAlign="right">ID</TableHeaderColumn>
																				<TableHeaderColumn width="40" dataField="method" dataFormat={formatMethod} dataAlign="center">
																								Method
																				</TableHeaderColumn>
																				<TableHeaderColumn dataField="url" dataFormat={formatUrl.bind(this)}>
																								Url
																				</TableHeaderColumn>
																</BootstrapTable>
												</div>
								);

				}
});
module.exports = ContentPane;
