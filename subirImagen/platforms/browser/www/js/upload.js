var feedback = function(res) {
    if (res.success === true) {
        var get_link = res.data.link.replace(/^http:\/\//i, 'https://');
        document.querySelector('.status').classList.add('bg-success');
        document.querySelector('.status').innerHTML =
            'Image : ' + '<br><input class="image-url" value=\"' + get_link + '\"/>' + '<img class="img" alt="Imgur-Upload" src=\"' + get_link + '\"/>';
		document.write("<a href='"+get_link+"'>Link</a>");
    }
};

new Imgur({
    clientid: '8087135b7076f6b', //You can change this ClientID
    callback: feedback
});