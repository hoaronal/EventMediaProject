$("#myBtn").click(function() {
	$('#messageContainer').html("");
	$("#myModal").modal();
});

jQuery.extend(jQuery.validator.messages, {
	email: "This is invalid email."
});


//Setup form validation on the #update-form element
var validator = $("#forgotForm").validate({
	 errorElement: 'div',
	rules : {
		email : {  
			required: true,
			email: true
		}
	}
});

$("#forgotForm").submit(function(e) {
	if ($(this).valid()) {
		var postData = $(this).serializeArray();
		var formURL = $(this).attr("action");
		$.ajax({
			url : formURL,
			type : "POST",
			data : postData,
		    success : function(data, textStatus, jqXHR) {
				$('#messageContainer').html(data);
		    },
		    error : function(jqXHR, textStatus, errorThrown) {
		    	$('#messageContainer').html($("#mgsError").text());
		    }
		});
		e.preventDefault(); // STOP default action
	}
})

// Change password
function checkPasswordMatch() {
	var password = $("#newPassword").val();
	var confirmPassword = $("#confirmPassword").val();

	if (password != confirmPassword) {
		$(".error-login").html("Passwords do not match!");
	} else {
		$(".error-login").html("");
	}
}

$("#newPassword, #confirmPassword").keyup(checkPasswordMatch);
