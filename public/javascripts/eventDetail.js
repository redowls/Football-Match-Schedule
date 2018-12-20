var idEvent
function editView(data, imageHome, imageAway){
    $("#pictureHome").attr("src",imageHome);
    if(data.intHomeScore && data.intAwayScore){
        $('#vs').text(data.intHomeScore+' VS '+data.intAwayScore)
        $("#vs").css('font-size', 'large');
    }
    $('#pictureAway').attr('src', imageAway)
    $('#nameHome').text(data.strHomeTeam)
    $('#nameAway').text(data.strAwayTeam)
    $('#goalsHome').text(data.strHomeGoalDetails)
    $('#goals').text('Goals')
    $('#goalsAway').text(data.strAwayGoalDetails)
    $('#formationHome').text(data.strHomeFormation)
    $('#formation').text('Formation')
    $('#formationAway').text(data.strAwayFormation)
    $('#shotHome').text(data.intHomeShots)
    $('#shot').text('Shots')
    $('#shotAway').text(data.intAwayShots)
    $('#redCardHome').text(data.strHomeRedCards)
    $('#redCard').text('Red Cards')
    $('#redCardAway').text(data.strAwayRedCards)
    $('#yellowCardHome').text(data.strHomeYellowCards)
    $('#yellowCard').text('Yellow Cards')
    $('#yellowCardAway').text(data.strAwayYellowCards)
    $('#keeperHome').text(data.strHomeLineupGoalkeeper)
    $('#keeper').text('Line Up Goal Keeper')
    $('#keeperAway').text(data.strAwayLineupGoalkeeper)
    $('#defenseHome').text(data.strHomeLineupDefense)
    $('#defense').text('Line Up Defense')
    $('#defenseAway').text(data.strAwayLineupDefense)
    $('#midFieldHome').text(data.strHomeLineupMidfield)
    $('#midField').text('Line Up Midfield')
    $('#midFieldAway').text(data.strAwayLineupMidfield)
    $('#fowardHome').text(data.strHomeLineupForward)
    $('#foward').text('Line Up Foward')
    $('#fowardAway').text(data.strAwayLineupForward)
    $('#subtitutesHome').text(data.strHomeLineupSubstitutes)
    $('#subtitutes').text('Line Up Subtitutes')
    $('#substituesAway').text(data.strHomeLineupSubstitutes)
}

function getData(idEvent){
    var events, imagesrcHome, imagesrcAway
    var link = 'https://www.thesportsdb.com/api/v1/json/1/lookupevent.php?id='+idEvent
    var opt = {
        url : link,
        type : 'GET'
    }
    var req = $.ajax(opt)
    req.done(function(res){
        events = res.events[0]
        var imageHome = res.events[0].idHomeTeam
        var imageAway = res.events[0].idAwayTeam
        var link1 = 'https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id='+imageHome
        var opt1 = {
            url : link1,
            type : 'GET'
        }
        var req1 = $.ajax(opt1)
        req1.done(function(res1){
            imagesrcHome = res1.teams[0].strTeamBadge
            var link2 = 'https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id='+imageAway
            var opt2 = {
                url : link2,
                type : 'GET'
            }
            var req2 = $.ajax(opt2)
            req2.done(function(res2){
                imagesrcAway = res2.teams[0].strTeamBadge
                editView(events, imagesrcHome, imagesrcAway)
            })
        })
        
    })
}

$(document).ready(function(){
    $('#back').click(function(){
        window.location.href="/match"
    })
    $('#fav').click(function(){
        $('#fav').hide()
        var req = $.ajax({
            url : '/favEvent',
            type : 'POST',
            data : {
                index : idEvent,
                id : sessionStorage.getItem('userId')
            }
        })
        req.done(function(res){
        })
        alert('save to favorite')
    })
})

$(function(){
    var params = window.location.search
    var search = new URLSearchParams(params)
    idEvent = search.get('e')
    var opt = {
        url : '/checkFav',
        type : 'POST',
        data : {
            index : idEvent,
            id : sessionStorage.getItem('userId'),
            status : 'event'
        }
    }
    var req = $.ajax(opt)
    req.done(function(res){
        if(res.index > -1){
            $('#fav').hide()
        }
    })
    getData(idEvent)
})