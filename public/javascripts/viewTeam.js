var status = 'overview'
var idTeam
var dataop

$(document).ready(function(){
    var params = window.location.search
    var search = new URLSearchParams(params)
    var idTeam = search.get('idTeam')
    $('#fav').click(function(){
        var req = $.ajax({
            url : '/favTeam',
            type : 'POST',
            data : {
                index : idTeam,
                id : sessionStorage.getItem('userId')
            }
        })
        req.done(function(res){
            
        })
        alert('save to favorite')
        $('#fav').hide()
    })
    $('#back').click(function(){
        window.location.href = '/teams'
    })
    $('#overview').click(function(){
        status = 'overview'
        getData(idTeam)
    })
    $('#player').click(function(){
        status = 'player'
        getData(idTeam)
    })
})

function getData(idTeam){
    var link = 'https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id='+idTeam
    var opt = {
        url : link,
        type : 'GET'
    }
    var req = $.ajax(opt)
    req.done(function(res){
        var temp = res.teams[0]
        $('#teamPicture').attr("src",temp.strTeamBadge)
        $('#teamYear').text(temp.intFormedYear)
        $('#teamStadium').text(temp.strStadium)
        if(status == 'overview'){
            $('#lvPlayer').empty()
            $('#descTeam').text(temp.strDescriptionEN)
        }else{
            $('#descTeam').empty()
            var linkPlayer = 'https://www.thesportsdb.com/api/v1/json/1/lookup_all_players.php?id='+temp.idTeam
            var optPlayer = {
                url : linkPlayer,
                type : 'GET'
            }
            var reqPlayer = $.ajax(optPlayer)
            reqPlayer.done(function(resPlayer){
                var tempPlayer = resPlayer.player
                for (let index = 0; index < tempPlayer.length; index++) {
                    var tempPlayerList = tempPlayer[index]
                    var playerImg = `<img width="100%" src = "${tempPlayerList.strCutout}">`
                    var playerName = `<h3>${tempPlayerList.strPlayer}</h3>`
                    var playerStatus = `<h3>${tempPlayerList.strPosition}</h3>`
                    var listView = `<li><a data-ajax="false" href='viewPlayer?idPlayer=${tempPlayerList.idPlayer}'><table width = "100%"><div style="display:inline"><tr><th>${playerImg}</th><th>${playerName}</th><th style="text-align:right">${playerStatus}</th></tr></div></table></a></li>`
                    $('#lvPlayer').append(listView)
                    $('#lvPlayer').trigger('create')
                    $('#lvPlayer').listview('refresh')
                }
            })
        }
    })
}

$(function(){
    var params = window.location.search
    var search = new URLSearchParams(params)
    idTeam = search.get('idTeam')
    var opt = {
        url : '/checkFav',
        type : 'POST',
        data : {
            index : idTeam,
            id : sessionStorage.getItem('userId'),
            status : 'team'
        }
    }
    var req = $.ajax(opt)
    req.done(function(res){
        if(res.index > -1){
            $('#fav').hide()
        }
    })
    getData(idTeam)
})