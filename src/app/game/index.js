import GameComponent from './game.component';
import ngResource from 'angular-resource';
require('./game.scss');


const GameModule = angular
    .module('game', [ngResource])
    .component('gameComponent', GameComponent)
    .config(($stateProvider) => {
        $stateProvider
            .state('game', {
                url: '/game',
                params: {
                    dataJSON: [],
                    JSONRandomData: []
                },
                template: '<game-component></game-component>'
            });
    });


export default GameModule;