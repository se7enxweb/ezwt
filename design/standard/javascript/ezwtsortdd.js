/*
 * The website toolbar's sort page (websitetoolbar/sort): the sorting controls, and, when the sub items are sorted by
 * priority, rows reordered by drag and drop (native drag events, jQuery). After a drop the priorities of the rows up
 * to the last one that has a priority (or the dragged one) are renumbered in steps of 2 in the sort order, and then
 * saved at once through ezjscore (ezwt::updatepriority, the form posted) when "automatic update" is checked, or
 * the Update priorities button is highlighted for the user to save.
 */
var eZWTSortDD = (function ($) {
    var ret = { sort_order: 1, enabled: false, CONFIG: {} };

    var updateButton = function () { return $('#ezwt-update-priority'); };
    var enableButton = function (on) {
        updateButton().prop('disabled', !on).toggleClass('button', on).toggleClass('button-disabled', !on);
    };
    var signalUnsaved = function () {
        updateButton().removeClass('button').addClass('defaultbutton');
    };

    var setupSortChangeEvent = function () {
        $('#ezwt-sort-field').on('change', function () {
            if (!ret.enabled) {
                return;
            }
            if (this.value == 8) {
                $('#ezwt-automatic-update-container').removeClass('hide');
                if (!$('#ezwt-automatic-update').prop('checked')) {
                    enableButton(true);
                }
            } else {
                $('#ezwt-automatic-update-container').addClass('hide');
                enableButton(false);
            }
        });
        $('#ezwt-sort-list').on('change', 'input.ezwt-priority-input', signalUnsaved);
    };

    var renumber = function (dragged) {
        var autoUpdate = $('#ezwt-automatic-update').prop('checked');
        // desc: 0, asc: 1
        var sortOrder = autoUpdate ? $('#ezwt-sort-order').val() === '1' : ret.sort_order;
        var inputs = $('#ezwt-sort-list input.ezwt-priority-input'),
            draggedInput = $(dragged).find('input.ezwt-priority-input')[0],
            updateToIndex = 0;
        // priorities are set up to the last row that has one, or up to the dragged row
        inputs.each(function (i) {
            if (this.value !== '0' || this === draggedInput) {
                updateToIndex = i;
            }
        });
        var step = sortOrder ? 2 : -2, priority = -step * (updateToIndex + 1);
        inputs.each(function (i) {
            if (i > updateToIndex) {
                return false;
            }
            this.value = priority;
            priority += step;
        });
        if (autoUpdate) {
            $.ez('ezwt::updatepriority', $('#ezwt-sort-form').serialize(), function () {});
        } else {
            signalUnsaved();
        }
    };

    var setupDragDrop = function () {
        var dragged = null;
        $('#ezwt-automatic-update').on('click', function () {
            enableButton(!this.checked);
        });
        $('#ezwt-sort-list tr.ezwt-sort-dragable').addClass('ezwt-sort-drag-handler').attr('draggable', 'true')
            .on('dragstart', function (e) {
                dragged = this;
                $(this).css('opacity', '.25');
                var dt = e.originalEvent.dataTransfer;
                dt.effectAllowed = 'move';
                dt.setData('text/plain', '');
            })
            .on('dragover', function (e) {
                if (!dragged || dragged === this) {
                    return;
                }
                e.preventDefault();
                var r = this.getBoundingClientRect(), after = e.originalEvent.clientY > r.top + r.height / 2;
                if (after) {
                    $(this).after(dragged);
                } else {
                    $(this).before(dragged);
                }
            })
            .on('drop', function (e) {
                e.preventDefault();
            })
            .on('dragend', function () {
                $(this).css('opacity', '');
                if (dragged) {
                    renumber(dragged);
                }
                dragged = null;
            });
    };

    ret.init = function () {
        $(function () {
            setupSortChangeEvent();
            if (document.getElementById('ezwt-sort-field').value == 8) {
                ret.sort_order = document.getElementById('ezwt-sort-order').value === '1';
                ret.enabled = true;
                setupDragDrop();
            }
        });
    };
    return ret;
})(jQuery);
