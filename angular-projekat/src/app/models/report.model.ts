import { User } from './user.model';
import { Text } from './text.model';
import { ReportStatus } from '../enums/report-status.enum';

export interface Report {
  id: number;
  user: User;
  text: Text;
  reportedOn: Date;
  status: ReportStatus;
  resolvedOn?: Date;
}
