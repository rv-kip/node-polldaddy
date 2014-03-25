## Node module to talk to polldaddy.com

## Usage
`npm install node-polldaddy`

## Configuration
You'll need your `partnerGUID` and `userCode` for polldady.

## Examples
See `examples/example.js`
```
$ node example.js
getRatingResults
{ uid: 'default',
  total1: '1',
  total2: '1',
  total3: '0',
  total4: '3',
  total5: '56',
  average_rating: '4.8361',
  date: '2013-05-12 03:00:28',
  title: 'Duvel',
  permalink: 'http://upload.wikimedia.org/wikipedia/en/0/0d/Duvel_and_glass_sunday.jpg',
  id: '6749546',
  type: '0',
  votes: '61' }
getRatings [ { date: '2013-03-29 23:57:29',
    name: 'Duvel',
    folder_id: '19034554',
    settings: '{"type" : "stars","size" : "sml","star_color" : "yellow","custom_star" : "","font_size" : "12px","font_line_height" : "20px","font_color" : "#333333","font_align" : "left","font_position" : "top","font_family" : "verdana","font_bold" : "bold","font_italic" : "normal","text_vote" : "Vote","text_votes" : "Votes","text_rate_this" : "Rate This","text_1_star" : "Poor","text_2_star" : "Okay","text_3_star" : "Average","text_4_star" : "Good","text_5_star" : "Excellent","text_thank_you" : "Thank You","text_rate_up" : "Rate Up","text_rate_down" : "Rate Down","popup" : "off"}',
    id: '6749546',
    type: '0' },
    ...
]
```
## License
MIT.
