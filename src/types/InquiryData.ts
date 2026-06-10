// types/InquiryData.ts
export type InquiryData = {
  name: string;
  email: string;
  message: string;
};

export type Errors = {
  name?:string;
  email?:string;
  message?:string;
}

