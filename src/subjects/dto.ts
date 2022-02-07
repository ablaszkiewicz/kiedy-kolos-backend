export interface CreateSubjectDTO {
  name: string;
  shortName: string;
  owner: number;
}

export interface UpdateSubjectDTO {
  id: number;
  name: string;
  shortName: string;
}
