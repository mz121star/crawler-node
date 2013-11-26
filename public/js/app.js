// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
Array.prototype.remove=function(dx)
{
    if(isNaN(dx)||dx>this.length){return false;}
    for(var i=0,n=0;i<this.length;i++)
    {
        if(this[i]!=this[dx])
        {
            this[n++]=this[i]
        }
    }
    this.length-=1
}
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
                {valtext: ko.observable("/text/") }
            ])
        });
    }
    self.addNextText = function (kv) {
        kv.values.push( {valtext: ko.observable("/text/") });
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
    self.removeSubText = function (kv) {
       console.log(kv.valtext())

        var values= self.keyVals()[0].values();
        for(var i=0;i<values.length;i++){
            if(values[i]===kv){
                  values.remove(i)
            }
        }
    }

    self.syntax = ko.computed(function () {
        console.log("over")
        var result = "";
        for (var i = 0; i < self.keyVals().length; i++) {
            result += self.keyVals()[i].key() + "=";

            var values= self.keyVals()[i].values()
            var _temp=[]
            for (var k = 0; k < values.length; k++) {
              //  result +="=>"+ values[k].valtext()/*.join("=>")*/;
                _temp.push(values[k].valtext())
            }
            result += _temp.join("=>") ;
            result+=","

        }
        return result.slice(0,result.length-1);
    });


}

// Activates knockout.js
ko.applyBindings(new AppViewModel());