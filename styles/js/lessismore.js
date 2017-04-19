!function ($) {
    (function (btn) {
        $(window).scroll(function(){
            if ($(window).scrollTop()>400){
                btn.fadeIn(400);
            } else {
                btn.fadeOut(600);
            }
        });//按钮消失和出现
        btn.click(function(){
            $('body,html').animate({scrollTop:0},1000);
        });
    })($('#gotop'));
  $(function () {
      orderTheLeftNavigations();
    function orderTheLeftNavigations(){
	    $('#navigation .sidenav').html($("#markdown-toc").html());
	    $('#navigation .sidenav ul').addClass("nav");
	    $("#markdown-toc").remove();
      // 添加Bootstrap表格样式 table-hover 
      $(".docs-content table").addClass("table table-hover");
  	}
  	$(window).load(initilizeAfterLoad);
    function initilizeAfterLoad(){
      repairTheImagesWhichCrossTheMaxWidth();
      resetHeadersStyles();
    }
    // 重新计算图片显示大小。
  	function repairTheImagesWhichCrossTheMaxWidth(){
  		var images = $(".docs-content img"),
            Awidth = $("article.post-content").width();
  		if(images != undefined && images.length > 0){
  			for(var i=0; i< images.length;i++){
  				var imgWidth = images[i].width;
  				if( imgWidth >= Awidth ){
  					 images[i].width = Awidth;
  				}
  			}
  		}
  	}
    // 设置标题样式
    function resetHeadersStyles(){
      resetHeaderItemStyles($(".docs-content h1"));
      resetHeaderItemStyles($(".docs-content h2"));
    }
    function resetHeaderItemStyles(headers){
      if(headers != undefined && headers.length > 0){
        for(var i=0; i< headers.length;i++){
          var header = headers[i];
          $(header).html($(header).html() + '<span class="anchor-target" id="' + header.id + '"></span>' +
            '<a href="#' + header.id + '" name="' + header.id + '" class="anchor glyphicon glyphicon-link"></a>');
          $(header).removeAttr('id');
        }
      }
    }
  })
    //文章内图片点击放大
    $('.post-content img').zoomify();
}(jQuery)
//搜索
SimpleJekyllSearch({
    searchInput: document.getElementById('search-input'),
    resultsContainer: document.getElementById('results-container'),
    json: '/search.json',
    searchResultTemplate: '<li><a href="{url}">. {title}</a></li>',
    noResultsText: '',
    limit: 5,
    fuzzy: true,
    exclude: ['Welcome']
});