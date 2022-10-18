const fetch = require('node-fetch');

exports.onPreInit = () => console.log("Loaded gatsby-starter-plugin")

const POST_NODE_TYPE = `Event`

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
  
}, pluginOptions) => {
  const { createNode } = actions
  console.log('pluginOptions', pluginOptions);
  const { apiKey, venueId } = pluginOptions;  
    let headers = new fetch.Headers();
    headers.append("Accept", "application/json");

    let requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
    };
    let response = await fetch(`https://app.ticketmaster.com/discovery/v2/events?locale=*&apikey=${apiKey}&venueId=${venueId}`, requestOptions);
    const data = await response.json();

    data['_embedded']['events'].forEach(event => {
        createNode({
            ...event,
            id: createNodeId(`${POST_NODE_TYPE} - ${event.id}`),
            event_id: event.id,
            parent: null,
            children: [],
            internal: {
                type: POST_NODE_TYPE,
                content: JSON.stringify(event),
                contentDigest: createContentDigest(event),
            },
            url: `${event.url}?REFID=clientsitewp`,
        });
    });

  return
}