$("#CreateAccountBtn").on("click", (e) => {
    e.preventDefault()
  
  
    let allInputs = document.querySelectorAll(".regInputs")
    let allRadioBoxs = document.querySelectorAll(".form-check-input");
  
      $("#msg_box").html(`
        <div class="flex justify-center items-center mt-4">
          <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
      `)
  
      $("#CreateAccountBtn").addClass("hidden")
      let obj = {
        endpoint: "createUser",
        data: {

        }

      }
      allInputs.forEach(allInput => {
        obj.data[allInput.dataset.name] = allInput.value
      })
      allRadioBoxs.forEach((allRadioBox) => {
        if (allRadioBox.checked) {
          obj.data[allRadioBox.name] = allRadioBox.value;
        }
      });
  
      let StringedData = JSON.stringify(obj)
      console.log(StringedData)
    
      $.ajax({
        type: "POST",
        url: "https://binarifylimited.com/php/index.php",
        dataType: 'json',
        data: StringedData,
        success: function (data) {
          console.log(data)
          if (data.status === 1) {
            Swal.fire({
                title: "Registration Successfull!",
                icon: "success"
              });
              setTimeout(() => {
              window.location.reload();
              allInputs.forEach(allInput => {
                allInput.value = ""
              })
            }, 4000);
          } else {
            Swal.fire(
              "Try again!",
              "Something went wrong, try again !",
              "error"
            );
          }
        },
        error: function (request, error) {
            Swal.fire("Try again!", "Something went wrong, try again !", "error");
        }
      });

  
  })

 

  async function fetchInvoice() {

    $("#users").html("");
  
    let config = {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
    };
    const response = await fetch(
      `https://binarifylimited.com/php/index.php?getUsers`
    );
    const userInvoices = await response.json();
    console.log(userInvoices);
   
    if (userInvoices.status === 1) {
      userInvoices.message.reverse().forEach((userInvoice, i) => {
        let addd = ""
        addd += `
          <tr>
          <td>${i + 1}</td>
          <td>${userInvoice.reg_id}</td>
          <td>${userInvoice.fullname}</td>
          <td>${userInvoice.email}</td>
          <td>${userInvoice.education}</td>
          <td>${userInvoice.age}</td>
          <td>${userInvoice.occupation}</td>
          <td>${userInvoice.phone}</td>
          <td>${userInvoice.question}</td>
          <td>${userInvoice.time_in}</td>
          </tr>
            `
      
        $("#users").append(addd);
      });
    } else {
      $("#users").html("<tr></tr>");
    }
  }
  
  fetchInvoice().then((uu) => {
  });