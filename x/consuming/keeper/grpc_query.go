package keeper

import (
	"github.com/bandprotocol/starport-consumer/x/consuming/types"
)

var _ types.QueryServer = Keeper{}
