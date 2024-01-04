/*
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class GenericService {
  constructor(
    @InjectModel('Generic') private readonly genericModel: Model<any>,
  ) {}

  async create(modelName: string, data: any): Promise<any> {
    const newModel = new this.genericModel({ modelName, data });
    return await newModel.save();
  }

  async findAll(modelName: string): Promise<any[]> {
    return await this.genericModel.find({ modelName }).exec();
  }

  async findOne(modelName: string, id: string): Promise<any> {
    return await this.genericModel.findOne({ modelName, _id: id }).exec();
  }

  async update(modelName: string, id: string, data: any): Promise<any> {
    return await this.genericModel.updateOne({ modelName, _id: id }, { data });
  }

  async findOneByFilter(
    modelName: string,
    filter: { [key: string]: unknown },
  ): Promise<any> {
    const finalFilter = { modelName, ...filter };
    return await this.genericModel.findOne(finalFilter).exec();
  }

  async findManyByFilter(
    modelName: string,
    filter: { [key: string]: unknown },
    limit?: number,
  ): Promise<any> {
    let query = this.genericModel.find({ modelName, ...filter });
    if (limit) {
      query = query.limit(limit);
    }
    return await query.exec();
  }

  async delete(modelName: string, id: string): Promise<any> {
    return await this.genericModel.deleteOne({ modelName, _id: id });
  }
}
*/