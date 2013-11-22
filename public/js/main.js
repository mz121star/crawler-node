(function ($) {
    $('#stepReg').tooltip({})
    /*********************************************************************
     * 注册全局变量
     **********************************************************************/
    var browser = $("#browser")
        //页面上step文本框个数
        ,counter=0
        //当前选中的step文本框
       ,_CURRENT_REG_TEXT


    var SetURLAddress=function(addr){
         $("#address").val(addr)
        },
        GetBrowserAddress=function(){
            var url=  document.getElementById('browser').contentWindow.document.location.href;
            var reg=/getpage\?page=(.*)/gmi
            url=url.match(reg)[0];
            return url.replace("getpage?page=","");
        } ,
        DisableEle=function(){
            $("#go").attr("disabled","disabled") ;
        },
        EnableEle=function(){
            $("#go").removeAttr("disabled");
        } ,
        RemoveStyle=function(a){
            var style=  $(a.target).data("reunion-style");
            if(style)
                $(a.target).attr("style", style)
            else
                $(a.target).removeAttr("style")
        },
        ToggleSize=function(){
            $("#fullBrowser").on("click",function(){
                $("#left").toggleClass(function(){
                    $("left").attr("class","col-md-4");
                },function(){
                    $("left").attr("class","col-md-12");
                },1000)


                $("#right").toggleClass(function(){
                    $("right").attr("class","col-md-8");
                },function(){
                    $("right").attr("class","col-md-12");
                })
               // $("#right").removeClass("col-md-8").addClass("col-md-12")
            })
        }

    /*********************************************************************
     * 为iframe中的浏览器注册事件
     **********************************************************************/
    ToggleSize();
    var registerEvent = function () {
        var doc = document.getElementById('browser').contentWindow.document;
        $(doc).on("click", function (a) {
            if(_CURRENT_REG_TEXT){
                RemoveStyle(a);
                $(_CURRENT_REG_TEXT).val(a.target.outerHTML)
            }
            console.log(a.target.innerHTML);
            console.log(a.target.outerHTML);

            return false
        })
        $(doc).on("mouseover", function (a) {
            var style= $(a.target).attr("style") ;
            $(a.target).data("reunion-style",style);
            $(a.target).css("border", "1px solid red")
        })
        $(doc).on("mouseout", function (a) {
            RemoveStyle(a);
        })

    }

    /*********************************************************************
     * 获取ifram为全局对象，并注册load事件
     **********************************************************************/

    browser.load(function () {
        $("#status").html("Local iframe is now loaded.");
        SetURLAddress(GetBrowserAddress());
        EnableEle();
        registerEvent();
    });

    /*********************************************************************
     * 浏览器iframe事件，当点击GO按钮，转向网址
     **********************************************************************/
    $("#go").on("click", function () {

       console.log( $("input:radio[name='optionsRadios'].checked").val() )

        DisableEle();
        $("#status").html("loading....");
        var address = $("#address").val();
        var url = "/getpage?page=";
        browser.attr("src", url + encodeURIComponent(address))
    })


    /*********************************************************************
     * 工具栏事件区域
     **********************************************************************/

    $(".selectRegion").on("click",function(){
       var parent= $(this).parent().parent()
        var text=$(parent).find(".stepReg")
        _CURRENT_REG_TEXT=text[0] ;
    })
    $(".previewRegion").on("click",function(){
        var parent= $(this).parent().parent()
        var text=$(parent).find(".stepReg")
       $("#expPreview"). val(text.val())
    })

    /**
     * 移除文本公式组件
     */
    $(".stepRemove").on("click",function(){
        $(this).parent().parent().remove();
    })
    /**
     * 添加文本公式组件
     */
    $("#addStep").on("click",function(){
       var shadow= $("#stepTemp").clone(true) ;
        $(shadow).find(".stepReg").val("");
       $(shadow).attr("id","step"+(counter++));
       $("#stepRegion").append(shadow);
    })




})(jQuery)
