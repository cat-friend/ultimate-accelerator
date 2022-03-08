import title from './title.svg'
import "./About.css"
import { useSelector } from 'react-redux';

function About() {
    const user = useSelector(state => state.session.user)

    return (
        (<>{user && <>
            <div id="title">
                <img src={title} alt="Ultimate Accelerator title" />
                <div className="bp-container">
                    <div className="content">
                        <h3>About</h3>
                        <p>Ultimate Accelerator is a companion application for Respawn Entertainment's video game <i>Apex Legends</i>. In <i>Apex Legends</i>, the Battle Pass is a system that rewards players for accruing stars and "leveling up" their Battle Pass. Players can unlock character cosmetics and in-game currency by advancing their Battle Pass levels. Battle Pass levels increase when the player has accrued enough stars to "level up."  Players earn stars by completing daily, weekly, and/or event challenges.
                        </p>
                        <p align="center"><i className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i> Complete Challenges &gt; Earn Stars &gt; Level Up Battle Pass &gt; Earn Rewards <i className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i> <i className="fa-solid fa-star"></i></p>
                        <p>Ulimate Accelerator is an app that helps players determine the most efficient way to play <i>Apex Legends</i> by determining the combination of challenges that can be completed simultaneously that maximizes the number of stars that they can accrue. Players enter their outstanding challenges. They can view, update, and delete their challenges.</p>
                        <p>Ultimate Accelerator also gives players a way to connect with other <i>Apex Legends</i> players. They can create and join clans and post messages on their clan's page.</p>
                        <p>This project was created as my capstone project for App Academy's 24-week full-stack software engineering bootcamp.</p>
                    </div>
                    <div className="content">
                        <h3>Dedication</h3>
                        <p>This project is dedicated to:</p>
                        <ul>
                            <li className="dedication">
                                my buddies Dolph Squid, Blueberry Smith, Green Pepper, Yellow Yoshi, and Umbasa Nova -- you are the Apex Legends of my life. I love you so much, thanks for playing with me even though I fall off the map all the time;
                            </li>
                            <li>
                                my coworkers Yu Ra Kim, Daniel LaVergne, Cameron Whiteside, Bryan Arnold, Fiona Choi, Justin Sweeney, Suhayl Khan, Peter Shin, Jenn Dijaili, and Christy Chen -- this bootcamp has been one of the most enjoyable and pivotal experiences of my life and you played a huge role in that. Every morning for six (6) months, I woke up and open palm slammed a giant smile on my face because I was blessed with the opportunity to learn and develop alongside very compassionate, talented, and intelligent people and to make you laugh so hard via Discord that you have to shut your camera off in Zoom;
                            </li>
                            <li>the strong women in my life:  Francesca W., Leah W., and Rebecca S. -- thank you for your infinite patience, love, empathy, and support especially when I insist on learning everything the hard way.</li>
                        </ul>
                    </div>
                </div>
            </div></>}
        </>
        )
    );
}

export default About;
