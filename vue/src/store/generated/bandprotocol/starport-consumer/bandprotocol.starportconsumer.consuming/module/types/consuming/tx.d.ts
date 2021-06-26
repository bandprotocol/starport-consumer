import { Reader, Writer } from 'protobufjs/minimal';
import { Calldata } from '../consuming/calldata';
import { Coin } from '../cosmos/base/v1beta1/coin';
export declare const protobufPackage = "bandprotocol.starportconsumer.consuming";
/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgRequestData {
    creator: string;
    oracleScriptId: number;
    sourceChannel: string;
    calldata: Calldata | undefined;
    askCount: number;
    minCount: number;
    feeLimit: Coin[];
    requestKey: string;
    prepareGas: number;
    executeGas: number;
}
export interface MsgRequestDataResponse {
}
export declare const MsgRequestData: {
    encode(message: MsgRequestData, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRequestData;
    fromJSON(object: any): MsgRequestData;
    toJSON(message: MsgRequestData): unknown;
    fromPartial(object: DeepPartial<MsgRequestData>): MsgRequestData;
};
export declare const MsgRequestDataResponse: {
    encode(_: MsgRequestDataResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): MsgRequestDataResponse;
    fromJSON(_: any): MsgRequestDataResponse;
    toJSON(_: MsgRequestDataResponse): unknown;
    fromPartial(_: DeepPartial<MsgRequestDataResponse>): MsgRequestDataResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    /** this line is used by starport scaffolding # proto/tx/rpc */
    RequestData(request: MsgRequestData): Promise<MsgRequestDataResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    RequestData(request: MsgRequestData): Promise<MsgRequestDataResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
