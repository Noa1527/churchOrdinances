import { Blessing } from "./blessings/blessing.type";
import { Ordinance } from "./ordinaces/ordinance.type";

export enum GenderType {
    Male = 'H',
    Female = 'F',
}

export enum LeaderRoles {
    BranchPresident = 'Président De Branche',
    EldersQuorum = 'Prêtrise',
    ReliefSociety = 'Société Secours',
    YoungMen = 'Jeunes Gens',
    YoungWomen = 'Jeunes Filles',
    Primary = 'Primaire',
    Member = 'Membre',
}

export interface Member {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    birthDate: Date;
    phone: string;
    comments: string[];
    _leaderRoles: LeaderRoles;
    _ordinance: Ordinance;
    _blessing: Blessing;
    gender?: GenderType
}

export type Members = Member[];