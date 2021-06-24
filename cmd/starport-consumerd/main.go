package main

import (
	"os"

	"github.com/bandprotocol/starport-consumer/app"
	"github.com/bandprotocol/starport-consumer/cmd/starport-consumerd/cmd"
	svrcmd "github.com/cosmos/cosmos-sdk/server/cmd"
)

func main() {
	rootCmd, _ := cmd.NewRootCmd()
	if err := svrcmd.Execute(rootCmd, app.DefaultNodeHome); err != nil {
		os.Exit(1)
	}
}
