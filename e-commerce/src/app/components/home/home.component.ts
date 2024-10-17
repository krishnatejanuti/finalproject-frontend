import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from'src/app/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  myData: any;
  filteredProducts: any;
  searchTerm: string = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.productService.getData().subscribe(
      (data) => {
        this.myData = data;
        console.log(this.myData);
        this.filteredProducts = this.myData; // Initially show all products

        // Iterate through each product to add categoryDetails
        this.myData.forEach((product:any)=> {
          this.categoryService.getCategoryByID(product.categoryIds[0]).subscribe(
            (category:any) => {
              product.categoryDetails = category;
              console.log(this.myData);
            }
          )
        })
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );

    console.log(this.myData);
  }



  filterProductsByCategory(categoryID: number): void {
    let products = this.myData;

    if (categoryID !== 0) {
      products = products.filter((product: any) => product.categoryIds[0] === categoryID);
    }

    this.filteredProducts = this.applySearch(products);
  }

  onSearch(event: any): void {
    this.searchTerm = event.target.value.toLowerCase();
    this.filteredProducts = this.applySearch(this.myData);
  }

  applySearch(products: any[]): any[] {
    return products.filter(product => 
      product.productName.toLowerCase().includes(this.searchTerm) ||
      product.categoryDetails.categoryName.toLowerCase().includes(this.searchTerm)
    );
  }

  onSort(event: any): void {
    const sortValue = event.target.value;

    if (sortValue === 'name') {
      this.filteredProducts.sort((a: any, b: any) => 
        a.productName.localeCompare(b.productName)
      );
    }

    // Apply other sorting options here if needed
  }
}


