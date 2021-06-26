package keeper

import (
	"github.com/bandprotocol/starport-consumer/x/consuming/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	gogotypes "github.com/gogo/protobuf/types"

	bandtypes "github.com/bandprotocol/chain/v2/x/oracle/types"
)

func (k Keeper) SetResult(ctx sdk.Context, requestID bandtypes.RequestID, result types.OracleResult) {
	store := ctx.KVStore(k.storeKey)
	store.Set(types.ResultStoreKey(requestID), k.cdc.MustMarshalBinaryBare(&result))
}

func (k Keeper) GetResult(ctx sdk.Context, id bandtypes.RequestID) (types.OracleResult, error) {
	bz := ctx.KVStore(k.storeKey).Get(types.ResultStoreKey(id))
	if bz == nil {
		return types.OracleResult{}, sdkerrors.Wrapf(types.ErrItemNotFound,
			"GetResult: Result for request ID %d is not available.", id,
		)
	}
	var result types.OracleResult
	k.cdc.MustUnmarshalBinaryBare(bz, &result)
	return result, nil
}

func (k Keeper) GetLatestRequestID(ctx sdk.Context) int64 {
	bz := ctx.KVStore(k.storeKey).Get(types.LatestRequestIDKey)
	intV := gogotypes.Int64Value{}
	k.cdc.MustUnmarshalBinaryLengthPrefixed(bz, &intV)
	return intV.GetValue()
}

func (k Keeper) SetLatestRequestID(ctx sdk.Context, id bandtypes.RequestID) {
	store := ctx.KVStore(k.storeKey)
	store.Set(types.LatestRequestIDKey, k.cdc.MustMarshalBinaryLengthPrefixed(&gogotypes.Int64Value{Value: int64(id)}))
}
