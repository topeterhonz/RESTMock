import React from "react";

class Sidebar extends React.Component {
				constructor(props) {
								super(props);
                this.state = {selectedIndex: 0};
				}
				onSelect(index) {
								this.setState({selectedIndex: index})
				}
				isActive(index) {
								if (this.state.selectedIndex == index) {
												return "nav-group-item active";
								} else {
												return "nav-group-item";
								}
				}
				render() {
								return (
												<div className="pane-sm sidebar">
																<nav className="nav-group">
																				<h5 className="nav-group-title">Favorites</h5>
																				<a className={this.isActive(0)} onClick={() => this.onSelect(0)}>
																								<span className="icon icon-home"></span>
																								connors
																				</a>
																				<span  className={this.isActive(1)} onClick={() => this.onSelect(1)}>
																								<span className="icon icon-download"></span>
																								Downloads
																				</span>
																				<span  className={this.isActive(2)} onClick={() => this.onSelect(2)}>
																								<span className="icon icon-folder"></span>
																								Documents
																				</span>
																				<span  className={this.isActive(3)} onClick={() => this.onSelect(3)}>
																								<span className="icon icon-signal"></span>
																								AirPlay
																				</span>
																				<span  className={this.isActive(4)} onClick={() => this.onSelect(4)}>
																								<span className="icon icon-print"></span>
																								Applications
																				</span>
																				<span  className={this.isActive(5)} onClick={() => this.onSelect(5)}>
																								<span className="icon icon-cloud"></span>
																								Desktop
																				</span>
																</nav>
												</div>
								);
				}
}

export default Sidebar;
