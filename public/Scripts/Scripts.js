document.addEventListener('DOMContentLoaded', () => {
  const TableRank = document.querySelector('#data-Ranktable tbody');
  const Tasksbody = document.querySelector('#task-body');
  const TasksbodyFA = document.querySelector('#task-body-Fa');

  const ModalContent = document.querySelector('.comment_content');
  const IngredientContent = document.querySelector('.ingredient_content');
  const InstructionContent = document.querySelector('.Intsruction_content');
  const dropEventbtn = document.querySelector('#select_event');
  const dropDifbtn = document.querySelector('#select_dif');
  const Imgrecipe = document.querySelector('.imgrecipe');
  const ImgrecipeDanhgia = document.querySelector('.imgrecipeDanhgia');

  let currentRecipeId;

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

      TableRank.innerHTML = '';
      Tasksbody.innerHTML = '';

      const filteredTasks = Tasks.filter(task => {
        return (!difficulty || task.DIFFICULTY_LEVEL === difficulty) &&
          (!event || task.EVENT === event);
      });

      sortedRecipes.forEach(item => {
        TableRank.innerHTML += `
          <tr>
            <th scope="row">${item.RECIPE_NAME}</th>
            <td>${item.totalLikes}</td>
          </tr>
        `;
      });

      filteredTasks.forEach((item, index) => {
        if (index % 3 === 0) {
          var row = document.createElement('div');
          row.className = 'row mb-3';
          Tasksbody.appendChild(row);
        }

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
              <button type="button" class="btn btn-warning" data-id="${item.RECIPE_ID}" data-bs-toggle="modal" data-bs-target="#exampleModal1"> Đánh Giá </button>
              <button type="button" class="btn btn-outline-success" data-id="${item.RECIPE_ID}" data-bs-toggle="modal" data-bs-target="#exampleModal"> Chi Tiết </button>
              <button type="button" class="btn btn-outline-success btn-save" data-id="${item.RECIPE_ID}"> Lưu </button>
            </div>
          </div>
        `;
        Tasksbody.lastChild.appendChild(card);
      });

      const detailButtons = document.querySelectorAll('.btn-outline-success[data-id]');
      detailButtons.forEach(button => {
        button.addEventListener('click', function (e) {
          const Id = this.getAttribute('data-id');
          console.log(Id);
          e.preventDefault();
          showChiTietmodel(Id);
        });
      });

      const DanhgiaButtons = document.querySelectorAll('.btn-warning[data-id]');
      DanhgiaButtons.forEach(button => {
        button.addEventListener('click', function (e) {
          const Id = this.getAttribute('data-id');
          console.log(Id);
          e.preventDefault();
          currentRecipeId = Id;
          showDanhGiaModels(Id);
        });
      });

      // Add event listeners to save buttons
      const saveButtons = document.querySelectorAll('.btn-save[data-id]');
      saveButtons.forEach(button => {
        button.addEventListener('click', async function (e) {
          const Id = this.getAttribute('data-id');
          console.log(Id);
          e.preventDefault();
          saveRecipe(Id);
        });
      });

    } catch (error) {
      console.error('Error fetching sorted recipes:', error);
    }
  };
  // Favorites list
  const showFavoristList = async (difficulty = null, event = null) => {
    try {
      const url = 'http://localhost:3000/api/v1/Favorite';
      const response = await axios.get(url);
      const Tasks = response.data.data;
      console.log(Tasks)
      if (!sortedRecipes || sortedRecipes.length < 1 || !Tasks || Tasks.length < 1) {
        console.log('No recipes found.');
        return;
      }

      TableRank.innerHTML = '';
      TasksbodyFA.innerHTML = '';

      const filteredTasks = Tasks.filter(task => {
        return (!difficulty || task.DIFFICULTY_LEVEL === difficulty) &&
          (!event || task.EVENT === event);
      });

      sortedRecipes.forEach(item => {
        TableRank.innerHTML += `
        <tr>
          <th scope="row">${item.RECIPE_NAME}</th>
          <td>${item.totalLikes}</td>
        </tr>
      `;
      });

      filteredTasks.forEach((item, index) => {
        if (index % 3 === 0) {
          var row = document.createElement('div');
          row.className = 'row mb-3';
          TasksbodyFA.appendChild(row);
        }

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
            <button type="button" class="btn btn-warning" data-id="${item.RECIPE_ID}" data-bs-toggle="modal" data-bs-target="#exampleModal1"> Đánh Giá </button>
            <button type="button" class="btn btn-outline-success" data-id="${item.RECIPE_ID}" data-bs-toggle="modal" data-bs-target="#exampleModal"> Chi Tiết </button>
            <button type="button" class="btn btn-outline-success btn-save" data-id="${item.RECIPE_ID}"> Lưu </button>
          </div>
        </div>
      `;
      TasksbodyFA.lastChild.appendChild(card);
      });

      const detailButtons = document.querySelectorAll('.btn-outline-success[data-id]');
      detailButtons.forEach(button => {
        button.addEventListener('click', function (e) {
          const Id = this.getAttribute('data-id');
          console.log(Id);
          e.preventDefault();
          showChiTietmodel(Id);
        });
      });

      const DanhgiaButtons = document.querySelectorAll('.btn-warning[data-id]');
      DanhgiaButtons.forEach(button => {
        button.addEventListener('click', function (e) {
          const Id = this.getAttribute('data-id');
          console.log(Id);
          e.preventDefault();
          currentRecipeId = Id;
          showDanhGiaModels(Id);
        });
      });

      // Add event listeners to save buttons
      const saveButtons = document.querySelectorAll('.btn-save[data-id]');
      saveButtons.forEach(button => {
        button.addEventListener('click', async function (e) {
          const Id = this.getAttribute('data-id');
          console.log(Id);
          e.preventDefault();
          saveRecipe(Id);
        });
      });

    } catch (error) {
      console.error('Error fetching sorted recipes:', error);
    }
  };
  const showChiTietmodel = async (Id) => {
    console.log(Id);
    try {
      const url = `http://localhost:3000/api/v1/dataReview/${Id}`;
      const response = await axios.get(url);
      const data = response.data.data;
      console.log(data);

      const result = await axios.get(`http://localhost:3000/api/v1/Ingredient/${Id}`);
      const Ingredient = result.data.data;

      const result1 = await axios.get(`http://localhost:3000/api/v1/Instruction/${Id}`);
      const Instruction = result1.data.data;

      console.log(Ingredient);
      console.log(Instruction);
      console.log(data);

      Imgrecipe.innerHTML = '';
      let IMG = data[0].RECIPE.IMG_URL;
      console.log(IMG);

      Imgrecipe.innerHTML = `<img src="/img/${IMG}" class="img-fluid mb-3" alt="...">`;
      ModalContent.innerHTML = '';

      data.forEach(item => {
        ModalContent.innerHTML += `
          <a class="d-flex align-items-center nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="/img_user/${item.USER_IMG}" class="user-img" alt="user avatar" style="width: 50px;">
            <p class="user-name mb-3">${item.USER_NAME}</p>
          </a>
          <textarea rows="3" class="form-control mb-2" name="" id="">${item.COMMENT}</textarea>
        `;
      });

      IngredientContent.innerHTML = '';
      Ingredient.forEach(item => {
        IngredientContent.innerHTML += `
          <p>- ${item.AMOUNT} gram ${item.NAME}</p>
        `;
      });

      InstructionContent.innerHTML = '';
      Instruction.forEach(item => {
        InstructionContent.innerHTML += `<p> - Step ${item.STEP_NUMER}: ${item.STEP_DESCRIPTION} </p>`;
      });
    } catch (error) {
      console.error('Error fetching review:', error);
    }
  };

  const showDanhGiaModels = async (Id) => {
    try {
      const url = `http://localhost:3000/api/v1/RecipeByid/${Id}`;
      const response = await axios.get(url);
      const recipeId = response.data.recipeId;
      let IMG = recipeId[0].IMG_URL;
      console.log(IMG);
      ImgrecipeDanhgia.innerHTML = '';
      ImgrecipeDanhgia.innerHTML = `<img src="/img/${IMG}" class="img-fluid mb-3" alt="...">`;
    } catch (error) {
      console.log(error);
    }
  };

  const showdatadropdownlist = async () => {
    try {
      const url = `http://localhost:3000/api/v1/dataEvent`;
      const response = await axios.get(url);
      const data = response.data.data;

      dropEventbtn.innerHTML = '<option selected>Chọn</option>';
      data.forEach(item => {
        dropEventbtn.innerHTML += `
          <option value="${item.EVENT}">${item.EVENT}</option>
        `;
      });

      const url1 = `http://localhost:3000/api/v1/datadifficulty`;
      const response1 = await axios.get(url1);
      const datadif = response1.data.data;
      dropDifbtn.innerHTML = '<option selected>Chọn</option>';
      datadif.forEach(item => {
        dropDifbtn.innerHTML += `
          <option value="${item.DIFFICULTY_LEVEL}">${item.DIFFICULTY_LEVEL}</option>
        `;
      });
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const filterRecipes = () => {
    const filterEvent = dropEventbtn.value !== 'Chọn' ? dropEventbtn.value : null;
    const filterDif = dropDifbtn.value !== 'Chọn' ? dropDifbtn.value : null;
    showRanktable(filterDif, filterEvent);
  };

  dropDifbtn.addEventListener('change', filterRecipes);
  dropEventbtn.addEventListener('change', filterRecipes);

  const saveRecipe = async (Id) => {
    try {
      const url = `http://localhost:3000/api/v1/RecipeByid/${Id}`;
      const response = await axios.get(url);
      const recipe = response.data.recipeId[0];
      const recipeData = {
        EVENT: recipe.EVENT,
        RECIPE_NAME: recipe.RECIPE_NAME,
        IMG_URL: recipe.IMG_URL,
        DESCRIPTION: recipe.DESCRIPTION,
        RECIPE_ID:recipe.RECIPE_ID
      };
      console.log('Saving recipe:', recipeData);

      const saveResponse = await fetch('/api/v1/AddFavorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipeData)
      });

      if (saveResponse.ok) {
        const data = await saveResponse.json();
        console.log('Recipe saved:', data);
        // Handle successful save, e.g., show a success message
      } else {
        console.error('Error saving recipe:', saveResponse.statusText);
      }
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  showRanktable();
  showdatadropdownlist();
  showFavoristList();

  const starInputs = document.querySelectorAll('input[name="nutritional-value"]');
  let rate;
  starInputs.forEach(input => {
    input.addEventListener('click', () => {
      rate = parseInt(input.value);
    });
  });

  document.querySelector('.btn-warning').addEventListener('click', async () => {
    const comment = document.getElementById('comment').value;
    const userNameElement = document.querySelector('.user-name');
    const userImgElement = document.querySelector('.user-img');
    const imgUrl = userImgElement.getAttribute('src');
    const imgName = imgUrl.split('/').pop();
    const username = userNameElement.textContent;

    try {
      console.log(rate);
      console.log(comment);
      console.log(currentRecipeId);
      console.log(username);
      console.log(imgUrl);
      const response = await fetch('/api/v1/DanhGia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rate, comment, recipeId: currentRecipeId, username: username, userImg: imgName })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
});
