// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
function AppViewModel() {
    var self = this
    self.firstName = ko.observable("Bert");
    self.lastName = ko.observable("Bertington");
    self.fullName = ko.computed(function () {
        return self.firstName() + " " + self.lastName();
    }, self);
    self.capitalizeLastName = function () {
        var currentVal = self.lastName();        // Read the current value
        self.lastName(currentVal.toUpperCase()); // Write back a modified value
    };
    self.addNewText = function () {
      /*  self.keyVals.push({
            key: ko.observable("Title"),
            value: ko.observableArray([
                ko.observable("/text/")
            ])
        });*/
        self.keyVals.push({
            key: ko.observable("Title"),
            values: ko.observableArray([
                ko.observable("/text/")
            ])
        });
    }
    self.addNextText = function (kv) {
        kv.values.push("/new/");
       /* self.keyVals()[0].values.push(("/new/"))*/
    }
    self.keyVals = ko.observableArray([
        {
            key: ko.observable("Title"),
            values: ko.observableArray([
                {valtext: ko.observable("/text/") }
            ])
        }
    ]);
    self.remove = function (kv) {
        self.keyVals.remove(kv)
    }
    self.syntax = ko.computed(function () {
        console.log("over")
        var result = "";
        for (var i = 0; i < self.keyVals().length; i++) {
            result += self.keyVals()[i].key() + "=";

           /*result += self.keyVals()[i].values().join("=>") + ",";*/
            for (var k = 0; k < self.keyVals()[i].values().length; k++) {
                result += self.keyVals()[i].values().join("=>");
            }
            result+=","

        }
        return result;
    });


}

// Activates knockout.js
ko.applyBindings(new AppViewModel());