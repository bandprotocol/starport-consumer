/* eslint-disable */
import { Reader, util, configure, Writer } from 'protobufjs/minimal';
import * as Long from 'long';
import { OracleResult } from '../consuming/oracle';
export const protobufPackage = 'bandprotocol.starportconsumer.consuming';
const baseQueryResultRequest = { requestId: 0 };
export const QueryResultRequest = {
    encode(message, writer = Writer.create()) {
        if (message.requestId !== 0) {
            writer.uint32(8).int64(message.requestId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryResultRequest };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.requestId = longToNumber(reader.int64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryResultRequest };
        if (object.requestId !== undefined && object.requestId !== null) {
            message.requestId = Number(object.requestId);
        }
        else {
            message.requestId = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.requestId !== undefined && (obj.requestId = message.requestId);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryResultRequest };
        if (object.requestId !== undefined && object.requestId !== null) {
            message.requestId = object.requestId;
        }
        else {
            message.requestId = 0;
        }
        return message;
    }
};
const baseQueryResultResponse = {};
export const QueryResultResponse = {
    encode(message, writer = Writer.create()) {
        if (message.result !== undefined) {
            OracleResult.encode(message.result, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryResultResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.result = OracleResult.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryResultResponse };
        if (object.result !== undefined && object.result !== null) {
            message.result = OracleResult.fromJSON(object.result);
        }
        else {
            message.result = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.result !== undefined && (obj.result = message.result ? OracleResult.toJSON(message.result) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryResultResponse };
        if (object.result !== undefined && object.result !== null) {
            message.result = OracleResult.fromPartial(object.result);
        }
        else {
            message.result = undefined;
        }
        return message;
    }
};
const baseQueryLatestRequestIdRequest = {};
export const QueryLatestRequestIdRequest = {
    encode(_, writer = Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryLatestRequestIdRequest };
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
        const message = { ...baseQueryLatestRequestIdRequest };
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = { ...baseQueryLatestRequestIdRequest };
        return message;
    }
};
const baseQueryLatestRequestIdResponse = { requestId: 0 };
export const QueryLatestRequestIdResponse = {
    encode(message, writer = Writer.create()) {
        if (message.requestId !== 0) {
            writer.uint32(8).int64(message.requestId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseQueryLatestRequestIdResponse };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.requestId = longToNumber(reader.int64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseQueryLatestRequestIdResponse };
        if (object.requestId !== undefined && object.requestId !== null) {
            message.requestId = Number(object.requestId);
        }
        else {
            message.requestId = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.requestId !== undefined && (obj.requestId = message.requestId);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseQueryLatestRequestIdResponse };
        if (object.requestId !== undefined && object.requestId !== null) {
            message.requestId = object.requestId;
        }
        else {
            message.requestId = 0;
        }
        return message;
    }
};
export class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    Result(request) {
        const data = QueryResultRequest.encode(request).finish();
        const promise = this.rpc.request('bandprotocol.starportconsumer.consuming.Query', 'Result', data);
        return promise.then((data) => QueryResultResponse.decode(new Reader(data)));
    }
    LatestRequestId(request) {
        const data = QueryLatestRequestIdRequest.encode(request).finish();
        const promise = this.rpc.request('bandprotocol.starportconsumer.consuming.Query', 'LatestRequestId', data);
        return promise.then((data) => QueryLatestRequestIdResponse.decode(new Reader(data)));
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
