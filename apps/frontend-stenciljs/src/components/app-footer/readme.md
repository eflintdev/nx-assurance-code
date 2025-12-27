# app-footer



<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute      | Description            | Type           | Default     |
| -------------------------- | -------------- | ---------------------- | -------------- | ----------- |
| `companyName` _(required)_ | `company-name` | Company name           | `string`       | `undefined` |
| `links` _(required)_       | --             | Footer links           | `FooterLink[]` | `undefined` |
| `phone` _(required)_       | `phone`        | Phone number for quote | `string`       | `undefined` |
| `socialLinks` _(required)_ | --             | Social media links     | `SocialLink[]` | `undefined` |


## Dependencies

### Depends on

- [brand-logo](../brand-logo)
- [custom-link](../custom-link)

### Graph
```mermaid
graph TD;
  app-footer --> brand-logo
  app-footer --> custom-link
  style app-footer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
