var feedback = function(res) {
    if (res.success === true) {
        var get_link = res.data.link.replace(/^http:\/\//i, 'https://');
		document.getElementById('imagenURL').src = get_link;
        localStorage.imagenURL = get_link;
        window.location = 'formEnBlanco2.html';
    }
};

new Imgur({
    clientid: '8087135b7076f6b',
    callback: feedback
});