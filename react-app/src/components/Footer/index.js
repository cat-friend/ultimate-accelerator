import "./Footer.css";

function Footer() {
    return (
        <div id="footer">
            <div id="skewed">
                <div id="bio-links">
                    <div><a href="mailto:denisepli@gmail.com">Denise Li</a></div>
                    <div><a href="mailto:denisepli@gmail.com">Email</a></div>
                    <div><a href="https://github.com/cat-friend/ultimate-accelerator" target="_blank" rel="noreferrer">GitHub</a></div>
                    <div><a href="https://www.linkedin.com/in/denise-li-45350320/" target="_blank" id="end" rel="noreferrer">LinkedIn</a></div>
                </div>
            </div>
            <div
                id="tech">
                <div>Tech stack:</div>
                <div>Python</div>
                <div>JavaScript</div>
                <div>ReactJS</div>
                <div>NodeJS</div>
                <div>Flask</div>
                <div>SQLAlchemy</div>
                <div>WTForms</div>
                <div>PostgreSQL</div>
                <div>HTML/CSS</div>
                <div>Deployed with Docker</div>
            </div>
        </div>
    )
}
export default Footer;
