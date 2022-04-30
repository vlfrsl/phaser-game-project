import { positions } from "../constants/positions.js";

export const addThing = (thingObj, textureName, positionsKey) => {
    thingObj
        .setTexture(textureName)
        .setPosition(
            positions[positionsKey].x,
            positions[positionsKey].y,
        )
        .setScale(
            positions[positionsKey].scaleX,
            positions[positionsKey].scaleY,
        )
}
