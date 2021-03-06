
$(document).ready(function() {
    // if (!$.fn.dataTable.isDataTable( '#plantable' ) ) 
    // {
    //     $('#plantable').DataTable( {
    //     // "lengthMenu": [[10, 15, 30, -1], [10, 15, 30, "All"]],
    //     // "autoWidth": false
    //     "bLengthChange": false,
    //     // "sDom": '<"bottom"i>rtlp',
    //     "dom": 'rt<"bottom"ilp>',
    //      // "bInfo" : false,
    //      "iDisplayLength": 30
    //     } );
    // } 
    // $('#plantable tfoot th').each( function () {
    //     var title = $('#plantable thead th').eq( $(this).index() ).text();
    //     $(this).html( '<input type="text" placeholder="filter '+title+'" />' );
    // } );  
    // var table = $('#plantable').DataTable();
    // // // // Apply the search
    // table.columns().eq(0).each( 
    //     function ( colIdx ) {
    //     $( 'input', table.column( colIdx ).footer() ).on( 'keyup change', 
    //         function () {
    //         table
    //             .column( colIdx )
    //             .search( this.value )
    //             .draw();
    //     } );
    // } );

    $('#sel-pri').on('click', function(e){
    // e.preventDefault();
    e.stopImmediatePropagation();
    // alert($(this).find('input').attr('id'));
    $('#privatelist').removeClass('hide');
});
   $('#sel-pub').on('click', function(e){
    // e.preventDefault();
    e.stopImmediatePropagation();
    // alert($(this).find('input').attr('id'));
    $('#privatelist').addClass('hide');
}); 
    $.validator.addMethod(
"regex",
function(value, element) {
    return this.optional(element) || !(/:|\?|\$|\%|\&|\/|\\|\*|\"|<|>|\||%/g.test(value));
},
    "Illegal character are not allowed.");

    $.validator.addMethod("greaterThan",
        function(value, element, params) {
            if (!/Invalid|NaN/.test(new Date(value))) {
                return new Date(value) >= new Date($(params).val());
            }
            return isNaN(value) && isNaN($(params).val()) || (Number(value) > Number($(params).val()));
        }, 'return time must be greater than depart time.');
    $('#createform').validate({
        rules: {
            destination: {
                required: true,
                regex: true
            },
            departtime: {
                required: true,
            },
            returntime: {
                required: true,
                //name
                greaterThan: "#newdepart"
            },
            limit: {
                required: true,
                min: 2,
                digits: true
            }
        },
        submitHandler: function(e) {
            var postData = $("#createform").serializeArray();
            var formURL = $("#createform").attr("action");
            $.ajax({
                url: formURL,
                type: "POST",
                data: postData,
                success: function(data) {
                        location.href = "http://" + location.host + "/travelplans/my_plans";
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert("error: "+jqXHR.responseText);
                }
            });
        },
        highlight: function(element) {
            $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        errorClass: 'help-block',
        success: function(element) {
            element.text('OK!').addClass('valid')
                .closest('.form-group').removeClass('has-error').addClass('has-success');
        }
    });
    $('#editform').validate({
        rules: {
            editdestination: {
                required: true,
                regex: true
            },
            editdepart: {
                required: true,
            },
            editreturn: {
                required: true,
                greaterThan: "#editdepartid"
            },
            editlimit: {
                required: true,
                min: 2,
                digits: true
            }
        },
        submitHandler: function(e) {
            var postData = $("#editform").serializeArray();
            var formURL = $("#editform").attr("action");
            console.log(formURL);
            $.ajax({
                url: formURL,
                type: "POST",
                data: postData,
                success: function(data) {
                    location.reload();
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert("error: "+jqXHR.responseText);
                }
            });
        },
        highlight: function(element) {
            $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        errorClass: 'help-block',
        success: function(element) {
            element.text('OK!').addClass('valid')
                .closest('.form-group').removeClass('has-error').addClass('has-success');
        }
    });

    $('#deleteform').submit(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var postData = $("#deleteform").serializeArray();
        var formURL = $("#deleteform").attr("action");
        $.ajax({
            url: formURL,
            type: "POST",
            data: postData,
            success: function(data) {
                    location.href = "http://" + location.host + "/travelplans/my_plans";
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("error: "+jqXHR.responseText);
            }
        });
    });
    $('#shareform').submit(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var postData = $("#shareform").serializeArray();
        var formURL = $("#shareform").attr("action");
        $.ajax({
            url: formURL,
            type: "POST",
            data: postData,
            success: function(data) {
                    location.reload();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("error: "+jqXHR.responseText);
            }
        });
    });
    $('#joinform').submit(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var postData = $("#joinform").serializeArray();
        var formURL = $("#joinform").attr("action");
        $.ajax({
            url: formURL,
            type: "POST",
            data: postData,
            success: function(data) {
                    location.reload();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("error: "+jqXHR.responseText);
            }
        });
    });
    $('#unjoinform').submit(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var postData = $("#unjoinform").serializeArray();
        var formURL = $("#unjoinform").attr("action");
        $.ajax({
            url: formURL,
            type: "POST",
            data: postData,
            success: function(data) {
                    location.reload();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("error: "+jqXHR.responseText);
            }
        });
    });
});
