package types

// CallData is an input struct for some oracle scripts on BandChain.
// Note that the components of struct may be different from this for some
// other oracle scripts.
type CallData struct {
	Symbols    []string
	Multiplier uint64
}
