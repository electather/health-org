import { Loader } from './fileLoader';

const { map, chunk } = require('lodash');

class DataLoader {
  constructor(dataLength) {
    this.SIRData = Loader.getChartOutputObj().slice(0, dataLength);

    this.bedData = Loader.getTableOutputObj().slice(0, dataLength);
  }

  processSIRData(chunkLength) {
    const timeArray = map(this.SIRData, 'time');
    const iArray = map(this.SIRData, 'I');
    const sArray = map(this.SIRData, 'S');

    const chunkedTimeArray = chunk(timeArray, chunkLength);
    const chunkedIArray = chunk(iArray, chunkLength);
    const chunkedSArray = chunk(sArray, chunkLength);

    let iArrayAvg = [];
    let sArrayAvg = [];
    for (let i = 0; i < chunkedIArray.length; i++) {
      let iArraySum = 0;
      let sArraySum = 0;
      for (let t = 0; t < chunkedIArray[i].length; t++) {
        iArraySum += parseInt(chunkedIArray[i][t], 10);
        sArraySum += parseInt(chunkedSArray[i][t], 10);
      }

      iArrayAvg.push(iArraySum / chunkedIArray[i].length);
      sArrayAvg.push(sArraySum / chunkedIArray[i].length);
    }

    let SheatMapObj = [];
    let IheatMapObj = [];
    for (let i = 0; i < chunkedTimeArray.length; i++) {
      SheatMapObj.push({
        x: `${chunkedTimeArray[i][0]} - ${
          chunkedTimeArray[i][chunkLength - 1]
        }`,
        y: sArrayAvg[i]
      });
      IheatMapObj.push({
        x: `${chunkedTimeArray[i][0]} - ${
          chunkedTimeArray[i][chunkLength - 1]
        }`,
        y: iArrayAvg[i]
      });
    }

    return {
      timeArray,
      iArray,
      sArray,
      heatMap: {
        data: {
          iArrayAvg,
          sArrayAvg
        },
        SheatMapObj,
        IheatMapObj
      }
    };
  }

  processBedData() {
    return this.bedData.map((val, index) => {
      return [index + 1, val['df.I'], val['bed']];
    });
  }
}

export { DataLoader };
