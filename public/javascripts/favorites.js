var status = 'event'
var data


function eventFav(){
    $('#lvFav').empty()
    for (let index = 0; index < data.length; index++) {
        var link = 'https://www.thesportsdb.com/api/v1/json/1/lookupevent.php?id='+data[index]
        var opt = {
            url : link,
            type : 'GET'
        }
        var req = $.ajax(opt)
        req.done(function(res){
            var temp = res.events[0]
            var date = `<h5>${temp.dateEvent} ${temp.strTime}</h5>`
            var vs = `<h3>${temp.strEvent}</h3>`
            var detail = `<a data-ajax="false" href="detail?e=${temp.idEvent}" data-role="button">Detail</a>`
            var listView = `<li><div>${date}${vs}${detail}</div></li>`
            $('#lvFav').append(listView)
            $('#lvFav').trigger('create')
            $('#lvFav').listview('refresh')
        })
    }
}

function teamFav(){
    $('#lvFav').empty()
    for (let index = 0; index < data.length; index++) {
        var link = 'https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id='+data[index]
        var opt = {
            url : link,
            type : 'GET'
        }
        var req = $.ajax(opt)
        req.done(function(res){
            var temp = res.teams[0]
            var img = `<img src="${temp.strTeamBadge}" style="width:50px;height:50px;"/>`
            var name = `<h3>${temp.strTeam}</h3>`
            var listView = `<li><a data-ajax="false" href='viewTeam?idTeam=${temp.idTeam}'><table><div style="display:inline"><tr><th>${img}</th><th>${name}</th></tr></div></table></a></li>`
            $('#lvFav').append(listView)
            $('#lvFav').trigger('create')
            $('#lvFav').listview('refresh')
        })
    }
    
}

function getData(){
    var opt = {
        url : '/favList',
        type : 'POST',
        data : {
            status : status,
            index : sessionStorage.getItem('userId'),
            id : sessionStorage.getItem('userId')
        }
    }
    var req = $.ajax(opt)
    req.done(function(res){
        data = res.data
        if(res.index != -1){
            if(status == 'event'){
                eventFav()
            }else{
                teamFav()
            }
        }
    })
}


$(document).ready(function(){
    $('#match').click(function(e){
        status = 'event'
        getData()
    })
    $('#team').click(function(e){
        status = 'team'
        getData()
    })
    $('#matchs').click(function(){
        window.location.href = "/match"
    })
    $('#teams').click(function(){
        window.location.href = "/teams"
    })
    $('#fav').click(function(){
        window.location.href = "/favorites"
    })
})

$(function(){
    getData()
})