
# format-number v1.0.0

Format a number with the following rules:

- Two decimals minimum `1.1 => '1.10'`
- Rounding up not allowed `1.005 => '1.00'`
- Abbreviated above 1 million `1e6 => '1.00 M'`
- Comma insertion `1e5 => '100,000.00'`
- Hundredth fractions limited to 2 decimal places `0.011 => '0.01'`
- Thousandth fractions limited to 3 non-zero digits `0.0012345 => '0.00123'`
- Smallest supported fraction is `0.000001` (anything under returns `''`)
- Avoid common rounding issues

The test suite can be found in `test.js`.
