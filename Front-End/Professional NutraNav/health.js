document.addEventListener('DOMContentLoaded', () => {
    // Add click event listeners to all nav links
    document.querySelectorAll('#health-nav a').forEach(link => {
        link.addEventListener('click', toggleSection);
    });
});

function toggleSection(event) {
    event.preventDefault();
    
    // Hide all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });

    // Show the clicked section
    const sectionId = event.target.getAttribute('href'); // Get the href attribute of the clicked link
    document.querySelector(sectionId).style.display = 'block'; // Set the display of the target section to block

    // Scroll to the top of the shown section
    window.scrollTo(0, document.querySelector(sectionId).offsetTop);
}



//Calorie Tracker Section________________________________
// Function to handle adding a meal
function addMeal() {
    const mealName = document.getElementById('meal-name-input').value;
    const calories = document.getElementById('calorie-input').value;
    // Validation and API call to add the meal would go here

    // Add to meal log display
    const mealItem = document.createElement('li');
    mealItem.textContent = `${mealName}: ${calories} calories`;
    document.getElementById('meals-list').appendChild(mealItem);

    // Clear input fields
    document.getElementById('meal-name-input').value = '';
    document.getElementById('calorie-input').value = '';

    // Update chart or summary as needed
    updateCalorieChart();
}

// Dummy function for updating chart, you would replace this with your chart update logic
function updateCalorieChart() {
    // Update chart with new meal data
}

//hydration Tracker__________________________________

// Code for managing hydration goal slider value
document.getElementById('hydration-goal-slider').addEventListener('input', function() {
    const goalValue = this.value;
    document.getElementById('hydration-goal-value').textContent = `Goal: ${goalValue}L`;
});

// Code for updating hydration goal (requires backend integration)
document.getElementById('update-hydration-goal').addEventListener('click', function() {
    const newGoal = document.getElementById('hydration-goal-slider').value;
    // Save the new goal to the backend
    updateHydrationGoal(newGoal);
});

// Code for adding water intake
document.getElementById('add-water-intake').addEventListener('click', function() {
    // Increment water intake logic here
    addWaterIntake(250); // Assuming 250ml per click as an example
});

function updateHydrationGoal(goal) {
    // Backend API call to update the hydration goal
}

function addWaterIntake(amount) {
    // Backend API call to add water intake amount
    // Update frontend to reflect new water level
    updateWaterIntakeVisualization(amount);
}

function updateWaterIntakeVisualization(amount) {
    // Assuming you fetch the total intake from the backend and set it here
    //const totalIntake = /* fetched total intake */;
    //const goal = /* fetched hydration goal */;
    const percentage = (totalIntake / goal) * 100;

    // Update the water level height based on total intake and goal
    const waterLevel = document.getElementById('water-level');
    waterLevel.style.height = `${percentage}%`;
    document.getElementById('water-intake-value').textContent = `${totalIntake}L`;
}

// Code to populate historical hydration data chart would go here
