

// positions of game objects which should be repeated in several scenes
export function getPositions () {
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2

    const girlPosition = {
        x: screenCenterX,
        y: 500,
        scaleX: 0.5,
        scaleY: 0.35,
    }
    const manPosition = {
        x: screenCenterX,
        y: 450,
        scaleX: 0.7,
        scaleY: 0.5,
    }

    return [girlPosition, manPosition]
}
