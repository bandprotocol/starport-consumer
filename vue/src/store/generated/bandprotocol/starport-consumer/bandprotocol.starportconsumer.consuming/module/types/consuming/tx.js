/* eslint-disable */
import { Reader, util, configure, Writer } from 'protobufjs/minimal';
import * as Long from 'long';
import { Calldata } from '../consuming/oracle';
import { Coin } from '../cosmos/base/v1beta1/coin';
export const protobufPackage = 'bandprotocol.starportconsumer.consuming';
const baseMsgRequestData = { creator: '', oracleScriptId: 0, sourceChannel: '', askCount: 0, minCount: 0, requestKey: '', prepareGas: 0, executeGas: 0 };
export const MsgRequestData = {
    encode(message, writer = Writer.create()) {
        if (message.creator !== '') {
            writer.uint32(10).string(message.creator);
        }
        if (message.oracleScriptId !== 0) {
            writer.uint32(16).int64(message.oracleScriptId);
        }
        if (message.sourceChannel !== '') {
            writer.uint32(26).string(message.sourceChannel);
        }
        if (message.calldata !== undefined) {
            Calldata.encode(message.calldata, writer.uint32(34).fork()).ldelim();
        }
        if (message.askCount !== 0) {
            writer.uint32(40).uint64(message.askCount);
        }
        if (message.minCount !== 0) {
            writer.uint32(48).uint64(message.minCount);
        }
        for (const v of message.feeLimit) {
            Coin.encode(v, writer.uint32(58).fork()).ldelim();
        }
        if (message.requestKey !== '') {
            writer.uint32(66).string(message.requestKey);
        }
        if (message.prepareGas !== 0) {
            writer.uint32(72).uint64(message.prepareGas);
        }
        if (message.executeGas !== 0) {
            writer.uint32(80).uint64(message.executeGas);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgRequestData };
        message.feeLimit = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.oracleScriptId = longToNumber(reader.int64());
                    break;
                case 3:
                    message.sourceChannel = reader.string();
                    break;
                case 4:
                    message.calldata = Calldata.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.askCount = longToNumber(reader.uint64());
                    break;
                case 6:
                    message.minCount = longToNumber(reader.uint64());
                    break;
                case 7:
                    message.feeLimit.push(Coin.decode(reader, reader.uint32()));
                    break;
                case 8:
                    message.requestKey = reader.string();
                    break;
                case 9:
                    message.prepareGas = longToNumber(reader.uint64());
                    break;
                case 10:
                    message.executeGas = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseMsgRequestData };
        message.feeLimit = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = '';
        }
        if (object.oracleScriptId !== undefined && object.oracleScriptId !== null) {
            message.oracleScriptId = Number(object.oracleScriptId);
        }
        else {
            message.oracleScriptId = 0;
        }
        if (object.sourceChannel !== undefined && object.sourceChannel !== null) {
            message.sourceChannel = String(object.sourceChannel);
        }
        else {
            message.sourceChannel = '';
        }
        if (object.calldata !== undefined && object.calldata !== null) {
            message.calldata = Calldata.fromJSON(object.calldata);
        }
        else {
            message.calldata = undefined;
        }
        if (object.askCount !== undefined && object.askCount !== null) {
            message.askCount = Number(object.askCount);
        }
        else {
            message.askCount = 0;
        }
        if (object.minCount !== undefined && object.minCount !== null) {
            message.minCount = Number(object.minCount);
        }
        else {
            message.minCount = 0;
        }
        if (object.feeLimit !== undefined && object.feeLimit !== null) {
            for (const e of object.feeLimit) {
                message.feeLimit.push(Coin.fromJSON(e));
            }
        }
        if (object.requestKey !== undefined && object.requestKey !== null) {
            message.requestKey = String(object.requestKey);
        }
        else {
            message.requestKey = '';
        }
        if (object.prepareGas !== undefined && object.prepareGas !== null) {
            message.prepareGas = Number(object.prepareGas);
        }
        else {
            message.prepareGas = 0;
        }
        if (object.executeGas !== undefined && object.executeGas !== null) {
            message.executeGas = Number(object.executeGas);
        }
        else {
            message.executeGas = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.oracleScriptId !== undefined && (obj.oracleScriptId = message.oracleScriptId);
        message.sourceChannel !== undefined && (obj.sourceChannel = message.sourceChannel);
        message.calldata !== undefined && (obj.calldata = message.calldata ? Calldata.toJSON(message.calldata) : undefined);
        message.askCount !== undefined && (obj.askCount = message.askCount);
        message.minCount !== undefined && (obj.minCount = message.minCount);
        if (message.feeLimit) {
            obj.feeLimit = message.feeLimit.map((e) => (e ? Coin.toJSON(e) : undefined));
        }
        else {
            obj.feeLimit = [];
        }
        message.requestKey !== undefined && (obj.requestKey = message.requestKey);
        message.prepareGas !== undefined && (obj.prepareGas = message.prepareGas);
        message.executeGas !== undefined && (obj.executeGas = message.executeGas);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseMsgRequestData };
        message.feeLimit = [];
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = '';
        }
        if (object.oracleScriptId !== undefined && object.oracleScriptId !== null) {
            message.oracleScriptId = object.oracleScriptId;
        }
        else {
            message.oracleScriptId = 0;
        }
        if (object.sourceChannel !== undefined && object.sourceChannel !== null) {
            message.sourceChannel = object.sourceChannel;
        }
        else {
            message.sourceChannel = '';
        }
        if (object.calldata !== undefined && object.calldata !== null) {
            message.calldata = Calldata.fromPartial(object.calldata);
        }
        else {
            message.calldata = undefined;
        }
        if (object.askCount !== undefined && object.askCount !== null) {
            message.askCount = object.askCount;
        }
        else {
            message.askCount = 0;
        }
        if (object.minCount !== undefined && object.minCount !== null) {
            message.minCount = object.minCount;
        }
        else {
            message.minCount = 0;
        }
        if (object.feeLimit !== undefined && object.feeLimit !== null) {
            for (const e of object.feeLimit) {
                message.feeLimit.push(Coin.fromPartial(e));
            }
        }
        if (object.requestKey !== undefined && object.requestKey !== null) {
            message.requestKey = object.requestKey;
        }
        else {
            message.requestKey = '';
        }
        if (object.prepareGas !== undefined && object.prepareGas !== null) {
            message.prepareGas = object.prepareGas;
        }
        else {
            message.prepareGas = 0;
        }
        if (object.executeGas !== undefined && object.executeGas !== null) {
            message.executeGas = object.executeGas;
        }
        else {
            message.executeGas = 0;
        }
        return message;
    }
};
const baseMsgRequestDataResponse = {};
export const MsgRequestDataResponse = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseMsgRequestDataResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = { ...baseMsgRequestDataResponse };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseMsgRequestDataResponse };
        return message;
    }
};
export class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    RequestData(request) {
        const data = MsgRequestData.encode(request).finish();
        const promise = this.rpc.request('bandprotocol.starportconsumer.consuming.Msg', 'RequestData', data);
        return promise.then((data) => MsgRequestDataResponse.decode(new Reader(data)));
    }
}
var globalThis = (() => {
    if (typeof globalThis !== 'undefined')
        return globalThis;
    if (typeof self !== 'undefined')
        return self;
    if (typeof window !== 'undefined')
        return window;
    if (typeof global !== 'undefined')
        return global;
    throw 'Unable to locate global object';
})();
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER');
    }
    return long.toNumber();
}
if (util.Long !== Long) {
    util.Long = Long;
    configure();
}
