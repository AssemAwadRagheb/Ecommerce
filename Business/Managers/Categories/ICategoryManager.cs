using Business.DTOs.Categories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Managers.Categories
{
    public interface ICategoryManager
    {
        List<GetAllCategoriesDto> GetAllCategories();
        GetCategoryByIdDto GetCategoryById(int id);
        void CreateCategory(CreateCategoryDto dto);
        void UpdateCategory(UpdateCategoryDto dto);
        void DeleteCategory(int id);
    }
}