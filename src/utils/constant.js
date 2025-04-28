export const PRIORITY_TYPES = [{key: 'LOW',value: 'Low'}, {key: 'MEDIUM',value: 'Medium'}, {key: 'HIGH',value: 'High'},{key: 'CRITICAL',value: 'Critical'}];
export const STATUS_TYPES = [
  {key: 'OPEN',value: 'Open'},
  {key: 'IN_PROGRESS',value: 'In Progress'},
  {key: 'PENDING_APPROVAL',value: 'Pending Approval'},
  {key: 'CLOSED',value: 'Closed'},
  {key: 'REOPEN',value: 'Reopen'}
];

export const SORT_BY = [{key: 'DUE_DATE_ASC',value: 'Due Date (Earliest First)'}, {key: 'DUE_DATE_DESC',value: 'Due Date (Latest First)'}, {key: 'PRIORITY',value: 'Priority (High to Low)'}];