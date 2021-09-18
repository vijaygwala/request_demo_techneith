

$( document ).ready(function() {

    var base_url =  "https://odoo.techneith.com"//window.location.origin;
    
    var selectList = document.getElementById("modules");
    
    

    $.ajax({
        url: `${base_url}/techneith/apps/`,
        method:"GET",
        
       
        statusCode: {
         
          500: function(responseObject, textStatus, errorThrown) {
            console.log("We got Internal Server Error");
          }
        
                     
      },
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var option = document.createElement("option");
                option.value = data[i].id;
                option.text = data[i].name;
                selectList.appendChild(option);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
          
        }
    });







$(".domain").on("input", function() {
    var domainName = $(this).val()
    var id = "#"+this.id
    console.log(id);
    if (domainName!= null && domainName!= undefined) {
        var pattern = new RegExp(/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i);
        if (pattern.test(domainName))
        {
            $(id).css("border-color", "green");
        }
        else{
            $(id).css("border-color", "red");
        }
    }
    else {
        return false;
    }
});



$('#demo_form').on('submit', function(e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.
    console.log("submitted");
    var form = $(this);
    var url = base_url+"/request/demo/";
    var fd = new FormData();    
    fd.append('partner', JSON.stringify({"name":$("#Name").val(),"email":$("#Email").val(),"company":$("#company").val(),"country":$("#country").val()}) );
    fd.append('module',$("#modules").val());
    fd.append('odoo_version',$("#odoo_version").val())
    fd.append('production_url',$("#production").val())
    fd.append('staging_url',$("#staging").val())
    $.ajax({
           type: "POST",
           url: url,
           data: fd, 
            processData: false,
            contentType: false,
         // serializes the form's elements.
           success: function(data)
           {
            swal("Thank You", "Your Demo request is successfully submitted", "success").then((value) => {
                $("#demo_form")[0].reset();
              });
            // show response from the php script.
           }
         });

    
});
});