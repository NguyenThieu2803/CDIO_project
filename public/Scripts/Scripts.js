document.addEventListener('DOMContentLoaded', () => {
    const TableRank = document.querySelector('#data-Ranktable tbody');
    const Tasksbody = document.querySelector('#task-body');
    const showRanktable = async () => {
      try {
        const url = 'http://localhost:3000/api/v1/Alldata';
        const response = await axios.get(url);
        const sortedRecipes = response.data.sortedRecipes;
        const Tasks = response.data.data;
  
        if (!sortedRecipes || sortedRecipes.length < 1 || !Tasks || Tasks.length < 1) {
          console.log('No recipes found.');
          return;
        }
  
        // Clear existing rows
        TableRank.innerHTML = '';
  
        // Append each recipe to the table
        sortedRecipes.forEach(item => {
          TableRank.innerHTML += `
            <tr>
              <th scope="row">${item.RECIPE_NAME}</th>
              <td>${item.totalLikes}</td>
            </tr>
          `;
        });
        Tasks.forEach((item, index) => {
          // Create a new row for every three items
          if (index % 3 === 0) {
              var row = document.createElement('div');
              row.className = 'row mb-3'; // Add margin-bottom for spacing between rows
              Tasksbody.appendChild(row);
          }
      
          // Create the card
          const card = document.createElement('div');
          card.className = 'col-md-4'; // Use col-4 to make each card take up 1/3 of the row
          card.innerHTML = `
              <div class="card" style="width: 18rem; height: 300px">
                  <img src="/img/${item.IMG_URL}" class="imgluid" alt="...">
                  <div class="card-body">
                      <h6>${item.RECIPE_NAME}</h6>
                      ${item.DESCRIPTION}
                  </div>
                  <div class="card-footer text-end mb-3">
                      <button class="btn btn-warning"> Đánh Giá </button>
                      <button class="btn btn-outline-success"> Chi Tiết </button>
                      <button class="btn btn-outline-success"> Lưu </button>
                  </div>
              </div>
          `;
          // Append the card to the latest row
          Tasksbody.lastChild.appendChild(card);  
      });
      } catch (error) {
        console.error('Error fetching sorted recipes:', error);
      }
    };
    showRanktable();
  });


  