function doRegister(){
    $(document).ready(function(){
    // var params = window.location.search
    // var search = new URLSearchParams(params)
    // var idFb = search.get('idFb')
    // if(idFb){

    // }
        getData()
    })
}

function getData(){
    console.log($('#username').val())
    var req = $.ajax({
        url : '/register',
        type : 'POST',
        data :{
            username : $('#username').val(),
            password : $('#password').val(),
            email : $('#email').val(),
        }
    })
    req.done(function(e){
        window.location.href = "/"
    })
}