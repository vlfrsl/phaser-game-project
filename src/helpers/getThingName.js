
// icon-blue-bag => blue-bag
export const getThingName = (iconName) => {
    return iconName.slice(iconName.indexOf('-')+1)
}