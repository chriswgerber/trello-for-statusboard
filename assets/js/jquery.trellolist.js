$.fn.trelloList = function( settings ) {

    var oldRequest  = [],
        refreshRate = (settings.refreshRate ? settings.refreshRate : 20000),
        $div_id     = this,
        table_query = {
            "list_id"    : settings.list_id,
            "user_token" : settings.user_token,
            "api_key"    : '83daea8130ecd89af1d8ab43695e84e8',
            "param"      : [
                {
                    "property": "lists",
                    "args" : {
                        "fields": "name",
                        "cards": "open",
                        "card_fields": "name,due,idList,labels"
                    }
                }
            ]
        };


    function color( i ) {
        var colorReplace = {
            "green":    "green",
            "yellow":   "yellow",
            "orange":   "orange",
            "red":      "red",
            "purple":   "purple",
            "blue":     "blue",
            "lime":     "lime",
            "sky":      "sky",
            "pink":     "pink",
            "black":    "black",
            "no color": "no_color"
        };

        return 'label_' + colorReplace[ i ];
    }

    function get_time(card_object, date_value) {
        var date = new Date( date_value ),
            day = {
                0: "Sun",
                1: "Mon",
                2: "Tue",
                3: "Wed",
                4: "Thu",
                5: "Fri",
                6: "Sat"
            },
            month = {
                0: "Jan",
                1: "Feb",
                2: "Mar",
                3: "Apr",
                4: "May",
                5: "Jun",
                6: "Jul",
                7: "Aug",
                8: "Sep",
                9: "Oct",
                10: "Nov",
                11: "Dec"
            },
            time = {
                0: "Midnight",
                1: "1 am",
                2: "2 am",
                3: "3 am",
                4: "4 am",
                5: "5 am",
                6: "6 am",
                7: "7 am",
                8: "8 am",
                9: "9 am",
                10: "10 am",
                11: "11 am",
                12: "Noon",
                13: "1 pm",
                14: "2 pm",
                15: "3 pm",
                16: "4 pm",
                17: "5 pm",
                18: "6 pm",
                19: "7 pm",
                20: "8 pm",
                21: "9 pm",
                22: "10 pm",
                23: "11 pm"
            },
            displayDate = day[date.getDay()] + ' ' + month[date.getMonth()] + ' ' +
                date.getDate() + ', ' +  (date.getFullYear()-2000),
            displayTime = time[ date.getHours() ];

        card_object += ' <span class="due">Due: </span><span class="dueDate">' +
        displayTime + ' - ' + displayDate + '</span>';

        return card_object;
    }

    function attach_cards(key, val) {

        var cardId   = val["id"],
            labels   = $("<div/>", { class: "labels " + cardId }),
            cardText = '<span class="task">' + val["name"] + '</span>';

        if ( val["labels"].length !== 0 ) {

            var label_width = Math.floor((( $(window).width() * 0.96 ) / val["labels"].length) ) - 6;
            var boxWidth = label_width + 'px';

            $.each( val["labels"], function(key, val) {
                $('<span/>', {
                    class: "label " + color( val.color ),
                    style: "width:" + boxWidth + ";",
                    html: val.name
                }).appendTo( labels );
            });

        }

        if ( val["due"] !== null ) {
            /** Time Function **/
            cardText = get_time(cardText, val["due"]);
        }

        $('<li/>', {
            "id": cardId,
            html: cardText
        }).append(labels).appendTo( "ol#" + settings.id );
    }

    function trelloQuery(q) {
        // pull arguments from submitted json, push to parameters
        var trelloUrl = 'https://api.trello.com/1';
        if ( q.list_id !== "" || q.apiKey !== "" ) {
            var i = 0;
            $.each( q.param, function() {
                var deck = '/' + q.param[i]["property"],
                    fields = [];
                if ( i <= 0 ) {
                    deck += '/' + q.list_id;
                    if (q.param[i].args) {
                        deck += '?';
                        $.each(q.param[i].args, function(key, value) {
                            fields.push( [ key + '=' + value ] );
                        });
                    }
                } else {
                    if (q.param[i].args) {
                        deck += '?';
                        $.each(q.param[i].args, function(key, value) {
                            fields.push( [ key + '=' + value ] );
                        });
                    }
                }
                trelloUrl += deck + fields.join("&");
                i++;
            });
            trelloUrl += "&key=" + q.api_key + '&token=' + q.user_token;

            return $.getJSON(trelloUrl, function( data ) {

                return data;
            });
        } else {

            return null;
        }
    }

    function refresh() {

        trelloQuery(table_query).done( function( data ) {
            var newData = JSON.stringify( data );

            if ( newData !== JSON.stringify( oldRequest[$div_id] ) ) {
                displayBoard();
            }
        });
    }

    function displayBoard() {

        /** Display the board **/
        trelloQuery(table_query).done(function( data ) {

            // Refreshing data to be compared against next time
            oldRequest[ $div_id ] = data;

            /** clear the table, we have chilluns **/
            $( $div_id ).children().remove();

            // attach title
            $('<div/>', {
                "class": "header",
                html: data.name + ": " + data.cards.length
            }).appendTo( $div_id );

            // attach container
            $( "<div/>", {
                "class": "taskList",
                html: '<ol class="trelloList" id="' + settings.id + '"></ol>'
            }).appendTo( $div_id );

            // attach cards
            $.each( data.cards, function( key, val ) {
                attach_cards(key, val)
            });

        });
    }

    /** Set board refresh **/
    setInterval( function() { refresh() }, refreshRate);

    refresh();

    return this;
};