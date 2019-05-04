const { readFileSync } = require('fs');
const { join } = require('path');
const { homedir } = require('os');
const { map } = require('lodash');

export const processData = () => {
  const jsonContent = JSON.parse(
    readFileSync(join(homedir(), 'health', 'chart-res', 'outsir.json'))
  ).slice(0, 20);

  const timeArray = map(jsonContent, 'time');
  const iArray = map(jsonContent, 'I');
  const sArray = map(jsonContent, 'S');

  return {
    timeArray,
    iArray,
    sArray
  };
};

export const processTableData = () => {
  const jsonContent = JSON.parse(
    readFileSync(join(homedir(), 'health', 'chart-res', 'outbed.json'))
  ).slice(0, 60);

  return jsonContent.map((val, index) => {
    return [index + 1, val['df.I'], val['bed']];
  });
};
