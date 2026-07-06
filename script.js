let trans = 0;

function ComputeBill(){
    const app_script = "https://script.google.com/macros/s/AKfycbwodh4RndB2-qheBitXFiOdEGwtCsZCrlojsb_BEi0_CLWcSmu8qY_EI_VyZldQo7Gh/exec";
    const name = document.getElementById("FName");
    if(name.value == ""){
        alert("Please Enter a valid name!")
        return;
    }
    const waterInput = document.getElementById("Water");
    const water = parseFloat(waterInput.value);
    
    if(isNaN(water) || water < 0){
        alert("Please enter a valid water consumption!");
        return;
    }
    
    const customer_type = parseFloat(document.getElementById("customer").value);
    let rate = 0;
    trans++;
    
    //rate based on consumption
    if(water <21){
        rate = 25;
    }else if(water < 41){
        rate = 35;
    }else if(water <61){
        rate = 45;
    }else if(water>60){
        rate = 60;
    }
    
    // Apply customer type discount
    const discount = customer_type;
    const amount = rate * water;
    const total_dis = amount * discount;
    const total = amount -total_dis;
    
    // Display the billing statement
    document.getElementById("transcantion").innerHTML= `
    <div id="results">
        <p>Transction Processed: ${trans}</p>
        <p>
            ================================<br>
            Water Billing Statement<br>
            ================================ 
        </p>
        <p>Customer Name: ${name.value}</p>
        <p>Water Consumption: ${water} Cubic Meters</p>
        <p>Rate per Cubic Meter: ₱${rate.toFixed(2)}</p>
        <p>-----------------------</p>
        <p>Amount: ₱${amount.toFixed(2)}</p>
        <p>Discount: ₱${total_dis.toFixed(2)}</p>
        <p>--------------------------</p>
        <p>Total Bill: ₱${total.toFixed(2)}</p>

    </div> 
    `;
    
    

    const billingData = {
        name: name.value,
        customerType: ["Regular", "Senior", "Solo Parent"][document.getElementById("customer").selectedIndex],
        water: water,
        rate: rate,
        amount: amount,
        total_dis: total_dis,
        total: total,
    };
    
    fetch(app_script, {
        method: "POST",
        body: JSON.stringify(billingData)
    })
    .then(response => response.text())
    .then(data => console.log("Data sent to Apps Script:", data))
    .catch(error => console.error("Error sending data:", error));

}

