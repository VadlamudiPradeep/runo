const availableTimeSlots = [
    "1st June 10:00 AM - 10:30 AM",
    "1st June 11:00 AM - 11:30 AM",
    "2nd June 2:00 PM - 2:30 PM",
];

const availableSlotsDropdown = document.getElementById("slot");
const registerButton = document.getElementById("registerButton");

const availableSlotsList = document.getElementById("availableSlots");
availableTimeSlots.forEach((slot, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = slot;
    availableSlotsList.appendChild(listItem);

    const option = document.createElement("option");
    option.value = index;
    option.textContent = slot;
    availableSlotsDropdown.appendChild(option);
});

registerButton.addEventListener("click", () => {
    const selectedSlotId = availableSlotsDropdown.value;
    const selectedSlot = availableTimeSlots[selectedSlotId];

    if (selectedSlot) {
        const data = {
            slotId: selectedSlotId,
            doseType: "firstDose",
        };

        let token = localStorage.getItem("token");
   console.log("token  = ===>" , token)
        axios
            .post("http://localhost:3000/slot/register-slot", data, {
                headers: {
                    "Authorization": `${token}`,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                if (response.data.success) {
                    alert(`You have successfully registered for: ${selectedSlot}`);
                } else {
                    alert(response.data.message);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    } else {
        alert("Please select a valid time slot.");
    }
});
