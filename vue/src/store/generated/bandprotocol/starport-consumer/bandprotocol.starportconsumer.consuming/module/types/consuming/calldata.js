/* eslint-disable */
import * as Long from 'long';
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
export const protobufPackage = 'bandprotocol.starportconsumer.consuming';
const baseCalldata = { symbols: '', multiplier: 0 };
export const Calldata = {
    encode(message, writer = Writer.create()) {
        for (const v of message.symbols) {
            writer.uint32(10).string(v);
        }
        if (message.multiplier !== 0) {
            writer.uint32(16).uint64(message.multiplier);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseCalldata };
        message.symbols = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.symbols.push(reader.string());
                    break;
                case 2:
                    message.multiplier = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseCalldata };
        message.symbols = [];
        if (object.symbols !== undefined && object.symbols !== null) {
            for (const e of object.symbols) {
                message.symbols.push(String(e));
            }
        }
        if (object.multiplier !== undefined && object.multiplier !== null) {
            message.multiplier = Number(object.multiplier);
        }
        else {
            message.multiplier = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.symbols) {
            obj.symbols = message.symbols.map((e) => e);
        }
        else {
            obj.symbols = [];
        }
        message.multiplier !== undefined && (obj.multiplier = message.multiplier);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseCalldata };
        message.symbols = [];
        if (object.symbols !== undefined && object.symbols !== null) {
            for (const e of object.symbols) {
                message.symbols.push(e);
            }
        }
        if (object.multiplier !== undefined && object.multiplier !== null) {
            message.multiplier = object.multiplier;
        }
        else {
            message.multiplier = 0;
        }
        return message;
    }
};
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
