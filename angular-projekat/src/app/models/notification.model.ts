export interface Notification {
  id: number;
  userID: number; //for whom is the notification
  title: string;
  message: string;
  sentOn: Date;
  opened: boolean;
  deleteArticleOnReception: boolean | null;
  articleID: number | null;
  senderID: number | null;
}
