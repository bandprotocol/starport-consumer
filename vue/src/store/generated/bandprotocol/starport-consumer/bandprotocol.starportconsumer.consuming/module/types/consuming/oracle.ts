/* eslint-disable */
import * as Long from 'long'
import { util, configure, Writer, Reader } from 'protobufjs/minimal'

export const protobufPackage = 'bandprotocol.starportconsumer.consuming'

export interface Calldata {
  symbols: string[]
  multiplier: number
}

export interface OracleResult {
  rates: number[]
}

const baseCalldata: object = { symbols: '', multiplier: 0 }

export const Calldata = {
  encode(message: Calldata, writer: Writer = Writer.create()): Writer {
    for (const v of message.symbols) {
      writer.uint32(10).string(v!)
    }
    if (message.multiplier !== 0) {
      writer.uint32(16).uint64(message.multiplier)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Calldata {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseCalldata } as Calldata
    message.symbols = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.symbols.push(reader.string())
          break
        case 2:
          message.multiplier = longToNumber(reader.uint64() as Long)
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): Calldata {
    const message = { ...baseCalldata } as Calldata
    message.symbols = []
    if (object.symbols !== undefined && object.symbols !== null) {
      for (const e of object.symbols) {
        message.symbols.push(String(e))
      }
    }
    if (object.multiplier !== undefined && object.multiplier !== null) {
      message.multiplier = Number(object.multiplier)
    } else {
      message.multiplier = 0
    }
    return message
  },

  toJSON(message: Calldata): unknown {
    const obj: any = {}
    if (message.symbols) {
      obj.symbols = message.symbols.map((e) => e)
    } else {
      obj.symbols = []
    }
    message.multiplier !== undefined && (obj.multiplier = message.multiplier)
    return obj
  },

  fromPartial(object: DeepPartial<Calldata>): Calldata {
    const message = { ...baseCalldata } as Calldata
    message.symbols = []
    if (object.symbols !== undefined && object.symbols !== null) {
      for (const e of object.symbols) {
        message.symbols.push(e)
      }
    }
    if (object.multiplier !== undefined && object.multiplier !== null) {
      message.multiplier = object.multiplier
    } else {
      message.multiplier = 0
    }
    return message
  }
}

const baseOracleResult: object = { rates: 0 }

export const OracleResult = {
  encode(message: OracleResult, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).fork()
    for (const v of message.rates) {
      writer.uint64(v)
    }
    writer.ldelim()
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): OracleResult {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseOracleResult } as OracleResult
    message.rates = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos
            while (reader.pos < end2) {
              message.rates.push(longToNumber(reader.uint64() as Long))
            }
          } else {
            message.rates.push(longToNumber(reader.uint64() as Long))
          }
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): OracleResult {
    const message = { ...baseOracleResult } as OracleResult
    message.rates = []
    if (object.rates !== undefined && object.rates !== null) {
      for (const e of object.rates) {
        message.rates.push(Number(e))
      }
    }
    return message
  },

  toJSON(message: OracleResult): unknown {
    const obj: any = {}
    if (message.rates) {
      obj.rates = message.rates.map((e) => e)
    } else {
      obj.rates = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<OracleResult>): OracleResult {
    const message = { ...baseOracleResult } as OracleResult
    message.rates = []
    if (object.rates !== undefined && object.rates !== null) {
      for (const e of object.rates) {
        message.rates.push(e)
      }
    }
    return message
  }
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
