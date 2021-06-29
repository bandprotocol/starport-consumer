package types

import (
	"encoding/binary"

	bandoracle "github.com/bandprotocol/chain/v2/x/oracle/types"
)

const (
	// ModuleName defines the module name
	ModuleName = "consuming"

	// StoreKey defines the primary module store key
	StoreKey = ModuleName

	// RouterKey is the message route for slashing
	RouterKey = ModuleName

	// QuerierRoute defines the module's query routing key
	QuerierRoute = ModuleName

	// MemStoreKey defines the in-memory store key
	MemStoreKey = "mem_consuming"

	// Version defines the current version the IBC module supports
	Version = "bandchain-1"

	// PortID is the default port id that module binds to
	PortID = "consuming"
)

var (
	// PortKey defines the key to store the port ID in store
	PortKey = KeyPrefix("consuming-port-")

	// ResultStoreKeyPrefix is a prefix for storing result
	ResultStoreKeyPrefix = []byte{0xff}

	// LatestRequestIDKey
	LatestRequestIDKey = []byte{0x01}
)

func KeyPrefix(p string) []byte {
	return []byte(p)
}

// ResultStoreKey is a function to generate key for each result in store
func ResultStoreKey(requestID bandoracle.RequestID) []byte {
	return append(ResultStoreKeyPrefix, int64ToBytes(int64(requestID))...)
}

func int64ToBytes(num int64) []byte {
	result := make([]byte, 8)
	binary.BigEndian.PutUint64(result, uint64(num))
	return result
}
