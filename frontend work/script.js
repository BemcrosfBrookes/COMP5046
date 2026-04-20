// get elements
const addBtn = document.querySelector('.add-btn');
const modal = document.getElementById('addMedModal');
const closeBtn = document.querySelector('.close-btn');
const medForm = document.getElementById('medForm');
const saveBtn = document.querySelector('.save-btn');
const prescriptionList = document.querySelector('.prescriptionList');

const reminderModal = document.getElementById('reminderModal');
const saveConfirmTakenBtn = document.getElementById('saveConfirmTakenBtn');
const reminderList = document.getElementById('reminderList')

//open modal
addBtn.addEventListener('click', function(){
  modal.style.display = 'flex';
});

//close modal
closeBtn.addEventListener('click', function(){
   modal.style.display = 'none';
});

// save medicine
saveBtn.addEventListener('click', function(){
  const name = document.getElementById('medName').value;
  const expiry = document.getElementById('medExpiry').value;
  const dosage = document.getElementById('medDosage').value;
  const size = document.getElementById('medSize').value;
  const type = document.getElementById('medType').value;
  const notes = document.getElementById('medNotes').value;

  if(name == "") return;

  //hide placeholder text
  const mainText = document.querySelector('.main-text');
  const subText = document.querySelector('.sub-text');
  if(mainText) mainText.style.display = 'none';
  if(subText) subText.style.display = 'none';

  addMedCard(name, expiry, dosage, size, type, notes);

  //close modal and rest form
  modal.style.display = 'none';
  medForm.reset();
})

//create and add med card
function addMedCard(name, expiry, dosage, size, type, notes){
  const Card = document.createElement('div');
  Card.classList.add('med-card');

  Card.innerHTML = `
  <div class="med-card">
  <h3>${name}</h3>
  <p>type: <strong>${type}</strong></p>
  </div>
  <div class="Card-body">
   <p>Expiry date: <strong>${expiry}</strong></p>
   <p>Dosage: <strong>${dosage} ${type} per day</strong></p>
   <p>size: <strong>${size}</strong></p>
   <p>Notes: <strong>${notes}</strong></p>
   </div>
   <div class="card-action">
   <button class="edit-btn">Edit</button>
   <button class="delete-btn">Delete</button>
   </div>
   `;

  //delete button
  Card.querySelector(".delete-btn").addEventListener("click",function(){
    Card.remove();
  if(prescriptionList.querySelectorAll('.med-card').length === 0){
    document.querySelector('.main-text').style.display = 'block';
    document.querySelector('.sub-text').style.display = 'block';
  }
  });
    //edit button
  Card.querySelector(".edit-btn").addEventListener("click", function(){
    document.getElementById('medName').value = name;
    document.getElementById('medExpiry').value = expiry;
    document.getElementById('medDosage').value = dosage;
    document.getElementById('medSize').value = size;
    document.getElementById('medType').value = type;
    document.getElementById('medNotes').value = notes;
    
    Card.remove();
    modal.style.display = 'flex';
  });

  prescriptionList.appendChild(Card);
}

function showReminderPopUp(medicines){
  reminderList.innerHTML = "";

  medicines.forEach(function(med){
     const medItem = document.createElement('div');
     medItem.classList.add('med-card');
     medItem.innerHTML = `
     <h3>${med.name}</h3>
     <p>Type: <strong>${med.type}</strong></p>
     <p>Dosage: <strong>${med.dosage} ${med.type} per day</strong></p>
     <p>Notes: <strong>${med.notes}</strong></p>
     `;
     reminderList.appendChild(medItem);
  });
  reminderModal.style.display ="flex";
  }


  saveConfirmTakenBtn.addEventListener("click",function (){
  alert("medication marked as taken.")
  reminderModal.style.display = "none";
    //back end linking
    //fetch(""{
      //method: "POST",
      //headers: {"":""},
        //body: JSON.stringify({})
      //});
});

//test
showReminderPopUp({
  name: "Tylenol",
  type: "Tablet",
  dosage: "2",
})



