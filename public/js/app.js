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
        self.keyVals.push({key:ko.observable("Title"),value:ko.observable("/<title>(.*)<\/title>/")}) ;
    }
    self.keyVals=ko.observableArray([
        {
            key:ko.observable("Title")
           ,value:ko.observable("/<title>(.*)<\/title>/")
        }
    ]);
    self.remove = function(kv) {
        self.keyVals.remove(kv)
    }
    self.syntax = ko.computed(function() {
        var result = "";
        for (var i = 0; i < self.keyVals().length; i++)
            result += self.keyVals()[i].key()  + "="+ self.keyVals()[i].value()+","
        return result;
    });


}

// Activates knockout.js
ko.applyBindings(new AppViewModel());