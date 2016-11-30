import StartComponent from './start.component';
import ngResource from 'angular-resource';
import loadFileFactory from './start.factory';
require('./start.scss');


const StartModule = angular
    .module('start', [ngResource])
    .component('startComponent', StartComponent)
    .factory('loadFileFactory', loadFileFactory)
    .config(($stateProvider) => {
        $stateProvider
            .state('start', {
                url: '/start',
                template: '<start-component></start-component>'
            });
    });


export default StartModule;