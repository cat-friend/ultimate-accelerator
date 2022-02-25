import title from './title.svg'
import "./About.css"
import { useSelector } from 'react-redux';

function About() {
    const user = useSelector(state => state.session.user)

    return (
        (<>{user && <>
            <div id="title">
                <img src={title} alt="Ultimate Accelerator title image" />
            </div>
            <div className="content-container">
                <div className="content">
                    <p>Ultimate Accelerator is a companion application for Respawn Entertainment's video game <i>Apex Legends</i>. In <i>Apex Legends</i>, the Battle Pass is a system that rewards players for accruing stars and "leveling up" their Battle Pass. Players can unlock character cosmetics and in-game currency by advancing their Battle Pass levels. Battle Pass levels increase when the player has accrued enough stars to "level up."  Players earn stars by completing daily, weekly, and/or event challenges.
                    </p>
                    <p align="center"><i class="fa-solid fa-star"></i> <i class="fa-solid fa-star"></i> <i class="fa-solid fa-star"></i> Complete Challenges &gt; Earn Stars &gt; Level Up Battle Pass &gt; Earn Rewards <i class="fa-solid fa-star"></i> <i class="fa-solid fa-star"></i> <i class="fa-solid fa-star"></i></p>
                    <p>Ulimate Accelerator is an app that helps players determine the most efficient way to play <i>Apex Legends</i> by determining the combination of challenges that can be completed simultaneously that maximizes the number of stars that they can accrue. Players enter their outstanding challenges. They can view, update, and delete their challenges.</p>
                    <p>Ultimate Accelerator also gives players a way to connect with other <i>Apex Legends</i> players. They can create and join clans and post messages on their clan's page.</p>
                </div>
            </div></>}
        </>
        )
    );
}

export default About;
