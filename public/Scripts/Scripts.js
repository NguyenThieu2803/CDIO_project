document.addEventListener('DOMContentLoaded', () => {
  const TableRank = document.querySelector('#data-Ranktable tbody');
  const Tasksbody = document.querySelector('#task-body');
  const ModalContent = document.querySelector('.comment_content');
  const IngredientContent = document.querySelector('.ingredient_content');
  const InstructionContent = document.querySelector('.Intsruction_content');
  const dropEventbtn = document.querySelector('#select_event');
  const dropDifbtn = document.querySelector('#select_dif');
  const Imgrecipe = document.querySelector('.imgrecipe')
  // Function to render the table rank and cards from API data
  const showRanktable = async (difficulty = null, event = null) => {
    try {
      const url = 'http://localhost:3000/api/v1/Alldata';
      const response = await axios.get(url);
      const sortedRecipes = response.data.sortedRecipes;
      const Tasks = response.data.data;

      if (!sortedRecipes || sortedRecipes.length < 1 || !Tasks || Tasks.length < 1) {
        console.log('No recipes found.');
        return;
      }

      // Clear existing rows and cards
      TableRank.innerHTML = '';
      Tasksbody.innerHTML = '';


      const filteredTasks = Tasks.filter(task => {
        return (!difficulty || task.DIFFICULTY_LEVEL === difficulty) &&
          (!event || task.EVENT === event);
      });

      // Append each recipe to the table
      sortedRecipes.forEach(item => {
        TableRank.innerHTML += `
          <tr>
            <th scope="row">${item.RECIPE_NAME}</th>
            <td>${item.totalLikes}</td>
          </tr>
        `;
      });

      // Append each card to the task body
      filteredTasks.forEach((item, index) => {
        // Create a new row for every three items
        if (index % 3 === 0) {
          var row = document.createElement('div');
          row.className = 'row mb-3';
          Tasksbody.appendChild(row);
        }

        // Create the card
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
          <div class="card" style="width: 18rem; height: 300px">
            <img src="/img/${item.IMG_URL}" class="img-fluid" alt="...">
            <div class="card-body">
              <h6>${item.RECIPE_NAME}</h6>
              ${item.DESCRIPTION}
            </div>
            <div class="card-footer text-end mb-3">
              <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal1"> Đánh Giá </button>
              <button type="button" class="btn btn-outline-success" data-id="${item.RECIPE_ID}" data-bs-toggle="modal" data-bs-target="#exampleModal"> Chi Tiết </button>
              <button class="btn btn-outline-success"> Lưu </button>
            </div>
          </div>
        `;
        // Append the card to the latest row
        Tasksbody.lastChild.appendChild(card);
      });

      // Add event listeners to detail buttons
      const detailButtons = document.querySelectorAll('.btn-outline-success[data-id]');
      detailButtons.forEach(button => {
        button.addEventListener('click', function (e) {
          const Id = this.getAttribute('data-id');
          console.log(Id); // Log the Id when the button is clicked
          e.preventDefault();
          showDanhgiamodel(Id);
        });
      });
    } catch (error) {
      console.error('Error fetching sorted recipes:', error);
    }
  };
  // Function to show danh gia model
  const showDanhgiamodel = async (Id) => {
    console.log(Id); // Log the Id when the button is clicked
    try {
      const url = `http://localhost:3000/api/v1/dataReview/${Id}`;
      const response = await axios.get(url);
      const data = response.data.data;
console.log(data);
      // Data ingredients
      const result = await axios.get(`http://localhost:3000/api/v1/Ingredient/${Id}`);
      const Ingredient = result.data.data;
      // Data Instructions
      const result1 = await axios.get(`http://localhost:3000/api/v1/Instruction/${Id}`);
      const Instruction = result1.data.data;

      console.log(Ingredient); // Log the data when the button is clicked
      console.log(Instruction); //
      console.log(data); // Log the data when the button is clicked
      // if (!data || data.length < 1 || Ingredient.length < 1) {
      //   console.log('No review found.');
      //   return;
      // }
      //IMG CHITIET 
      Imgrecipe.innerHTML = '';

     let IMG;
      data.forEach(item => {
        IMG=item.RECIPE.IMG_URL;
      }); 
      console.log(IMG); 
      
      // Log the data when the button is clicked
      Imgrecipe.innerHTML = `<img src="/img/${IMG}" class="img-fluid mb-3"
alt="...">`;
      // Clear existing content of ModalContent
      ModalContent.innerHTML = '';

      // Append new content to ModalContent
      data.forEach(item => {
        
        ModalContent.innerHTML += `
          <a class="d-flex align-items-center nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="/img_user/${item.USER_IMG}" class="user-img" alt="user avatar" style="width: 50px;">
            <p class="user-name mb-3">${item.USER_NAME}</p>
          </a>
          <textarea rows="3" class="form-control mb-2" name="" id="">${item.COMMENT}</textarea>
        `;
      });

      // Append the ingredients
      IngredientContent.innerHTML = '';

      Ingredient.forEach(item => {
        IngredientContent.innerHTML += `
          <p>- ${item.AMOUNT} gram ${item.NAME}</p>
        `;
      });

      // Append the Instructions
      InstructionContent.innerHTML = '';
      Instruction.forEach(item => {
        InstructionContent.innerHTML += `<p> - Step ${item.STEP_NUMER}: ${item.STEP_DESCRIPTION} </p>`;
      });
    } catch (error) {
      console.error('Error fetching review:', error);
    }
  };

  // Function to show data in dropdown list
  const showdatadropdownlist = async () => {
    try {
      // Data event
      const url = `http://localhost:3000/api/v1/dataEvent`;
      const response = await axios.get(url);
      const data = response.data.data;

      // Clear existing options
      dropEventbtn.innerHTML = '<option selected>Chọn</option>';

      // Append new options from API data
      data.forEach(item => {
        dropEventbtn.innerHTML += `
          <option value="${item.EVENT}">${item.EVENT}</option>
        `;
      });

      // Data difficulty
      const url1 = `http://localhost:3000/api/v1/datadifficulty`;
      const response1 = await axios.get(url1);
      const datadif = response1.data.data;
      dropDifbtn.innerHTML = '<option selected>Chọn</option>';

      // Append new options from API data
      datadif.forEach(item => {
        dropDifbtn.innerHTML += `
          <option value="${item.DIFFICULTY_LEVEL}">${item.DIFFICULTY_LEVEL}</option>
        `;
      });
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Filter recipes based on selected dropdown options
  const filterRecipes = () => {
    const filterEvent = dropEventbtn.value !== 'Chọn' ? dropEventbtn.value : null;
    const filterDif = dropDifbtn.value !== 'Chọn' ? dropDifbtn.value : null;
    showRanktable(filterDif, filterEvent);
  };

  dropDifbtn.addEventListener('change', filterRecipes);
  dropEventbtn.addEventListener('change', filterRecipes);

  showRanktable();
  showdatadropdownlist();
});
