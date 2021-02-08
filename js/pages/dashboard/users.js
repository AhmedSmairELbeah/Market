$(document).ready(function() {
    /******************************[load user information]*************************************/
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

    // when  click view
    $(document).on('click', '.showUserInfo', function(event) {
        event.preventDefault();

        // get user id
        var id = $(this).attr('data-id');
        // set id to user change password
        $('#chPassID').attr('value', id);
        // get user information by id
        $.getJSON("/dashboard/users/info/" + id, function(result) {
            console.log(typeof result['message']);
            if (typeof result['message'] == 'string') {

                flash(result['message'], result['status']);
            }

            if (typeof result['message'] == 'undefined') {
                $('#modal .info').html(`
                    <fieldset>
                        <legend>Informations:</legend>
                            <p><span>الاسم : </span><span>` + result['name'] + `</span></p>
                            <p><span>الايميل : </span><span di="email">` + result['email'] + `</span></p>
                            <p><span>الهاتف : </span><span di="phone">` + result['phone'] + `</span></p>
                            <p><span>المحافظه : </span><span di="province">` + result['province'] + `</span></p>
                            <p><span>العنوان : </span><span di="addresses">` + result['address'] + `</span></p>
                            <p><span>الصوره : </span><span di="image">` + result['image'] + `</span></p>
                            <p><span>نوع الحساب : </span><span di="account_type">` + result['account_type'] + `</span></p>
                            <p><span>حالة الحساب : </span><span di="account_status">` + result['account_status'] + `</span></p>
                            <p><span>خطة الاشتراك : </span><span di="account_status">` + result['subscription_type'] + `</span></p>
                            <p><span>بدايه الاشتراك : </span><span di="account_status">` + result['subscription_in'] + `</span></p>
                            <p><span>نهايه الاشتراك : </span><span di="account_status">` + result['subscription_out'] + `</span></p>
                            <input value="` + result['id'] + `" type="hidden" name="id">
                    </fieldset>
                `);
            }
        }).fail(function(jqxhr, textStatus, error) {
            flash('حاول مجددا', 'warning');
        });

        $('#modal').iziModal('open');
    });

    /******************************[active user]*************************************/
    // asking user before accept
    $(document).on('click', '#active_btn', function() {
            askUser("هل انت متاكد انك تريد تشيط هذا الحساب؟", "yes4active");
        })
        // active user 
    $(document).on('click', '#yes4active', function() {
        var id = $('#modal .info input[name="id"]').attr('value');
        $.ajax({
            type: "post",
            url: "/dashboard/users/active",
            data: {
                'id': id,
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: "json",
            success: function(response) {
                flash(response['message'], response['status']);

                if (response['status'] == 'sccess') {
                    setTimeout(function() {
                        document.location.reload()
                    }, 9000);
                }
            },
            error: function(jqXHR, exception) {
                flash('حاول مجددا', 'warning');
            }
        });
    });
    /******************************[delete user]*************************************/
    // ask before
    $(document).on('click', '#delete_btn', function() {
            askUser("هل انت متاكد انك تريد حذف هذا الحساب؟", "yes4delete");
        })
        // do action
    $(document).on('click', '#yes4delete', function() {
        var id = $('#modal .info input[name="id"]').attr('value');
        $.ajax({
            type: "post",
            url: "/dashboard/users/delete/",
            data: {
                'id': id,
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: "json",
            success: function(response) {
                // console.log(response['log']);
                flash(response['message'], response['status']);
            },
            error: function(jqXHR, exception) {
                if (jqXHR.status === 500) {
                    flash('حاول مجددا', 'warning');
                    console.log(jqXHR);
                }
            }
        });
    });

    /******************************[deactive user]*************************************/
    // ask before do action
    $(document).on('click', '#deactive_btn', function() {
        askUser("هل انت متاكد انك تريد الغاء تنشيط هذا الحساب؟", "yes4deactive");
    })

    // do action 
    $(document).on('click', '#yes4deactive', function() {
        var id = $('#modal .info input[name="id"]').attr('value');
        $.ajax({
            type: "post",
            url: "/dashboard/users/deactive",
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
            }
        });
    });

    /******************************[user subscription]*************************************/
    // ask before do action
    $(document).on('click', '#sub_btn ', function() {
        askUser("هل انت متاكد انك تريد تنشيط هذه الخطه؟", "yes4subscription");
    })

    // do action
    $(document).on('click', '#yes4subscription', function() {
        var id = $('#modal .info input[name="id"]').attr('value');
        var menu_element = document.getElementById("sub_type");

        var sub_type = menu_element.value;

        $.ajax({
            type: "post",
            url: "/dashboard/users/subscribe",
            data: {
                'id': id,
                'sub_type': sub_type,
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
            }
        });
    });


    /******************************[search]*************************************/
    $("#searchModal").iziModal({
        title: 'نتائج البحث عن المستخدمين',
        zindex: 102,
        // title: 'طلبات تنشيط الاشتراك الشهري',
        color: 'rgb(230, 57, 70)',
        fullscreen: true,
        loop: false,
        width: 1000,
        transitionInOverlay: 'fadeIn',
        headerColor: 'rgb(35, 47, 62)',
        background: 'rgb(255, 255, 255,.9)',
        subtitle: '',
        headerColor: '#88A0B9',
        // headerColor: '#88A0B9',
        // width: 900,
        // padding: 10,
    });

    // do action
    $(document).on('click', '#search_btn', function() {
        var search_text = $('#search_text').val();


        $.ajax({
            type: "post",
            url: "/dashboard/users/search",
            data: {
                'search_text': search_text,
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: "json",
            success: function(response) {
                $('#table_body').html('');
                console.log(response.length);
                if (response.length > 0) {
                    response.forEach(user => {
                        $('#table_body').append(`
                        
                            <tr >
                                <td>` + user['name'] + `</td>
                                <td style="flex : 1;"><img class="m-2" style="vertical-align: middle" src="/img/8.webp" alt="" height="30px" width="30px"><span style="vertical-align: middle;margin-right:5px;">` + user['name'] + `</span></td>
                                <td>` + user['email'] + `</td>
                                <td>
                                <span class="dot">
                                <i class="bg-success"></i>
                                مكتمل
                                </span>
                                </td>
                                <td>17/07/2020</td>
                                <td><a href="#" data-id="` + user['id'] + `" style="color: #000;" class=" link-icon fas fa-eye size-1 showUserInfo" ></a></td>
                            </tr>
                    
                        `);

                    });

                    $('#searchModal').iziModal('open', {
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

    /******************************[add new user]*************************************/
    // ask before do action
    $("#newUserModal").iziModal();

    $(document).on('click', '#add_user_btn', function() {
        $('#newUserModal').iziModal('open', {
            zindex: 102,
            title: 'طلبات تنشيط الاشتراك الشهري',
            color: 'rgb(230, 57, 70)',
            fullscreen: true,
            loop: false,
            width: 1000,
            transitionInOverlay: 'fadeIn',
            headerColor: 'rgb(35, 47, 62)',
            background: 'rgb(255, 255, 255,.9)',
            subtitle: '',
            headerColor: '#88A0B9',
            // zindex: 48,
            // closeOnEscape: true,
            // width: 1000,
            // closeButton: true,
        });
    })

    /**********************[show all users subscription request]**********************/
    $("#usersNeedSubPlan").iziModal({
        zindex: 102,
        title: 'طلبات تنشيط الاشتراك الشهري',
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



    $(document).on('click', '#usersPlanBtn', function() {

        $.ajax({
            type: "get",
            url: "/dashboard/users/planReq",
            data: {},
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: "json",
            success: function(response) {

                $('#planInfo').html('');
                console.log(response.length);
                if (response.length > 0) {
                    var count = 1;
                    response.forEach(user => {
                        $('#planInfo').append(`
                    
                        <tr >
                            <td>` + count + `</td>
                            <td style="flex : 1;"><img class="m-2" style="vertical-align: middle" src="/img/8.webp" alt="" height="30px" width="30px"><span style="vertical-align: middle;margin-right:5px;">` + user['name'] + `</span></td>
                            <td>` + user['email'] + `</td>
                            <td>
                            <span class="">
                            مكتمل
                            </span>
                            </td>
                            <td>17/07/2020</td>
                            <td><a href="#" data-id="` + user['id'] + `" style="color: #000;" class=" link-icon fas fa-eye size-1 showUserInfo" ></a></td>
                        </tr>
                
                    `);
                        count++;
                    });

                } else {
                    flash("لا توجد نتيجه !!", "warning")
                    $('#planInfo').append(`<h3 style="text-align: center;display:flex;">لايوجد طلبات<h3>`);
                }

                $('#usersNeedSubPlan').iziModal('open');

            },
            error: function(jqXHR, exception) {
                if (jqXHR.status === 500) {
                    flash('حاول مجددا', 'warning');


                }
            }
        });
    });

    /**********************[show all marketers payment requests]**********************/
    $("#userPaymentRequ").iziModal({
        zindex: 102,
        title: 'طلبات الدفع',
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



    $(document).on('click', '#usersPayments', function() {

        $.ajax({
            type: "get",
            url: "/dashboard/users/paymentReq",
            data: {},
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: "json",
            success: function(response) {

                $('#paymentReqUserInfo').html('');
                // console.log(response.length);
                if (response.length > 0) {
                    var count = 1;

                    response.forEach(user => {
                        $('#paymentReqUserInfo').append(`
                    
                        <tr data-row_id="` + user['id'] + `">
                            <td>` + count + `</td>
                            <td style="flex : 1;"><img class="m-2" style="vertical-align: middle" src="/img/8.webp" alt="" height="30px" width="30px"><span style="vertical-align: middle;margin-right:5px;">` + user['name'] + `</span></td>
                            <td>` + user['money'] + `</td>
                            <td>` + user['payment_methode'] + `</td>
                            <td style="float:right;" dir="ltr" lang="ar">
                            ` + user['phone'] + `
                            </td>
                            <td><button class="btn-base btn-success color-white makePaid" data-id="` + user['id'] + `">تم الدفع</button></td>
                            <td><a href="#" data-id="` + user['id'] + `" style="color: #000;" class=" link-icon fas fa-eye size-1 showUserInfo" ></a></td>
                        </tr>
                
                    `);
                        count++;
                    });

                } else {
                    flash("لا توجد نتيجه !!", "warning")
                    $('#paymentReqUserInfo').append(`<h3 style="text-align: center;display:flex;">لايوجد طلبات<h3>`);
                }

                $('#userPaymentRequ').iziModal('open');

            },
            error: function(jqXHR, exception) {
                if (jqXHR.status === 500) {
                    flash('حاول مجددا', 'warning');


                }
            }
        });
    });

    $(document).on('click', '.makePaid', function() {
        $('#current_id').val($(this).attr('data-id'));
        console.log($(this).attr('data-id'));

        askUser("هل انت متاكد انك قمت بالدفع؟", "yes4makePaid", "danger");
    })

    // do action
    $(document).on('click', '#yes4makePaid', function() {
        var id = $('#current_id').val();

        $.ajax({
            type: "post",
            url: "/dashboard/users/makepaid",
            data: {
                'id': id,
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: "json",
            success: function(response) {
                flash(response['message'], response['status']);
                if (response['status'] == 'success') {
                    $('#paymentReqUserInfo tr[data-row_id=' + id + ']').remove();

                    if ($('#paid-badge').html() > 0) {
                        var current = $('#paid-badge').html();
                        $('#paid-badge').html(current - 1)
                    }
                    if (($('#paid-badge').html() == 0)) {
                        $('#paid-badge').remove()

                    }

                }
            },
            error: function(jqXHR, exception) {
                if (jqXHR.status === 500) {
                    flash('حاول مجددا', 'warning');

                }
            }
        });
    });

});