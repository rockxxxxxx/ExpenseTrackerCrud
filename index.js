window.addEventListener("DOMContentLoaded", display);
const submit = document.getElementById("submit");
//submit.addEventListener("click", insertExpense);
const ul = document.getElementById("data");

function insertExpense() {
  const amnt = document.getElementById("amount").value;
  const expenseFor = document.getElementById("expense").value;
  const cat = document.getElementById("cat").value;
  const obj = {
    amnt,
    expenseFor,
    cat,
  };

  axios.post(
    "https://crudcrud.com/api/0583fc9dfe2a4ad8aa675318cffcbe5b/ExpenseTracker",
    obj
  );
}

function display() {
  axios
    .get(
      "https://crudcrud.com/api/0583fc9dfe2a4ad8aa675318cffcbe5b/ExpenseTracker"
    )
    .then(function (res) {
      for (let i = 0; i < res.data.length; i++) {
        var li = document.createElement("li");
        var amnt = document.createTextNode(`₹ ${res.data[i].amnt}-------->`);
        var expenseFor = document.createTextNode(
          `${res.data[i].expenseFor}-------->`
        );
        var cat = document.createTextNode(` ${res.data[i].cat}-------->`);
        var hr = document.createElement("HR");
        var del = document.createElement("button");
        var edit = document.createElement("button");
        del.innerHTML = "Delete";
        edit.innerHTML = "Edit";
        del.setAttribute("onclick", `Delete('${res.data[i]._id}')`);
        edit.setAttribute(
          "onclick",
          `Edit('${res.data[i]._id}','${res.data[i].amnt}','${res.data[i].expenseFor}','${res.data[i].cat}')`
        );
        li.setAttribute("id", `${res.data[i]._id}`);
        hr.setAttribute("class", `${res.data[i]._id}`);
        li.append(amnt, expenseFor, cat, del, edit);
        ul.appendChild(li);
        ul.appendChild(hr);
      }
    });
}
function Delete(id) {
  return new Promise((resolve, reject) => {
    axios
      .delete(
        `https://crudcrud.com/api/0583fc9dfe2a4ad8aa675318cffcbe5b/ExpenseTracker/${id}`
      )
      .then(function () {
        document.getElementById(`${id}`).remove();
        document.getElementsByClassName(`${id}`)[0].remove();
      })
      .catch(() => alert("Something went wrong"));
  });
}
function Edit(id, amnt, expenseFor, cat) {
  document.getElementById("submit").style.display = "none";
  document.getElementById("edit").style.visibility = "visible";
  document.getElementById("amount").value = amnt;
  document.getElementById("expense").value = expenseFor;
  document.getElementById("cat").value = cat;
  document.getElementById("edit").addEventListener("click", function () {
    Delete(id).then(insertExpense());
  });
}
