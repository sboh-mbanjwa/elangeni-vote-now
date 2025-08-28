export interface Candidate {
  id: string;
  name: string;
  photo: string;
  manifesto: string;
  position: string;
}

export interface Position {
  id: string;
  name: string;
  description: string;
  candidates: Candidate[];
}

export interface Vote {
  positionId: string;
  candidateId: string;
}

export interface Student {
  studentNumber: string;
  idNumber: string;
  name: string;
  hasVoted: boolean;
}

export interface VotingSession {
  studentNumber: string;
  votes: Vote[];
  timestamp: Date;
  confirmationCode: string;
}