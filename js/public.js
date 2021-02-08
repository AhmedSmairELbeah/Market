/**************************ask flash************************/
$(document).ready(function() {


    $("#messageAlert").iziModal({
        iframeHeight: 100,
        headerColor: 'rgb(189, 91, 91)',
    });

    $(document).on('click', '#buyBtn', function(event) {
        askUser('هل تريد مواصله عمليه الشراء؟', 'buyBtn1', 'success')
    });
    $(document).on('click', '#buyBtn1', function(event) {
        $('#buyBtnForm').submit();
    });

});