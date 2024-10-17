import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit{
  products: any[] = [];
  product = {
    productName: '',
    productDescription: '',
    imageUrl: '',
    price: null,
    discount: null,
    brand: '',
    rating: null,
    categoryIds: ''
  };
  editMode = false;
  formVisible = false;
  selectedProductId: any = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getData().subscribe((data) => {
      this.products = data;
    });
  }

  showForm() {
    this.formVisible = true;
    this.resetForm();
  }

  onSubmit() {
    const newProduct = {
      ...this.product,
      categoryIds: this.product.categoryIds.split(',').map((id: string) => parseInt(id.trim()))
    };

    if (this.editMode) {
      this.productService.putProduct(this.selectedProductId, newProduct).subscribe(() => {
        this.getProducts();
        this.resetForm();
      });
    } else {
      this.productService.postProduct(newProduct).subscribe(() => {
        this.getProducts();
        this.resetForm();
      });
    }
  }

  editProduct(product: any) {
    this.product = { ...product, categoryIds: product.categoryIds.join(',') };
    this.editMode = true;
    this.formVisible = true;
    this.selectedProductId = product.productId;
  }

  deleteProduct(id: any) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.getProducts();
    });
  }

  cancelForm() {
    this.formVisible = false;
    this.resetForm();
  }

  resetForm() {
    this.product = {
      productName: '',
      productDescription: '',
      imageUrl: '',
      price: null,
      discount: null,
      brand: '',
      rating: null,
      categoryIds: ''
    };
    this.editMode = false;
    this.selectedProductId = null;
  }
}
