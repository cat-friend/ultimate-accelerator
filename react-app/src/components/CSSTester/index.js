import { Link } from "react-router-dom"
import TestModal from "./TestModal"
function CSSTester() {
    return (
        <>
            <div className="header-parent">
                <div className="left-corner"></div>
                <div className="header-child"><h2>HELLO WORLD</h2></div>
                <div className="right-corner"></div>
            </div>
            <div className="content-container">
                <div className="content">
                    <p><Link to="/users/1/challenges">THIS IS A LINK</Link></p>
                    <p><TestModal /></p>
                    <p>HELLO</p>
                    <p>HELLO</p>
                    <p>HELLO</p>
                    <p>HELLO</p>
                    <p>HELLO</p>
                    <p>HELLO</p>
                    <p>HELLO</p>
                    <p>HELLO</p>
                    <p>HELLO</p>
                    <p>HELLO</p>
                    <p>HELLO</p>
                    <p>HELLO</p>
                    <p>HELLO</p>
                </div>
            </div>
        </>
    )
}
export default CSSTester
