export interface Member {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    gender: string;
    ordinance: {
      Baptism: boolean;
      PriestHood: boolean;
      Initiatory: boolean;
      Endowment: boolean;
      Sealing: boolean;
    };
    blessing: {
      is_got: boolean;
    };
}
  