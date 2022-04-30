import { showProgress, hideProgress } from "./displayProgress.js";
import { getCurrentCategory } from "./getCurrentCategory.js";

import {positions} from "../constants/positions.js";

export const showTransformation = (emitter, progressStatus, chosenGirl,happyGirl,text,textBg,categories,currentProgress) => {
    emitter.on = true;
    showHappiness(chosenGirl, happyGirl);
    showProgress(progressStatus,text,textBg,categories,currentProgress);

    text.setText(`Choose your ${getCurrentCategory(progressStatus)}`)
}


export const hideTransformation = (emitter,chosenGirl, happyGirl,text, textBg, currentProgress) => {
    emitter.on = false;
    hideHappiness(chosenGirl, happyGirl);
    hideProgress(text, textBg, currentProgress);
}

const showHappiness = (chosenGirl, happyGirl) => {
    chosenGirl.setScale(0)

    happyGirl.setScale(
        positions.girl.scaleX,
        positions.girl.scaleY + 0.05,
    )
}

const hideHappiness = (chosenGirl, happyGirl) => {
    happyGirl.setScale(0)

    chosenGirl.setScale(
        positions.girl.scaleX,
        positions.girl.scaleY
    )
}