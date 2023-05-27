import { Controller, Get, Post, Delete, Param, Body, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    const product = await this.productsService.getProductById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  @Post()
  async createProduct(@Body() productData: Partial<Product>): Promise<Product> {

    if (!productData.name || !productData.price) {
      throw new HttpException('name ve price alanları gereklidir', HttpStatus.BAD_REQUEST);
    }
    return this.productsService.createProduct(productData);
  }

  @Post(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() productData: Partial<Product>
  ): Promise<Product> {
    if (!productData.name || !productData.price) {
      throw new HttpException(
        'name ve price alanları gereklidir',
        HttpStatus.BAD_REQUEST
      );
    }

    return this.productsService.updateProduct(id, productData);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<Product> {
    return this.productsService.deleteProduct(id);
  }
}
