import {getErrorMessage, logMessage,} from './helpers';
import {HistoryProvider,} from './history-provider';
import {DataPulseProvider} from './data-pulse-provider';
import {QuotesPulseProvider} from './quotes-pulse-provider';
import {SymbolsStorage} from './symbols-storage';

function extractField(data, field, arrayIndex) {
  var value = data[field];
  return Array.isArray(value) ? value[arrayIndex] : value;
}

/**
 * This class implements interaction with UDF-compatible datafeed.
 * See UDF protocol reference at https://github.com/tradingview/charting_library/wiki/UDF
 */
var UDFCompatibleDatafeedBase = /** @class */ (function () {
  function UDFCompatibleDatafeedBase(datafeedURL, quotesProvider, requester, updateFrequency) {
    if (updateFrequency === void 0) {
      updateFrequency = 10 * 1000;
    }
    // var _this = this;
    this._configuration = defaultConfiguration();
    this._symbolsStorage = null;
    this._datafeedURL = datafeedURL;
    this._requester = requester;
    this._historyProvider = new HistoryProvider(datafeedURL, this._requester);
    this._quotesProvider = quotesProvider;
    this._dataPulseProvider = new DataPulseProvider(this._historyProvider, updateFrequency);
    this._quotesPulseProvider = new QuotesPulseProvider(this._quotesProvider);
    // this._configurationReadyPromise = this._requestConfiguration()
    //   .then(function (configuration) {
    //     if (true || configuration === null) {
    //       configuration = defaultConfiguration();
    //     }
    //     _this._setupWithConfiguration(configuration);
    //   });
  }

  UDFCompatibleDatafeedBase.prototype.onReady = function (callback) {
    var _this = this;
    callback(_this._configuration);
    // this._configurationReadyPromise.then(function () {
    //   callback(_this._configuration);
    // });
  };
  UDFCompatibleDatafeedBase.prototype.getQuotes = function (symbols, onDataCallback, onErrorCallback) {
    this._quotesProvider.getQuotes(symbols).then(onDataCallback).catch(onErrorCallback);
  };
  UDFCompatibleDatafeedBase.prototype.subscribeQuotes = function (symbols, fastSymbols, onRealtimeCallback, listenerGuid) {
    this._quotesPulseProvider.subscribeQuotes(symbols, fastSymbols, onRealtimeCallback, listenerGuid);
  };
  UDFCompatibleDatafeedBase.prototype.unsubscribeQuotes = function (listenerGuid) {
    this._quotesPulseProvider.unsubscribeQuotes(listenerGuid);
  };
  UDFCompatibleDatafeedBase.prototype.calculateHistoryDepth = function (resolution, resolutionBack, intervalBack) {
    return undefined;
  };
  // 时间段数据
  UDFCompatibleDatafeedBase.prototype.getMarks = function (symbolInfo, startDate, endDate, onDataCallback, resolution) {
    if (!this._configuration.supports_marks) {
      return;
    }
    var requestParams = {
      symbol: symbolInfo.ticker || '',
      from: startDate,
      to: endDate,
      resolution: resolution,
    };
    this._send('marks', requestParams)
      .then(function (response) {
        if (!Array.isArray(response)) {
          var result = [];
          for (var i = 0; i < response.id.length; ++i) {
            result.push({
              id: extractField(response, 'id', i),
              time: extractField(response, 'time', i),
              color: extractField(response, 'color', i),
              text: extractField(response, 'text', i),
              label: extractField(response, 'label', i),
              labelFontColor: extractField(response, 'labelFontColor', i),
              minSize: extractField(response, 'minSize', i),
            });
          }
          response = result;
        }
        onDataCallback(response);
      })
      .catch(function (error) {
        logMessage("UdfCompatibleDatafeed: Request marks failed: " + getErrorMessage(error));
        onDataCallback([]);
      });
  };
  UDFCompatibleDatafeedBase.prototype.getTimescaleMarks = function (symbolInfo, startDate, endDate, onDataCallback, resolution) {
    if (!this._configuration.supports_timescale_marks) {
      return;
    }
    var requestParams = {
      symbol: symbolInfo.ticker || '',
      from: startDate,
      to: endDate,
      resolution: resolution,
    };
    this._send('timescale_marks', requestParams)
      .then(function (response) {
        if (!Array.isArray(response)) {
          var result = [];
          for (var i = 0; i < response.id.length; ++i) {
            result.push({
              id: extractField(response, 'id', i),
              time: extractField(response, 'time', i),
              color: extractField(response, 'color', i),
              label: extractField(response, 'label', i),
              tooltip: extractField(response, 'tooltip', i),
            });
          }
          response = result;
        }
        onDataCallback(response);
      })
      .catch(function (error) {
        logMessage("UdfCompatibleDatafeed: Request timescale marks failed: " + getErrorMessage(error));
        onDataCallback([]);
      });
  };
  UDFCompatibleDatafeedBase.prototype.getServerTime = function (callback) {
    if (!this._configuration.supports_time) {
      return;
    }
    this._send('time')
      .then(function (response) {
        var time = parseInt(response);
        if (!isNaN(time)) {
          callback(time);
        }
      })
      .catch(function (error) {
        logMessage("UdfCompatibleDatafeed: Fail to load server time, error=" + getErrorMessage(error));
      });
  };
  UDFCompatibleDatafeedBase.prototype.searchSymbols = function (userInput, exchange, symbolType, onResult) {
    if (this._configuration.supports_search) {
      var params = {
        limit: 30 /* SearchItemsLimit */,
        query: userInput.toUpperCase(),
        type: symbolType,
        exchange: exchange,
      };
      this._send('search', params)
        .then(function (response) {
          if (response.s !== undefined) {
            logMessage("UdfCompatibleDatafeed: search symbols error=" + response.errmsg);
            onResult([]);
            return;
          }
          onResult(response);
        })
        .catch(function (reason) {
          logMessage("UdfCompatibleDatafeed: Search symbols for '" + userInput + "' failed. Error=" + getErrorMessage(reason));
          onResult([]);
        });
    }
    else {
      if (this._symbolsStorage === null) {
        throw new Error('UdfCompatibleDatafeed: inconsistent configuration (symbols storage)');
      }
      this._symbolsStorage.searchSymbols(userInput, exchange, symbolType, 30 /* SearchItemsLimit */)
        .then(onResult)
        .catch(onResult.bind(null, []));
    }
  };

  // 指定ticker请求,获取币对信息配置
  UDFCompatibleDatafeedBase.prototype.resolveSymbol = function (symbolName, onResolve, onError) {
    logMessage('Resolve requested');
    var resolveRequestStartTime = Date.now();

    function onResultReady(symbolInfo) {
      logMessage("Symbol resolved: " + (Date.now() - resolveRequestStartTime) + "ms");
      onResolve(symbolInfo);
    }

    if (!this._configuration.supports_group_request) {
      symbolName = symbolName.indexOf(":") > -1 ? symbolName.replace(':', '_') : symbolName;
      let names = symbolName.split('_');
      this._send('assetPair/get', {
        currencyPair: symbolName
      }).then(res => {
        if (res.status !== 0) {
          return onError('unknown_symbol');
        }
        onResultReady({
          "name": names[1],
          "exchange-traded": names[0],
          "exchange-listed": names[0],
          "timezone": "America/New_York",
          "minmov": 1,
          "minmov2": 0,
          "pricescale": Math.pow(10, res.dataWrapper.assetPair.accuracyIndex),//精度 保留5位
          volume_precision: res.dataWrapper.assetPair.accuracyQuantity,//成交量精度 保留3位
          "pointvalue": 1,
          "session": "24x7",
          has_intraday: true,
          has_daily: true,
          "has_no_volume": false,
          has_weekly_and_monthly: true,
          intraday_multipliers: ["1", "5", "15", "30", "60", "1D", "1W", "1M"],
          "description": "Apple Inc.",
          "type": "stock",
          "supported_resolutions": ["1", "5", "15", "30", "60", "1D", "1W", "1M"],
          "ticker": symbolName,
        });
      }).catch(function (reason) {
        logMessage("UdfCompatibleDatafeed: Error resolving symbol: " + getErrorMessage(reason));
        onError('unknown_symbol');
      });
      // this._send('symbols', params)
      // this._send('tickers', params)
      //   .then(function (response) {
      //     if (response.status !== 0) {
      //       onError('unknown_symbol');
      //     } else {
      //       console.log(response);
      //       let data = response.dataWrapper.data[0];
      //       let names = data.symbol.split('/');
      //       onResultReady({
      //         "name": names[0].toLowerCase(),
      //         "exchange-traded": names[1].toLowerCase(),
      //         "exchange-listed": names[1].toLowerCase(),
      //         "timezone": "America/New_York",
      //         "minmov": 1,
      //         "minmov2": 0,
      //         "pointvalue": 1,
      //         "session": "0930-1630",
      //         "has_intraday": false,
      //         "has_no_volume": false,
      //         "description": "Apple Inc.",
      //         "type": "stock",
      //         "supported_resolutions": ["D", "2D", "3D", "W", "3W", "M", "6M"],
      //         "pricescale": 100,
      //         "ticker": names.join('_').toLowerCase(),
      //       });
      //     }
      //     // if (response.s !== undefined) {
      //     //   onError('unknown_symbol');
      //     // }
      //     // else {
      //     //   onResultReady(response);
      //     // }
      //   })
      //   .catch(function (reason) {
      //     logMessage("UdfCompatibleDatafeed: Error resolving symbol: " + getErrorMessage(reason));
      //     onError('unknown_symbol');
      //   });
    }
    else {
      if (this._symbolsStorage === null) {
        throw new Error('UdfCompatibleDatafeed: inconsistent configuration (symbols storage)');
      }
      this._symbolsStorage.resolveSymbol(symbolName).then(onResultReady).catch(onError);
    }
  };

  UDFCompatibleDatafeedBase.prototype.getBars = function (symbolInfo, resolution, rangeStartDate, rangeEndDate, onResult, onError) {
    console.log('UDFCompatibleDatafeedBase.getBars', resolution);
    return this._historyProvider.getBars(symbolInfo, resolution, rangeStartDate, rangeEndDate)
      .then(function (result) {
        onResult(result.bars, result.meta);
      })
      .catch(onError);
  };
  UDFCompatibleDatafeedBase.prototype.subscribeBars = function (symbolInfo, resolution, onTick, listenerGuid, onResetCacheNeededCallback) {
    this._dataPulseProvider.subscribeBars(symbolInfo, resolution, onTick, listenerGuid);
  };
  UDFCompatibleDatafeedBase.prototype.unsubscribeBars = function (listenerGuid) {
    this._dataPulseProvider.unsubscribeBars(listenerGuid);
  };
  UDFCompatibleDatafeedBase.prototype._requestConfiguration = function () {
    return this._send('config')
      .catch(function (reason) {
        logMessage("UdfCompatibleDatafeed: Cannot get datafeed configuration - use default, error=" + getErrorMessage(reason));
        return null;
      });
  };
  UDFCompatibleDatafeedBase.prototype._send = function (urlPath, params) {
    return this._requester.sendRequest(this._datafeedURL, urlPath, params);
  };
  UDFCompatibleDatafeedBase.prototype._setupWithConfiguration = function (configurationData) {
    this._configuration = configurationData;
    if (configurationData.exchanges === undefined) {
      configurationData.exchanges = [];
    }
    if (!configurationData.supports_search && !configurationData.supports_group_request) {
      throw new Error('Unsupported datafeed configuration. Must either support search, or support group request');
    }
    if (configurationData.supports_group_request || !configurationData.supports_search) {
      this._symbolsStorage = new SymbolsStorage(this._datafeedURL, configurationData.supported_resolutions || [], this._requester);
    }
    logMessage("UdfCompatibleDatafeed: Initialized with " + JSON.stringify(configurationData));
  };
  return UDFCompatibleDatafeedBase;
}());
export {UDFCompatibleDatafeedBase};

function defaultConfiguration() {
  return {
    supports_search: true,
    supports_group_request: false,
    supported_resolutions: ["1", "5", "15", "30", "60", "1D", "1W", "1M"],
    supports_marks: false,
    supports_timescale_marks: false,
  };
}
