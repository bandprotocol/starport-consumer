package keeper

import (
	"github.com/bandprotocol/starport-consumer/x/starportconsumer/types"
)

var _ types.QueryServer = Keeper{}
