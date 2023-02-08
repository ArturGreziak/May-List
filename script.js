let ul;
let newItemForm;

let shoppingList = ["jajka", "jabko", "mąka", "pomidor", "gruszki", "jogurt", "chleb"];

document.addEventListener('DOMContentLoaded', () => {
  ul = document.getElementById('shoppingList');
  newItemForm = document.getElementById('newItemForm');
  inputError = document.getElementById('inputError');

    newItemForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let input = event.target.elements[0];

        if(input.value.length > 2 && !input.value.startsWith(' ')){
        addListItem(input.value);
        input.value = "";
         input.classList.add();
         inputError.innerText = "";
        } else {
            inputError.innerText = "Zła zawartość!";
            input.classList.add('input-danger');
        }
    })

  for(let shoppingItem of shoppingList){
    addListItem(shoppingItem);
  }
});

function addListItem(shoppingItem){
    let li = document.createElement('li');
    li.innerText = shoppingItem;
    ul.appendChild(li);
}