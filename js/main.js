

$( document ).ready(function() {

    var base_url =  "http://localhost:8069"//window.location.origin;
    
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
        var pattern = new RegExp(/[^w{3}.]([a-zA-Z0-9]([a-zA-Z0-9-]{0,65}[a-zA-Z0-9])?.)+[a-zA-Z]{2,6}/igm);
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