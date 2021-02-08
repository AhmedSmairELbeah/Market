jq: $(document).ready(function() {


    $(document).on('click', '.addToBasket', function() {
        var id = $(this).attr('data-item_id');
        $.ajax({
            type: "post",
            url: "/basket/add",
            data: {
                'id': id,
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: "json",
            success: function(response) {
                // console.log(response);
                flash(response['message'], response['status']);
            },
            error: function(jqXHR, exception) {
                if (jqXHR.status === 500) {
                    flash('حاول مجددا', 'warning');

                }
                if (jqXHR.status === 401) {
                    flash('قم بتسجيل الدخول اولا', 'warning');

                }

                if (jqXHR.status === 403) {
                    flash('قم بتفعيل الحساب من الايميل', 'warning');

                }
            }
        });

    });



    $(document).on('click', '.addToWishList', function() {
        var id = $(this).attr('data-item_id');

        $.ajax({
            type: "post",
            url: "/wishlist/add",
            data: {
                'id': id,
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: "json",
            success: function(response) {
                flash(response['message'], response['status']);
            },
            error: function(jqXHR, exception) {
                if (jqXHR.status === 500) {
                    flash('حاول مجددا', 'warning');

                }
                if (jqXHR.status === 401) {
                    flash('قم بتسجيل الدخول اولا', 'warning');

                }
                if (jqXHR.status === 403) {
                    flash('قم بتفعيل الحساب من الايميل اولا', 'warning');

                }

            }
        });

    });




});