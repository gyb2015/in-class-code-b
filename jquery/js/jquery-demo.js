/* jquery-demo.js
    script for lecture on jQuery library
*/

//Billboard Top 10 for this week
var topSongs = [
    {title: 'Royals', artist: 'Lorde', pic: 'http://www.billboard.com/files/styles/thumbnail_140/public/artists/l/19640920.jpg', video: 'http://www.billboard.com/video/vevo/NZUV71300005'},
    {title: 'Wrecking Ball', artist: 'Miley Cyrus', pic: 'http://www.billboard.com/files/styles/thumbnail_140/public/artists/m/7623870.jpg', video: 'http://www.billboard.com/video/vevo/USRV81300400'},
    {title: 'Roar', artist: 'Katy Perry', pic: 'http://www.billboard.com/files/styles/thumbnail_140/public/artists/k/9389790.jpg', video: 'http://www.billboard.com/video/vevo/USUV71301735'},
    {title: 'Wake Me Up!', artist: 'Avicii', pic: 'http://www.billboard.com/files/styles/thumbnail_140/public/artists/a/14157220.jpg', video: 'http://www.billboard.com/video/vevo/CH3131340061'},
    {title: "Hold On, We're Going Home", artist: 'Drake', pic: 'http://www.billboard.com/files/styles/thumbnail_140/public/artists/d/8412590.jpg', video: 'http://www.billboard.com/video/vevo/USCMV1300146'},
    {title: 'The Fox', artist: 'Ylvis', pic: 'http://www.billboard.com/files/styles/thumbnail_140/public/artists/y/20318330.jpg'},
    {title: 'Holy Grail', artist: 'Jay Z Featuring Justin Timberlake', pic: 'http://www.billboard.com/files/styles/thumbnail_140/public/artists/j/2225310.jpg'},
    {title: 'Applause', artist: 'Lady Gaga', pic: 'http://www.billboard.com/files/styles/thumbnail_140/public/artists/l/9766960.jpg', video: 'http://www.billboard.com/video/vevo/USUV71301730'},
    {title: 'Blurred Lines', artist: 'Robin Thicke Featuring T.I. + Pharrell', pic: 'http://www.billboard.com/files/styles/thumbnail_140/public/artists/r/5045770.jpg', video: 'http://www.billboard.com/video/vevo/USUV71300454'},
    {title: 'Summertime Sadness', artist: 'Lana Del Rey & Cedric Gervais', pic: 'http://www.billboard.com/files/styles/thumbnail_140/public/artists/l/17318430.jpg', video: 'http://www.billboard.com/video/vevo/GBUV71201291'}
];

$(function(){
    $('.message').html('Document is ready');

    $('.click-me').click(function(){
        alert('Hey Stop That!');
    });

    $('.toggle-text-button').click(function(){
        $('.toggle-text').slideToggle(500);
    });

    $('.name-input').keyup(function(){
        var $this = $(this);
        $('.name').html('Hello ' + $this.val());
    });

    render(topSongs, $('.template'), $('.top-songs'));

    $('.sort-artist').click(function(){
        topSongs.sort(function(a,b){
            return a.artist.localeCompare(b.artist);
        });
        render(topSongs, $('.template'), $('.top-songs'));
    });
}); // document ready

function render(songs, template, container) {
    var instance;
    container.empty();
    $.each(songs, function(){
        instance = template.clone();
        instance.find('.title').html(this.title);
        instance.find('.artist').html(this.artist);
        instance.find('.pic').attr({
            src: this.pic,
            alt: 'Picture of ' + this.artist
        });

        if (this.video) {
            instance.find('.video').attr('href', this.video);
        }
        else {
            instance.find('.video').remove();
        }


        instance.removeClass('template');
        container.append(instance);

    });
}