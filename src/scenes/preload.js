
export class Preload extends Phaser.Scene {

    constructor() {
        super('preload');
    }

    preload () {
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(120, 350, 800, 80);

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 100,
            text: 'Loading...',
            style: {
                font: '42px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5).setScale(1.5,1)

        const percentText = this.make.text({
            x: width / 2,
            y: height / 2 + 100,
            text: '0%',
            style: {
                font: '42px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5).setScale(1.5,1)

        const assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 170,
            text: '',
            style: {
                font: '36px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5).setScale(1.5, 1)

        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(170, 375, 700 * value, 30);
        });

        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });
        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();

            this.scene.start('start-screen')
        });

        // girl character
        this.load.image('girl', 'src/assets/images/girl/body.png');
        this.load.image('hair', 'src/assets/images/girl/hair.png');

        // girl things
        this.load.image('pajamas', 'src/assets/images/things/clothes/pajamas.png');
        this.load.image('dress', 'src/assets/images/things/clothes/dress.png')
        this.load.image('costume', 'src/assets/images/things/clothes/costume.png')
        this.load.image('bag-blue', 'src/assets/images/things/bags/bag-blue.png')
        this.load.image('bag-brown', 'src/assets/images/things/bags/bag-brown.png')
        this.load.image('glasses', 'src/assets/images/things/accessories/glasses.png')
        this.load.image('choker', 'src/assets/images/things/accessories/choker.png')
        this.load.image('necklace', 'src/assets/images/things/accessories/necklace.png')

        // girl emotions
        this.load.image('face-excited', 'src/assets/images/girl/face/face-joy.png');
        this.load.image('face-sad', 'src/assets/images/girl/face/face-sad.png');
        this.load.image('face-joy', 'src/assets/images/girl/face/face-joy.png');

        //man character
        this.load.image('man', 'src/assets/images/man/body.png')
        this.load.image('man-hair', 'src/assets/images/man/hair.png')

        // man emotions
        this.load.image('man-face-joy', 'src/assets/images/man/face/face-joy.png')
        this.load.image('man-face-sad', 'src/assets/images/man/face/face-sad.png')

        //man clothes
        this.load.image('man-home-costume', 'src/assets/images/man/clothes/home-costume.png')
        this.load.image('man-casual-costume', 'src/assets/images/man/clothes/casual-costume.png')

        //text
        this.load.image('man-text-bg', 'src/assets/images/text/man-text-bg.png')
        this.load.image('girl-text-bg', 'src/assets/images/text/girl-text-bg.png')
        this.load.image('choose-text-bg','src/assets/images/text/choose-text-bg.png')

        //icons
        this.load.image('icon-dress', 'src/assets/images/gameplay/icons/choose-icons/icon-dress.png')
        this.load.image('icon-costume', 'src/assets/images/gameplay/icons/choose-icons/icon-costume.png')
        this.load.image('icon-bag-brown', 'src/assets/images/gameplay/icons/choose-icons/icon-brown-bag.png')
        this.load.image('icon-bag-blue', 'src/assets/images/gameplay/icons/choose-icons/icon-blue-bag.png')
        this.load.image('icon-choker', 'src/assets/images/gameplay/icons/choose-icons/icon-choker.png')
        this.load.image('icon-necklace', 'src/assets/images/gameplay/icons/choose-icons/icon-necklace.png')
        this.load.image('icon-glasses', 'src/assets/images/gameplay/icons/choose-icons/icon-glasses.png')
        this.load.image('icon-beach', 'src/assets/images/gameplay/icons/choose-icons/icon-beach.png')
        this.load.image('icon-terrace', 'src/assets/images/gameplay/icons/choose-icons/icon-terrace.png')
        this.load.image('icon-skip', 'src/assets/images/gameplay/icons/icon-skip.png')
        this.load.image('idea', 'src/assets/images/gameplay/icons/icon-idea.png')
        this.load.image('pointer', 'src/assets/images/gameplay/pointer.png')
        this.load.image('star', 'src/assets/images/gameplay/star.png')
        this.load.image('red-magic', 'src/assets/images/gameplay/red-magic.png')
        this.load.image('icon-swipe-or-tap', 'src/assets/images/gameplay/icons/icon-swipe-or-tap.png')

        // places/backgrounds
        this.load.image('home', 'src/assets/images/places/home.png')
        this.load.image('dark-bg', 'src/assets/images/places/dark-bg.png')
        this.load.image('beach', 'src/assets/images/places/beach.png')
        this.load.image('terrace', 'src/assets/images/places/terrace.png')

        //progress
        this.load.image('progress-0', 'src/assets/images/gameplay/progress/progress-0.png')
        this.load.image('progress-1', 'src/assets/images/gameplay/progress/progress-1.png')
        this.load.image('progress-2', 'src/assets/images/gameplay/progress/progress-2.png')
        this.load.image('progress-3', 'src/assets/images/gameplay/progress/progress-3.png')
        this.load.image('progress-4', 'src/assets/images/gameplay/progress/progress-4.png')


        // emoji
        this.load.image('emoji-love', 'src/assets/images/gameplay/emoji-love.png')
        this.load.image('emoji-sad', 'src/assets/images/gameplay/emoji-sad.png')

        // other
        this.load.image('rectangle-white', 'src/assets/images/gameplay/rectangle-white.png')
        this.load.image('rectangle-green', 'src/assets/images/gameplay/rectangle-green.png')
        // this.load.image('choose-bg', 'src/assets/images/gameplay/icons/choose-rectangle.png')
    }

}