class StartController {
    constructor($state, $resource, loadFileFactory) {
        this.$resource = $resource;
        this.$state = $state;
        this.loadFileFactory = loadFileFactory;
        this.JSONData = [];
        this.JSONRandomData = [];
        this.id = 0;
        this.positionTop = 0;
        this.positionLeft = 0;
        this.height = 80;
        this.width = 80;
        this.color = '';
        this.getFileData();
    };

    getFileData() {
        this.loadFileFactory.query().$promise
            .then((data) => {
                this.JSONData = data;
                this.loadFileJSONRandomData();
                this.id = this.JSONData.length;
            });
    };

    loadFileJSONRandomData() {
        for (let i = 0; i < this.JSONData.length; i++) {
            this.JSONRandomData.push({
                "id": this.JSONData[i].id,
                "positionTop": this.randomNumber(52, window.innerHeight - this.JSONData[i].height),
                "positionLeft": this.randomNumber(0, window.innerWidth - this.JSONData[i].width),
                "height": this.JSONData[i].height,
                "width": this.JSONData[i].width,
                "color": this.JSONData[i].color,
                "matching": this.JSONData[i].matching
            });
        }
    };

    createObject() {
        this.color = this.randomColor();
        this.JSONData.push({
            "id": this.id,
            "positionTop": this.positionTop + 52,
            "positionLeft": this.positionLeft,
            "height": this.height,
            "width": this.width,
            "color": this.color,
            "oldLeftPosition": this.positionLeft,
            "oldTopPosition": this.positionTop,
            "matching": false
        });
        this.JSONRandomData.push({
            "id": this.id,
            "positionTop": this.randomNumber(52, window.innerHeight - this.height),
            "positionLeft": this.randomNumber(0, window.innerWidth - this.width),
            "height": this.height,
            "width": this.width,
            "color": this.color,
            "matching": false
        });
        this.id += 1;
        this.positionTop = 0;
        this.positionLeft = 0;
        this.height = 80;
        this.width = 80;
    };

    startGame() {
        this.$state.go('game', {
            dataJSON: this.JSONData,
            JSONRandomData: this.JSONRandomData
        });
    };

    randomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}

const StartComponent = {
    controller: StartController,
    controllerAs: 'start',
    templateUrl: './src/app/start/start.html'
};

export default StartComponent;