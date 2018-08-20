import {getErrorMessage,} from './helpers';

var HistoryProvider = /** @class */ (function () {
  function HistoryProvider(datafeedUrl, requester) {
    this._datafeedUrl = datafeedUrl;
    this._requester = requester;
    this.loading = false;
  }

  HistoryProvider.prototype.getBars = function (symbolInfo, resolution, rangeStartDate, rangeEndDate) {
    var _this = this;
    let rangeTimer;
    if (resolution.endsWith('D')) {
      rangeTimer = `day${resolution.replace('D', '')}`;
    } else if (resolution.endsWith('W')) {
      rangeTimer = `week${resolution.replace('W', '')}`;
    } else if (resolution.endsWith('M')) {
      rangeTimer = `month${resolution.replace('M', '')}`;
    } else {
      rangeTimer = resolution == 60 ? 'hour1' : `minute${resolution}`;
    }

    var requestParams = {
      currencyPair: symbolInfo.ticker.indexOf(":") > -1 ? symbolInfo.ticker.replace(':', '_') : symbolInfo.ticker,
      type: rangeTimer
    };
    return new Promise(function (resolve, reject) {
      // k线
      _this._requester.sendRequest(_this._datafeedUrl, 'kline/klineList', requestParams)
        .then(function (response) {
          if (response.status !== 0) {
            reject(response.errmsg);
            return;
          }
          var bars = [];
          var meta = {
            noData: false,
          };
          if (response.dataWrapper.kline.length === 0) {
            meta.noData = true;
            meta.nextTime = response.nextTime;
          } else {
            let result = response.dataWrapper.kline;
            result.forEach(res => {
              var barValue = {
                time: res.time_stamp,
                close: Number(res.closing_price),
                open: Number(res.opening_price),
                high: Number(res.max_price),
                low: Number(res.min_price),
                volume: Number(res.volume_quantity)
              };
              bars.push(barValue);
            });
          }
          resolve({
            bars: bars,
            meta: meta,
          });
        })
        .catch(function (reason) {
          var reasonString = getErrorMessage(reason);
          console.warn("HistoryProvider: getBars() failed, error=" + reasonString);
          reject(reasonString);
        });
    });
  };
  return HistoryProvider;
}());
export {HistoryProvider};
