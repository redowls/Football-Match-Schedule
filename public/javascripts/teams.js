function add(leaguesData){
    $('#lvTeams').empty()
    for (let index = 0; index < leaguesData.length; index++) {
        var temp = leaguesData[index]
        var img = `<img src="${temp.strTeamBadge}" style="width:50px;height:50px;"/>`
        var name = `<h3>${temp.strTeam}</h3>`
        var listView = `<li><a data-ajax="false" href='viewTeam?idTeam=${temp.idTeam}'><table><div style="display:inline"><tr><th>${img}</th><th>${name}</th></tr></div></table></a></li>`
        $('#lvTeams').append(listView)
        $('#lvTeams').trigger('create')
        $('#lvTeams').listview('refresh')
    }
}

function leguage(){
    var link = 'https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id='+$('#idLeagues').val()
    var opt = {
        url : link,
        type : 'GET'
    }
    var req = $.ajax(opt)
    req.done(function(res){
        add(res.teams)
    })
}

$(function(){
    leguage()
})

$(document).ready(function(){
    $('#match').click(function(){
        window.location.href = "/match"
    })
    $('#teams').click(function(){
        window.location.href = "/teams"
    })
    $('#fav').click(function(){
        window.location.href = "/favorites"
    })
})