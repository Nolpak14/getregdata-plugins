# getregdata registry lookups

Free company lookups for Claude, straight from official government registers. Every skill in this plugin calls a public, keyless government API directly, so there is nothing to set up: no API key, no account, no MCP server. Ask Claude something like "check this Polish NIP", "who sits on the board of Czech company 00177041" or "is this EU VAT number valid", and the matching skill tells Claude which official endpoint to call and how to read the answer.

## What it covers

| Skill | Source | What you get |
|---|---|---|
| `poland-company-registry` | KRS open API + Ministry of Finance VAT white list | Court-register extract, board and representation rule, filed statements, VAT status, registered bank accounts |
| `czech-company-registry` | ARES (Ministry of Finance) | Identity by IČO, statutory body by name, shareholders, capital; search by city and NACE |
| `norway-company-registry` | Brønnøysundregistrene | Company profile, board and officers, bankruptcy flags |
| `finland-company-registry` | PRH open data | Company profile, business ID, trade-register status, digital financial statements |
| `france-company-lookup` | recherche-entreprises.api.gouv.fr | Companies by name, SIREN or director |
| `latvia-company-registry` | data.gov.lv | Companies, officers and beneficial owners |
| `lithuania-company-registry` | Registrų centras | Companies by name or code |
| `romania-company-registry` | ANAF | Companies by CUI, VAT status |
| `brazil-cnpj` | Receita Federal data | Companies by CNPJ with the partner list |
| `costa-rica-hacienda` | Ministerio de Hacienda | Taxpayer status and activities by cédula jurídica |
| `dominican-republic-rnc` | DGII | Companies by RNC |
| `hong-kong-companies` | data.gov.hk | Live local companies by name |
| `israel-companies-registry` | data.gov.il | Companies by name or number |
| `singapore-acra` | data.gov.sg | Entities by name or UEN |
| `thailand-dbd` | DBD OpenAPI | Companies by juristic ID |
| `vietnam-business` | VietQR (tax authority data) | Companies by tax code |
| `sec-edgar-us` | SEC EDGAR | Filings and XBRL financials of US issuers |
| `vies-vat-validation` | EU VIES and EOS | EU VAT and EORI validation |
| `gleif-lei-lookup` | GLEIF | LEI, local registry ID, parent and child entities |
| `sanctions-pep-screening` | OFAC, EU, UK and UN lists | Sanctions screening of a name or entity |
| `icij-offshore-leaks` | ICIJ | Offshore Leaks red-flag check (a lead, not proof) |
| `eu-transparency-register` | EU Transparency Register | Whether an organisation lobbies the EU |
| `eu-financial-transparency` | EU Financial Transparency System | EU grants and direct funding received |
| `eu-ted-procurement` | EU TED | EU tenders and contract awards |
| `us-federal-awards` | USAspending | US federal contracts and grants |
| `world-bank-contracts` | World Bank | World Bank-financed contract awards |

## How it works

The skills are instructions only. Claude calls the official API named in each skill from your session; nothing is routed through getregdata and the plugin stores nothing. Each skill also explains the source's limits - for example that the Polish KRS extract masks board members' names, or that a VIES "invalid" can be a temporary member-state outage.

Where a free register stops (beneficial owners, unmasked board names, financial figures, insolvency proceedings, land registry), a skill names the paid getregdata registry actors that cover it and links to them through getregdata.com. Using those is optional and separate from this plugin.

## Install

In Claude Code:

```
/plugin marketplace add Nolpak14/getregdata-plugins
/plugin install getregdata-registry-lookups@getregdata-plugins
```

The same skills are maintained at [github.com/Nolpak14/getregdata](https://github.com/Nolpak14/getregdata). More on [getregdata.com/skills](https://getregdata.com/skills/).

## License

MIT. The data comes from each government source under its own terms of use; each skill names its source.
