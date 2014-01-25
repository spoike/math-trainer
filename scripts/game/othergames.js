define(['zepto'], function($) {
    $.getJSON('http://whateverorigin.org/get?url=' + encodeURIComponent('https://gist.github.com/spoike/7716881/raw/games.json') + '&callback=?', 
    function(data){
        var gameList = $.parseJSON(data.contents).d, i, dataItem, els = [];
        for (i = 0; i < gameList.length; i++) {
            dataItem = gameList[i];
            els.push('<a href="' + dataItem.url + '">' + dataItem.name + '</a>');
        }
        $('.other-games').append(els.join(', '));
        $('.other-games-list').removeClass('hide');
    });
});