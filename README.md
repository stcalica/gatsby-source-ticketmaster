# gatsby-source-ticketmaster

Gatsby source plugin for Ticketmaster (Universe, FrontGate Tickets and Ticketmaster Resale) events

## Install

`pm install gatsby-source-ticketmaster`

Add plugin to gatsby-config.js and provide a venue id and API key to source all events from a particular venue.

```
  plugins: [{
    resolve: "gatsby-source-ticketmaster",
    options: {
      apiKey: "api-key",
      venueId: "venue-id",
      }
    },
],
```
