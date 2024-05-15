document.addEventListener('DOMContentLoaded', () => {
    const TableRank = document.querySelector('#data-Ranktable tbody');
  
    const showRanktable = async () => {
      try {
        const url = 'http://localhost:3000/api/v1/Rank';
        const response = await axios.get(url);
        const sortedRecipes = response.data.sortedRecipes;
  
        if (!sortedRecipes || sortedRecipes.length < 1) {
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
      } catch (error) {
        console.error('Error fetching sorted recipes:', error);
      }
    };
  
    showRanktable();
  });


  