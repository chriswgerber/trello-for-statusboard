# Trello Lists for StatusBoard

A simple jQuery plugin to display the cards and labels for a Trello list inside of a [Statusboard][statusboard]. 


## Directions

All you need is a User Token and the ID for the list you want to display.

**[Click Here to Generate a User Token][token]**

Edit `statusboard.html` and add in your list ID and token. You can adjust the refresh interval, but 20 seconds should provide a speed enough reload without refreshing too often.

```
$('div#theList1').trelloList( {
    "user_token" : '', // Token you generated
    "list_id"    : '', // ID of the list to display
    "refreshRate": 20000 // Refresh interval in MS. Default is 20 seconds
});
```

### Getting the ID of a list

The easiest way is to paste your token and the ID of the board into:

```
https://api.trello.com/1/boards/{BOARD_ID}/lists?key=83daea8130ecd89af1d8ab43695e84e8&token={USER_TOKEN}
```

And grab the ID from there.

## Label Colors

I've set the label colors to match the labels found in Trello, including the recent color adjustments and the ability to add unlimited labels. 

However, if you would like to change or customize the color of the labels, you can do so in `css/_colors.scss`.

## Example:

[Example List][test-page]

## Screenshots

![Horizontal Screenshot](http://www.chriswgerber.com/assets/uploads/2014/11/horizontal_screenshot.png)
![Vertical Screenshot](http://www.chriswgerber.com/assets/uploads/2014/11/vertical_screenshot.png)

[statusboard]: http://panic.com/statusboard/ 'Statusboard by Panic Software'
[token]: https://trello.com/1/authorize?key=83daea8130ecd89af1d8ab43695e84e8&name=Trello%20Lists%20for%20StatusBoard%20By%20Chris%20Gerber&expiration=never&response_type=token 'Token Page'
[test-page]: http://www.chriswgerber.com/assets/trello-lists-statusboard/assets/statusboard-example.html 'Example Page'
