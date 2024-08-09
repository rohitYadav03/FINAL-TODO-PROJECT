
        let input_box = document.getElementById("input");
        let button = document.getElementById("btn");
        let list = document.getElementById("list");

        let addTodo = () => {
            if (input_box.value.trim() === "") {
                alert("Must write something");
                return;
            }

            let item = document.createElement("li");
            let textNode = document.createTextNode(input_box.value);
            item.appendChild(textNode);

            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.className = "delete-btn";
            item.appendChild(deleteBtn);

            list.appendChild(item);

            saveTodo(input_box.value);
            input_box.value = "";
        };

        let saveTodo = (todo) => {
            let todos = localStorage.getItem("todos");
            todos = todos ? JSON.parse(todos) : [];
            todos.push(todo);
            localStorage.setItem("todos", JSON.stringify(todos));
        };

        let loadTodo = () => {
            let todos = localStorage.getItem("todos");
            todos = todos ? JSON.parse(todos) : [];
            todos.forEach((curTodo) => {
                let item = document.createElement("li");
                let textNode = document.createTextNode(curTodo);
                item.appendChild(textNode);

                let deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.className = "delete-btn";
                item.appendChild(deleteBtn);

                list.appendChild(item);
            });
        };

        let updatedTodoAfterRemoval = (itemText) => {
            let todos = localStorage.getItem("todos");
            todos = todos ? JSON.parse(todos) : [];
            todos = todos.filter((curTodo) => curTodo !== itemText);
            localStorage.setItem('todos', JSON.stringify(todos));
        };

        button.addEventListener("click", addTodo);

        list.addEventListener("click", (event) => {
            if (event.target.classList.contains("delete-btn")) {
                let item = event.target.parentElement;
                let itemText = item.firstChild.textContent;
                item.remove();
                updatedTodoAfterRemoval(itemText);
            }
        });

        input_box.addEventListener('keydown', (event) => {
            if (event.key === "Enter") {
                addTodo();
            }
        });

        loadTodo();
    