import "./Denise.css";

function Denise() {
    return (
        <>
            <div className="header-parent">
                <div className="left-corner"></div>
                <div className="header-child"><h2>Denise P. Li</h2></div>
                <div className="right-corner"></div>
            </div>
            <div className="content-container bio" style={{alignContent: "center"}}>
                <div className="content">
                    <h3>Bio:</h3><br />
                    hi :] I'm Denise. I'm a Biologist-turned-Software-Engineer. Before pivoting to tech, I lived in
                    the
                    Kalahari Desert as a wildlife researcher and aboard commercial fishing boats in the Bering Sea as a
                    fisheries biologist and worked as an environmental scientist in Los Angeles, CA (see my first React/Redux
                    project, <a href="https://dpl-wildr.herokuapp.com" target="_blank" rel="noreferrer">Wildr</a>, for photos from my field biologist
                    days).<br /><br />
                    I'm intense. I'm resourceful. I get stuff done.<br /><br />
                    <h2><a href="https://denisepli.com" target="_blank" rel="noreferrer" style={{ fontSize: "1.5rem" }}>Website</a></h2><br/>
                    <h3>Education:</h3>
                    University of California, Berkeley. Class of 2010.<br/>
                    Majors: Integrative Biology, Psychology
                </div>
                <div className="content">
                    <div id="pic" alt="div with background image of my big dumb face"></div>
                </div>
                <div className="content" id="skills">
                    <h3 style={{gridColumn: "1/4"}}>Skills:</h3>
                    <div>Team Leadership</div>
                    <div>Project Management</div>
                    <div>Agile Methodologies</div>
                    <div>SDLC</div>
                    <div>RESTful Conventions</div>
                    <div>Object-oriented languages (JavaScript, Python)</div>
                    <div>Node</div>
                    <div>React</div>
                    <div>Redux</div>
                    <div>Express</div>
                    <div>Flask</div>
                    <div>SQLAlchemy</div>
                    <div>Sequelize</div>
                    <div>PostgreSQL</div>
                    <div>ORMs/OBDMS</div>
                    <div>AWS/Heroku</div>
                </div>
            </div>
        </>
    )
}

export default Denise;
