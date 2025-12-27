# app-footer



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description            | Type                                   | Default                                                                                                                                                                                                                                                                            |
| ------------- | -------------- | ---------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `companyName` | `company-name` | Company name           | `string`                               | `'Plymouth Rock Assurance'`                                                                                                                                                                                                                                                        |
| `links`       | --             | Footer links           | `{ label: string; href: string; }[]`   | `[     { label: 'Home', href: '#' },     { label: 'Contact Us', href: '#' },     { label: 'Privacy & Security', href: '#' },     { label: 'Terms & Conditions', href: '#' },     { label: 'States Licensed & Disclaimers', href: '#' },     { label: 'Site Map', href: '#' },   ]` |
| `phone`       | `phone`        | Phone number for quote | `string`                               | `'800-516-9242'`                                                                                                                                                                                                                                                                   |
| `socialLinks` | --             | Social media links     | `{ platform: string; url: string; }[]` | `[     { platform: 'Facebook', url: '#' },     { platform: 'Twitter', url: '#' },     { platform: 'Instagram', url: '#' },     { platform: 'LinkedIn', url: '#' },   ]`                                                                                                            |


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
