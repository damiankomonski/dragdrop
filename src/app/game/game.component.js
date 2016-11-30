class GameController {
    constructor($state, $stateParams, $interval, $timeout){
        //"ngInject";
        this.$interval = $interval;
        this.$timeout = $timeout;
        this.$state = $state;
        this.dataJSON = $stateParams.dataJSON;
        this.JSONRandomData = $stateParams.JSONRandomData;
        this.time = 0;
        this.matchingCount = 0;
        this.checkScore();
        this.timer();
    }

    onHammer($event, object){
        object.positionLeft = object.oldLeftPosition + $event.deltaX;
        object.positionTop = object.oldTopPosition + $event.deltaY;

        if(object.positionLeft < 0){ object.positionLeft = 0;}
        if(object.positionLeft > (window.innerWidth - object.width)){ object.positionLeft = (window.innerWidth - object.width);}
        if(object.positionTop < 52){ object.positionTop = 52;}
        if(object.positionTop > (window.innerHeight - object.height)){ object.positionTop = (window.innerHeight - object.height);}

        this.checkColision(object, this.JSONRandomData[object.id]);
        this.checkScore();
    }

    dropHammer($event, object){
        object.oldLeftPosition = object.positionLeft;
        object.oldTopPosition = object.positionTop;
    }

    checkColision(box1, box2){
        if(box1.positionLeft < box2.positionLeft + box2.width &&
        box1.positionLeft + box1.width > box2.positionLeft &&
        box1.positionTop < box2.positionTop + box2.height &&
        box1.positionTop + box1.height > box2.positionTop){
            if(!box1.matching){this.matchingCount++;}
            box1.matching = true;
        }
    }

    checkScore(){
        let score = 0;
        for(let i = 0 ; i < this.dataJSON.length ; i++){
            if(this.dataJSON[i].matching){score++;}
        };
        if(score === this.dataJSON.length){
            this.$state.go('result', {
                time: this.time
            });
            //alert('wygrales, czas: ' + this.time + 'ms');

        }

    };

    timer(){
        this.$interval(() => {
            this.time = this.time + 1;
        }, 1);
    };
}


const GameComponent = {
    controller: GameController,
    controllerAs: 'game',
    templateUrl: './src/app/game/game.html'
};

export default GameComponent;