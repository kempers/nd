$(function(){
    $(document).ready(function() {
    $("#n").keydown(function(event) {
        // Разрешаем: backspace, delete, tab и escape
        if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || 
             // Разрешаем: Ctrl+A
            (event.keyCode == 65 && event.ctrlKey === true) || 
             // Разрешаем: home, end, влево, вправо
            (event.keyCode >= 35 && event.keyCode <= 39)) {
                 // Ничего не делаем
                 return;
        }
        else {
            // Обеждаемся, что это цифра, и останавливаем событие keypress
            if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                event.preventDefault(); 
            }   
        }
    });
});
    $("#back").submit(function(e){
        e.preventDefault();
    });

    $("#check").click(function(){
        var data = {
            "src" : $("#n").val()
        };
        $.ajax({
            method: "POST",
            url: "/captcha",
            data: data
        })
            .success(function(result){
                $("h1").html(result.answ);
            })
            .fail(function(result){
                $("h1").html(result.answ);
            });
    });
    $('img').on('click',function(){
        $(this).hide().attr('src', '/captchasrc/?num='+Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000).show("slow");
    });
});