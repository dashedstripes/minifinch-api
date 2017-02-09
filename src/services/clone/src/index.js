// Dependencies
const Promise = require('promise');
const readlineSync = require('readline-sync');
const request = require('request');
// Custom dependencies
const zdrequest = require('./libs/zdrequest');
const models = require('./config/models');
const TicketForms = require('./objects/ticket_forms');

var Minifinch = function () {

  let accounts = {};
  let filters = [];

  // Objects the user has selected
  let selectedObjects = [];
  // All objects and dependencies that will be created
  let objectsToCreate = [];

  // Store ticket forms object in ticketForms variable
  let ticketForms;

  // Start function - minifinch is called from here
  this.start = function(a, f) {
    accounts = a;
    filters = f;
    ticketForms = new TicketForms(accounts);
    getSelectionFromUser();
    organizeDependencies();
    createObjects();
  };

  // Iterate through each model and get selection from user
  function getSelectionFromUser() {
    filters.forEach(function(filter) {
      if(filter.enabled) {
        models.forEach(function(model) {
          if(filter.slug == model.name) {
            selectedObjects.push(model)
          }
        })
      }
    })
  };

  /**
   * Get any dependencies from objects the user has selected and
   * save them into objectsToCreate
   */
  function organizeDependencies() {
    selectedObjects.forEach(function(object){
      if(objectsToCreate.indexOf(object) == -1){
        if(object.dependencies.length != 0) {
          object.dependencies.forEach(function(dependency){
            var currentDependency = findObjectFromDependency(dependency);
            if(objectsToCreate.indexOf(currentDependency) == -1){
              objectsToCreate.push(currentDependency);
            }
          });
          objectsToCreate.push(object);
        }else{
          objectsToCreate.push(object);
        }
      }
    });
  };

  /**
   * Get the object that matches the dependency name
   * @param {string} dependency
   */
  function findObjectFromDependency(dependency) {
    for(var object in models){
      if(models[object].name == dependency) {
        return models[object];
      }
    }
  };

  // Create all objects from objectsToCreate array
  function createObjects() {
    var objectsToCreatePromises = [];
    objectsToCreate.forEach(function(object){
      var toClone = [];
      // Get JSON list of current object from accountA
      zdrequest.get(accounts.a, object.name).then(function(result){
        toClone = JSON.parse(result)[object.name];
      }).then(function(){
        toClone.forEach(function(objectToClone){
          if(object.name == 'ticket_forms'){
            objectsToCreatePromises.push(ticketForms.create(object, objectToClone));
          }else{
            objectsToCreatePromises.push(zdrequest.post(accounts.b, object.name, object.singular, objectToClone));
          }
        });
      }).then(function() {
        Promise.all(objectsToCreatePromises).then(function(){
          console.log(`${object.title} cloned!`); 
        });
      });
    });
  }

};

module.exports = Minifinch;