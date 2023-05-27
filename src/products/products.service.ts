import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async createProduct(productData: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(productData);
    const savedProduct = await this.productRepository.save(product);


    const message = "Ürün başarıyla oluşturuldu.";
    const status = 1;

    const response: any = {
      ...savedProduct,
      message,
      status,
    };

    return response;
  }

  async updateProduct(id: number, updatedFields: Partial<Product>): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Ürün bulunamadı');
    }

    const updatedProduct = Object.assign(product, updatedFields);
    const savedProduct = await this.productRepository.save(updatedProduct);

    const message = 'Ürün başarıyla güncellendi.';
    const status = 1;

    const response: any = {
      ...savedProduct,
      message,
      status,
    };

    return response;
  }

  async deleteProduct(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Ürün bulunamadı');
    }

    const deletedProduct = await this.productRepository.delete(id);

    const message = 'Ürün başarıyla silindi.';
    const status = 1;

    const response: any = {
      ...deletedProduct,
      message,
      status,
    };

    return response;
  }





}
