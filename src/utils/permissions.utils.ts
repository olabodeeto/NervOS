//Dashboard permissions
export const DashboardPerm = ['VIEW DASHBOARD', 'EXPORT RECORD'];

//Staff permissions
export const StaffPerm = [
  'VIEW STAFF-LIST',
  'VIEW STAFF',
  'UPDATE STAFF',
  'DELETE STAFF',
  'EXPORT STAFF',
  'EXPORT STAFF',
];

//Teacher permissions
export const TeacherPerm = [
  'VIEW TEACHER',
  'VIEW TEACHERS',
  'EXPORT TEACHERS',
  'EXPORT TEACHER',
  'CREATE TEACHER',
  'UPDATE TEACHER',
];

//Student permissions
export const StudentPerm = [
  'VIEW STUDENTS',
  'VIEW STUDENT',
  'CREATE STUDENT',
  'UPDATE STUDENT',
  'EXPORT STUDENTS',
  'EXPORT STUDENT',
];

//Guardian permissions
export const GuardianPerm = [
  'VIEW GUARDIAN',
  'VIEW GUARDIANS',
  'CREATE GUARDIAN',
  'UPDATE GUARDIAN',
  'EXPORT GUARDIANS',
  'EXPORT GUARDIAN',
];

//School classes permissions
export const SchoolClassPerm = [
  'VIEW STUDENTCLASSES',
  'VIEW STUDENTCLASS',
  'CREATE STUDENTCLASS',
  'UPDATE STUDENTCLASS',
  'EXPORT STUDENTSCLASSES',
  'EXPORT STUDENTCLASS',
];

//File storage permissions
export const FileStoragePerm = [
  'VIEW FILESTORAGE',
  'VIEW FILE',
  'CREATE FILE',
  'UPDATE FILE',
  'SAVE FILE',
  'DELETE FILE',
];

//Inventory permissions
export const InventoryPerm = [
  'VIEW INVENTORIES',
  'VIEW INVENTORY',
  'CREATE INVENTORY',
  'UPDATE INVENTORY',
  'EXPORT INVENTORIES',
  'EXPORT INVETORY',
];

//Annoucement permissions
export const AnnoucementPerm = [
  'VIEW ANNOUCEMNTS',
  'VIEW ANNOUCEMENT',
  'CREATE ANNOUCEMNET',
  'UPDATE ANNOUCEMENT',
  'DELETE ANNOUCEMENT',
];

//Audittrail permissions
export const AuditTrailPerm = ['VIEW AUDITTRAIL', 'EXPORT AUDITTRAIL'];

//Message permissions
export const MessagePerm = [
  'VIEW MESSAGES',
  'VIEW MESSAGE',
  'CREATE MESSAGE',
  'UPDATE MESSAGE',
  'DELETE MESSAGE',
];

//Message permissions
export const EventPerm = [
  'VIEW EVENTS',
  'VIEW EVENT',
  'CREATE EVENT',
  'UPDATE EVENT',
  'DELETE EVENT',
];

export const AllPermissions = {
  Dasboard: [...DashboardPerm],
  Staff: [...StaffPerm],
  Teacher: [...TeacherPerm],
  Student: [...StudentPerm],
  Guardian: [...GuardianPerm],
  SchoolClass: [...SchoolClassPerm],
  FileStorage: [...FileStoragePerm],
  Inventory: [...InventoryPerm],
  Annoucement: [...AnnoucementPerm],
  AuditTrail: [...AuditTrailPerm],
  Message: [...MessagePerm],
  Event: [...EventPerm],
  // Admin: ["ADMIN"],
};
