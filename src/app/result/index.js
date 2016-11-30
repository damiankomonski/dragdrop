import ResultComponent from './result.component';
import ngResource from 'angular-resource';
require('./result.scss');


const ResultModule = angular
    .module('result', [ngResource])
    .component('resultComponent', ResultComponent)
    .config(($stateProvider) => {
        $stateProvider
            .state('result', {
                url: '/result',
                params: {
                    time: 0
                },
                template: '<result-component></result-component>'
            });
    });

export default ResultModule;