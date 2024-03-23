function allowDrop(ev) {
    ev.preventDefault(); // Prevent default behavior (Prevent it from being dropped in a non-droppable area)
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id); // Set the drag's data to be the id of the dragged element
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var originalElement = document.getElementById(data);
    var clonedElement = originalElement.cloneNode(true); // Clone the dragged element
    clonedElement.id = "newId"; // Change the ID or handle it appropriately
    ev.target.appendChild(clonedElement); // Append the cloned element to the drop target
}

function filterMeals() {
    let searchInput = document.getElementById('mealSearch').value.toUpperCase();
    let mealCards = document.getElementsByClassName('meal-card');
    
    for (let i = 0; i < mealCards.length; i++) {
        let mealName = mealCards[i].getElementsByClassName('meal-name')[0].innerText;
        if (mealName.toUpperCase().indexOf(searchInput) > -1) {
            mealCards[i].style.display = "";
        } else {
            mealCards[i].style.display = "none";
        }
    }
}
