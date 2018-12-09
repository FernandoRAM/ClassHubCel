var feedback = function(res) {
    if (res.success === true) {
        var get_link = res.data.link.replace(/^http:\/\//i, 'https://');
		document.getElementById('imagenURL').value = get_link;
    }
};

new Imgur({
    clientid: '8087135b7076f6b',
    callback: feedback
});