import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team, TeamDocument } from 'src/modules/teams/teams.schema';

@Injectable()
export class TeamsService {
  constructor(@InjectModel(Team.name) private teamModel: Model<TeamDocument>) {}

  async create(team: Partial<Team>): Promise<Team> {
    const createdTeam = new this.teamModel(team);
    console.log(createdTeam);
    
    return createdTeam.save();
  }

  // team = _id : 0097654433 _familly = _id : 0097654433
  // familly = _id : 0097654433
  // async createFamily(team: Partial<Team>): Promise<Team> {

  // }

  async findAll(): Promise<Team[]> {
    return this.teamModel.find().exec();
  }

  async findOne(id: string): Promise<Team> {
    return this.teamModel.findById(id).exec();
  }


  async update(seq: string, team: Partial<Team>): Promise<Team> {
    console.log('team', team);
    console.log('seq', seq);
    return this.teamModel.findOneAndUpdate({ seq: seq }, team, { new: true }).exec();
  }

}