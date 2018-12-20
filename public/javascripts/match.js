var status = 'next'

function add(leagueData, idLeagues){
    $('#lvLeague').empty()
    for (let index = 0; index < leagueData.length; index++) {
        var temp = leagueData[index]
        var date = `<h5>${temp.dateEvent} ${temp.strTime}</h5>`
        var vs = `<h3>${temp.strEvent}</h3>`
        var detail = `<a data-ajax="false" href="detail?e=${temp.idEvent}" data-role="button">Detail</a>`
        var listView = `<li><div>${date}${vs}${detail}</div></li>`
        $('#lvLeague').append(listView)
        $('#lvLeague').trigger('create')
        $('#lvLeague').listview('refresh')
    }
}

function match(){
    if(status == 'next'){
        var link = 'https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id='+$('#idLeagues').val()
    }else{
        var link = 'https://www.thesportsdb.com/api/v1/json/1/eventspastleague.php?id='+$('#idLeagues').val()
    }
    var opt = {
        url : link,
        type : 'GET'
    }
    var req = $.ajax(opt)
    req.done(function(res){
        add(res.events, $('#idLeagues').val())
    })
}

$(function(){
    match()
})

$(document).ready(function(){
    $('#lastMatch').click(function(e){
        status = 'prev'
        match()
    })
    $('#nextMatch').click(function(e){
        status = 'next'
        match()
    })
    $('#match').click(function(){
        window.location.href = "/match"
    })
    $('#teams').click(function(){
        window.location.href = "/teams"
    })
    $('#fav').click(function(){
        window.location.href = "/favorites"
    })
    $('#logout').click(function(){
        sessionStorage.clear()
        window.location.href = '/'
    })
})