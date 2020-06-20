export interface ICourse
{
    Id?: string;
    Title: string;
    Thumbnail: string;
    BasicInfo: string;
    Description: string;
    Price: number;
    Currency?: string;

    InstructorId: string;
    InstructorName: string;

    CategoryId: string;
    SubCategoryId: string;
 
    SubTitle?: string;
    TotalArticle?: string;
    TotalVideoInHours?: string;
}
