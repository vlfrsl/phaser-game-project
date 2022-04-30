
import { chooseVariants } from "../constants/chooseVariants.js";

export const getCurrentCategory = (progressStatus) => {
    let categories = Object.keys(chooseVariants)
    return categories[progressStatus]
}