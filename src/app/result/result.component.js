class ResultController{
    constructor($state, $stateParams){
        this.$state = $state;
        this.time = $stateParams.time;
    }
};

const ResultComponent = {
    controller: ResultController,
    controllerAs: 'result',
    templateUrl: './src/app/result/result.html'
};

export default ResultComponent;