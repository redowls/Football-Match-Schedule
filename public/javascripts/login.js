function doLogin(){
    $(document).ready(function(){
        var req = $.ajax({
            url : '/login',
            type : 'POST',
            data : {
                username : $('#username').val(),
                password : $('#password').val()
            }
        })
        req.done(function(e){
            if(e.index == -1){
                alert('invalid username or password')
            }else{
                sessionStorage.setItem("userId", e.index)
                window.location.href = "/match"
            }
        })
    })
}
$(document).ready(function(){
    $('#register').click(function(){
        window.location.href="/register"
    })
})