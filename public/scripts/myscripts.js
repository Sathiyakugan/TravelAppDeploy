$('#messageshow').fadeIn().delay(2000).fadeOut(800);

$('#username').on('keyup', function () {
    $.get('/usercheck?username=' + $('#username').val().toLowerCase(), function (response) {
        $('#usernameResponseHidden').text(response.message)
        if ($('#usernameResponseHidden').html() === "user exists") {
            $('#usernameResponse').text('That username is taken. Please pick another')
        }
    })
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#displaypicture')
                .attr('src', e.target.result)
                .width(200)
                .height(150);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

$(document).ready(function(){
    $('#deletestaff').on('click', function(e){
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type:'DELETE',
            url: '/admin/staffs/delete/'+id,
            success: function(response){
                alert('Deleting Article');
                window.location.href='/admin/staffs/view';
            },
            error: function(err){
                console.log(err);
            }
        });
    });
});
