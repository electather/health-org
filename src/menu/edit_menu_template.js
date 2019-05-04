import { createSpreadResultsWindow } from '../pages/spreadResaults';

export const editMenuTemplate = [
  {
    label: 'فایل',
    submenu: [
      { label: 'پروژه جدید', accelerator: 'CmdOrCtrl+N' },
      { label: 'باز کردن فایل', accelerator: 'CmdOrCtrl+O' },
      {
        label: 'ذخیره',
        accelerator: 'CmdOrCtrl+S'
      },
      { type: 'separator' },
      { label: 'خروج', accelerator: 'CmdOrCtrl+Q', selector: 'cut:' }
    ]
  },
  {
    label: 'سناریو',
    submenu: [{ label: 'تعریف سناریو' }, { label: 'اصلاح سناریو' }]
  },
  {
    label: 'اجرا',
    submenu: [{ label: 'شبیه سازی شیوع' }, { label: 'شبیه سازی امداد رسانی' }]
  },
  {
    label: 'درباره برنامه',
    submenu: [
      {
        label: 'توسعه دهندگان'
      }
    ]
  }
];
