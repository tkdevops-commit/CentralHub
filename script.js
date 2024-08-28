document.addEventListener('DOMContentLoaded', () => {
    restoreFromLocalStorage();
    updateAustralianStateTimes();
    setInterval(updateAustralianStateTimes, 1000);
});

window.addEventListener('beforeunload', saveToLocalStorage);

function updateAustralianStateTimes() {
    const options = { hour: '2-digit', minute: '2-digit', hour12: false };
    const states = {
        'timeNSW': 'Australia/Sydney',
        'timeVIC': 'Australia/Melbourne',
        'timeQLD': 'Australia/Brisbane',
        'timeSA': 'Australia/Adelaide',
        'timeWA': 'Australia/Perth',
        'timeTAS': 'Australia/Hobart',
        'timeNT': 'Australia/Darwin',
        'timeACT': 'Australia/Canberra'
    };

    Object.keys(states).forEach(id => {
        const timeElement = document.getElementById(id);
        if (timeElement) {
            timeElement.textContent = new Date().toLocaleTimeString('en-AU', { ...options, timeZone: states[id] });
        }
    });
}

function toggleDropdown() {
    const dropdownContent = document.getElementById('dropdownContent');
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
}

function updateDateTime() {
    var now = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    var dateTimeString = now.toLocaleDateString('en-US', options);
    document.getElementById('currentDateTime').textContent = dateTimeString;
}
setInterval(updateDateTime, 1000);
updateDateTime();

function openBlank() {
    window.open('https:blank', '_blank');
}

function toggleScriptBox() {
    var scriptBox = document.getElementById("scriptBox");
    if (scriptBox.style.display === "none") {
        scriptBox.style.display = "block";
    } else {
        scriptBox.style.display = "none";
    }
}

function toggleContactsBox() {
    var contactsBox = document.getElementById("contactsBox");
    if (contactsBox.style.display === "none" || contactsBox.style.display === "") {
        contactsBox.style.display = "block";
    } else {
        contactsBox.style.display = "none";
    }
}

window.onclick = function(event) {
    if (!event.target.matches('.dropdown-button')) {
        const dropdowns = document.getElementsByClassName('dropdown-content');
        Array.from(dropdowns).forEach(openDropdown => {
            if (openDropdown.style.display === 'block') {
                openDropdown.style.display = 'none';
            }
        });
    }
};

function saveWork() {
    const inputs = document.querySelectorAll('input[type="text"], textarea');
    const data = Array.from(inputs).map(input => `${input.id || input.name}: ${input.value}`).join('\n');

    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'saved_data.txt';
    a.click();

    URL.revokeObjectURL(url);
}

function saveToLocalStorage() {
    const inputs = document.querySelectorAll('input[type="text"], textarea');
    inputs.forEach(input => localStorage.setItem(input.id || input.name, input.value, inputField,));
}

function clearLocalStorage() {
    localStorage.clear(); 
    const inputs = document.querySelectorAll('input[type="text"], textarea');
    inputs.forEach(input => input.value = ''); 
}

function refreshPage() {
    clearLocalStorage();
    localStorage.setItem('pageJustCleared', 'true');
    window.location.reload();
}

function restoreFromLocalStorage() {
    if (localStorage.getItem('pageJustCleared')) {
        localStorage.removeItem('pageJustCleared'); 
        return; 
    }
    
    const inputs = document.querySelectorAll('input[type="text"], textarea');
    inputs.forEach(input => {
        const savedValue = localStorage.getItem(input.id || input.name);
        if (savedValue !== null) {
            input.value = savedValue;
        }
    });
}

function toggle(containerId) {
    const container = document.getElementById(containerId);
    const content = container.querySelector('.content');
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block'; 
    } else {
        content.style.display = 'none';
    }
}

function toggleStoredTextBox(textBoxId) {
    const textBox = document.getElementById(textBoxId);
    textBox.style.display = textBox.style.display === "none" ? "block" : "none";
}

function saveText(textAreaId) {
    const text = document.getElementById(textAreaId).value;
    console.log("Text saved:", text);
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.toggle-scroller').forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
});

function toggleDropdownOther() {
    var dropdownContent = document.getElementById("dropdownContentOther");
    dropdownContent.classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropdown-button-other')) {
        var dropdowns = document.getElementsByClassName("dropdown-content-other");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

let addToDoButton = document.getElementById('addToDo');
let toDoContainer = document.getElementById('toDoContainer');
let inputField = document.getElementById('inputField');
let toDos = JSON.parse(localStorage.getItem('toDos')) || [];


function saveToDos() {
   localStorage.setItem('toDos', JSON.stringify(toDos));
}

function renderToDos() {
   toDoContainer.innerHTML = '';
   toDos.forEach(function(toDo) {
       var paragraph = document.createElement('p');
       paragraph.classList.add('paragraph-styling');
       paragraph.innerText = toDo.text;

       if (toDo.completed) {
           paragraph.style.textDecoration = "line-through";
       }

       paragraph.addEventListener('click', function() {
           if (toDo.completed) {
               toDo.completed = false;
               paragraph.style.textDecoration = "none";
           } else {
               toDo.completed = true;
               paragraph.style.textDecoration = "line-through";
           }
           saveToDos();
       });

       paragraph.addEventListener('dblclick', function() {
           toDos = toDos.filter(function(item) {
               return item.text !== toDo.text;
           });
           saveToDos();
           renderToDos();
       });

       toDoContainer.appendChild(paragraph);
   });
}

renderToDos();

addToDoButton.addEventListener('click', function() {
   if (inputField.value !== '') {
       let toDo = {
           text: inputField.value,
           completed: false
       };
       toDos.push(toDo);
       saveToDos();
       renderToDos();
       inputField.value = '';
   }
});

function calculateDaysAndWeeks() {
    var startDate = new Date(document.getElementById("start-date").value);
    var endDate = new Date(document.getElementById("end-date").value);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        document.getElementById("result").innerText = "Invalid date(s). Please enter valid dates.";
        return;
    }

    var timeDifference = endDate.getTime() - startDate.getTime();
    var daysDifference = timeDifference / (1000 * 3600 * 24);
    var weeksDifference = Math.floor(daysDifference / 7);
    var result = "Days: " + daysDifference + ", Weeks: " + weeksDifference;
    document.getElementById("result").innerText = result;
}

function calculateEndDate() {
    var startDate = new Date(document.getElementById("start-date").value);
    var daysToAdd = parseInt(document.getElementById("days-input").value);
    if (isNaN(startDate.getTime())) {
        document.getElementById("result").innerText = "Invalid start date. Please enter a valid start date.";
        return;
    }
    if (isNaN(daysToAdd)) {
        document.getElementById("result").innerText = "Invalid number of days. Please enter a valid number of days.";
        return;
    }
    var endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + daysToAdd);
    document.getElementById("result").innerText = "End Date: " + endDate.toDateString();
}

function selectNote(note) {
    const textToCopy = document.getElementById('textToCopy');
    textToCopy.value = note;
}

function copyToClipboard() {
    const textToCopy = document.getElementById('textToCopy');
    textToCopy.select();
    textToCopy.setSelectionRange(0, textToCopy.value.length);

    navigator.clipboard.writeText(textToCopy.value).then(() => {
        showFeedback(true);
    }).catch(err => {
        console.error('Could not copy text: ', err);
        showFeedback(false);
    });
}

function showFeedback(success) {
    const feedback = document.getElementById('feedback');
    if (success) {
        feedback.innerHTML = '✔ Copied to clipboard';
        feedback.className = 'success';
    } else {
        feedback.innerHTML = '✖ Could not copy text.';
        feedback.className = 'error';
    }
    feedback.style.display = 'block';

    clearTimeout(feedback.timeout);
    feedback.timeout = setTimeout(() => {
        feedback.style.display = 'none';
    }, 1000);
}

const monthYearElement = document.getElementById('monthYear');
const datesElement = document.getElementById('dates');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

function renderCalendar() {
    datesElement.innerHTML = '';
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    monthYearElement.textContent = `${months[currentMonth]} ${currentYear}`;

    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        datesElement.appendChild(emptyCell);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dateCell = document.createElement('div');
        dateCell.classList.add('date');
        dateCell.textContent = i;

        const today = new Date();
        if (i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
            dateCell.classList.add('today');
        }

        // Highlight Wednesdays edit to reflect payday periods
        const dayOfWeek = new Date(currentYear, currentMonth, i).getDay();
        if (dayOfWeek === 3) { 
            dateCell.classList.add('wednesday');
        }

        datesElement.appendChild(dateCell);
    }
}

prevButton.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
});

nextButton.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
});

renderCalendar();


function copyText() {
    var textArea = document.getElementById("CarerAdditionalInformation");
    textArea.select();
    textArea.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");
    alert("Text copied to clipboard!");
}

        function toggleStoredTextBox(id) {
            var textBox = document.getElementById(id);
            if (textBox.style.display === 'none') {
                textBox.style.display = 'block';
                setPredefinedText(); // Set predefined text when the textbox is shown
            } else {
                textBox.style.display = 'none';
            }
        }

        function setPredefinedText() {
            var textarea = document.getElementById('CarerAdditionalInformation');
            textarea.value = `--- STAR Method Note Template ---

Situation: 
Describe the situation or context of your experience. What was the scenario?

Task: 
What was the task or challenge that you needed to address? What were you responsible for?

Action: 
Detail the specific actions you took to address the task. What did you do?

Result: 
What was the outcome of your actions? What did you accomplish or learn?
-----------------------`;
        }

        function copyText() {
            var textarea = document.getElementById('CarerAdditionalInformation');
            textarea.select();
            document.execCommand('copy');
        }
    </script>
