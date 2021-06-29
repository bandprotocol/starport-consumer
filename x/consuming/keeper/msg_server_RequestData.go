package keeper

import (
	"context"
	"time"

	"github.com/bandprotocol/starport-consumer/x/consuming/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	clienttypes "github.com/cosmos/cosmos-sdk/x/ibc/core/02-client/types"
	channeltypes "github.com/cosmos/cosmos-sdk/x/ibc/core/04-channel/types"
	host "github.com/cosmos/cosmos-sdk/x/ibc/core/24-host"

	"github.com/bandprotocol/chain/v2/pkg/obi"
	bandtypes "github.com/bandprotocol/chain/v2/x/oracle/types"
)

func (k msgServer) RequestData(goCtx context.Context, msg *types.MsgRequestData) (*types.MsgRequestDataResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	sourcePort := types.PortID
	sourceChannelEnd, found := k.channelKeeper.GetChannel(ctx, sourcePort, msg.SourceChannel)
	if !found {
		return nil, sdkerrors.Wrapf(
			sdkerrors.ErrUnknownRequest,
			"unknown channel %s port %s",
			msg.SourceChannel,
			sourcePort,
		)
	}
	destinationPort := sourceChannelEnd.Counterparty.PortId
	destinationChannel := sourceChannelEnd.Counterparty.ChannelId

	sequence, found := k.channelKeeper.GetNextSequenceSend(
		ctx, sourcePort, msg.SourceChannel,
	)
	if !found {
		return nil, sdkerrors.Wrapf(
			sdkerrors.ErrUnknownRequest,
			"unknown sequence number for channel %s port %s",
			msg.SourceChannel,
			sourcePort,
		)
	}
	encodedCalldata := obi.MustEncode(*msg.Calldata)
	packet := bandtypes.NewOracleRequestPacketData(
		types.ModuleName,
		bandtypes.OracleScriptID(msg.OracleScriptID),
		encodedCalldata,
		msg.AskCount,
		msg.MinCount,
		msg.FeeLimit,
		msg.RequestKey,
		msg.PrepareGas,
		msg.ExecuteGas,
	)

	channelCap, ok := k.scopedKeeper.GetCapability(ctx, host.ChannelCapabilityPath(sourcePort, msg.SourceChannel))
	if !ok {
		return nil, sdkerrors.Wrap(channeltypes.ErrChannelCapabilityNotFound, "module does not own channel capability")
	}
	err := k.channelKeeper.SendPacket(ctx, channelCap, channeltypes.NewPacket(
		packet.GetBytes(),
		sequence,
		sourcePort,
		msg.SourceChannel,
		destinationPort,
		destinationChannel,
		clienttypes.NewHeight(0, 0),
		uint64(ctx.BlockTime().UnixNano()+int64(10*time.Minute)), // Arbitrary timestamp timeout for now
	))
	if err != nil {
		return nil, err
	}

	return &types.MsgRequestDataResponse{}, nil
}
