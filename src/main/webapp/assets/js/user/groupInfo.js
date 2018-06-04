
function getGroup(id) {
	$.ajax({
	    url : "/EventMedia/groupInfo/"+id,
	    type : "POST",
	    data : false,
	    dataType : 'json',
	    async : true,
	    success : function(data, textStatus, jqXHR) {
    		// display section group info
    		$(".infoGroup").show();

	    	// group info
    		$("#lblName").text(data.name);
    		$("#lblDescription").text(data.description);
    		$("#lblNote").text(data.note);
    		$("#lblDateStart").text(data.dateStart);
    		$("#lblDateEnd").text(data.dateEnd);
    		
    		$("input[name=status][value=" + data.status + "]").prop('checked', true);
    		$("input[name=type][value=" + data.type + "]").prop('checked', true);

    		// List member
    		if (data.user.length > 0) {
	    		if ($.fn.DataTable.isDataTable('#dataTables-result')) {
	                $('#dataTables-result').DataTable().destroy();
	            }

                $('#dataTables-result').DataTable({
                    "bProcessing" : true,
                    "aaData" : data.user,
                    "createdRow" : function(row, data, dataIndex) {
                        $(row).addClass('gradeX');
                    },
                    "aoColumns" : [
                    	{
                            "mDataProp" : "username",
                            "mRender" : function(data, type, row) {
                                return "<a target='_blank' href='/EventMedia/manager/user/" + row.id + "'>"
                                        + data+"</a>";
                            },
                        }, { "mDataProp" : "name"
                        }, { "mDataProp" : "email"
                        }, { "mDataProp" : "phone"
                        }, { "mDataProp" : "statusJoin"
                        }],
                    responsive : true
                });
                $(".listMember").show();
			} else {
				 $(".listMember").hide();
				if (data.status == 0) {
					$(".listMember").show();
	    			$(".listMemberBody").html("<b>No member!</b>");
    			}
    		}

    		// list image
    		if (data.image.length > 0) {
    			$(".listImage").show();
    		} else {
    			$(".listImageBody").html("<b>No image!</b>");
    			$(".listImage").show();
    		}
    		
    		if ($.fn.DataTable
                    .isDataTable('#dataTables-image')) {
                $('#dataTables-image').DataTable()
                        .destroy();
            }

            $('#dataTables-image').DataTable({
                "bProcessing" : true,
                "aaData" : data.image,
                "createdRow" : function(row, data, dataIndex) {
                    $(row).addClass('gradeX');
                },
                "aoColumns" : [
                	{
                        "mDataProp" : "title"
                    }, { "mDataProp" : "userCreate"
                    }, { "mDataProp" : "votes.length"
                    }, { "mDataProp" : "url",
                    	"mRender": function(data, type, row) {
                       	return "<img src='"+data+"' style='height: 150px;'"
                            +" data-to='"+data+"'"
                             + " data-caption='Like: <b>"+row.votes.length +"</b><br>" +
                             		"<b>Title</b>: "+row.title +
                             "</b></u><br>Description: "+row.description+"' class='modallery'>";
                    	}
                    }],
                responsive : true
            });
        	$(this).modallery({
        	    title: "<b>"+data.name +"</b>",
        	    navigate: true,
        	    arrows: true,
        	    keypress: true
        	  });
	    	
	    },
	    error : function(jqXHR, textStatus, errorThrown) {
	    	$("#messageContainer").removeClass('hidden_elem');
	    }
	});
}
