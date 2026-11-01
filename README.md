# getregdata Claude plugins

Claude plugins for official business-registry data, packaged for the Claude plugin directory and for Claude Code's `/plugin` command.

| Plugin | What it does | Needs |
|---|---|---|
| [`getregdata-registry-lookups`](plugins/getregdata-registry-lookups/) | Free company lookups from official government APIs - Poland (KRS, VAT white list), Czechia (ARES), Norway, Finland, France, the Baltics, Latin America and Asia, plus EU VAT validation, LEI resolution, sanctions screening and public-procurement awards | Nothing - every source is keyless |

Install in Claude Code:

```
/plugin marketplace add Nolpak14/getregdata-plugins
/plugin install getregdata-registry-lookups@getregdata-plugins
```

## Where the skills live

The skills are written and maintained in [Nolpak14/getregdata](https://github.com/Nolpak14/getregdata), which also carries the MCP server and the paid workflow skills. This repo only packages them: `scripts/sync.mjs` copies the listed skills into each plugin folder, and `node scripts/sync.mjs --check` fails when a copy has drifted from the source. Edit skills there, not here.

## License

MIT
