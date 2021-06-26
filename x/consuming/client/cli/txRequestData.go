package cli

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/spf13/cobra"

	"github.com/bandprotocol/starport-consumer/x/consuming/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/version"

	bandtypes "github.com/bandprotocol/chain/v2/x/oracle/types"
)

var _ = strconv.Itoa(0)

const (
	flagChannel    = "channel"
	flagSymbols    = "symbols"
	flagMultiplier = "multiplier"
	flagFeeLimit   = "fee-limit"
	flagRequestkey = "request-key"
	flagPrepareGas = "prepare-gas"
	flagExecuteGas = "execute-gas"
)

func CmdRequestData() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "RequestData [oracle-script-id] [requested-validator-count] [sufficient-validator-count] (-c [source-channel]) (-s [symbols]) (-m [multiplier]) (-f [fee-limit]) (-r [request-key]) (-p [prepare-gas]) (-x [execute-gas])",
		Short: "Make a new data request via an existing oracle script",
		Args:  cobra.ExactArgs(3),
		Long: strings.TrimSpace(
			fmt.Sprintf(`Make a new request via an existing oracle script with the configuration flags.
Example:
$ %s tx consuming request 1 4 3 -c channel-0 -s "BTC,ETH" -m 1000000 -f 30 -r requestkey -p 200000 -x 200000 --from mykey
$ %s tx consuming request 1 4 3 -source-channel channel-0 -symbols "BTC,ETH" -multiplier 1000000 -fee-limit 30 -request-key requestkey -prepare-gas 200000 -execute-gas 200000 --from mykey
`,
				version.AppName, version.AppName,
			),
		),
		RunE: func(cmd *cobra.Command, args []string) error {
			// retrieve the oracle script id.
			int64OracleScriptID, err := strconv.ParseInt(args[0], 10, 64)
			if err != nil {
				return err
			}
			oracleScriptID := bandtypes.OracleScriptID(int64OracleScriptID)

			// retrieve the requested validator count.
			askCount, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}

			// retrieve the sufficient(minimum) validator count.
			minCount, err := strconv.ParseUint(args[2], 10, 64)
			if err != nil {
				return err
			}

			channel, err := cmd.Flags().GetString(flagChannel)
			if err != nil {
				return err
			}

			// retrieve the list of symbols for the requested oracle script.
			symbols, err := cmd.Flags().GetStringSlice(flagSymbols)
			if err != nil {
				return err
			}

			// retrieve the multiplier for the symbols' price.
			multiplier, err := cmd.Flags().GetUint64(flagMultiplier)
			if err != nil {
				return err
			}

			calldata := &types.Calldata{
				Symbols:    symbols,
				Multiplier: multiplier,
			}

			// retrieve the amount of coins allowed to be paid for oracle request fee from the pool account.
			coinStr, err := cmd.Flags().GetString(flagFeeLimit)
			if err != nil {
				return err
			}
			feeLimit, err := sdk.ParseCoinsNormalized(coinStr)
			if err != nil {
				return err
			}

			// retrieve the request key corresponding to the pool account (used to pay fee) on BandChain.
			requestKey, err := cmd.Flags().GetString(flagRequestkey)
			if err != nil {
				return err
			}

			// retrieve the amount of gas allowed for the prepare step of the oracle script.
			prepareGas, err := cmd.Flags().GetUint64(flagPrepareGas)
			if err != nil {
				return err
			}

			// retrieve the amount of gas allowed for the execute step of the oracle script.
			executeGas, err := cmd.Flags().GetUint64(flagExecuteGas)
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgRequestData(
				clientCtx.GetFromAddress().String(),
				oracleScriptID,
				channel,
				calldata,
				askCount,
				minCount,
				feeLimit,
				requestKey,
				prepareGas,
				executeGas,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	cmd.Flags().StringP(flagChannel, "c", "", "The channel id")
	cmd.MarkFlagRequired(flagChannel)
	cmd.Flags().StringSliceP(flagSymbols, "s", nil, "Symbols used in calling the oracle script")
	cmd.Flags().Uint64P(flagMultiplier, "m", 1000000, "Multiplier used in calling the oracle script")
	cmd.Flags().StringP(flagFeeLimit, "f", "", "the maximum tokens that will be paid to all data source providers")
	cmd.Flags().StringP(flagRequestkey, "r", "", "Key for generating escrow address")
	cmd.Flags().Uint64P(flagPrepareGas, "p", 200000, "Prepare gas used in fee counting for prepare request")
	cmd.Flags().Uint64P(flagExecuteGas, "x", 200000, "Execute gas used in fee counting for execute request")
	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
