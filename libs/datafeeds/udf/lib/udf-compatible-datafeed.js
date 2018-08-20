// import * as tslib_1 from "tslib";
import {UDFCompatibleDatafeedBase} from './udf-compatible-datafeed-base';
import {QuotesProvider} from './quotes-provider';
import {Requester} from './requester';

var extendStatics = Object.setPrototypeOf ||
  ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
  function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

var __extends = function (d, b) {
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var UDFCompatibleDatafeed2 = /** @class */ (function (_super) {

  __extends(UDFCompatibleDatafeed, _super);

  function UDFCompatibleDatafeed(datafeedURL, updateFrequency) {
    if (updateFrequency === void 0) {
      updateFrequency = 10 * 1000;
    }
    var _this = this;
    var requester = new Requester();
    var quotesProvider = new QuotesProvider(datafeedURL, requester);
    _this = _super.call(this, datafeedURL, quotesProvider, requester, updateFrequency) || this;
    return _this;
  }

  return UDFCompatibleDatafeed;
}(UDFCompatibleDatafeedBase));
export {UDFCompatibleDatafeed2};
