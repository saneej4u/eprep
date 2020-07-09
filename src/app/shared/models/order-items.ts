export interface IOrderItem {
  id?: string;
  userId?: string;
  courseId?: string;
  courseTitle?: string;
  courseDescription?: string;
  price?: number;
  status?: string;
  instructorName?: string;
  pictureUrl?: string;
  availableFor?: number;
}

export interface IMycourses {
  id?: string;
  courseId?: string;
  courseName?: string;
  courseDescription?: string;
  status?: string;
  instructorName?: string;
  isPaid?: boolean;
  pictureUrl?: string;
  startedOn?: string;
  expiresOn?: string;
}
