import React from "react";

class Header extends React.Component {
				render() {
								return (
												<header className="toolbar toolbar-header">
																<div className="half-div">
																				<h1 className="title">Requests</h1>
																</div>
																<div className="half-div">
																				<h1 className="title">Response preview</h1>
																</div>
												</header>
								);
				}
}

export default Header;
