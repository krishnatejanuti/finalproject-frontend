import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-admin-categorys',
  templateUrl: './admin-categorys.component.html',
  styleUrls: ['./admin-categorys.component.css']
})
export class AdminCategorysComponent implements OnInit 
{

  categorys:any[]=[];

  category={
    categoryName :'',
    description : '',
    productIds:''
  };

  
  editMode = false;
  formVisible = false;
  selectedCategoryId: any = null;

  constructor(private categoryService:CategoryService) 
  { }
  ngOnInit(): void {
    this.getCategorys();
  }
  getCategorys() 
  {
    this.categoryService.getData().subscribe((data) => {
      this.categorys = data;
    });
  }

  onSubmit() {
    const newCategory = {
      ...this.category,
      categoryIds: this.category.productIds.split(',').map((id: string) => parseInt(id.trim()))
    };

    if (this.editMode) {
      this.categoryService.putCategory(this.selectedCategoryId, newCategory).subscribe(() => {
        this.getCategorys();
        this.resetForm();
      });
    } else {
      this.categoryService.postCategory(newCategory).subscribe(() => {
        this.getCategorys();
        this.resetForm();
      });
    }
  }

  editProduct(category: any) {
    // this.category = { ...this.category, productIds: category.productIds.join(',') };
    this.category = {
      categoryName: category.categoryName,
      description: category.description,
      productIds: category.productIds ? category.productIds.join(',') : '' // Handle empty case
  };
    this.editMode = true;
    this.formVisible = true;
    this.selectedCategoryId = category.categoryId;
  }

  deleteProduct(id: any) {
    this.categoryService.deleteById(id).subscribe(() => {
      this.getCategorys();
    });
  }

  showForm() {
    this.formVisible = true;
    this.resetForm();
  }

  cancelForm() {
    this.formVisible = false;
    this.resetForm();
  }

  resetForm() {
    this.category = {
      categoryName: '',
      description: '',
      productIds: ''
    };
    this.editMode = false;
    this.selectedCategoryId = null;
  }

}
