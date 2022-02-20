import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ChallengesBrowser from "../ChallengesBrowser";
import AddChallengeForm from "../ChallengesForms/AddChallengeForm";

function Challenges() {
    return (
        <>
            <AddChallengeForm />
            <ChallengesBrowser />
        </>)
}

export default Challenges;
