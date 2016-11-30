import GameModule from './game/index';
import StartModule from './start/index';
import ResultModule from './result/index';

angular
    .module('App', ['ui.router', 'hmTouchEvents', 'start', 'game', 'result'])
    .config( ($stateProvider, $urlRouterProvider, $locationProvider) => {
        $urlRouterProvider.otherwise('/start');
        $locationProvider.html5Mode(true);
    });































/*
 function getModuleName(module){
 return module.name || module.default.name;
 }

 const appDependencies = [
 'ui.router'
 ];


 const appModules = [
 require('./game/index.js'),
 require('./result_other/result.module.js')
 ];*/



/*
angular
    .module('App', appDependencies.concat(appModules.map(getModuleName)))
    .config( ($stateProvider, $urlRouterProvider, $locationProvider) => {
        $urlRouterProvider.otherwise('/game');

        $locationProvider.html5Mode(true);
    });
*/

/*
.config( ($UrlRouterProvider, $mdThemingProvider) => {
    $UrlRouterProvider.otherwise('/game');

    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('orange');
});*/