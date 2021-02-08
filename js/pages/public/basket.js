$(document).ready(function() {
    /******************************[update basket options]*************************************/
    // ini model
    $("#modal").iziModal({
        zindex: 103,
        color: 'rgb(230, 57, 70)',
        fullscreen: true,
        loop: false,
        width: 700,
        transitionInOverlay: 'fadeIn',
        headerColor: 'rgb(35, 47, 62)',
        background: 'rgb(255, 255, 255,.9)',
        subtitle: '',
        headerColor: '#88A0B9',
    });



    $(document).on('click', '.edit_basket', function() {
        $('#modal').iziModal('open', { zindex: 50 });
        var id = $(this).attr('data-item_id');
        var quantity = $(this).attr('data-quantity');
        $('#updateQU').attr('data-item_id', id);
        $('#quantity').val(quantity);

        $.ajax({
            type: "post",
            url: "/basket/itemInfo",
            data: {
                'item_id': id,
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: "json",
            success: function(response) {
                if (response['status'] == 'success') {
                    $('#colorsOprions').html('');
                    $('#sizeOprions').html('');
                    $('#colorInfo').html('');
                    $('#sizeInfo').html('');
                    $('#quantityInfo').html('');

                    var colorsString = response['content']['colors'];

                    var colorInBasket = response['colorInBasket'];
                    var sizeInBasket = response['sizeInBasket'];
                    var storeQuantity = response['content']['storeQuantity'];
                    var quantityInBasket = response['quantityInBasket'];

                    $('#itemColor').html(colorInBasket != null ? response['colorInBasket'] : 'غير محدد');
                    $('#itemSize').html(sizeInBasket != null ? response['sizeInBasket'] : 'غير محدد');
                    $('#storeQuantity').html(storeQuantity != null ? response['content']['storeQuantity'] : 'غير محدد');
                    $('#itemQuantity').html(quantityInBasket != null ? response['quantityInBasket'] : 'غير محدد');

                    // colorsString = 'red,green,blue';
                    // colorsString = 'احمر,اخضر,اصفر';
                    // colorsString = 'احمر,';

                    if (colorsString.includes(',')) {
                        var colorsList = colorsString.split(',');
                        if (colorsList.length > 1) {
                            // console.log(colorsList);

                            colorsList.forEach(color => {
                                if (color != '') {
                                    console.log(color);
                                    console.log(colorInBasket);
                                    console.log(color == colorInBasket);
                                    $('#colorsOprions').append(`<option ` + (color == colorInBasket ? 'selected' : '') + ` value="` + color + `">` + color + `</option>`);
                                }
                            });

                        }
                    } else {
                        // flash('no', 'danger');
                        $('#colorsOprions').append(`<option value="` + colorsString + `">` + colorsString + `</option>`)

                    }

                    var sizeList = [];
                    if (response['content']['X'] == 1) {
                        sizeList.push('X');
                    }
                    if (response['content']['L'] == 1) {
                        sizeList.push('L');
                    }
                    if (response['content']['XL'] == 1) {
                        sizeList.push('XL');
                    }
                    if (response['content']['M'] == 1) {
                        sizeList.push('M');
                    }

                    sizeList.forEach(size => {
                        console.log(size);
                        $('#sizeOprions').append(`<option ` + (size == sizeInBasket ? 'selected' : '') + ` value="` + size + `">` + size + `</option>`);
                    });

                } else {
                    flash(response['message'], response['status']);
                }
            },
            error: function(jqXHR, exception) {
                if (jqXHR.status === 500) {
                    flash('حاول مجددا', 'warning');

                }
                if (jqXHR.status === 401) {
                    flash('قم بتسجيل الدخول اولا', 'warning');

                }
            }
        });



    });


    $(document).on('click', '#updateQU', function() {
        var id = $(this).attr('data-item_id');
        var quantity = $('#quantity').val();
        var color = $('#colorsOprions').val();
        var size = $('#sizeOprions').val();

        if (quantity == '') {
            flash("sorry1");
            return
        }

        $.ajax({
            type: "post",
            url: "/basket/update",
            data: {
                'id': id,
                'quantity': quantity,
                'color': color,
                'size': size,
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: "json",
            success: function(response) {
                flash(response['message'], response['status']);
                $('#edit__id__' + id).attr('data-quantity', quantity);
                $('#quantity__id__' + id).html('الكميه : ' + quantity);

                $(this).parent().css({ "color": "red", "border": "2px solid red" });

                // update UI if request success
                if (response['status'] == 'success') {

                    $('#itemColor').html(color);
                    $('#itemQuantity').html(quantity);
                    $('#itemSize').html(size);
                    // $('#sizeInfo').html(size);
                }
            },
            error: function(jqXHR, exception) {
                if (jqXHR.status === 500) {
                    flash('حاول مجددا', 'warning');

                }
                if (jqXHR.status === 401) {
                    flash('قم بتسجيل الدخول اولا', 'warning');

                }
            }
        });


    });




});