import createWindow from '../helpers/window';
import url from 'url';
import { processData, processTableData } from '../helpers/loadData';
import path from 'path';
import env from 'env';

const createSpreadResultsWindow = () => {
  const resWindow = createWindow('srw', {
    height: 1000,
    width: 500,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  resWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'resault.html'),
      protocol: 'file:',
      slashes: true
    })
  );

  resWindow.once('ready-to-show', () => {
    resWindow.show();
    resWindow.webContents.send('chartData:send', processData());
    resWindow.webContents.send('tableData:send', processTableData());
  });
  if (env.name === 'development') {
    resWindow.openDevTools();
  }

  return resWindow;
};

export { createSpreadResultsWindow };
