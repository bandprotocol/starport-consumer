import { Reader, Writer } from 'protobufjs/minimal';
import { OracleResult } from '../consuming/oracle';
export declare const protobufPackage = "bandprotocol.starportconsumer.consuming";
/** QueryResultRequest is the request type for the Query/Result RPC method */
export interface QueryResultRequest {
    requestId: number;
}
/** QueryResultResponse is the response type for the Query/Result RPC method */
export interface QueryResultResponse {
    /** pagination defines an optional pagination for the request. */
    result: OracleResult | undefined;
}
/** QueryLatestRequestIdRequest */
export interface QueryLatestRequestIdRequest {
}
/** QueryLatestRequestIdResponse */
export interface QueryLatestRequestIdResponse {
    requestId: number;
}
export declare const QueryResultRequest: {
    encode(message: QueryResultRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryResultRequest;
    fromJSON(object: any): QueryResultRequest;
    toJSON(message: QueryResultRequest): unknown;
    fromPartial(object: DeepPartial<QueryResultRequest>): QueryResultRequest;
};
export declare const QueryResultResponse: {
    encode(message: QueryResultResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryResultResponse;
    fromJSON(object: any): QueryResultResponse;
    toJSON(message: QueryResultResponse): unknown;
    fromPartial(object: DeepPartial<QueryResultResponse>): QueryResultResponse;
};
export declare const QueryLatestRequestIdRequest: {
    encode(_: QueryLatestRequestIdRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryLatestRequestIdRequest;
    fromJSON(_: any): QueryLatestRequestIdRequest;
    toJSON(_: QueryLatestRequestIdRequest): unknown;
    fromPartial(_: DeepPartial<QueryLatestRequestIdRequest>): QueryLatestRequestIdRequest;
};
export declare const QueryLatestRequestIdResponse: {
    encode(message: QueryLatestRequestIdResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryLatestRequestIdResponse;
    fromJSON(object: any): QueryLatestRequestIdResponse;
    toJSON(message: QueryLatestRequestIdResponse): unknown;
    fromPartial(object: DeepPartial<QueryLatestRequestIdResponse>): QueryLatestRequestIdResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /**
     * this line is used by starport scaffolding # 2
     * Request defines a rpc handler method for MsgRequestData.
     */
    Result(request: QueryResultRequest): Promise<QueryResultResponse>;
    /** LatestRequestId */
    LatestRequestId(request: QueryLatestRequestIdRequest): Promise<QueryLatestRequestIdResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    Result(request: QueryResultRequest): Promise<QueryResultResponse>;
    LatestRequestId(request: QueryLatestRequestIdRequest): Promise<QueryLatestRequestIdResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
