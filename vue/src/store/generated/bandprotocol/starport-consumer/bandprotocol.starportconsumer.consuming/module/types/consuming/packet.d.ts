import { Writer, Reader } from 'protobufjs/minimal';
export declare const protobufPackage = "bandprotocol.starportconsumer.consuming";
export interface ConsumingPacketData {
    /** this line is used by starport scaffolding # ibc/packet/proto/field */
    noData: NoData | undefined;
}
export interface NoData {
}
export declare const ConsumingPacketData: {
    encode(message: ConsumingPacketData, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): ConsumingPacketData;
    fromJSON(object: any): ConsumingPacketData;
    toJSON(message: ConsumingPacketData): unknown;
    fromPartial(object: DeepPartial<ConsumingPacketData>): ConsumingPacketData;
};
export declare const NoData: {
    encode(_: NoData, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): NoData;
    fromJSON(_: any): NoData;
    toJSON(_: NoData): unknown;
    fromPartial(_: DeepPartial<NoData>): NoData;
};
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
