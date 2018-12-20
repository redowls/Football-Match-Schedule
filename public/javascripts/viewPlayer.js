var idTeam

$(function(){
    var params = window.location.search
    var search = new URLSearchParams(params)
    var idPlayer = search.get('idPlayer')
    var link = 'https://www.thesportsdb.com/api/v1/json/1/lookupplayer.php?id='+idPlayer
    var opt = {
        url : link,
        type : 'GET'
    } 
    var req = $.ajax(opt)
    req.done(function(res){
        var temp = res.players[0]
        $('#playerImg').attr('src', temp.strThumb)
        $('#textWeight').text('Weight(kg)')
        $('#textHeight').text('Height(m)')
        $('#weight').text(temp.strWeight)
        $('#height').text(temp.strHeight)
        $('#playerStatus').text(temp.strPosition)
        $('#descPlayer').text(temp.strDescriptionEN)
        idTeam = temp.idTeam
    })

    $('#playerImg').attr
})

$(document).ready(function(){
    $('#back').click(function(){
        window.location.href='viewTeam?idTeam='+idTeam
    })
})