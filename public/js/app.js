// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
function AppViewModel() {
    var self=this
    self.firstName = ko.observable("Bert");
    self.lastName = ko.observable("Bertington");
    self.fullName = ko.computed(function() {
        return self.firstName() + " " + self.lastName();
    }, self);
    self.capitalizeLastName = function() {
        var currentVal = self.lastName();        // Read the current value
        self.lastName(currentVal.toUpperCase()); // Write back a modified value
    };
    self.addText=function(){
        self.keyVals.push({key:"Title",value:"/<title>(.*)<\/title>/"}) ;
    }
    self.keyVals=ko.observableArray([
        {key:"Title",value:"/<title>(.*)<\/title>/"}
    ]);


}

// Activates knockout.js
ko.applyBindings(new AppViewModel());