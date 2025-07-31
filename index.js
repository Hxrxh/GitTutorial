function handleFormSubmit(event) {
  event.preventDefault();
  const form = document.querySelector("form");
  let expenseAmount = event.target.amount.value;
  let description = event.target.desc.value;
  let category = document.getElementById("category").value;

  const expenseDetails = {
    expenseAmount,
    description,
    category,
  };

  const editId = sessionStorage.getItem("dataId");

  const expenseList = JSON.parse(localStorage.getItem("expenseList")) || [];

  if (editId) {
    update(expenseList, expenseDetails, editId);
  } else {
    add(expenseList, expenseDetails);
  }

  localStorage.setItem("expenseList", JSON.stringify(expenseList));
  form.reset();
}

function display(data) {
  const ul = document.querySelector("ul");
  const li = document.createElement("li");
  li.textContent = `${data.expenseAmount} - ${data.description} (${data.category})`;
  li.id = data.id;

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => {
    editData(data);
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    deleteData(data.id, li);
  });

  li.appendChild(editButton);
  li.appendChild(deleteButton);
  ul.appendChild(li);
}

function deleteData(id, li) {
  const expenseList = JSON.parse(localStorage.getItem("expenseList")) || [];
  const updatedExpenseList = expenseList.filter((item) => item.id != id);

  localStorage.setItem("expenseList", JSON.stringify(updatedExpenseList));
  li.remove();
}

function add(expenseList, expenseDetails) {
  expenseDetails.id = Date.now();
  expenseList.push(expenseDetails);
  display(expenseDetails);
}

function editData(data) {
  document.querySelector("#amount").value = data.expenseAmount;
  document.querySelector("#desc").value = data.description;
  document.querySelector("#category").value = data.category;

  sessionStorage.setItem("dataId", data.id);
  document.querySelector("button[type=submit]").textContent = "Update";
}

function update(expenseList, expenseDetails, dataId) {
  for (let i = 0; i < expenseList.length; i++) {
    if (expenseList[i].id == dataId) {
      expenseList[i].expenseAmount = expenseDetails.expenseAmount;
      expenseList[i].description = expenseDetails.description;
      expenseList[i].category = expenseDetails.category;
    }
    ``;
  }

  const li = document.getElementById(dataId);
  li.firstChild.textContent = `${expenseDetails.expenseAmount} - ${expenseDetails.description} (${expenseDetails.category})`;

  sessionStorage.removeItem("dataId");
  document.querySelector("button[type=submit]").textContent = "Submit";
}
