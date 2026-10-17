/*
 * The calendar icon of the ezdemo design's date and date/time fields, without an onclick attribute:
 *   <img class="datepicker-icon" data-ezwt-datepicker="date|datetime" data-ezwt-datepicker-base="<attribute base>"
 *        data-ezwt-datepicker-id="<attribute id>">
 * A click (or Enter/Space, the icon is made focusable) calls window.showDatePicker( base, id, datatype ), the
 * calendar of Exponential UI's exp::datepicker, as the onclick attribute did. Sets itself up once.
 */
(function (w, d) {
    if (w.eZWTDatePicker) {
        return;
    }
    w.eZWTDatePicker = true;

    function icon(e) {
        return e.target && e.target.closest ? e.target.closest('[data-ezwt-datepicker]') : null;
    }

    function open(el) {
        if (typeof w.showDatePicker === 'function') {
            w.showDatePicker(el.getAttribute('data-ezwt-datepicker-base'), el.getAttribute('data-ezwt-datepicker-id'),
                             el.getAttribute('data-ezwt-datepicker'));
        }
    }

    d.addEventListener('click', function (e) {
        var el = icon(e);
        if (el) {
            open(el);
        }
    });
    d.addEventListener('keydown', function (e) {
        var el = icon(e);
        if (el && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            open(el);
        }
    });

    function ready() {
        var icons = d.querySelectorAll('img[data-ezwt-datepicker]');
        for (var i = 0; i < icons.length; i++) {
            if (!icons[i].hasAttribute('tabindex')) {
                icons[i].setAttribute('tabindex', '0');
            }
            if (!icons[i].hasAttribute('role')) {
                icons[i].setAttribute('role', 'button');
            }
        }
    }
    if (d.readyState === 'loading') {
        d.addEventListener('DOMContentLoaded', ready);
    } else {
        ready();
    }
})(window, document);
