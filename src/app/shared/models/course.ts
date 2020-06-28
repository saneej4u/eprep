export interface ICourse
{
    Id?: string;
    Title: string;
    Description: string;
    Thumbnail?: string;
    Price: number;
    CategoryId: string;
    SubCategoryId?: string;
    InstructorId?: string;
    InstructorName?: string;
    RentInDays?: number;


    BasicInfo?: string;
    Currency?: string;
    SubTitle?: string;
    TotalArticle?: string;
    TotalVideoInHours?: string;
}
