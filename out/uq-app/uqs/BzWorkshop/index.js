"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUI = void 0;
const BzWorkshop_1 = require("./BzWorkshop");
const Draft = require("./Draft.ui");
const Biz = require("./Biz.ui");
const BizPack = require("./BizPack.ui");
const Op = require("./Op.ui");
const Item = require("./Item.ui");
const OpiBooking = require("./OpiBooking.ui");
const Opi = require("./Opi.ui");
const ItemHistory = require("./ItemHistory.ui");
const OpiHistory = require("./OpiHistory.ui");
const Note = require("./Note.ui");
const Person = require("./Person.ui");
const ClientSurvey = require("./ClientSurvey.ui");
const TagGroup = require("./TagGroup.ui");
const Tag = require("./Tag.ui");
const TagItem = require("./TagItem.ui");
const Workshop = require("./Workshop.ui");
const Session = require("./Session.ui");
const SessionPerson = require("./SessionPerson.ui");
function setUI(uq) {
    (0, BzWorkshop_1.assign)(uq, 'Draft', Draft);
    (0, BzWorkshop_1.assign)(uq, 'Biz', Biz);
    (0, BzWorkshop_1.assign)(uq, 'BizPack', BizPack);
    (0, BzWorkshop_1.assign)(uq, 'Op', Op);
    (0, BzWorkshop_1.assign)(uq, 'Item', Item);
    (0, BzWorkshop_1.assign)(uq, 'OpiBooking', OpiBooking);
    (0, BzWorkshop_1.assign)(uq, 'Opi', Opi);
    (0, BzWorkshop_1.assign)(uq, 'ItemHistory', ItemHistory);
    (0, BzWorkshop_1.assign)(uq, 'OpiHistory', OpiHistory);
    (0, BzWorkshop_1.assign)(uq, 'Note', Note);
    (0, BzWorkshop_1.assign)(uq, 'Person', Person);
    (0, BzWorkshop_1.assign)(uq, 'ClientSurvey', ClientSurvey);
    (0, BzWorkshop_1.assign)(uq, 'TagGroup', TagGroup);
    (0, BzWorkshop_1.assign)(uq, 'Tag', Tag);
    (0, BzWorkshop_1.assign)(uq, 'TagItem', TagItem);
    (0, BzWorkshop_1.assign)(uq, 'Workshop', Workshop);
    (0, BzWorkshop_1.assign)(uq, 'Session', Session);
    (0, BzWorkshop_1.assign)(uq, 'SessionPerson', SessionPerson);
}
exports.setUI = setUI;
__exportStar(require("./BzWorkshop"), exports);
//# sourceMappingURL=index.js.map