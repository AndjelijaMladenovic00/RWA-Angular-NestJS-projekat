import { ReportStatus } from '../enums/report-status.enum';

export interface Report {
  id: number;
  username: string;
  articleTitle: string;
  articleId: number;
  reportedOn: Date;
  status: ReportStatus;
}
