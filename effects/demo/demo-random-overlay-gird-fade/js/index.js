$(document).ready(function(){
    for (var i=0;i<12;i++){
        $(".image-container").append("<span></span>");
    }
    $(".image-container span").each(function(i){
        var $item = $(this),
            $randomNumber = Math.random() * 800;
        
        function loop(){
            $item.animate({
                'opacity': 0.5 * Math.random()
            }, 3000, loop);
        }
        setTimeout(function(){
            loop();
        },$randomNumber);

    });
});