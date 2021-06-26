/* eslint-disable */
import { Reader, util, configure, Writer } from 'protobufjs/minimal'
import * as Long from 'long'
import { OracleResult } from '../consuming/oracle'

export const protobufPackage = 'bandprotocol.starportconsumer.consuming'

/** QueryResultRequest is the request type for the Query/Result RPC method */
export interface QueryResultRequest {
  requestId: number
}

/** QueryResultResponse is the response type for the Query/Result RPC method */
export interface QueryResultResponse {
  /** pagination defines an optional pagination for the request. */
  result: OracleResult | undefined
}

/** QueryLatestRequestIdRequest */
export interface QueryLatestRequestIdRequest {}

/** QueryLatestRequestIdResponse */
export interface QueryLatestRequestIdResponse {
  requestId: number
}

const baseQueryResultRequest: object = { requestId: 0 }

export const QueryResultRequest = {
  encode(message: QueryResultRequest, writer: Writer = Writer.create()): Writer {
    if (message.requestId !== 0) {
      writer.uint32(8).int64(message.requestId)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryResultRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryResultRequest } as QueryResultRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.int64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryResultRequest {
    const message = { ...baseQueryResultRequest } as QueryResultRequest
    if (object.requestId !== undefined && object.requestId !== null) {
      message.requestId = Number(object.requestId)
    } else {
      message.requestId = 0
    }
    return message
  },

  toJSON(message: QueryResultRequest): unknown {
    const obj: any = {}
    message.requestId !== undefined && (obj.requestId = message.requestId)
    return obj
  },

  fromPartial(object: DeepPartial<QueryResultRequest>): QueryResultRequest {
    const message = { ...baseQueryResultRequest } as QueryResultRequest
    if (object.requestId !== undefined && object.requestId !== null) {
      message.requestId = object.requestId
    } else {
      message.requestId = 0
    }
    return message
  }
}

const baseQueryResultResponse: object = {}

export const QueryResultResponse = {
  encode(message: QueryResultResponse, writer: Writer = Writer.create()): Writer {
    if (message.result !== undefined) {
      OracleResult.encode(message.result, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryResultResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryResultResponse } as QueryResultResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.result = OracleResult.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryResultResponse {
    const message = { ...baseQueryResultResponse } as QueryResultResponse
    if (object.result !== undefined && object.result !== null) {
      message.result = OracleResult.fromJSON(object.result)
    } else {
      message.result = undefined
    }
    return message
  },

  toJSON(message: QueryResultResponse): unknown {
    const obj: any = {}
    message.result !== undefined && (obj.result = message.result ? OracleResult.toJSON(message.result) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryResultResponse>): QueryResultResponse {
    const message = { ...baseQueryResultResponse } as QueryResultResponse
    if (object.result !== undefined && object.result !== null) {
      message.result = OracleResult.fromPartial(object.result)
    } else {
      message.result = undefined
    }
    return message
  }
}

const baseQueryLatestRequestIdRequest: object = {}

export const QueryLatestRequestIdRequest = {
  encode(_: QueryLatestRequestIdRequest, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryLatestRequestIdRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryLatestRequestIdRequest } as QueryLatestRequestIdRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): QueryLatestRequestIdRequest {
    const message = { ...baseQueryLatestRequestIdRequest } as QueryLatestRequestIdRequest
    return message
  },

  toJSON(_: QueryLatestRequestIdRequest): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<QueryLatestRequestIdRequest>): QueryLatestRequestIdRequest {
    const message = { ...baseQueryLatestRequestIdRequest } as QueryLatestRequestIdRequest
    return message
  }
}

const baseQueryLatestRequestIdResponse: object = { requestId: 0 }

export const QueryLatestRequestIdResponse = {
  encode(message: QueryLatestRequestIdResponse, writer: Writer = Writer.create()): Writer {
    if (message.requestId !== 0) {
      writer.uint32(8).int64(message.requestId)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryLatestRequestIdResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryLatestRequestIdResponse } as QueryLatestRequestIdResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.requestId = longToNumber(reader.int64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryLatestRequestIdResponse {
    const message = { ...baseQueryLatestRequestIdResponse } as QueryLatestRequestIdResponse
    if (object.requestId !== undefined && object.requestId !== null) {
      message.requestId = Number(object.requestId)
    } else {
      message.requestId = 0
    }
    return message
  },

  toJSON(message: QueryLatestRequestIdResponse): unknown {
    const obj: any = {}
    message.requestId !== undefined && (obj.requestId = message.requestId)
    return obj
  },

  fromPartial(object: DeepPartial<QueryLatestRequestIdResponse>): QueryLatestRequestIdResponse {
    const message = { ...baseQueryLatestRequestIdResponse } as QueryLatestRequestIdResponse
    if (object.requestId !== undefined && object.requestId !== null) {
      message.requestId = object.requestId
    } else {
      message.requestId = 0
    }
    return message
  }
}

/** Query defines the gRPC querier service. */
export interface Query {
  /**
   * this line is used by starport scaffolding # 2
   * Request defines a rpc handler method for MsgRequestData.
   */
  Result(request: QueryResultRequest): Promise<QueryResultResponse>
  /** LatestRequestId */
  LatestRequestId(request: QueryLatestRequestIdRequest): Promise<QueryLatestRequestIdResponse>
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
  }
  Result(request: QueryResultRequest): Promise<QueryResultResponse> {
    const data = QueryResultRequest.encode(request).finish()
    const promise = this.rpc.request('bandprotocol.starportconsumer.consuming.Query', 'Result', data)
    return promise.then((data) => QueryResultResponse.decode(new Reader(data)))
  }

  LatestRequestId(request: QueryLatestRequestIdRequest): Promise<QueryLatestRequestIdResponse> {
    const data = QueryLatestRequestIdRequest.encode(request).finish()
    const promise = this.rpc.request('bandprotocol.starportconsumer.consuming.Query', 'LatestRequestId', data)
    return promise.then((data) => QueryLatestRequestIdResponse.decode(new Reader(data)))
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>
}

declare var self: any | undefined
declare var window: any | undefined
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis
  if (typeof self !== 'undefined') return self
  if (typeof window !== 'undefined') return window
  if (typeof global !== 'undefined') return global
  throw 'Unable to locate global object'
})()

type Builtin = Date | Function | Uint8Array | string | number | undefined
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER')
  }
  return long.toNumber()
}

if (util.Long !== Long) {
  util.Long = Long as any
  configure()
}
