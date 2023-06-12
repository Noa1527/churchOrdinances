import { Injectable } from '@nestjs/common';
import { LeaderRoles, LeaderRolesDocument } from './leader_role.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LeaderRoleService {
    constructor(@InjectModel(LeaderRoles.name) private leaderRoleModel: Model<LeaderRolesDocument>) {}

    async create(leaderRole: Partial<LeaderRoles>): Promise<LeaderRolesDocument> {
        const newLeaderRoles = new this.leaderRoleModel(leaderRole);
        return newLeaderRoles.save();
    }

    async findOneById(id: string): Promise<LeaderRolesDocument> {
        return this.leaderRoleModel.findById(id).exec();
    }

    async findOneByName(name: string): Promise<LeaderRolesDocument> {
        return this.leaderRoleModel.findOne({ name }).exec();
    }
}
