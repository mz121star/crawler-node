// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
/*Array.prototype.remove=function(dx)
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
 }*/
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
    self.expStr=    ko.observable();
    var browser = $("#browser")
    //页面上step文本框个数
        ,counter=0
    //当前选中的step文本框
      ,_CURRENT_REG_TEXT
        ,_CURRENT_KEY_TEXT
      //self._CURRENT_REG_TEXT  =ko.observable();
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
        kv.values.push({valtext: ko.observable("/text/") });
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
         for (var k = 0; k < self.keyVals().length;k++) {
            var values = self.keyVals()[k].values();
            for (var i = 0; i < values.length; i++) {
                if (values[i] === kv) {
                    self.keyVals()[k].values.remove(kv)
                }
            }
        }
    }  ;
    self.showIcons=function(data, event) {
        $(event.target.parentNode).find("button").show()
    }
    self.hideIcons=function(data, event) {
        $(event.target.parentNode).find("button").hide()
    }
    self.setCurrentTextForBrowser=function(data, event){
         _CURRENT_REG_TEXT= $(event.target.parentNode).find(".stepReg")[0];
    };
  /*  self.setCurrentText=function(data, event){
        _CURRENT_REG_TEXT= $(event.target)[0];
    };*/
    self.previewText=function(data, event){
        _CURRENT_REG_TEXT= $(event.target)[0];
        self.expStr( $(event.target).val());
           /* $("#expPreview"). val( $(event.target).val())*/
    }
    self.saveExpression=function(data,event){
        $(_CURRENT_REG_TEXT).val(self.expStr());
        $(_CURRENT_REG_TEXT).change();
    };
    self.selectKey=function(data,event){
        _CURRENT_KEY_TEXT=$(event.target) ;
    };
    self.saveKey=function(data,event){
        _CURRENT_KEY_TEXT.val( $("#keyResult").val())
        $(_CURRENT_KEY_TEXT).change();
    };
    $(".keyVar").on("click",function(){
        var result="["+$(this).val()+$("#keyName").val()+"]";
        $("#keyResult").val(result)
    });


    self.syntax = ko.computed(function () {
        console.log("over")
        var result = "";
        for (var i = 0; i < self.keyVals().length; i++) {
            result += self.keyVals()[i].key() + "=";

            var values = self.keyVals()[i].values()
            var _temp = []
            for (var k = 0; k < values.length; k++) {
                //  result +="=>"+ values[k].valtext()/*.join("=>")*/;
                _temp.push(values[k].valtext())
            }
            result += _temp.join("=>");
            result += ","

        }
        return result.slice(0, result.length - 1);
    });


}

// Activates knockout.js
ko.applyBindings(new AppViewModel());