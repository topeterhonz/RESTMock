import React from "react";
import ReactDom from "react-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import UpperFooter from "./components/UpperFooter.jsx";
import Sidebar from "./components/Sidebar.jsx";
import RequestsTablePane from "./components/RequestsTablePane.jsx";
import ResponsePreviewPane from "./components/ResponsePreviewPane.jsx";

ReactDom.render(
				<div className="window">
				<Header/>
				<div className="window-content">
								<div className="pane-group">
												<RequestsTablePane/>
												<ResponsePreviewPane/>
								</div>
				</div>
				<UpperFooter />
				<Footer/>
</div>, document.querySelector("#main"));
