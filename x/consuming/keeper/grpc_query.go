package keeper

import (
	"context"

	"github.com/bandprotocol/starport-consumer/x/consuming/types"
	sdk "github.com/cosmos/cosmos-sdk/types"

	bandoracle "github.com/bandprotocol/chain/v2/x/oracle/types"
)

var _ types.QueryServer = Keeper{}

func (q Keeper) Result(c context.Context, req *types.QueryResultRequest) (*types.QueryResultResponse, error) {
	ctx := sdk.UnwrapSDKContext(c)
	result, err := q.GetResult(ctx, bandoracle.RequestID(req.RequestId))
	if err != nil {
		return nil, err
	}
	return &types.QueryResultResponse{Result: &result}, nil
}

func (q Keeper) LatestRequestId(c context.Context, req *types.QueryLatestRequestIdRequest) (*types.QueryLatestRequestIdResponse, error) {
	ctx := sdk.UnwrapSDKContext(c)
	id := q.GetLatestRequestID(ctx)
	return &types.QueryLatestRequestIdResponse{RequestId: id}, nil
}
