
// game data/logic
// includes info about categories/choose-variants/chosen things/progress
// setting loose/win
export const gameProcess = {

    progress : 0,
    categories: ['clothes', 'bag', 'accessories', 'place'],

    chosen : {
        clothes : 'pajamas',
        bag : null,
        accessories: null,
        place: null
    },

    chooseAlternative: function() { // is alternative variant should be chosen
        return this.chosen.clothes === 'costume'
    },

    isLooser: function () {
        return this.chosen.clothes === 'costume'
    },

    incrementProgress: function () {
        if (this.progress+1 !== this.categories.length) {
            this.progress += 1
        }
    },

    getCurrentCategory: function () {
        return this.categories[this.progress]
    },

    getCurrentChooseVariants : function () {
        const variants = {
            'clothes' : {
                var1 : 'icon-dress',
                var2 : 'icon-costume',
            },

            'bag' : {
                var1 : 'icon-bag-brown',
                var2 : 'icon-bag-blue',
            },

            'accessories' : {
                var1 : 'icon-glasses',
                var2 : this.chooseAlternative() ? 'icon-necklace' : 'icon-choker',
            },

            'place' : {
                var1 : 'icon-beach',
                var2 : 'icon-terrace'
            }
        }

        return variants[this.getCurrentCategory()]
    },

    // replace icon-name with thing name
    // icon-bag-brown => bag-brown
    getNameWithIcon: function(iconName) {
        return iconName.slice(iconName.indexOf('-')+1)
    },

    setChosen: function (iconName) {
        const thingName = this.getNameWithIcon(iconName)
        const category = this.getCurrentCategory()

        this.chosen[category] = thingName
    },

    setDefault: function () {
        this.progress = 0
        this.chosen = {
            clothes : 'pajamas',
            bag : null,
            accessories: null,
            place: null
        }
    }
}