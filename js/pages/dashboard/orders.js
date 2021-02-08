$(document).ready(function() {
    $("#orders_modal").iziModal({
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
    // $("#Modalx").iziModal();

    // do action
    $(document).on('click', '.showOrdersItems', function() {
        var id = $(this).attr('data-order_id')

        $.ajax({
            type: "post",
            url: "/dashboard/orders/info",
            data: {
                'id': id,
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: "json",
            success: function(response) {
                // flash(response['message'], response['status']);
                $('#table_body').html('');
                console.log(response.length);
                if (response.length > 0) {
                    response.forEach(element => {
                        $('#table_body').append(`

                            <tr>
                                <td>` + element['id'] + `</td>
                                <td ><img style="height: 100px; width: 90px;" src="` + element['image1'] + `" alt=""></td>
                                <td>$` + element['price'] + `</td>
                                <td>` + element['quantity'] + `</td>
                                <td>` + (element['selectedColor'] == null ? 'غير محدد' : element['selectedColor']) + `</td>
                                <td>` + (element['selectedSize'] == null ? 'غير محدد' : element['selectedSize']) + `</td>
                                <td>` + element['status'] + `</td>
                            </tr>

                        `);

                    });

                    $('#modalx').iziModal('setGroup', 'alerts');
                    $('#orders_modal').iziModal('open', {
                        zindex: 48,
                        // closeOnEscape: true,
                        width: 1000,
                        closeButton: true,
                    });
                } else {
                    flash("لا توجد نتيجه !!", "warning")
                }

            },
            error: function(jqXHR, exception) {
                if (jqXHR.status === 500) {
                    flash('حاول مجددا', 'warning');

                }
            }
        });
    });







    $(document).on('click', '#delete_order', function() {
        var id = $(this).attr('data-order_id')
        console.log(id);
        $.ajax({
            type: "post",
            url: "/dashboard/orders/delete",
            data: {
                'id': id,
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: "json",
            success: function(response) {
                // flash(response['message'], response['status']);
                $('#table_body').html('');
                console.log(response.length);
                flash(response['message'], response['status']);


            },
            error: function(jqXHR, exception) {
                if (jqXHR.status === 500) {
                    flash('حاول مجددا', 'warning');

                }
            }
        });
    });



});