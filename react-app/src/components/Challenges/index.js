import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ChallengesBrowser from "../ChallengesBrowser";
import AddChallengeForm from "../ChallengesForms/AddChallengeForm";

function Challenges() {
    return (
        <div className="root">
            <AddChallengeForm />
            <ChallengesBrowser />
        </div>)
}

export default Challenges;
