import { Position, Student } from './types';
import thaboImage from '@/assets/candidate-thabo.jpg';
import nomsaImage from '@/assets/candidate-nomsa.jpg';
import siphoImage from '@/assets/candidate-sipho.jpg';

export const positions: Position[] = [
  {
    id: 'president',
    name: 'SRC President',
    description: 'Lead the Student Representative Council and represent all students',
    candidates: [
      {
        id: 'thabo-001',
        name: 'Thabo Mthembu',
        photo: thaboImage,
        manifesto: 'Committed to improving student facilities, enhancing communication between students and management, and creating more opportunities for student development.',
        position: 'president'
      },
      {
        id: 'mandla-002',
        name: 'Mandla Ngcobo',
        photo: thaboImage, // Using placeholder
        manifesto: 'Focused on student welfare, academic support programs, and building stronger partnerships with industry for student placements.',
        position: 'president'
      }
    ]
  },
  {
    id: 'secretary',
    name: 'SRC Secretary',
    description: 'Manage SRC documentation and communication',
    candidates: [
      {
        id: 'nomsa-003',
        name: 'Nomsa Dlamini',
        photo: nomsaImage,
        manifesto: 'Dedicated to improving communication channels, organizing student events, and ensuring transparent record-keeping of all SRC activities.',
        position: 'secretary'
      },
      {
        id: 'zanele-004',
        name: 'Zanele Khumalo',
        photo: nomsaImage, // Using placeholder
        manifesto: 'Passionate about student engagement, digital transformation of SRC processes, and creating inclusive spaces for all students.',
        position: 'secretary'
      }
    ]
  },
  {
    id: 'treasurer',
    name: 'SRC Treasurer',
    description: 'Manage SRC finances and budget allocation',
    candidates: [
      {
        id: 'sipho-005',
        name: 'Sipho Mazibuko',
        photo: siphoImage,
        manifesto: 'Committed to transparent financial management, maximizing student fund benefits, and ensuring accountability in all financial decisions.',
        position: 'treasurer'
      }
    ]
  }
];

export const mockStudents: Student[] = [
  {
    studentNumber: '2024001',
    idNumber: '0012251234567',
    name: 'Thandi Nkomo',
    hasVoted: false
  },
  {
    studentNumber: '2024002', 
    idNumber: '9905152345678',
    name: 'John Smith',
    hasVoted: true
  }
];