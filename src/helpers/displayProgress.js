
export const showProgress = (progressStatus,text, textBg,categories, currentProgress) => {
    text.setVisible(false)
    textBg.setVisible(false)

    if (progressStatus === categories.length) {
        currentProgress.setTexture(`progress-${progressStatus}`)
            .setVisible(true)
    } else {
        currentProgress.setTexture(`progress-${progressStatus}`)
            .setVisible(true)
    }
}

export const hideProgress = (text, textBg, currentProgress) => {
    text.setVisible(true)
    textBg.setVisible(true)
    currentProgress.setVisible(false)
}