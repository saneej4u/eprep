export interface IOrderItem {
  id?: string;
  userId?: string;
  courseId?: string;
  courseName?: string;
  courseDescription?: string;
  price?: number;
  instructorName?: string;
  pictureUrl?: string;
}

export interface IMycourses {
  id?: string;
  courseId?: string;
  courseName?: string;
  courseDescription?: string;
  instructorName?: string;
  pictureUrl?: string;
  startedOn?: string;
  expiresOn?: string;
}
