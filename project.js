  const inputBox = document.getElementById("input-box");
  const addButton = document.querySelector(".button2");
  const plusButton = document.querySelector('.button1');
  const taskList = document.getElementById("task-list");
  const clearIcon = document.querySelector('.row img');
  const sortIcon = document.querySelector('.icon1');
  const taskListParent = document.getElementById("task-list-parent");
  let draggedItem = null;
  let isAscending = true;


  clearIcon.addEventListener('click', function () {
    inputBox.value = ''; 
  });

addButton.addEventListener('click', function () {
  const taskText = inputBox.value.trim();
  addTaskWithDeleteButton(taskText);
});


plusButton.addEventListener('click', function () {
  const taskText = inputBox.value.trim();
  addTaskWithDeleteButton(taskText);
});


function addTaskWithDeleteButton(taskText) {
  if (taskText !== '') {
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;
    taskItem.draggable = true;
    

    const deleteImage = document.createElement('img');
    deleteImage.src = 'images/Group 56.png';
    deleteImage.alt = 'Delete';
    deleteImage.classList.add('delete-icon');

    deleteImage.addEventListener('mouseenter', function () {
      deleteImage.src = 'images/Group 70.png'; 
    });

    deleteImage.addEventListener('mouseleave', function () {
      deleteImage.src = 'images/Group 56.png'; 
    });

    deleteImage.addEventListener('click', function () {
      taskItem.remove();
    });

    taskItem.appendChild(deleteImage);
    taskList.appendChild(taskItem);

    inputBox.value = '';
  }
}


  


sortIcon.addEventListener('click', function () {
  sortTasks(!isAscending);
  isAscending = !isAscending; 
  updateSortIcon(isAscending);
});

function sortTasks(ascending) {
  const tasks = Array.from(taskList.children);

  tasks.sort(function (a, b) {
    const textA = a.textContent;
    const textB = b.textContent;
    if (ascending) {
      return textA.localeCompare(textB);
    } else {
      return textB.localeCompare(textA);
    }
  });

  tasks.forEach(function (task) {
    taskList.appendChild(task);
  });
}

function updateSortIcon(ascending) {
  sortIcon.src = ascending ? 'images/Group 38.png' : 'images/Group 90.png';
}

taskListParent.addEventListener('dragstart', function (e) {
  if (e.target.classList.contains('draggable')) {
    draggedItem = e.target;
    e.dataTransfer.setData('text/plain', ''); 
    setTimeout(function () {
      e.target.style.display = 'none';
    }, 0);
  }
});

taskListParent.addEventListener('dragend', function (e) {
  if (e.target.classList.contains('draggable')) {
    e.target.style.display = 'block';
    draggedItem = null;
  }
});

taskListParent.addEventListener('dragover', function (e) {
  e.preventDefault();
});

taskListParent.addEventListener('dragenter', function (e) {
  e.preventDefault();
  if (e.target === taskListParent) {
    e.target.style.background = 'rgba(0, 0, 0, 0.2)';
  }
});

taskListParent.addEventListener('dragleave', function (e) {
  if (e.target === taskListParent) {
    e.target.style.background = 'none';
  }
});

taskListParent.addEventListener('drop', function (e) {
  e.preventDefault();
  if (e.target === taskListParent) {
    taskListParent.style.background = 'none';

    const draggedIndex = Array.from(taskList.children).indexOf(draggedItem);

    taskListParent.insertBefore(draggedItem, e.target);

  }
});




  


