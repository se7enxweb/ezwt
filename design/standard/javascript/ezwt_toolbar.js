/*
 * The website toolbar without inline code (pages that run under a Content Security Policy without 'unsafe-inline'):
 *  - floating toolbar: printed by parts/websitetoolbar/floating_toolbar.tpl right after the toolbar markup, it moves
 *    the toolbar to the top of the page at once (body class floating-wt, padding as high as the toolbar);
 *  - menu link type switch (parts/websitetoolbar/link.tpl): enabled on window load, toggles the menu links;
 *  - the edit toolbar's Discard draft button (data-ezwt-confirm-discard="<question>"): asks window.confirmDiscard()
 *    first when the page has it, as the onclick attribute did;
 * The file may be printed more than once: it sets itself up once.
 */
(function (w, d) {
    function floating() {
        var body = d.body, ezwt = d.getElementById('ezwt');
        if (!ezwt || !body || body.getAttribute('data-ezwt-floating')) {
            return;
        }
        body.setAttribute('data-ezwt-floating', '1');
        if (body.className.indexOf('ie6') !== -1) {
            return;
        }
        if (body.className) {
            body.className += ' floating-wt';
        } else {
            body.className = 'floating-wt';
        }
        // Set padding on header / body based on height of toolbar
        var page = d.getElementById('page');
        if (page && page.getElementsByTagName('div')[0]) {
            page.getElementsByTagName('div')[0].style.paddingTop = ezwt.offsetHeight + 'px';
        } else {
            body.style.paddingTop = ezwt.offsetHeight + 'px';
        }
    }

    if (w.eZWTToolbar) {
        // printed again (another toolbar template): the toolbar may only now be in the page
        floating();
        return;
    }
    w.eZWTToolbar = { floating: floating };

    function getByClass(n, className) {
        if (n.getElementsByClassName) {
            return n.getElementsByClassName(className);
        }
        var hits = [], els = n.getElementsByTagName('*');
        for (var i = 0, l = els.length; i < l; i++) {
            if (els[i].className && (' ' + els[i].className + ' ').indexOf(' ' + className + ' ') !== -1) {
                hits.push(els[i]);
            }
        }
        return hits;
    }

    function linkSwitcher() {
        var link = d.getElementById('ezwt-link-switcher');
        if (!link || link.getAttribute('data-ezwt-ready')) {
            return;
        }
        link.setAttribute('data-ezwt-ready', '1');
        link.disabled = false;
        link.className = 'ezwt-input-image';
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var links = getByClass(d, 'menu-item-link');
            for (var i = 0, l = links.length; i < l; i++) {
                var rel = links[i].getAttribute('rel'), href = links[i].getAttribute('href'),
                    target = links[i].getAttribute('target'), rev = links[i].getAttribute('rev');
                links[i].setAttribute('rel', href);
                links[i].setAttribute('href', rel);
                links[i].setAttribute('target', rev ? rev : '');
                links[i].setAttribute('rev', target ? target : '');
            }
            return false;
        }, true);
    }

    // the edit toolbar's Discard draft button
    d.addEventListener('click', function (e) {
        var t = e.target && e.target.closest ? e.target.closest('[data-ezwt-confirm-discard]') : null;
        if (t && w.confirmDiscard && !w.confirmDiscard(t.getAttribute('data-ezwt-confirm-discard'))) {
            e.preventDefault();
        }
    }, false);

    floating();
    if (d.readyState === 'complete') {
        linkSwitcher();
    } else {
        w.addEventListener('load', linkSwitcher, true);
    }
})(window, document);
