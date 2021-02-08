$(document).ready(function() {

    // ini model
    $("#modal").iziModal({
        zindex: 103,
        color: 'rgb(230, 57, 70)',
        fullscreen: true,
        loop: false,
        width: 1000,
        transitionInOverlay: 'fadeIn',
        headerColor: 'rgb(35, 47, 62)',
        background: 'rgb(255, 255, 255,.9)',
        subtitle: '',
        headerColor: '#88A0B9',
    });

    /******************************[load item quantity]*************************************/

    $(document).on('click', '.itemOptions', function() {
        $('#currentQuanInput').val('انتظر...');

        var item_id = $(this).attr('data-id')
        $('#optionsId').val(item_id)

        $.ajax({
            type: "post",
            url: "/api/seller/item-quan",
            data: {
                'item_id': item_id,
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: "json",
            success: function(response) {
                $('#currentQuanInput').val(response);
            },
            error: function(jqXHR, exception) {
                if (jqXHR.status === 500) {
                    flash('حاول مجددا', 'warning');

                }
            }
        });
        $('#modal').iziModal('open');

    })

    /******************************[increase item quantity]*************************************/
    // do action 
    $(document).on('click', '#increaseQuan', function() {
        var item_id = $('#optionsId').val();
        var newQuanValue = $('input[name=increaseQuan]').val();
        console.log(item_id);
        $.ajax({
            type: "post",
            url: "/api/quantity/increase",
            data: {
                'item_id': item_id,
                'newQuanValue': newQuanValue,
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: "json",
            success: function(response) {
                if (response['status'] == 'success') {

                    $('#currentQuanInput').val(response['value']);
                }
                flash(response['message'], response['status']);
                $('input[name=increaseQuan]').val('');
            },
            error: function(jqXHR, exception) {
                if (jqXHR.status === 500) {
                    flash('حاول مجددا', 'warning');

                }
            }
        });
    });

    /******************************[increase item quantity]*************************************/
    // do action 
    $(document).on('click', '#decreaseQuan', function() {
        var item_id = $('#optionsId').val();
        var newQuanValue = $('input[name=decreaseQuan]').val();
        $.ajax({
            type: "post",
            url: "/api/quantity/decrease",
            data: {
                'item_id': item_id,
                'newQuanValue': newQuanValue,
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: "json",
            success: function(response) {
                if (response['status'] == 'success') {

                    $('#currentQuanInput').val(response['value']);
                }

                flash(response['message'], response['status']);
                $('input[name=decreaseQuan]').val('');
            },
            error: function(jqXHR, exception) {
                if (jqXHR.status === 500) {
                    flash('حاول مجددا', 'warning');

                }
            }
        });
    });
});