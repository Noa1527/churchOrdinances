import { Injectable } from '@nestjs/common';
import { Blessing, BlessingDocument } from './blessing.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BlessingService {
    constructor(@InjectModel(Blessing.name) private blessingModel: Model<BlessingDocument>) {}

    async create(blessing: Partial<Blessing>): Promise<BlessingDocument> {
        const newOrdinance = new this.blessingModel(blessing);
        return newOrdinance.save();
    }

    async update() {
        return 'update blessing';
    }

    
}
